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

function getOptionalParam(context: IExecuteFunctions, paramName: string, itemIndex: number): Record<string, any> {
	const value = context.getNodeParameter(paramName, itemIndex);
	return value !== undefined && value !== null && value !== '' ? { [paramName]: value } : {};
}

export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		// URLs to audit (urls)
		...getFixedCollectionParam(context, 'urls', itemIndex, 'values', 'mapValues'),
		// Device (strategy)
		strategy: context.getNodeParameter('strategy', itemIndex),
		// Lighthouse categories (categories)
		categories: context.getNodeParameter('categories', itemIndex),
		// Your Google API key (optional) (googleApiKey)
		...getOptionalParam(context, 'googleApiKey', itemIndex),
		// Concurrency (maxConcurrency)
		maxConcurrency: context.getNodeParameter('maxConcurrency', itemIndex),
		// Max audits (maxResults)
		maxResults: context.getNodeParameter('maxResults', itemIndex),
		// Per-audit timeout (seconds) (requestTimeoutSecs)
		requestTimeoutSecs: context.getNodeParameter('requestTimeoutSecs', itemIndex),
	};
}


export const actorProperties: INodeProperties[] = [
  {
    "displayName": "URLs to audit",
    "name": "urls",
    "description": "Required. Public web pages to audit, one per line (https://example.com/). A domain without https:// is accepted. Private, local and internal addresses are refused (free).",
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
    "displayName": "Device",
    "name": "strategy",
    "description": "Device to emulate: 'mobile', 'desktop', or 'both' (two rows and two charges per URL).",
    "required": false,
    "default": "mobile",
    "type": "options",
    "options": [
      {
        "name": "Mobile",
        "value": "mobile"
      },
      {
        "name": "Desktop",
        "value": "desktop"
      },
      {
        "name": "Both",
        "value": "both"
      }
    ]
  },
  {
    "displayName": "Lighthouse categories",
    "name": "categories",
    "description": "Lighthouse categories to score: performance, accessibility, best-practices, seo. Adding categories does not change the price.",
    "required": false,
    "default": [],
    "type": "multiOptions",
    "options": [
      {
        "name": "Performance",
        "value": "performance"
      },
      {
        "name": "Accessibility",
        "value": "accessibility"
      },
      {
        "name": "Best practices",
        "value": "best-practices"
      },
      {
        "name": "SEO",
        "value": "seo"
      }
    ]
  },
  {
    "displayName": "Your Google API key (optional)",
    "name": "googleApiKey",
    "description": "Optional. Your own free Google PageSpeed Insights API key. If set, it is used instead of the Actor's built-in key (good for very large or daily jobs). Stored encrypted, sent only to Google, never logged or saved in results.",
    "required": false,
    "default": "",
    "type": "string"
  },
  {
    "displayName": "Concurrency",
    "name": "maxConcurrency",
    "description": "How many audits run in parallel (1-10). Google takes about 15 s per audit (median), slow pages up to 2 minutes.",
    "required": false,
    "default": 6,
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10
    }
  },
  {
    "displayName": "Max audits",
    "name": "maxResults",
    "description": "Maximum number of URL x device audits in this run. Caps spend: at most maxResults x $0.003.",
    "required": false,
    "default": 1000,
    "type": "number",
    "typeOptions": {
      "minValue": 1
    }
  },
  {
    "displayName": "Per-audit timeout (seconds)",
    "name": "requestTimeoutSecs",
    "description": "Seconds to wait for one audit before retrying once, then marking it TIMEOUT (free).",
    "required": false,
    "default": 120,
    "type": "number",
    "typeOptions": {
      "minValue": 30,
      "maxValue": 180
    }
  }
];

export const properties: INodeProperties[] = [...actorProperties];