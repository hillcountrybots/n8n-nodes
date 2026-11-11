# Example: SEO audit in an n8n workflow

1. In n8n go to **Settings > Community nodes > Install** and enter:

   ```
   n8n-nodes-hillcountrybots-seo-audit
   ```

2. Add credentials: an Apify API token from [Apify Console > Integrations](https://console.apify.com/settings/integrations). The token stays in your n8n instance. Hill Country Bots never sees it.

3. Add the **SEO Audit Tool (Hill Country Bots)** node.
4. Set a website such as `https://crawlee.dev` and a page cap (for example 20).
5. Run the workflow. The node waits for the Actor and returns dataset rows (page scores, issues, and a site summary) as items you can pass to Sheets, Slack, or email. The HTML report is in the run's key-value store as `REPORT`.

You pay Apify, not this node: about **$2 per 1,000 audited pages**. Failures are free.

You can also skip this package and use [Apify's official n8n integration](https://docs.apify.com/integrations/n8n), then pick `hillcountrybots/seo-audit`.
