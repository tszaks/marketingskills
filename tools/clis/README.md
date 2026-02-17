# Marketing CLIs

Zero-dependency, single-file CLI tools for marketing platforms that don't ship their own.

Every CLI is a standalone Node.js script (Node 18+) with no `npm install` required — just `chmod +x` and go.

## Install

### Option 1: Run directly

```bash
node tools/clis/ahrefs.js backlinks list --target example.com
```

### Option 2: Symlink for global access

```bash
# Symlink any CLI you want available globally
ln -sf "$(pwd)/tools/clis/ahrefs.js" ~/.local/bin/ahrefs
ln -sf "$(pwd)/tools/clis/resend.js" ~/.local/bin/resend

# Then use directly
ahrefs backlinks list --target example.com
resend send --from you@example.com --to them@example.com --subject "Hello" --html "<p>Hi</p>"
```

### Option 3: Add the whole directory to PATH

```bash
export PATH="$PATH:/path/to/marketingskills/tools/clis"
```

## Authentication

Every CLI reads credentials from environment variables:

| CLI | Environment Variable |
|-----|---------------------|
| `ahrefs` | `AHREFS_API_KEY` |
| `adobe-analytics` | `ADOBE_CLIENT_ID`, `ADOBE_ACCESS_TOKEN` |
| `amplitude` | `AMPLITUDE_API_KEY`, `AMPLITUDE_SECRET_KEY` |
| `customer-io` | `CUSTOMERIO_APP_KEY` (App API), `CUSTOMERIO_SITE_ID` + `CUSTOMERIO_API_KEY` (Track API) |
| `dataforseo` | `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD` |
| `dub` | `DUB_API_KEY` |
| `ga4` | `GA4_ACCESS_TOKEN` |
| `google-ads` | `GOOGLE_ADS_TOKEN`, `GOOGLE_ADS_DEVELOPER_TOKEN` |
| `google-search-console` | `GSC_ACCESS_TOKEN` |
| `keywords-everywhere` | `KEYWORDS_EVERYWHERE_API_KEY` |
| `kit` | `KIT_API_KEY`, `KIT_API_SECRET` |
| `linkedin-ads` | `LINKEDIN_ACCESS_TOKEN` |
| `mailchimp` | `MAILCHIMP_API_KEY` |
| `mention-me` | `MENTIONME_API_KEY` |
| `meta-ads` | `META_ACCESS_TOKEN` |
| `mixpanel` | `MIXPANEL_TOKEN` (ingestion), `MIXPANEL_API_KEY` + `MIXPANEL_SECRET` (query) |
| `resend` | `RESEND_API_KEY` |
| `rewardful` | `REWARDFUL_API_KEY` |
| `segment` | `SEGMENT_WRITE_KEY` (tracking), `SEGMENT_ACCESS_TOKEN` (profile) |
| `semrush` | `SEMRUSH_API_KEY` |
| `sendgrid` | `SENDGRID_API_KEY` |
| `tiktok-ads` | `TIKTOK_ACCESS_TOKEN` |
| `tolt` | `TOLT_API_KEY` |
| `zapier` | `ZAPIER_API_KEY` |

## Command Pattern

All CLIs follow the same structure:

```
{tool} <resource> <action> [options]
```

Examples:

```bash
ahrefs backlinks list --target example.com --limit 50
semrush keywords overview --phrase "marketing automation" --database us
mailchimp campaigns list --limit 20
resend send --from you@example.com --to them@example.com --subject "Hello" --html "<p>Hi</p>"
dub links create --url https://example.com/landing --key summer-sale
```

## Output

All CLIs output JSON to stdout for easy piping:

```bash
# Pipe to jq
ahrefs backlinks list --target example.com | jq '.backlinks[].url_from'

# Save to file
semrush keywords overview --phrase "saas marketing" --database us > keywords.json

# Use in scripts
DOMAINS=$(rewardful affiliates list | jq -r '.data[].email')
```

## Available CLIs

| CLI | Category | Tool |
|-----|----------|------|
| `resend.js` | Email | [Resend](https://resend.com) |
| `sendgrid.js` | Email | [SendGrid](https://sendgrid.com) |
| `mailchimp.js` | Email | [Mailchimp](https://mailchimp.com) |
| `kit.js` | Email | [Kit](https://kit.com) |
| `customer-io.js` | Email | [Customer.io](https://customer.io) |
| `ahrefs.js` | SEO | [Ahrefs](https://ahrefs.com) |
| `semrush.js` | SEO | [SEMrush](https://semrush.com) |
| `google-search-console.js` | SEO | [Google Search Console](https://search.google.com/search-console) |
| `dataforseo.js` | SEO | [DataForSEO](https://dataforseo.com) |
| `keywords-everywhere.js` | SEO | [Keywords Everywhere](https://keywordseverywhere.com) |
| `ga4.js` | Analytics | [Google Analytics 4](https://analytics.google.com) |
| `mixpanel.js` | Analytics | [Mixpanel](https://mixpanel.com) |
| `amplitude.js` | Analytics | [Amplitude](https://amplitude.com) |
| `segment.js` | Analytics | [Segment](https://segment.com) |
| `adobe-analytics.js` | Analytics | [Adobe Analytics](https://business.adobe.com/products/analytics) |
| `rewardful.js` | Referral | [Rewardful](https://www.getrewardful.com) |
| `tolt.js` | Referral | [Tolt](https://tolt.io) |
| `mention-me.js` | Referral | [Mention Me](https://www.mention-me.com) |
| `dub.js` | Links | [Dub.co](https://dub.co) |
| `google-ads.js` | Ads | [Google Ads](https://ads.google.com) |
| `meta-ads.js` | Ads | [Meta Ads](https://www.facebook.com/business/ads) |
| `linkedin-ads.js` | Ads | [LinkedIn Ads](https://business.linkedin.com/marketing-solutions/ads) |
| `tiktok-ads.js` | Ads | [TikTok Ads](https://ads.tiktok.com) |
| `zapier.js` | Automation | [Zapier](https://zapier.com) |
