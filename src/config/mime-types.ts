/**
 * MIME type configuration for handling various content types
 * with special focus on streaming media formats like m3u8 and TS segments
 */

// Common MIME types
export const COMMON_MIME_TYPES = {
    // Text types
    'txt': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'csv': 'text/csv',
    
    // Application types
    'json': 'application/json',
    'js': 'application/javascript',
    'xml': 'application/xml',
    'pdf': 'application/pdf',
    
    // Image types
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    
    // Audio types
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    
    // Video types
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'avi': 'video/x-msvideo',
    'mpeg': 'video/mpeg',
    'mov': 'video/quicktime',
    
    // Streaming-specific types
    'm3u8': 'application/vnd.apple.mpegurl',
    'ts': 'video/mp2t',
    'mpd': 'application/dash+xml',
    'vtt': 'text/vtt',
    'srt': 'application/x-subrip',
  };
  
  // Special streaming-related formats that need custom handling
  export const STREAMING_FORMATS = {
    // HLS formats
    'm3u8': 'application/vnd.apple.mpegurl',
    'm3u': 'application/vnd.apple.mpegurl',
    'ts': 'video/mp2t',
    'mts': 'video/mp2t',
    'm2ts': 'video/mp2t',
    'mpeg-ts': 'video/mp2t',
    'mp2t': 'video/mp2t', // Explicit mp2t extension
    
    // DASH formats
    'mpd': 'application/dash+xml',
    'mp4a': 'audio/mp4',
    'mp4v': 'video/mp4',
    'm4s': 'video/iso.segment',
    'm4a': 'audio/mp4',
    'm4v': 'video/mp4',
    
    // Subtitle formats
    'vtt': 'text/vtt',
    'srt': 'application/x-subrip',
    'ttml': 'application/ttml+xml',
    
    // Special case for MPEG2-TS in JPG segments (as seen in the example)
    'jpg-ts': 'video/mp2t',
  };
  
  // Special types that might need path rewriting in m3u8 content
  export const M3U8_REWRITABLE_EXTENSIONS = [
    '.ts',
    '.mts',
    '.m2ts',
    '.mp2t',
    '.m3u8',
    '.key',
    '.vtt',
    '.srt',
    '.jpg',
    '.jpeg',
    '.png',
    '.m4s',
    '.mp4',
    '.html',
    '.js',
    '.css',
    '.txt',
    '.webp',
    '.ico'
  ];
  
  /**
   * Enhanced segment detection patterns
   * These help identify streaming segments that might be disguised with wrong extensions
   */
  export const SEGMENT_PATTERNS = [
    // Common segment naming patterns
    /seg-\d+/i,
    /segment-\d+/i,
    /chunk-\d+/i,
    /frag-\d+/i,
    /part-\d+/i,
    
    // HLS-style patterns
    /-v\d+-a\d+/i,
    /-f\d+-v\d+-a\d+/i,
    
    // Other common patterns
    /media-\d+/i,
    /stream_\d+/i,
    /_\d+\.ts$/i,
    /_\d+\.m4s$/i,
  ];
  
  /**
   * Gets MIME type from file extension with enhanced segment detection
   * @param path File path or URL
   * @returns MIME type string or undefined if not recognized
   */
  export function getMimeType(path: string): string | undefined {
    if (!path) return undefined;
    
    // Extract extension from path
    const extension = path.split('.').pop()?.toLowerCase();
    if (!extension) return undefined;
    
    // Check if this looks like a disguised segment
    if (isDisguisedSegment(path)) {
      return 'video/mp2t';
    }
    
    // Special case for jpg files that are actually TS segments (original logic)
    if (extension === 'jpg' && path.includes('segment-') && path.includes('-v1-a1')) {
      return 'video/mp2t';
    }
    
    // Check in streaming formats first, then common MIME types
    return STREAMING_FORMATS[extension as keyof typeof STREAMING_FORMATS] || 
           COMMON_MIME_TYPES[extension as keyof typeof COMMON_MIME_TYPES];
  }
  
  /**
   * Enhanced detection for disguised segments
   * @param path File path or URL
   * @returns Boolean indicating if this might be a disguised segment
   */
  export function isDisguisedSegment(path: string): boolean {
    if (!path) return false;
    
    const pathLower = path.toLowerCase();
    
    // Check for segment patterns with wrong extensions
    const hasSegmentPattern = SEGMENT_PATTERNS.some(pattern => pattern.test(path));
    const hasSuspiciousExtension = ['.js', '.jpg', '.png', '.gif', '.css', '.html'].some(ext => 
      pathLower.endsWith(ext)
    );
    
    return hasSegmentPattern && hasSuspiciousExtension;
  }
  
  /**
   * Determines if a path is a streaming-related format
   * @param path File path or URL
   * @returns Boolean indicating if it's a streaming format
   */
  export function isStreamingFormat(path: string): boolean {
    if (!path) return false;
    
    const extension = path.split('.').pop()?.toLowerCase();
    if (!extension) return false;
    
    // Check for disguised segments
    if (isDisguisedSegment(path)) {
      return true;
    }
    
    // Special case for jpg files that are actually TS segments
    if (extension === 'jpg' && path.includes('segment-') && path.includes('-v1-a1')) {
      return true;
    }
    
    return extension in STREAMING_FORMATS;
  }
  
  /**
   * Determines if a path is specifically an M3U8 playlist
   * @param path File path or URL
   * @returns Boolean indicating if it's an M3U8 file
   */
  export function isM3u8Playlist(path: string): boolean {
    if (!path) return false;
    return path.toLowerCase().endsWith('.m3u8') || path.toLowerCase().endsWith('.m3u');
  }
  
  /**
   * Enhanced TS segment detection
   * @param path File path or URL
   * @returns Boolean indicating if it's a TS file
   */
  export function isTsSegment(path: string): boolean {
    if (!path) return false;
    
    // Check standard TS extensions
    if (path.toLowerCase().endsWith('.ts') || 
        path.toLowerCase().endsWith('.mts') || 
        path.toLowerCase().endsWith('.m2ts') ||
        path.toLowerCase().endsWith('.mp2t')) {
      return true;
    }
    
    // Check for disguised segments
    if (isDisguisedSegment(path)) {
      return true;
    }
    
    // Special case for jpg files that are actually TS segments (original logic)
    if (path.toLowerCase().endsWith('.jpg') && 
        path.includes('segment-') && 
        path.includes('-v1-a1')) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Determines if a URL potentially needs path rewriting in M3U8 content
   * @param url URL to check
   * @returns Boolean indicating if path may need rewriting
   */
  export function needsM3u8Rewriting(url: string): boolean {
    if (!url) return false;
    
    return M3U8_REWRITABLE_EXTENSIONS.some(ext => 
      url.toLowerCase().endsWith(ext)
    ) || isDisguisedSegment(url);
  }
  
  /**
   * Get content type based on segment analysis
   * This function provides more intelligent content type detection for streaming content
   * @param path File path or URL
   * @param fallback Fallback content type
   * @returns Best guess content type
   */
  export function getStreamingContentType(path: string, fallback?: string): string {
    if (!path) return fallback || 'application/octet-stream';
    
    // Check if it's an M3U8 playlist
    if (isM3u8Playlist(path)) {
      return 'application/vnd.apple.mpegurl';
    }
    
    // Check if it's a TS segment (including disguised ones)
    if (isTsSegment(path)) {
      return 'video/mp2t';
    }
    
    // Check for other streaming formats
    if (isStreamingFormat(path)) {
      const mimeType = getMimeType(path);
      if (mimeType) return mimeType;
    }
    
    // Fall back to standard MIME type detection
    return getMimeType(path) || fallback || 'application/octet-stream';
  }
  
  export default {
    COMMON_MIME_TYPES,
    STREAMING_FORMATS,
    M3U8_REWRITABLE_EXTENSIONS,
    SEGMENT_PATTERNS,
    getMimeType,
    isStreamingFormat,
    isM3u8Playlist,
    isTsSegment,
    needsM3u8Rewriting,
    isDisguisedSegment,
    getStreamingContentType
  };