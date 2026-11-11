# n8n community node: Bulk PageSpeed Insights Test (Hill Country Bots)

This n8n community node runs the [Bulk PageSpeed Insights Test](https://apify.com/hillcountrybots/bulk-pagespeed-checker) Actor on [Apify](https://apify.com). It is built and maintained by **Hill Country Bots**.

Give it a list of URLs. The Actor calls Google's official PageSpeed Insights API and returns Lighthouse scores, lab metrics, real-user Core Web Vitals (LCP, INP, CLS) and the top fixes, for mobile, desktop, or both.

The node calls the Apify API with **your own Apify token**. You need an Apify account. Usage is billed on Apify at **about $3 per 1,000 successful audits**. Failed audits are free.

## Install

In n8n: **Settings > Community nodes > Install**, then enter:

```
n8n-nodes-hillcountrybots-bulk-pagespeed-checker
```

On a self-hosted n8n instance, you can also install the package in your n8n extensions directory and restart n8n.

## Use it

1. Add your Apify credentials in n8n (API token from [Apify Console > Integrations](https://console.apify.com/settings/integrations)). The token stays in your n8n instance. It is never stored by Hill Country Bots.
2. Add the **Bulk PageSpeed Insights Test (Hill Country Bots)** node to a workflow.
3. Paste the URLs to test, choose mobile or desktop, and run the workflow.
4. The node waits for the Actor run and returns one row per URL and device, including scores, lab metrics and Core Web Vitals when Google has them.

You can also use Apify's official n8n, Make or Zapier integrations without this package. See the [Actor page](https://apify.com/hillcountrybots/bulk-pagespeed-checker).

## Input

The node fields match the Actor input: URL list, device, Lighthouse categories, optional Google API key, concurrency, max audits, and timeout. See the [Actor input docs](https://apify.com/hillcountrybots/bulk-pagespeed-checker).

## Pricing

Charged on Apify, not by this node: about **$3 per 1,000** successful audits (`$0.003` per `url-audited` event, one URL on one device). Failed audits are free.

## Support

Hill Country Bots, [hillcountrybots@proton.me](mailto:hillcountrybots@proton.me). Issues with a run can also be opened on the Actor's Issues tab: https://apify.com/hillcountrybots/bulk-pagespeed-checker
