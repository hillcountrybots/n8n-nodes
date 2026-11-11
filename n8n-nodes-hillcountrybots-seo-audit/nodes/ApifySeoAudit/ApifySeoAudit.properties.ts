import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

// Helper functions for parameter extraction
function getFixedCollectionParam(
	context: IExecuteFunctions,
	paramName: string,
	itemIndex: number,
	optionName: string,
	transformType: 'passthrough' | 'mapValues',
): Record<string, any> {
	const param = context.getNodeParameter(paramName, itemIndex, {}) as { [key: string]: any[] };
	if (!param?.[optionName]?.length) return {};

	let result = param[optionName];
	if (transformType === 'mapValues') {
		result = result.map((item: any) => item.value);
	}
	return { [paramName]: result };
}

export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		// Websites, sitemaps or page URLs (startUrls)
		...getFixedCollectionParam(context, 'startUrls', itemIndex, 'values', 'mapValues'),
		// Max pages per website (maxPagesPerSite)
		maxPagesPerSite: context.getNodeParameter('maxPagesPerSite', itemIndex),
		// Max pages in this run (spend cap) (maxPages)
		maxPages: context.getNodeParameter('maxPages', itemIndex),
		// Audit the whole site when I give a homepage (auditWholeSite)
		auditWholeSite: context.getNodeParameter('auditWholeSite', itemIndex),
		// Only audit URLs matching (includePatterns)
		...getFixedCollectionParam(context, 'includePatterns', itemIndex, 'values', 'mapValues'),
		// Skip URLs matching (excludePatterns)
		...getFixedCollectionParam(context, 'excludePatterns', itemIndex, 'values', 'mapValues'),
		// Check links for broken targets (checkBrokenLinks)
		checkBrokenLinks: context.getNodeParameter('checkBrokenLinks', itemIndex),
		// Links checked per page (maxLinksPerPage)
		maxLinksPerPage: context.getNodeParameter('maxLinksPerPage', itemIndex),
		// Create the HTML report (htmlReport)
		htmlReport: context.getNodeParameter('htmlReport', itemIndex),
		// Respect robots.txt (respectRobotsTxt)
		respectRobotsTxt: context.getNodeParameter('respectRobotsTxt', itemIndex),
		// Concurrency (all sites) (maxConcurrency)
		maxConcurrency: context.getNodeParameter('maxConcurrency', itemIndex),
		// Concurrency per site (maxConcurrencyPerSite)
		maxConcurrencyPerSite: context.getNodeParameter('maxConcurrencyPerSite', itemIndex),
		// Request timeout (seconds) (requestTimeoutSecs)
		requestTimeoutSecs: context.getNodeParameter('requestTimeoutSecs', itemIndex),
	};
}


export const actorProperties: INodeProperties[] = [
  {
    "displayName": "Websites, sitemaps or page URLs",
    "name": "startUrls",
    "description": "Required. One per line. A homepage or bare domain (example.com) = whole-site audit. A sitemap URL (…/sitemap.xml) = audit the pages it lists. Any other URL = audit just that page. Private, local and internal addresses and login/account/admin/cart/checkout pages are refused for free.",
    "required": true,
    "default": {},
    "type": "fixedCollection",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "values",
        "displayName": "Values",
        "values": [
          {
            "displayName": "Value",
            "name": "value",
            "type": "string",
            "default": ""
          }
        ]
      }
    ]
  },
  {
    "displayName": "Max pages per website",
    "name": "maxPagesPerSite",
    "description": "Pages audited per website or sitemap (shallow, important pages first). 10 for a quick preview, 100 for a standard audit, 1,000+ for a deep one. Single page URLs you list yourself are not limited by this.",
    "required": false,
    "default": 100,
    "type": "number",
    "typeOptions": {
      "minValue": 1
    }
  },
  {
    "displayName": "Max pages in this run (spend cap)",
    "name": "maxPages",
    "description": "Total pages audited and charged in this run. Caps spend at maxPages x $0.002 (1,000 = $2). Failed pages do not count. The run's own max-charge setting is also respected.",
    "required": false,
    "default": 1000,
    "type": "number",
    "typeOptions": {
      "minValue": 1
    }
  },
  {
    "displayName": "Audit the whole site when I give a homepage",
    "name": "auditWholeSite",
    "description": "On: a homepage or bare domain expands to the site's pages (sitemap, or link crawl if no sitemap). Off: only the homepage itself is audited.",
    "required": false,
    "default": true,
    "type": "boolean"
  },
  {
    "displayName": "Only audit URLs matching",
    "name": "includePatterns",
    "description": "Optional globs (e.g. */blog/*) or /regex/. Applied to pages from sitemaps and link crawls.",
    "required": false,
    "default": {},
    "type": "fixedCollection",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "values",
        "displayName": "Values",
        "values": [
          {
            "displayName": "Value",
            "name": "value",
            "type": "string",
            "default": ""
          }
        ]
      }
    ]
  },
  {
    "displayName": "Skip URLs matching",
    "name": "excludePatterns",
    "description": "Optional globs or /regex/, e.g. */tag/* or */page/*.",
    "required": false,
    "default": {},
    "type": "fixedCollection",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "values",
        "displayName": "Values",
        "values": [
          {
            "displayName": "Value",
            "name": "value",
            "type": "string",
            "default": ""
          }
        ]
      }
    ]
  },
  {
    "displayName": "Check links for broken targets",
    "name": "checkBrokenLinks",
    "description": "Check the links on each page: links in the main content first, up to 'Links checked per page' new links per page (each unique link is checked once per run, HEAD first; links already checked are reported for free) and flag 404/410/5xx and dead domains. Included in the page price. Turn off for faster runs.",
    "required": false,
    "default": true,
    "type": "boolean"
  },
  {
    "displayName": "Links checked per page",
    "name": "maxLinksPerPage",
    "description": "Only used when the broken-link check is on (1-100).",
    "required": false,
    "default": 20,
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    }
  },
  {
    "displayName": "Create the HTML report",
    "name": "htmlReport",
    "description": "Save a clean, shareable HTML report (scores, top fixes, duplicates, every page) to the key-value store as REPORT. Free.",
    "required": false,
    "default": true,
    "type": "boolean"
  },
  {
    "displayName": "Respect robots.txt",
    "name": "respectRobotsTxt",
    "description": "Skip (free) pages that the site's robots.txt disallows for our crawler or all crawlers. Turn off only for sites you own or are allowed to audit.",
    "required": false,
    "default": true,
    "type": "boolean"
  },
  {
    "displayName": "Concurrency (all sites)",
    "name": "maxConcurrency",
    "description": "Pages fetched in parallel across all sites (1-50).",
    "required": false,
    "default": 10,
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 50
    }
  },
  {
    "displayName": "Concurrency per site",
    "name": "maxConcurrencyPerSite",
    "description": "Pages fetched in parallel from one website (1-10). Keep low to be polite to small sites.",
    "required": false,
    "default": 4,
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10
    }
  },
  {
    "displayName": "Request timeout (seconds)",
    "name": "requestTimeoutSecs",
    "description": "Seconds to wait for one page, including redirects (one retry on timeouts, network errors, 429 and 5xx).",
    "required": false,
    "default": 20,
    "type": "number",
    "typeOptions": {
      "minValue": 5,
      "maxValue": 60
    }
  }
];

export const properties: INodeProperties[] = [...actorProperties];