# Example: Bulk PageSpeed Insights in an n8n workflow

1. In n8n go to **Settings > Community nodes > Install** and enter:

   ```
   n8n-nodes-hillcountrybots-bulk-pagespeed-checker
   ```

2. Add credentials: your own Apify API token. It stays in your n8n instance.

3. Add the **Bulk PageSpeed Checker (Hill Country Bots)** node.
4. Paste a list of URLs and choose mobile, desktop, or both.
5. Run the workflow. Each item is one audit row: Lighthouse scores, lab metrics, Core Web Vitals when Google has them, and top fixes.

You pay Apify, not this node: about **$3 per 1,000 successful audits**. Failures are free.

You can also use [Apify's official n8n integration](https://docs.apify.com/integrations/n8n) and pick `hillcountrybots/bulk-pagespeed-checker`.
