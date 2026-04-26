# @lite-embeds/tiktok

[![npm](https://img.shields.io/npm/v/@lite-embeds/tiktok?style=flat-square)](https://www.npmjs.com/package/@lite-embeds/tiktok)
[![bundle](https://img.shields.io/bundlephobia/minzip/@lite-embeds/tiktok?style=flat-square&label=gzip)](https://bundlephobia.com/package/@lite-embeds/tiktok)
[![license](https://img.shields.io/npm/l/@lite-embeds/tiktok?style=flat-square&color=blue)](../../LICENSE)

Privacy-first facade web component for TikTok embeds. Renders a static placeholder; only loads `tiktok.com/embed.js` when the user clicks.

## Install

```bash
npm install @lite-embeds/tiktok
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/@lite-embeds/tiktok"></script>
```

## Usage

```html
<lite-tiktok
  video-id="7000000000000000000"
  username="charlidamelio"
></lite-tiktok>
```

## Attributes

| Attribute | Required | Description |
|---|---|---|
| `video-id` | yes | Numeric TikTok video ID (the trailing number in a TikTok URL). |
| `username` | yes | The author's TikTok handle without the leading `@`. |

## How it works

On insertion, the component renders a 9:16 facade in Shadow DOM using only the attributes you provide — no network calls. When the user clicks (or activates via Enter / Space), a `tiktok-embed` blockquote is inserted in light DOM, then `https://www.tiktok.com/embed.js` is injected. TikTok's embed script auto-scans the document on each execution and replaces the blockquote with the real iframe.

`video-id` is validated against `/^\d+$/` and `username` is validated against `/^[A-Za-z0-9_.]+$/`, so URL injection is impossible.

> Note: Unlike Twitter and Instagram, TikTok's embed script does not expose a public re-process API. To support multiple `<lite-tiktok>` instances on the same page, the script tag is re-injected on each hydrate. The browser HTTP cache keeps subsequent loads cheap.

## License

MIT
