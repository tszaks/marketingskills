# RB2B

Website visitor identification platform that de-anonymizes B2B website traffic, revealing the individual people visiting your site with LinkedIn profiles, emails, and company data.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Pro plan and above |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | - | REST API only |

## Authentication

- **Type**: API Key (Pro plan required for API access)
- **Get key**: Settings > API at https://app.rb2b.com
- **Free tier**: 150 credits/month with Slack alerts only

## Pricing Tiers

| Plan | Price | Credits/Month | Key Features |
|------|-------|---------------|-------------|
| Free | $0 | 150 | Slack alerts, LinkedIn profiles |
| Pro | $129/mo (annual) | 300 | CSV export, CRM push, validated emails |
| Pro+ | $299/mo (annual) | 1,000 | All integrations, priority support |
| Scale | $849/mo | 12,500 | High-volume identification |

## Key Integrations

RB2B pushes identified visitor data to 50+ tools:
- **CRM**: Salesforce, HubSpot
- **Outreach**: Instantly, HeyReach, Lemlist
- **Enrichment**: Clay, Apollo, Clearbit
- **Automation**: Zapier, Make
- **Alerts**: Slack (real-time notifications)

## What RB2B Reveals Per Visitor

- Full name and LinkedIn profile URL
- Job title and company
- Validated business email (Pro+)
- Pages visited and visit duration
- Number of visits and return frequency
- Company data (size, industry, location)

## Common Agent Operations

### Real-Time Visitor Alerts

Configure Slack alerts for high-intent visitors:
- Visitors who hit pricing page
- Visitors who return 3+ times
- Visitors from target account list
- Visitors matching ICP job titles

### Visitor-to-Outreach Pipeline

1. RB2B identifies visitor with LinkedIn + email
2. Filter by ICP criteria (title, company size, pages visited)
3. Route to outreach tool (Instantly, Lemlist) or CRM (HubSpot, Salesforce)
4. Trigger personalized cold email referencing pages they visited

### Intent Scoring

Score visitors by behavior signals:
- **High intent**: Pricing page, demo page, comparison pages, 3+ visits
- **Medium intent**: Feature pages, case studies, 2 visits
- **Low intent**: Blog only, single visit, bounced quickly

### Suppression Lists

Prevent outreach to:
- Existing customers (match against CRM)
- Active deals in pipeline
- Competitors and agencies
- Recently contacted prospects

## When to Use

- Identifying anonymous website visitors for sales outreach
- Building ABM (account-based marketing) target lists from site traffic
- Understanding which companies are researching your product
- Triggering personalized outreach based on page-level intent signals
- Feeding enrichment tools (Clay, Apollo) with warm visitor data

## Limitations

- Person-level identification works best for US B2B traffic
- Not all visitors can be identified (typical match rates: 15-30%)
- Requires sufficient website traffic to be cost-effective
- Privacy considerations — ensure compliance with applicable regulations
- Free tier limited to Slack alerts (no CRM push or email export)

## Relevant Skills

- cold-email
- revops
- customer-research
- paid-ads
