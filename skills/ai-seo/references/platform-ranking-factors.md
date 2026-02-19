# Platform-Specific Ranking Factors

How each AI search platform selects sources and what to optimize for each.

Sources: Princeton GEO study (KDD 2024), SE Ranking study (129K domains), Ziptie content-answer fit analysis (400K pages).

---

## Quick Reference

| Platform | Primary Index | Key Factor | Unique Requirement |
|----------|--------------|------------|-------------------|
| **Google AI Overviews** | Google | E-E-A-T + structured data | Knowledge Graph presence |
| **ChatGPT** | Bing-based web | Domain authority + freshness | Content-answer fit |
| **Perplexity** | Own + Google | Semantic relevance | FAQ Schema, PDF hosting |
| **Copilot** | Bing | Bing indexing | Microsoft ecosystem presence |
| **Claude** | Brave Search | Factual density | Brave Search indexing |
| **Gemini** | Google | Google index + Knowledge Graph | Structured data |

---

## Google AI Overviews

Google's AI Overviews synthesize answers from multiple sources using a 5-stage pipeline.

### How Source Selection Works

1. **Retrieval** — Identify candidate sources from Google index
2. **Semantic ranking** — Evaluate topical relevance
3. **LLM re-ranking** — Assess contextual fit using Gemini
4. **E-E-A-T evaluation** — Filter for expertise, authority, trust
5. **Data fusion** — Synthesize from multiple sources with citations

### Key Stats

| Signal | Impact |
|--------|--------|
| Authoritative citations in content | +132% visibility |
| Authoritative tone | +89% visibility |
| Structured data (Schema) | +30-40% visibility |
| Overlap with traditional Top 10 | Only 15% (AI Overviews cite different pages) |

### What to Optimize

- Implement comprehensive Schema markup (Article, FAQPage, HowTo, Product)
- Build topical authority with content clusters and internal linking
- Include authoritative citations and references in content
- Add E-E-A-T signals (author bios, credentials, experience)
- Target informational "how-to" and "what is" queries
- Ensure content is in Google's Knowledge Graph (Wikipedia helps)

---

## ChatGPT (with Search)

ChatGPT uses a Bing-based web index for real-time search, combined with its training data.

### How Source Selection Works

Two-phase system:
1. **Pre-training knowledge** — Built from training data (Wikipedia, books, web)
2. **Real-time retrieval** — Web browsing for current information

### Ranking Factor Weights (SE Ranking Study, 129K Domains)

| Factor | Weight |
|--------|--------|
| Authority & credibility | ~40% |
| Content quality & utility | ~35% |
| Platform trust | ~25% |

### Content-Answer Fit Analysis (400K Pages Study)

| Factor | Relevance |
|--------|-----------|
| **Content-answer fit** | 55% — most important; match ChatGPT's response style |
| **On-page structure** | 14% — clear headings, formatting |
| **Domain authority** | 12% — helps retrieval, not citation |
| **Query relevance** | 12% — match user intent |
| **Content consensus** | 7% — agreement among sources |

### Key Stats

| Metric | Impact |
|--------|--------|
| >350K referring domains | 8.4 average citations |
| Domain trust score 97-100 | 8.4 citations (vs 6 for 91-96) |
| Content updated within 30 days | 3.2x more citations |
| Branded vs third-party domains | Branded cited 11.1 points more |

### Top Citation Sources

1. Wikipedia (7.8%)
2. Reddit (1.8%)
3. Forbes (1.1%)
4. Brand official sites (variable)
5. Academic sources (variable)

### What to Optimize

- Build a strong backlink profile (quality over quantity, >350K referring domains is elite)
- Update content frequently (within 30 days for competitive topics)
- Match ChatGPT's conversational answer style in your content
- Include verifiable statistics with citations
- Use clear H1/H2/H3 heading structure
- Build high domain trust score

---

## Perplexity AI

Perplexity always cites its sources with links. It uses Retrieval-Augmented Generation (RAG) with a 3-layer reranking system.

### How Source Selection Works

1. **Layer 1 (L1)** — Basic relevance retrieval
2. **Layer 2 (L2)** — Traditional ranking factors scoring
3. **Layer 3 (L3)** — ML models for quality evaluation (can discard entire result sets)

### Key Ranking Signals

| Signal | Details |
|--------|---------|
| Authoritative domain lists | Manual lists: Amazon, GitHub, academic sites get inherent boost |
| Freshness | Time decay algorithm; new content evaluated quickly |
| Semantic relevance | Content similarity to query (not keyword matching) |
| Topical weighting | Tech, AI, Science topics get visibility multipliers |
| Early engagement | First clicks on new posts significantly boost visibility |

### Unique to Perplexity

- **FAQ Schema (JSON-LD)** — Pages with FAQ blocks are cited more often
- **PDF documents** — Publicly hosted PDFs are prioritized for citation
- **Content velocity** — Speed of publishing matters more than keyword density
- **Semantic payloads** — Clear, atomic paragraphs preferred (self-contained)

### What to Optimize

- Allow PerplexityBot in robots.txt
- Implement FAQPage Schema markup
- Create publicly accessible PDF resources (whitepapers, guides)
- Use Article schema with timestamps
- Focus on semantic relevance over keywords
- Build topical authority in your niche
- Write clear, self-contained paragraphs

---

## Microsoft Copilot

Copilot is integrated into Edge, Windows, Microsoft 365, and Bing Search. It uses the **Bing Index** as its primary data source.

### Key Ranking Signals

| Signal | Details |
|--------|---------|
| Bing indexing | Must be indexed by Bing (required baseline) |
| Microsoft ecosystem | LinkedIn, GitHub mentions provide a boost |
| Page speed | < 2 seconds load time |
| Schema markup | Helps Copilot understand content context |
| Entity clarity | Clear definitions of entities and concepts |

### What to Optimize

- Submit site to Bing Webmaster Tools
- Use IndexNow for faster indexing of new content
- Optimize page speed (< 2 seconds)
- Write clear entity definitions in content
- Build presence on LinkedIn and GitHub
- Ensure Bingbot can crawl all important pages

---

## Claude AI

Claude uses **Brave Search** (not Google or Bing) when web search is enabled.

### Key Characteristics

| Signal | Details |
|--------|---------|
| Brave Index | Must be indexed by Brave Search |
| Factual density | Data-rich content strongly preferred |
| Structural clarity | Easy to extract information |
| Source authority | Trustworthy, well-sourced content |
| Selectivity | Crawl-to-refer ratio of 38,065:1 (extremely selective) |

Claude consumes vast amounts of content but cites very selectively. Quality and relevance are critical.

### What to Optimize

- Ensure Brave Search can find your content
- Allow ClaudeBot and anthropic-ai in robots.txt
- Create high factual density content (specific numbers, sources)
- Use clear, extractable structure
- Cite authoritative sources
- Focus on being the most factually accurate source for your topic

---

## robots.txt Configuration

Allow all major AI bots:

```
# Search engine bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI search bots
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

# Sitemap
Sitemap: https://example.com/sitemap.xml
```

### Selective Blocking

If you want to allow AI search citation but block AI training:
- **GPTBot** — Used by OpenAI for both search and training. Blocking prevents ChatGPT citation.
- **Google-Extended** — Controls Gemini/AI Overviews usage. Blocking this doesn't affect regular Google Search.
- **CCBot** — Used by Common Crawl for AI training datasets. Safe to block if you only want search citation.

---

## Optimization Priority by Platform

If you can't optimize for everything, prioritize by your audience:

| Priority | If Your Audience Uses | Focus On |
|----------|----------------------|----------|
| 1 | Google (everyone) | AI Overviews: Schema, E-E-A-T, topical authority |
| 2 | ChatGPT (tech, business) | Domain authority, freshness, content-answer fit |
| 3 | Perplexity (researchers, early adopters) | FAQ Schema, semantic relevance, PDFs |
| 4 | Copilot (enterprise, Microsoft shops) | Bing indexing, LinkedIn presence |
| 5 | Claude (developers, analysts) | Brave indexing, factual density |

### Universal Actions (Do These First)

1. Allow all AI bots in robots.txt
2. Implement Schema markup (FAQPage, Article, Organization)
3. Include statistics with citations in content
4. Update content regularly (within 30 days for competitive topics)
5. Use clear heading structure (H1 > H2 > H3)
6. Ensure page speed < 2 seconds
7. Add author bios with credentials
