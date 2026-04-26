# @lite-embeds/vimeo

[![npm](https://img.shields.io/npm/v/@lite-embeds/vimeo?style=flat-square)](https://www.npmjs.com/package/@lite-embeds/vimeo)
[![bundle](https://img.shields.io/bundlephobia/minzip/@lite-embeds/vimeo?style=flat-square&label=gzip)](https://bundlephobia.com/package/@lite-embeds/vimeo)
[![license](https://img.shields.io/npm/l/@lite-embeds/vimeo?style=flat-square&color=blue)](../../LICENSE)

Privacy-first facade web component for Vimeo embeds. Renders a static placeholder; only loads the real `player.vimeo.com` iframe when the user clicks.

## Install

```bash
npm install @lite-embeds/vimeo
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/@lite-embeds/vimeo"></script>
```

## Usage

```html
<lite-vimeo
  video-id="76979871"
  title="The Mountain"
  thumbnail="https://i.vimeocdn.com/video/452001751-e2f8c1f2.jpg"
></lite-vimeo>
```

## Attributes

| Attribute | Required | Description |
|---|---|---|
| `video-id` | yes | Numeric Vimeo video ID (the trailing number in a Vimeo URL). |
| `title` | recommended | Video title shown in the facade. Plain text — HTML is escaped. |
| `thumbnail` | optional | URL to a poster image shown behind the play button. |
| `start` | optional | Numeric seconds to start playback at. |

## How it works

On insertion, the component renders a 16:9 facade in Shadow DOM with a play button overlay — no network calls. When the user clicks (or activates via Enter / Space), an `<iframe>` pointing at `player.vimeo.com/video/{id}` replaces the facade with `autoplay=1`. Both `video-id` and `start` are validated against `/^\d+$/`, so URL injection is impossible.

## License

MIT
