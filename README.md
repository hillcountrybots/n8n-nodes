# n8n community nodes for Hill Country Bots

Two n8n community nodes that run our Apify Actors from a workflow. The nodes are free. You use **your own Apify token**, and Apify bills the runs at the Store prices below.

The TypeScript source for both nodes is in this repository, in `n8n-nodes-hillcountrybots-seo-audit` and `n8n-nodes-hillcountrybots-bulk-pagespeed-checker`. Both packages are already on npm under the MIT license.

**Website:** [hillcountrybots.com](https://hillcountrybots.com)  
**Apify profile:** [apify.com/hillcountrybots](https://apify.com/hillcountrybots)

Topics: `n8n`, `n8n-nodes`, `n8n-community-node-package`, `apify`, `seo`, `pagespeed-insights`, `core-web-vitals`

## Packages

| npm package | What it runs | Price on Apify | npm | Store |
|---|---|---|---|---|
| `n8n-nodes-hillcountrybots-seo-audit` | [SEO Audit Tool](https://apify.com/hillcountrybots/seo-audit) | $2 / 1,000 audited pages, failures free | [npm](https://www.npmjs.com/package/n8n-nodes-hillcountrybots-seo-audit) | [Store](https://apify.com/hillcountrybots/seo-audit) |
| `n8n-nodes-hillcountrybots-bulk-pagespeed-checker` | [Bulk PageSpeed Insights Test](https://apify.com/hillcountrybots/bulk-pagespeed-checker) | $3 / 1,000 successful audits, failures free | [npm](https://www.npmjs.com/package/n8n-nodes-hillcountrybots-bulk-pagespeed-checker) | [Store](https://apify.com/hillcountrybots/bulk-pagespeed-checker) |

Prices checked on the live Store and the npm registry on November 11, 2026. Current published version of both packages: 1.0.0.

## Install

In n8n: **Settings > Community nodes > Install**, then enter one package name:

```
n8n-nodes-hillcountrybots-seo-audit
```

```
n8n-nodes-hillcountrybots-bulk-pagespeed-checker
```

On a self-hosted instance you can also install the package in your n8n extensions directory and restart n8n.

Verified-node install from the nodes panel will be available only after we republish from GitHub Actions and n8n accepts the Creator Portal submission. Until then, install by package name as above.

## Use it

1. Add Apify credentials in n8n (API token from [Apify Console > Integrations](https://console.apify.com/settings/integrations)). The token stays in your n8n instance. Hill Country Bots never stores it.
2. Drop the node onto the canvas.
3. For SEO Audit, enter a website, a sitemap, or a list of pages. For PageSpeed, paste URLs and choose a device.
4. Run the workflow. The node waits for the Actor and returns dataset rows as items for the next step.

Step-by-step notes: `examples/seo-audit-workflow.md` and `examples/pagespeed-workflow.md`.

You can also skip these packages and use [Apify's official n8n integration](https://docs.apify.com/integrations/n8n).

## Example: audit a site and post the score

A typical flow is: Schedule trigger → SEO Audit node (website `https://crawlee.dev`, `maxPages` 20) → filter items where `rowType` is `page` → Google Sheets or Slack.

## Support

Hill Country Bots, Bee Cave, Texas. [hillcountrybots@proton.me](mailto:hillcountrybots@proton.me)

Issues with a run can also be opened on the Actor's Issues tab:

- https://apify.com/hillcountrybots/seo-audit
- https://apify.com/hillcountrybots/bulk-pagespeed-checker

## License

MIT. See [LICENSE](LICENSE).
