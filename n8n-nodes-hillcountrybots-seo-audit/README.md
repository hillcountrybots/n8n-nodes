# n8n community node: SEO Audit Tool (Hill Country Bots)

This n8n community node runs the [SEO Audit Tool](https://apify.com/hillcountrybots/seo-audit) Actor on [Apify](https://apify.com). It is built and maintained by **Hill Country Bots**.

Give it a website, a sitemap URL, or a list of pages. The Actor returns a 0 to 100 SEO score per page, a site summary with the top fixes, and a shareable HTML report.

The node calls the Apify API with **your own Apify token**. You need an Apify account. Usage is billed on Apify at **about $2 per 1,000 audited pages**. Failed, blocked and broken pages are free.

## Install

In n8n: **Settings > Community nodes > Install**, then enter:

```
n8n-nodes-hillcountrybots-seo-audit
```

On a self-hosted n8n instance, you can also install the package in your n8n extensions directory and restart n8n.

## Use it

1. Add your Apify credentials in n8n (API token from [Apify Console > Integrations](https://console.apify.com/settings/integrations)). The token stays in your n8n instance. It is never stored by Hill Country Bots.
2. Add the **SEO Audit Tool (Hill Country Bots)** node to a workflow.
3. Enter a website such as `https://crawlee.dev`, set how many pages to audit, and run the workflow.
4. The node waits for the Actor run and returns the dataset rows (page scores, issues, and a site summary). The HTML report is in the run's key-value store as `REPORT`.

You can also use Apify's official n8n, Make or Zapier integrations without this package. See the [Actor page](https://apify.com/hillcountrybots/seo-audit).

## Input

The node fields match the Actor input: websites / sitemaps / page URLs, max pages per site, spend cap, include/exclude patterns, broken-link check, and the HTML report toggle. See the [Actor input docs](https://apify.com/hillcountrybots/seo-audit).

## Pricing

Charged on Apify, not by this node: about **$2 per 1,000** successfully audited pages (`$0.002` per `page-audited` event). Failures are free.

## Support

Hill Country Bots, [hillcountrybots@proton.me](mailto:hillcountrybots@proton.me). Issues with a run can also be opened on the Actor's Issues tab: https://apify.com/hillcountrybots/seo-audit
