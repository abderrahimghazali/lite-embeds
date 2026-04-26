# lite-embed

Lightweight, privacy-first facade web components for social embeds.

## Why

Embedding social content (Twitter/X, Instagram, TikTok, Spotify, Vimeo, etc.) currently requires loading 200KB–2MB of third-party JavaScript per embed. These scripts set cross-site cookies and tracking pixels before the user interacts.

`lite-embed` follows the [`lite-youtube-embed`](https://github.com/paulirish/lite-youtube-embed) facade pattern: render a static placeholder synchronously, only inflate the real iframe on user click. Each component stays under ~3KB gzipped.

## Packages

| Package | Status |
|---|---|
| `@lite-embed/core` | in development |
| `@lite-embed/twitter` | in development |
| `@lite-embed/spotify` | in development |
| `@lite-embed/vimeo` | in development |
| `@lite-embed/instagram` | in development |
| `@lite-embed/tiktok` | in development |
| `@lite-embed/soundcloud` | planned |
| `@lite-embed/reddit` | planned |
| `@lite-embed/codepen` | planned |

## Quick start

```html
<script type="module" src="https://unpkg.com/@lite-embed/twitter"></script>

<lite-twitter
  tweet-id="20"
  handle="@jack"
  text="just setting up my twttr"
></lite-twitter>
```

The component renders a static facade. When the user clicks, the official Twitter widget script loads and the real tweet replaces the facade.

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
