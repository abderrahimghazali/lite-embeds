# lite-embeds

[![demo](https://img.shields.io/badge/demo-live-000?style=flat-square)](https://lite-embeds-demo.vercel.app/)
[![license](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![typescript](https://img.shields.io/badge/typescript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](#)
[![dependencies](https://img.shields.io/badge/runtime%20deps-0-success?style=flat-square)](#)

Lightweight, privacy-first facade web components for social embeds.

## Why

Embedding social content (Twitter/X, Instagram, TikTok, Spotify, Vimeo, etc.) currently requires loading 200KB–2MB of third-party JavaScript per embed. These scripts set cross-site cookies and tracking pixels before the user interacts.

`lite-embeds` follows the [`lite-youtube-embed`](https://github.com/paulirish/lite-youtube-embed) facade pattern: render a static placeholder synchronously, only inflate the real iframe on user click. Each component stays under ~3KB gzipped.

## Packages

| Package | Version | Bundle (gzip) |
|---|---|---|
| [`@lite-embeds/core`](packages/core) | [![npm](https://img.shields.io/npm/v/@lite-embeds/core?style=flat-square&label=)](https://www.npmjs.com/package/@lite-embeds/core) | [![size](https://img.shields.io/bundlephobia/minzip/@lite-embeds/core?style=flat-square&label=)](https://bundlephobia.com/package/@lite-embeds/core) |
| [`@lite-embeds/twitter`](packages/twitter) | [![npm](https://img.shields.io/npm/v/@lite-embeds/twitter?style=flat-square&label=)](https://www.npmjs.com/package/@lite-embeds/twitter) | [![size](https://img.shields.io/bundlephobia/minzip/@lite-embeds/twitter?style=flat-square&label=)](https://bundlephobia.com/package/@lite-embeds/twitter) |
| [`@lite-embeds/spotify`](packages/spotify) | [![npm](https://img.shields.io/npm/v/@lite-embeds/spotify?style=flat-square&label=)](https://www.npmjs.com/package/@lite-embeds/spotify) | [![size](https://img.shields.io/bundlephobia/minzip/@lite-embeds/spotify?style=flat-square&label=)](https://bundlephobia.com/package/@lite-embeds/spotify) |
| [`@lite-embeds/vimeo`](packages/vimeo) | [![npm](https://img.shields.io/npm/v/@lite-embeds/vimeo?style=flat-square&label=)](https://www.npmjs.com/package/@lite-embeds/vimeo) | [![size](https://img.shields.io/bundlephobia/minzip/@lite-embeds/vimeo?style=flat-square&label=)](https://bundlephobia.com/package/@lite-embeds/vimeo) |
| [`@lite-embeds/instagram`](packages/instagram) | [![npm](https://img.shields.io/npm/v/@lite-embeds/instagram?style=flat-square&label=)](https://www.npmjs.com/package/@lite-embeds/instagram) | [![size](https://img.shields.io/bundlephobia/minzip/@lite-embeds/instagram?style=flat-square&label=)](https://bundlephobia.com/package/@lite-embeds/instagram) |
| [`@lite-embeds/tiktok`](packages/tiktok) | [![npm](https://img.shields.io/npm/v/@lite-embeds/tiktok?style=flat-square&label=)](https://www.npmjs.com/package/@lite-embeds/tiktok) | [![size](https://img.shields.io/bundlephobia/minzip/@lite-embeds/tiktok?style=flat-square&label=)](https://bundlephobia.com/package/@lite-embeds/tiktok) |
| `@lite-embeds/soundcloud` | _planned_ | — |
| `@lite-embeds/reddit` | _planned_ | — |
| `@lite-embeds/codepen` | _planned_ | — |

## Quick start

```html
<script type="module" src="https://unpkg.com/@lite-embeds/twitter"></script>

<lite-twitter
  tweet-id="20"
  handle="@jack"
  text="just setting up my twttr"
></lite-twitter>
```

The component renders a static facade. When the user clicks, the official Twitter widget script loads and the real tweet replaces the facade.

See the [live demo](https://lite-embeds-demo.vercel.app/) for all five components in action.

## Development

```bash
corepack enable
pnpm install
pnpm build
pnpm test
```

Open `examples/vanilla/index.html` to try the demo locally.

## License

MIT
