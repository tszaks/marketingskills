# Generative AI Tools for Ad Creative

Reference for using AI image generators, video generators, and code-based video tools to produce ad visuals at scale.

---

## When to Use Generative Tools

| Need | Tool Category | Best Fit |
|------|---------------|----------|
| Static ad images (banners, social) | Image generation | Nano Banana Pro, Flux, Ideogram |
| Ad images with text overlays | Image generation (text-capable) | Ideogram, Nano Banana Pro |
| Short video ads (6-30 sec) | Video generation | Veo, Kling, Runway, Sora, Seedance |
| Product mockups and variations | Image generation + references | Flux (multi-image reference) |
| Templated video ads at scale | Code-based video | Remotion |
| Personalized video (name, data) | Code-based video | Remotion |
| Brand-consistent variations | Image gen + style refs | Flux, Ideogram, Nano Banana Pro |

---

## Image Generation

### Nano Banana Pro (Gemini)

Google DeepMind's image generation model, available through the Gemini API.

**Best for:** High-quality ad images, product visuals, text rendering
**API:** Gemini API (Google AI Studio, Vertex AI)
**Pricing:** ~$0.04/image (Gemini 2.5 Flash Image), ~$0.24/4K image (Nano Banana Pro)

**Strengths:**
- Strong text rendering in images (logos, headlines)
- Native image editing (modify existing images with prompts)
- Available through the same Gemini API used for text generation
- Supports both generation and editing in one model

**Ad creative use cases:**
- Generate social media ad images from text descriptions
- Create product mockup variations
- Edit existing ad images (swap backgrounds, change colors)
- Generate images with headline text baked in

**API example:**
```bash
# Using the Gemini API for image generation
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{
    "contents": [{"parts": [{"text": "Create a clean, modern social media ad image for a project management tool. Show a laptop with a kanban board interface. Bright, professional, 16:9 ratio."}]}],
    "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}
  }'
```

**Docs:** [Gemini Image Generation](https://ai.google.dev/gemini-api/docs/image-generation)

---

### Flux (Black Forest Labs)

Open-weight image generation models with API access through Replicate and BFL's native API.

**Best for:** Photorealistic images, brand-consistent variations, multi-reference generation
**API:** Replicate, BFL API, fal.ai
**Pricing:** ~$0.01-0.06/image depending on model and resolution

**Model variants:**
| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| Flux 2 Pro | ~6 sec | Highest | $0.015/MP | Final production assets |
| Flux 2 Flex | ~22 sec | High + editing | $0.06/MP | Iterative editing |
| Flux 2 Dev | ~2.5 sec | Good | $0.012/MP | Rapid prototyping |
| Flux 2 Klein | Fastest | Good | Lowest | High-volume batch generation |

**Strengths:**
- Multi-image reference (up to 8 images) for consistent identity across ads
- Product consistency — same product in different contexts
- Style transfer from reference images
- Open-weight Dev model for self-hosting

**Ad creative use cases:**
- Generate 50+ ad variations with consistent product/person identity
- Create product-in-context images (your SaaS on different devices)
- Style-match to existing brand assets using reference images
- Rapid A/B test image variations

**Docs:** [Replicate Flux](https://replicate.com/black-forest-labs/flux-2-pro), [BFL API](https://docs.bfl.ml/)

---

### Ideogram

Specialized in typography and text rendering within images.

**Best for:** Ad banners with text, branded graphics, social ad images with headlines
**API:** Ideogram API, Runware
**Pricing:** ~$0.06/image (API), ~$0.009/image (subscription)

**Strengths:**
- Best-in-class text rendering (~90% accuracy vs ~30% for most tools)
- Style reference system (upload up to 3 reference images)
- 4.3 billion style presets for consistent brand aesthetics
- Strong at logos and branded typography

**Ad creative use cases:**
- Generate ad banners with headline text directly in the image
- Create social media graphics with branded text overlays
- Produce multiple design variations with consistent typography
- Generate promotional materials without needing a designer for each iteration

**Docs:** [Ideogram API](https://developer.ideogram.ai/), [Ideogram](https://ideogram.ai/)

---

### Other Image Tools

| Tool | Best For | API Status | Notes |
|------|----------|------------|-------|
| **DALL-E 3** (OpenAI) | General image generation | Official API | Integrated with ChatGPT, good text rendering |
| **Midjourney** | Artistic, high-aesthetic images | No official public API | Discord-based; unofficial APIs exist but risk bans |
| **Stable Diffusion** | Self-hosted, customizable | Open source | Best for teams with GPU infrastructure |

---

## Video Generation

### Google Veo

Google DeepMind's video generation model, available through the Gemini API and Vertex AI.

**Best for:** High-quality video ads with native audio, vertical video for social
**API:** Gemini API, Vertex AI
**Pricing:** ~$0.15/sec (Veo 3.1 Fast), ~$0.40/sec (Veo 3.1 Standard)

**Capabilities:**
- Up to 60 seconds at 1080p
- Native audio generation (dialogue, sound effects, ambient)
- Vertical 9:16 output for Stories/Reels/Shorts
- Upscale to 4K
- Text-to-video and image-to-video

**Ad creative use cases:**
- Generate short video ads (15-30 sec) from text descriptions
- Create vertical video ads for TikTok, Reels, Shorts
- Produce product demos with voiceover
- Generate multiple video variations from the same prompt with different styles

**Docs:** [Veo on Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/video/overview)

---

### Kling (Kuaishou)

Video generation with simultaneous audio-visual generation and camera controls.

**Best for:** Cinematic video ads, longer-form content, audio-synced video
**API:** Kling API, PiAPI, fal.ai
**Pricing:** ~$0.09/sec (via fal.ai third-party)

**Capabilities:**
- Up to 3 minutes at 1080p/30-48fps
- Simultaneous audio-visual generation (Kling 2.6)
- Text-to-video and image-to-video
- Motion and camera controls

**Ad creative use cases:**
- Longer product explainer videos
- Cinematic brand videos with synchronized audio
- Animate product images into video ads

**Docs:** [Kling AI Developer](https://klingai.com/global/dev/model/video)

---

### Runway

Video generation and editing platform with strong controllability.

**Best for:** Controlled video generation, style-consistent content, editing existing footage
**API:** Runway Developer Portal

**Capabilities:**
- Gen-4: Character/scene consistency across shots
- Motion brush and camera controls
- Image-to-video with reference images
- Video-to-video style transfer

**Ad creative use cases:**
- Generate video ads with consistent characters/products across scenes
- Style-transfer existing footage to match brand aesthetics
- Extend or remix existing video content

**Docs:** [Runway API](https://docs.dev.runwayml.com/)

---

### Sora 2 (OpenAI)

OpenAI's video generation model with synchronized audio.

**Best for:** High-fidelity video with dialogue and sound
**API:** OpenAI API
**Pricing:** Free tier available; Pro from $0.10-0.50/sec depending on resolution

**Capabilities:**
- Up to 60 seconds with synchronized audio
- Dialogue, sound effects, and ambient audio
- sora-2 (fast) and sora-2-pro (quality) variants
- Text-to-video and image-to-video

**Ad creative use cases:**
- Video testimonials and talking-head style ads
- Product demo videos with narration
- Narrative brand videos

**Docs:** [OpenAI Video Generation](https://platform.openai.com/docs/guides/video-generation)

---

### Seedance 2.0 (ByteDance)

ByteDance's video generation model with simultaneous audio-visual generation and multimodal inputs.

**Best for:** Fast, affordable video ads with native audio, multimodal reference inputs
**API:** BytePlus (official), Replicate, WaveSpeedAI, fal.ai (third-party); OpenAI-compatible API format
**Pricing:** ~$0.10-0.80/min depending on resolution (estimated 10-100x cheaper than Sora 2 per clip)

**Capabilities:**
- Up to 20 seconds at up to 2K resolution
- Simultaneous audio-visual generation (Dual-Branch Diffusion Transformer)
- Text-to-video and image-to-video
- Up to 12 reference files for multimodal input
- OpenAI-compatible API structure

**Ad creative use cases:**
- High-volume short video ad production at low cost
- Video ads with synchronized voiceover and sound effects in one pass
- Multi-reference generation (feed product images, brand assets, style references)
- Rapid iteration on video ad concepts

**Docs:** [Seedance](https://seed.bytedance.com/en/seedance2_0)

---

### Higgsfield

Full-stack video creation platform with cinematic camera controls.

**Best for:** Social video ads, cinematic style, mobile-first content
**Platform:** [higgsfield.ai](https://higgsfield.ai/)

**Capabilities:**
- 50+ professional camera movements (zooms, pans, FPV drone shots)
- Image-to-video animation
- Built-in editing, transitions, and keyframing
- All-in-one workflow: image gen, animation, editing

**Ad creative use cases:**
- Social media video ads with cinematic feel
- Animate product images into dynamic video
- Create multiple video variations with different camera styles
- Quick-turn video content for social campaigns

---

### Video Tool Comparison

| Tool | Max Length | Audio | Resolution | API | Best For |
|------|-----------|-------|------------|-----|----------|
| **Veo 3.1** | 60 sec | Native | 1080p/4K | Gemini | Vertical social video |
| **Kling 2.6** | 3 min | Native | 1080p | Third-party | Longer cinematic |
| **Runway Gen-4** | 10 sec | No | 1080p | Official | Controlled, consistent |
| **Sora 2** | 60 sec | Native | 1080p | Official | Dialogue-heavy |
| **Seedance 2.0** | 20 sec | Native | 2K | Official + third-party | Affordable high-volume |
| **Higgsfield** | Varies | Yes | 1080p | Web-based | Social, mobile-first |

---

## Code-Based Video: Remotion

For templated, data-driven video ads at scale, Remotion is the best option. Unlike AI video generators that produce unique video from prompts, Remotion uses React code to render deterministic, brand-perfect video from templates and data.

**Best for:** Templated ad variations, personalized video, brand-consistent production
**Stack:** React + TypeScript
**Pricing:** Free for individuals/small teams; commercial license required for 4+ employees
**Docs:** [remotion.dev](https://www.remotion.dev/)

### Why Remotion for Ads

| AI Video Generators | Remotion |
|---------------------|----------|
| Unique output each time | Deterministic, pixel-perfect |
| Prompt-based, less control | Full code control over every frame |
| Hard to match brand exactly | Exact brand colors, fonts, spacing |
| One-at-a-time generation | Batch render hundreds from data |
| No dynamic data insertion | Personalize with names, prices, stats |

### Ad Creative Use Cases

**1. Dynamic product ads**
Feed a JSON array of products and render a unique video ad for each:
```tsx
// Simplified Remotion component for product ads
export const ProductAd: React.FC<{
  productName: string;
  price: string;
  imageUrl: string;
  tagline: string;
}> = ({productName, price, imageUrl, tagline}) => {
  return (
    <AbsoluteFill style={{backgroundColor: '#fff'}}>
      <Img src={imageUrl} style={{width: 400, height: 400}} />
      <h1>{productName}</h1>
      <p>{tagline}</p>
      <div className="price">{price}</div>
      <div className="cta">Shop Now</div>
    </AbsoluteFill>
  );
};
```

**2. A/B test video variations**
Render the same template with different headlines, CTAs, or color schemes:
```tsx
const variations = [
  {headline: "Save 50% Today", cta: "Get the Deal", theme: "urgent"},
  {headline: "Join 10K+ Teams", cta: "Start Free", theme: "social-proof"},
  {headline: "Built for Speed", cta: "Try It Now", theme: "benefit"},
];
// Render all variations programmatically
```

**3. Personalized outreach videos**
Generate videos addressing prospects by name for cold outreach or sales.

**4. Social ad batch production**
Render the same content across different aspect ratios:
- 1:1 for feed
- 9:16 for Stories/Reels
- 16:9 for YouTube

### Remotion Workflow for Ad Creative

```
1. Design template in React (or use AI to generate the component)
2. Define data schema (products, headlines, CTAs, images)
3. Feed data array into template
4. Batch render all variations
5. Upload to ad platform
```

### Getting Started

```bash
# Create a new Remotion project
npx create-video@latest

# Render a single video
npx remotion render src/index.ts MyComposition out/video.mp4

# Batch render from data
npx remotion render src/index.ts MyComposition --props='{"data": [...]}'
```

---

## Choosing the Right Tool

### Decision Tree

```
Need video ads?
├── Templated, data-driven (same structure, different data)
│   └── Use Remotion
├── Unique creative from prompts (exploratory)
│   ├── Need dialogue/voiceover? → Sora 2, Veo 3.1, Kling 2.6, Seedance 2.0
│   ├── Need consistency across scenes? → Runway Gen-4
│   ├── Need vertical social video? → Veo 3.1 (native 9:16)
│   ├── Need high volume at low cost? → Seedance 2.0
│   └── Need cinematic camera work? → Higgsfield, Kling
└── Both → Use AI gen for hero creative, Remotion for variations

Need image ads?
├── Need text/headlines in image? → Ideogram
├── Need product consistency across variations? → Flux (multi-ref)
├── Need quick iterations on existing images? → Nano Banana Pro
├── Need highest visual quality? → Flux Pro, Midjourney
└── Need high volume at low cost? → Flux Klein, Nano Banana
```

### Cost Comparison for 100 Ad Variations

| Approach | Tool | Approximate Cost |
|----------|------|-----------------|
| 100 static images | Nano Banana Pro | ~$4-24 |
| 100 static images | Flux Dev | ~$1-2 |
| 100 static images | Ideogram API | ~$6 |
| 100 × 15-sec videos | Veo 3.1 Fast | ~$225 |
| 100 × 15-sec videos | Remotion (templated) | ~$0 (self-hosted render) |
| 10 hero videos + 90 templated | Veo + Remotion | ~$22 + render time |

### Recommended Workflow for Scaled Ad Production

1. **Generate hero creative** with AI (Nano Banana, Flux, Veo) — high-quality, exploratory
2. **Build templates** in Remotion based on winning creative patterns
3. **Batch produce variations** with Remotion using data (products, headlines, CTAs)
4. **Iterate** — use AI tools for new angles, Remotion for scale

This hybrid approach gives you the creative exploration of AI generators and the consistency and scale of code-based rendering.

---

## Platform-Specific Image Specs

When generating images for ads, request the correct dimensions:

| Platform | Placement | Aspect Ratio | Recommended Size |
|----------|-----------|-------------|-----------------|
| Meta Feed | Single image | 1:1 | 1080x1080 |
| Meta Stories/Reels | Vertical | 9:16 | 1080x1920 |
| Meta Carousel | Square | 1:1 | 1080x1080 |
| Google Display | Landscape | 1.91:1 | 1200x628 |
| Google Display | Square | 1:1 | 1200x1200 |
| LinkedIn Feed | Landscape | 1.91:1 | 1200x627 |
| LinkedIn Feed | Square | 1:1 | 1200x1200 |
| TikTok Feed | Vertical | 9:16 | 1080x1920 |
| Twitter/X Feed | Landscape | 16:9 | 1200x675 |
| Twitter/X Card | Landscape | 1.91:1 | 800x418 |

Include these dimensions in your generation prompts to avoid needing to crop or resize.
