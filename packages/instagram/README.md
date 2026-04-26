# @lite-embed/instagram

Privacy-first facade web component for Instagram embeds. Renders a static placeholder; only loads `instagram.com/embed.js` when the user clicks.

## Install

```bash
npm install @lite-embed/instagram
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/@lite-embed/instagram"></script>
```

## Usage

```html
<lite-instagram
  shortcode="CxYzAbC123"
  username="@nasa"
  caption="A new image of the Pillars of Creation"
></lite-instagram>
```

## Attributes

| Attribute | Required | Description |
|---|---|---|
| `shortcode` | yes | The Instagram shortcode — the segment after `/p/`, `/reel/`, or `/tv/` in an Instagram URL. |
| `kind` | optional | `p` (default — post), `reel`, or `tv`. Determines the URL path passed to Instagram. |
| `username` | recommended | Author handle shown in the facade, e.g. `@nasa`. |
| `caption` | optional | Caption snippet shown in the facade. Plain text — HTML is escaped. |

## How it works

On insertion, the component renders a static facade in Shadow DOM using only the attributes you provide — no network calls. When the user clicks (or activates via Enter / Space), an `instagram-media` blockquote is inserted in light DOM (so Instagram's embed script can find it), `https://www.instagram.com/embed.js` loads once (deduplicated across instances), and `window.instgrm.Embeds.process()` upgrades the blockquote into the real iframe.

`shortcode` is validated against `/^[A-Za-z0-9_-]+$/` and `kind` is validated against the closed enum, so URL injection is impossible.

## License

MIT
