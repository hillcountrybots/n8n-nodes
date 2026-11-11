import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { properties } from './ApifyBulkPagespeedChecker.properties';
import { runActor } from './helpers/executeActor';

// SNIPPET 1: Make sure the constants are correct
export const ACTOR_ID = '7NVAMJn39aGYdfWK4' as string;

export const PACKAGE_NAME = 'n8n-nodes-hillcountrybots-bulk-pagespeed-checker' as string;
export const CLASS_NAME = 'ApifyBulkPagespeedChecker' as string;
export const ClassNameCamel = CLASS_NAME.charAt(0).toLowerCase() + CLASS_NAME.slice(1); // make the first letter lowercase for name fields

export const X_PLATFORM_HEADER_ID = 'n8n' as string;
export const X_PLATFORM_APP_HEADER_ID = 'bulk-pagespeed-checker-app' as string;

export const DISPLAY_NAME = 'Bulk PageSpeed Insights Test (Hill Country Bots)' as string;
export const DESCRIPTION = 'Run a bulk PageSpeed Insights test: Lighthouse scores and Core Web Vitals for many URLs. Runs the Hill Country Bots Actor on Apify with your own Apify token.' as string;

export class ApifyBulkPagespeedChecker implements INodeType {
	description: INodeTypeDescription = {
		displayName: DISPLAY_NAME,
		name: ClassNameCamel,

		// SNIPPET 2: Adjust the icon of your app
		icon: 'file:logo.svg',
		group: ['transform'],
		// Mismatched version and defaultVersion as a minor hack to hide "Custom API Call" resource
		version: [1],
		defaultVersion: 1,

		// SNIPPET 3: Adjust the subtitle for your Actor app.
		subtitle: 'Bulk PageSpeed Insights test',
		
		// SNIPPET 4: Make sure the description is not too large, 1 sentence should be ideal.
		description: DESCRIPTION,
		defaults: {
			name: DISPLAY_NAME,
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				displayName: 'Apify API key connection',
				name: 'apifyApi',
				required: true,
			},
		],

		properties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const data = await runActor.call(this, i);

				const addPairedItem = (item: INodeExecutionData) => ({
					...item,
					pairedItem: { item: i },
				});

				if (Array.isArray(data)) {
					returnData.push(...data.map(addPairedItem));
				} else {
					returnData.push(addPairedItem(data));
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject);
			}
		}

		return [returnData];
	}
}
