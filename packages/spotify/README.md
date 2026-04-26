# @lite-embeds/spotify

[![npm](https://img.shields.io/npm/v/@lite-embeds/spotify?style=flat-square)](https://www.npmjs.com/package/@lite-embeds/spotify)
![bundle](https://img.shields.io/badge/gzip-2.0%20KB-success?style=flat-square)
[![license](https://img.shields.io/npm/l/@lite-embeds/spotify?style=flat-square&color=blue)](../../LICENSE)

Privacy-first facade web component for Spotify embeds. Renders a static placeholder; only loads the real `open.spotify.com/embed/...` iframe when the user clicks.

## Install

```bash
npm install @lite-embeds/spotify
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/@lite-embeds/spotify"></script>
```

## Usage

```html
<lite-spotify
  spotify-id="4cOdK2wGLETKBW3PvgPWqT"
  type="track"
  title="One More Time"
  artist="Daft Punk"
></lite-spotify>
```

## Attributes

| Attribute | Required | Description |
|---|---|---|
| `spotify-id` | yes | The Spotify ID — the trailing alphanumeric segment in a Spotify URL. |
| `type` | optional | `track` (default), `album`, `playlist`, `episode`, or `show`. |
| `title` | recommended | Title shown in the facade. Plain text — HTML is escaped. |
| `artist` | recommended | Artist / show name shown in the facade. |
| `theme` | optional | `light` (default) or `dark`. |

## How it works

On insertion, the component renders a static facade in Shadow DOM using only the attributes you provide — no network calls. When the user clicks (or activates via Enter / Space), an `<iframe>` pointing at `open.spotify.com/embed/{type}/{id}` replaces the facade. `spotify-id` is validated against `/^[A-Za-z0-9]+$/` and `type` is validated against the closed enum, so URL injection is impossible.

## License

MIT
