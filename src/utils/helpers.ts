import { promisify } from 'util';
import { gunzip, brotliDecompress, inflate } from 'zlib';
import { decompress as fzstdDecompress } from 'fzstd';
import { URL } from 'url';
import { logger } from '../middleware.js';

// Convert callback-based functions to promise-based versions
const gunzipAsync = promisify(gunzip);
const brotliDecompressAsync = promisify(brotliDecompress);
const inflateAsync = promisify(inflate);

// ==================== COMPRESSION HANDLER ====================

/**
 * Enhanced decompression function with better format detection and error handling
 */
export async function decompressContent(
  buffer: Buffer | ArrayBuffer,
  contentEncoding?: string | null
): Promise<Buffer> {
  // Ensure we're working with a Node.js Buffer
  const inputBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  
  // Log decompression attempt for debugging
  logger.debug({
    type: 'decompression',
    contentEncoding,
    bufferSize: inputBuffer.length,
    firstBytes: inputBuffer.subarray(0, 8).toString('hex')
  }, 'Attempting decompression');
  
  // If no content-encoding header is provided, attempt to detect the format
  if (!contentEncoding) {
    return await autoDetectAndDecompress(inputBuffer);
  }
  
  // If content-encoding header is provided, use it
  const encoding = contentEncoding.toLowerCase().trim();
  
  try {
    let result: Buffer;
    
    switch (encoding) {
      case 'gzip':
        result = await gunzipAsync(inputBuffer);
        logger.debug({ type: 'decompression', method: 'gzip', success: true }, 'Gzip decompression successful');
        break;
        
      case 'br':
        result = await brotliDecompressAsync(inputBuffer);
        logger.debug({ type: 'decompression', method: 'brotli', success: true }, 'Brotli decompression successful');
        break;
        
      case 'zstd':
        const decompressedZstdUint8Array = await fzstdDecompress(inputBuffer);
        result = Buffer.from(decompressedZstdUint8Array);
        logger.debug({ type: 'decompression', method: 'zstd', success: true }, 'Zstd decompression successful');
        break;
        
      case 'deflate':
        result = await inflateAsync(inputBuffer);
        logger.debug({ type: 'decompression', method: 'deflate', success: true }, 'Deflate decompression successful');
        break;
        
      default:
        logger.warn({ type: 'decompression', encoding }, `Unknown content-encoding: ${encoding}, trying auto-detection`);
        result = await autoDetectAndDecompress(inputBuffer);
    }
    
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.warn({
      type: 'decompression',
      encoding,
      error: errorMessage,
      bufferSize: inputBuffer.length,
      firstBytes: inputBuffer.subarray(0, 8).toString('hex')
    }, `Decompression failed with ${encoding}, trying fallback methods`);
    
    // Try fallback methods
    return await fallbackDecompression(inputBuffer, encoding);
  }
}

/**
 * Auto-detect compression format and decompress
 */
async function autoDetectAndDecompress(inputBuffer: Buffer): Promise<Buffer> {
  // Check for gzip magic bytes (0x1F 0x8B)
  if (inputBuffer.length > 2 && inputBuffer[0] === 0x1F && inputBuffer[1] === 0x8B) {
    try {
      const result = await gunzipAsync(inputBuffer);
      logger.debug({ type: 'decompression', method: 'auto-gzip', success: true }, 'Auto-detected gzip decompression successful');
      return result;
    } catch (error) {
      logger.debug({ type: 'decompression', method: 'auto-gzip', error: error instanceof Error ? error.message : String(error) }, 'Auto-detected gzip failed');
    }
  }
  
  // Check for zstd magic bytes (0x28 0xB5 0x2F 0xFD)
  if (inputBuffer.length > 4 && 
      inputBuffer[0] === 0x28 && 
      inputBuffer[1] === 0xB5 && 
      inputBuffer[2] === 0x2F && 
      inputBuffer[3] === 0xFD) {
    try {
      const decompressed = await fzstdDecompress(inputBuffer);
      const result = Buffer.from(decompressed);
      logger.debug({ type: 'decompression', method: 'auto-zstd', success: true }, 'Auto-detected zstd decompression successful');
      return result;
    } catch (error) {
      logger.debug({ type: 'decompression', method: 'auto-zstd', error: error instanceof Error ? error.message : String(error) }, 'Auto-detected zstd failed');
    }
  }
  
  // Try brotli (no reliable magic bytes, but worth a try)
  try {
    const result = await brotliDecompressAsync(inputBuffer);
    logger.debug({ type: 'decompression', method: 'auto-brotli', success: true }, 'Auto-detected brotli decompression successful');
    return result;
  } catch (error) {
    logger.debug({ type: 'decompression', method: 'auto-brotli', error: error instanceof Error ? error.message : String(error) }, 'Auto-detected brotli failed');
  }
  
  // Try deflate (no reliable magic bytes, but worth a try)
  try {
    const result = await inflateAsync(inputBuffer);
    logger.debug({ type: 'decompression', method: 'auto-deflate', success: true }, 'Auto-detected deflate decompression successful');
    return result;
  } catch (error) {
    logger.debug({ type: 'decompression', method: 'auto-deflate', error: error instanceof Error ? error.message : String(error) }, 'Auto-detected deflate failed');
  }
  
  // If all auto-detection fails, return the original buffer
  logger.debug({ type: 'decompression', method: 'none', result: 'original' }, 'No compression detected, returning original buffer');
  return inputBuffer;
}

/**
 * Try alternative decompression methods when the specified one fails
 */
async function fallbackDecompression(inputBuffer: Buffer, failedEncoding: string): Promise<Buffer> {
  const methods = [
    { name: 'gzip', fn: gunzipAsync },
    { name: 'brotli', fn: brotliDecompressAsync },
    { name: 'deflate', fn: inflateAsync }
  ];
  
  // Try zstd separately since it has different signature
  if (failedEncoding !== 'zstd') {
    try {
      const decompressed = await fzstdDecompress(inputBuffer);
      const result = Buffer.from(decompressed);
      logger.debug({ type: 'decompression', method: 'fallback-zstd', success: true }, 'Fallback zstd decompression successful');
      return result;
    } catch (error) {
      logger.debug({ type: 'decompression', method: 'fallback-zstd', error: error instanceof Error ? error.message : String(error) }, 'Fallback zstd failed');
    }
  }
  
  // Try other methods
  for (const method of methods) {
    if (method.name !== failedEncoding.replace('br', 'brotli')) {
      try {
        const result = await method.fn(inputBuffer);
        logger.debug({ type: 'decompression', method: `fallback-${method.name}`, success: true }, `Fallback ${method.name} decompression successful`);
        return result;
      } catch (error) {
        logger.debug({ type: 'decompression', method: `fallback-${method.name}`, error: error instanceof Error ? error.message : String(error) }, `Fallback ${method.name} failed`);
      }
    }
  }
  
  // If all fallback methods fail, return the original buffer
  logger.warn({
    type: 'decompression',
    originalEncoding: failedEncoding,
    result: 'original',
    bufferSize: inputBuffer.length
  }, 'All decompression methods failed, returning original buffer');
  
  return inputBuffer;
}

// ==================== URL VALIDATOR ====================

/**
 * Interface for URL validation result
 */
export interface UrlValidationResult {
  valid: boolean;
  reason?: string;
  hostname?: string;
}

/**
 * URL Validator Options
 */
export interface UrlValidatorOptions {
  allowedDomains?: string[];
  maxUrlLength?: number;
  requireProtocol?: boolean;
}

/**
 * Validates a URL using regex and additional checks
 * @param url The URL to validate
 * @param options Validation options
 * @returns Validation result with validity status and optional reason
 */
export function validateUrl(
  url: string, 
  options: UrlValidatorOptions = {}
): UrlValidationResult {
  const {
    maxUrlLength = 2048,
    allowedDomains = [],
    requireProtocol = false
  } = options;
  
  // Check if URL is empty
  if (!url) {
    return { 
      valid: false, 
      reason: 'URL cannot be empty' 
    };
  }
  
  // Check URL length
  if (url.length > maxUrlLength) {
    return { 
      valid: false, 
      reason: `URL exceeds maximum length of ${maxUrlLength} characters` 
    };
  }
  
  // Special case for local paths starting with / (proxy internal routing)
  if (url.startsWith('/')) {
    return { valid: true };
  }
  
  try {
    // If it's a full URL with protocol, validate it
    if (url.includes('://')) {
      const urlObj = new URL(url);
      
      // Check against domain whitelist if provided and not empty
      if (allowedDomains.length > 0) {
        if (!allowedDomains.includes(urlObj.hostname)) {
          return {
            valid: false,
            reason: 'Domain not in allowed domains list',
            hostname: urlObj.hostname
          };
        }
      }
      
      return {
        valid: true,
        hostname: urlObj.hostname
      };
    } 
    // If protocol is required but not present
    else if (requireProtocol) {
      return {
        valid: false,
        reason: 'URL must include protocol (http:// or https://)'
      };
    }
    
    // For relative URLs or paths, just accept them
    return { valid: true };
    
  } catch (error) {
    // If URL parsing failed, it's likely an invalid URL
    return {
      valid: false,
      reason: 'Invalid URL format'
    };
  }
}

// ==================== TRANSPORT STREAM HANDLER ====================

/**
 * Detects if a binary buffer contains MPEG-2 Transport Stream data
 * TS packets start with sync byte 0x47 (71 in decimal)
 * 
 * @param buffer Binary data to analyze
 * @returns Boolean indicating if it's likely a TS segment
 */
export function detectTransportStream(buffer: ArrayBuffer | Buffer | Uint8Array): boolean {
  try {
    // Convert to Uint8Array if it's not already
    const data = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    
    // Minimum size check
    if (data.length < 188) {
      logger.debug({ type: 'ts-detection', size: data.length, reason: 'too-small' }, 'Buffer too small for TS detection');
      return false;
    }
    
    // Check first byte for TS sync byte (0x47)
    if (data[0] !== 0x47) {
      logger.debug({ 
        type: 'ts-detection', 
        firstByte: data[0].toString(16), 
        expected: '47',
        reason: 'no-sync-byte'
      }, 'No TS sync byte found');
      return false;
    }
    
    // Check additional TS sync bytes at 188-byte intervals
    let syncByteCount = 1; // We already found one
    for (let i = 1; i <= 5; i++) { // Check more sync bytes for better accuracy
      const offset = i * 188;
      if (offset < data.length && data[offset] === 0x47) {
        syncByteCount++;
      }
    }
    
    // Require at least 2 sync bytes for positive detection
    const isTransportStream = syncByteCount >= 2;
    
    logger.debug({
      type: 'ts-detection',
      size: data.length,
      syncByteCount,
      isTransportStream,
      firstBytes: data.subarray(0, 8).toString('hex')
    }, `TS detection result: ${isTransportStream ? 'POSITIVE' : 'NEGATIVE'}`);
    
    return isTransportStream;
  } catch (error) {
    logger.error({
      type: 'ts-detection',
      error: error instanceof Error ? error.message : String(error)
    }, 'Error detecting transport stream');
    return false;
  }
}

/**
 * Enhanced content type detection with better logging
 * 
 * @param buffer Response body as buffer
 * @param originalContentType Original content type from response
 * @param url The URL of the resource
 * @returns The correct content type to use
 */
export function determineContentType(
  buffer: ArrayBuffer | Buffer | Uint8Array,
  originalContentType: string | null | undefined,
  url: string
): string {
  // Check if it's a transport stream
  const isTS = detectTransportStream(buffer);
  
  if (isTS) {
    logger.info({
      type: 'content-type-override',
      url,
      originalContentType: originalContentType || 'none',
      newContentType: 'video/mp2t',
      reason: 'transport-stream-detected'
    }, 'Transport stream detected, overriding content type');
    return 'video/mp2t';
  }
  
  // If URL ends with .m3u8 but content type doesn't match
  if (url.toLowerCase().endsWith('.m3u8') &&
      (!originalContentType || 
       !originalContentType.includes('application/vnd.apple.mpegurl'))) {
    logger.info({
      type: 'content-type-override',
      url,
      originalContentType: originalContentType || 'none',
      newContentType: 'application/vnd.apple.mpegurl',
      reason: 'm3u8-extension'
    }, 'M3U8 extension detected, overriding content type');
    return 'application/vnd.apple.mpegurl';
  }
  
  // Special handling for segments with misleading extensions
  const urlLower = url.toLowerCase();
  if ((urlLower.includes('seg-') || urlLower.includes('segment-')) && 
      (urlLower.endsWith('.js') || urlLower.endsWith('.jpg') || urlLower.endsWith('.png'))) {
    // Check if this might be a disguised segment
    logger.debug({
      type: 'content-type-analysis',
      url,
      originalContentType: originalContentType || 'none',
      reason: 'potential-disguised-segment'
    }, 'Potential disguised segment detected');
  }
  
  // Return the original content type if it exists
  const finalContentType = originalContentType || 'application/octet-stream';
  
  logger.debug({
    type: 'content-type-final',
    url,
    contentType: finalContentType
  }, 'Using original content type');
  
  return finalContentType;
}

// ==================== VTT HANDLER ====================

/**
 * Interface for VTT handler options
 */
export interface VttHandlerOptions {
  proxyBaseUrl: string;
  targetUrl: string;
  urlParamName?: string;
}

/**
 * Process WebVTT content to rewrite image URLs
 * @param content The VTT content as string
 * @param options Handler options
 * @returns Processed VTT content with rewritten URLs
 */
export function processVttContent(
  content: string,
  options: VttHandlerOptions
): string {
  const {
    proxyBaseUrl,
    targetUrl,
    urlParamName = 'url',
  } = options;
  
  try {
    // Parse the base URL for resolving relative paths
    const targetUrlObj = new URL(targetUrl);
    const basePath = targetUrl.substring(0, targetUrl.lastIndexOf('/') + 1);
    
    // Find all image references (typically .jpg, .png, etc.)
    const imageRegex = /\b[^\s"']+?\.(jpg|jpeg|png|gif|webp)\b/gi;
    const matches = content.match(imageRegex);
    
    // No images to process
    if (!matches) {
      return content;
    }
    
    // Process each unique image URL
    const uniqueUrls = [...new Set(matches)];
    let processedContent = content;
    
    for (const imageUrl of uniqueUrls) {
      // Resolve relative URLs
      let absoluteUrl: string;
      
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        // Already an absolute URL
        absoluteUrl = imageUrl;
      } else if (imageUrl.startsWith('//')) {
        // Protocol-relative URL
        absoluteUrl = `${targetUrlObj.protocol}${imageUrl}`;
      } else if (imageUrl.startsWith('/')) {
        // Root-relative URL
        absoluteUrl = `${targetUrlObj.protocol}//${targetUrlObj.host}${imageUrl}`;
      } else {
        // Relative URL - resolve against base path
        absoluteUrl = new URL(imageUrl, basePath).toString();
      }
      
      // Create the proxied URL
      const proxyUrl = `${proxyBaseUrl}?${urlParamName}=${encodeURIComponent(absoluteUrl)}`;
      
      // Replace all occurrences of this image URL
      processedContent = processedContent.replace(
        new RegExp(escapeRegExp(imageUrl), 'g'),
        proxyUrl
      );
    }
    
    return processedContent;
  } catch (error) {
    logger.error('Error processing VTT content:', error);
    
    // Return original content on error
    return content;
  }
}

/**
 * Escape special characters for use in a regular expression
 * @param string String to escape
 * @returns Escaped string
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Export all helper functions
export default {
  decompressContent,
  validateUrl,
  determineContentType,
  detectTransportStream,
  processVttContent,
  escapeRegExp,
};