import { URL } from 'url';

export interface DomainTemplate {
  pattern: string | RegExp;
  headers: Record<string, string>;
  headersFn?: (url: URL) => Record<string, string>;
}

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
];

function getRandomUserAgent(): string {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

const headerCache = new Map<string, Record<string, string>>();

export const domainTemplates: DomainTemplate[] = [
  // Padorupado.ru
     
   {
    pattern: /\.padorupado\.ru$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://kwik.si',
        'referer': 'https://kwik.si/',
      };
    }
  },

  // Krussdomi.com
  {
    pattern: /krussdomi\.com$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://hls.krussdomi.com',
        'referer': 'https://hls.krussdomi.com/',
      };
    }
  },

  {
    pattern: /\.akamaized\.net$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://bl.krussdomi.com',
        'referer': 'https://bl.krussdomi.com/',
      };
    }
  },

  {
    pattern: /\.anih1\.top$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://ee.anih1.top',
        'referer': 'https://ee.anih1.top/',
      };
    }
  },

  {
    pattern: /\.xyk3\.top$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://ee.anih1.top',
        'referer': 'https://ee.anih1.top/',
      };
    }
  },

  {
    pattern: /\.premilkyway\.com$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://uqloads.xyz',
        'referer': 'https://uqloads.xyz/',
      };
    }
  },

   // kwikie.ru
   {
    pattern: /\.kwikie\.ru$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://kwik.si',
        'referer': 'https://kwik.si/',
      };
    }
  },

  // Revolutionizingtheweb.xyz
  {
    pattern: /revolutionizingtheweb\.xyz$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://hls.krussdomi.com',
        'referer': 'https://hls.krussdomi.com/',
      };
    }
  },

  // nextgentechnologytrends.xyz
  {
    pattern: /nextgentechnologytrends\.xyz$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://hls.krussdomi.com',
        'referer': 'https://hls.krussdomi.com/',
      };
    }
  },

  // smartinvestmentstrategies.xyz
  {
    pattern: /smartinvestmentstrategies\.xyz$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://hls.krussdomi.com',
        'referer': 'https://hls.krussdomi.com/',
      };
    }
  },

  // creativedesignstudioxyz.xyz
  {
    pattern: /creativedesignstudioxyz\.xyz$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://hls.krussdomi.com',
        'referer': 'https://hls.krussdomi.com/',
      };
    }
  },

  // breakingdigitalboundaries.xyz
  {
    pattern: /breakingdigitalboundaries\.xyz$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://hls.krussdomi.com',
        'referer': 'https://hls.krussdomi.com/',
      };
    }
  },

  // ultimatetechinnovation.xyz
  {
    pattern: /ultimatetechinnovation\.xyz$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://hls.krussdomi.com',
        'referer': 'https://hls.krussdomi.com/',
      };
    }
  },

  // ultimatetechinnovation.xyz
  {
    pattern: /\.raffaellocdn\.net$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://streameeeeee.site',
        'referer': 'https://streameeeeee.site/',
      };
    }
  },
  
  {
    pattern: /b-g-eu-1\.raffaellocdn\.net$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; rv:130.0) Gecko/20100101 Firefox/130.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://streameeeeee.site',
        'referer': 'https://streameeeeee.site/',
      };
    }
  },

  // dewbreeze84.online
  {
    pattern: /dewbreeze84\.online$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://megacloud.blog',
        'referer': 'https://megacloud.blog/',
      };
    }
  },

    // douvid.xyz
  {
    pattern: /douvid\.xyz$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://megacloud.blog',
        'referer': 'https://megacloud.blog/',
      };
    }
  },

  // mistyvalley31.live
  {
    pattern: /mistyvalley31\.live$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://megacloud.blog',
        'referer': 'https://megacloud.blog/',
      };
    }
  },

    // mistyvalley31.live
    {
      pattern: /lightningspark77\.pro$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },
  
    // clearskydrift45.site
    {
      pattern: /clearskydrift45\.site$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://kerolaunochan.online',
          'referer': 'https://kerolaunochan.online/',
        };
      }
    },
  
    // thunderwave48.xyz
    {
      pattern: /thunderwave48\.xyz$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },

    // stormwatch95.site
    {
      pattern: /stormwatch95\.site$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },

    // windyrays29.online
    {
      pattern: /windyrays29\.online$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },
  
    // mistyvalley31.live
    {
      pattern: /thunderstrike77\.online$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },

    // mistyvalley31.live
    {
      pattern: /lightningflash39\.live$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },

        // eb.netmagcdn.com
    {
      pattern: /\.shadowlandschronicles\.com$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://cloudnestra.com',
          'referer': 'https://cloudnestra.com/',
        };
      }
    },

    // boldsageventures.xyz
    {
      pattern: /boldsageventures\.xyz$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://cloudnestra.com',
          'referer': 'https://cloudnestra.com/',
        };
      }
    },

    // putgate.org
    {
      pattern: /putgate\.org$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://cloudnestra.com',
          'referer': 'https://cloudnestra.com/',
        };
      }
    },
    
    // southboat.site
    {
      pattern: /\.southboat\.site$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://player.videasy.net',
          'referer': 'https://player.videasy.net/',
        };
      }
    },  

    // cdnup.cc
    {
      pattern: /\.cdnup\.cc$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://bestwish.lol',
          'referer': 'https://bestwish.lol/',
        };
      }
    },  

    // streamupcdn.com
    {
      pattern: /\.streamupcdn\.com$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://bestwish.lol',
          'referer': 'https://bestwish.lol/',
        };
      }
    },

    // eb.netmagcdn.com
    {
      pattern: /\.netmagcdn\.com$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },

    // mistyvalley31.live
    {
      pattern: /cloudburst82\.xyz$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },

    // drizzleshower19.site
    {
      pattern: /drizzleshower19\.site$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },

    // vmeas.cloud
    {
      pattern: /vmeas\.cloud$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://vidmoly.to',
          'referer': 'https://vidmoly.to/',
        };
      }
    },
    
    // nextwaveinitiative
    {
      pattern: /nextwaveinitiative\.xyz$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://edgedeliverynetwork.org',
          'referer': 'https://edgedeliverynetwork.org/',
        };
      }
    },

    // shadowlandschronicles
    {
      pattern: /shadowlandschronicles\.com$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://edgedeliverynetwork.org',
          'referer': 'https://edgedeliverynetwork.org/',
        };
      }
    },

    // lightningbolts.ru
    {
      pattern: /lightningbolts\.ru$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://vidsrc.cc',
          'referer': 'https://vidsrc.cc/',
        };
      }
    },

    // .xelvonwave64.xyz
    {
      pattern: /\.xelvonwave64\.xyz$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://vidsrc.su',
          'referer': 'https://vidsrc.su/',
        };
      }
    },

    // lightningbolt.site
    {
      pattern: /lightningbolt\.site$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://vidsrc.cc',
          'referer': 'https://vidsrc.cc/',
        };
      }
    },

    // vidlvod.store
    {
      pattern: /vidlvod\.store$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://vidlink.pro',
          'referer': 'https://vidlink.pro/',
        };
      }
    },

    // vyebzzqlojvrl.top
    {
      pattern: /vyebzzqlojvrl\.top$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://vidsrc.cc',
          'referer': 'https://vidsrc.cc/',
        };
      }
    },

    // sunnybreeze16.live
    {
      pattern: /sunnybreeze16\.live$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.store',
          'referer': 'https://megacloud.store/',
        };
      }
    },

    // 1stkmgv1.cloud
    {
      pattern: /1stkmgv1\.com$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://vidmoly.to',
          'referer': 'https://vidmoly.to/',
        };
      }
    },

    // rainstorm92.xyz
    {
      pattern: /rainstorm92\.xyz$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.club',
          'referer': 'https://megacloud.club/',
        };
      }
    },

  // cloudydrift38.site
  {
    pattern: /cloudydrift38\.site$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://megacloud.blog',
        'referer': 'https://megacloud.blog/',
      };
    }
  },

    // sunshinerays93.live
    {
      pattern: /sunshinerays93\.live$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },

    // sunburst66.pro
    {
      pattern: /sunburst66\.pro$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },

        // clearbluesky72.wiki
        {
          pattern: /clearbluesky72\.wiki$/i,
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.5',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
          },
          headersFn: (url: URL) => {
            return {
              'origin': 'https://megacloud.blog',
              'referer': 'https://megacloud.blog/',
            };
          }
        },
    

    // breezygale56.online
    {
      pattern: /breezygale56\.online$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },

    // frostbite27.pro
    {
      pattern: /frostbite27\.pro$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },

    // frostywinds57.live
    {
      pattern: /frostywinds57\.live$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },

    // icyhailstorm64.wiki
    {
      pattern: /icyhailstorm64\.wiki$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },

    // icyhailstorm29.online
    {
      pattern: /icyhailstorm29\.online$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },

    
    // windflash93.xyz
    {
      pattern: /windflash93\.xyz$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },

    // stormdrift27.site
    {
      pattern: /stormdrift27\.site$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },

    // tempestcloud61.wiki
    {
      pattern: /tempestcloud61\.wiki$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://megacloud.blog',
          'referer': 'https://megacloud.blog/',
        };
      }
    },
    
    // feetcdn.com
    {
      pattern: /\.feetcdn\.com$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://kerolaunochan.online',
          'referer': 'https://kerolaunochan.online/',
        };
      }
    },

    // raffaellocdn.net
    {
      pattern: /\.raffaellocdn\.net$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://kerolaunochan.online',
          'referer': 'https://kerolaunochan.online/',
        };
      }
    },

    // heatwave90.pro
    {
      pattern: /heatwave90\.pro$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://kerolaunochan.live',
          'referer': 'https://kerolaunochan.live/',
        };
      }
    },

    // humidmist27.wiki
    {
      pattern: /humidmist27\.wiki$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://kerolaunochan.live',
          'referer': 'https://kerolaunochan.live/',
        };
      }
    },

    // frozenbreeze65.live
    {
      pattern: /frozenbreeze65\.live$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://kerolaunochan.live',
          'referer': 'https://kerolaunochan.live/',
        };
      }
    },

    // drizzlerain73.online
    {
      pattern: /drizzlerain73\.online$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://kerolaunochan.live',
          'referer': 'https://kerolaunochan.live/',
        };
      }
    },


    // sunrays81.xyz
    {
      pattern: /sunrays81\.xyz$/i,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
      headersFn: (url: URL) => {
        return {
          'origin': 'https://kerolaunochan.live',
          'referer': 'https://kerolaunochan.live/',
        };
      }
    },

    {
    pattern: /embed\.su$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://embed.su',
        'referer': 'https://embed.su/',
      };
    }
  },

  {
    pattern: /usbigcdn\.cc$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://embed.su',
        'referer': 'https://embed.su/',
      };
    }
  },

  {
    pattern: /\.congacdn\.cc$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    headersFn: (url: URL) => {
      return {
        'origin': 'https://embed.su',
        'referer': 'https://embed.su/',
      };
    }
  },
  
  // Akamai CDN
  {
    pattern: /\.akamaized\.net$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'origin': 'https://players.akamai.com',
      'referer': 'https://players.akamai.com/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    }
  },
  
  // Cloudfront CDN
  {
    pattern: /\.cloudfront\.net$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'origin': 'https://d2zihajmogu5jn.cloudfront.net',
      'referer': 'https://d2zihajmogu5jn.cloudfront.net/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    }
  },

  // twitch CDN
  {
    pattern: /\.ttvnw\.net$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'origin': 'https://www.twitch.tv',
      'referer': 'https://www.twitch.tv/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    }
  },

  // twitch CDN
  {
    pattern: /\.xx.fbcdn\.net$/i,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'origin': 'https://www.facebook.com',
      'referer': 'https://www.facebook.com/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    }
  },

     // vkcdn5.com
     {
        pattern: /\.vkcdn5\.com$/i,
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.5',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
        },
        headersFn: (url: URL) => {
          return {
            'origin': 'https://vkspeed.com',
            'referer': 'https://vkspeed.com/',
          };
        }
      },
  
  // General default template
  {
    pattern: /.*/,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      'accept': '*/*',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    }
  }
];

export function findTemplateForDomain(url: URL): DomainTemplate {
  const hostname = url.hostname;

  for (const template of domainTemplates) {
    if (typeof template.pattern === 'string') {
      const pattern = template.pattern.replace(/\*/g, '.*');
      if (new RegExp(pattern).test(hostname)) {
        return template;
      }
    } else if (template.pattern.test(hostname)) {
      return template;
    }
  }

  return domainTemplates[domainTemplates.length - 1];
}

export function generateHeadersForUrl(url: URL): Record<string, string> {
  const cacheKey = url.hostname;

  if (headerCache.has(cacheKey)) {
    return { ...headerCache.get(cacheKey)! };
  }

  const template = findTemplateForDomain(url);
  const headers: Record<string, string> = {
    ...template.headers,
    'user-agent': getRandomUserAgent(), // override static UA
  };

  if (template.headersFn) {
    Object.assign(headers, template.headersFn(url));
  }

  delete headers['cache-control'];
  delete headers['pragma'];

  headerCache.set(cacheKey, headers);
  return headers;
}

export default {
  domainTemplates,
  findTemplateForDomain,
  generateHeadersForUrl,
};
