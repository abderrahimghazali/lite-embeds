# @lite-embeds/twitter

[![npm](https://img.shields.io/npm/v/@lite-embeds/twitter?style=flat-square)](https://www.npmjs.com/package/@lite-embeds/twitter)
[![bundle](https://img.shields.io/bundlephobia/minzip/@lite-embeds/twitter?style=flat-square&label=gzip)](https://bundlephobia.com/package/@lite-embeds/twitter)
[![license](https://img.shields.io/npm/l/@lite-embeds/twitter?style=flat-square&color=blue)](../../LICENSE)

Privacy-first facade web component for Twitter/X embeds. Renders a static placeholder; only loads `widgets.js` when the user clicks.

## Install

```bash
npm install @lite-embeds/twitter
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/@lite-embeds/twitter"></script>
```

## Usage

```html
<lite-twitter
  tweet-id="20"
  handle="@jack"
  text="just setting up my twttr"
></lite-twitter>
```

`<lite-x>` is registered as an alias of `<lite-twitter>`.

## Attributes

| Attribute | Required | Description |
|---|---|---|
| `tweet-id` | yes | Numeric tweet ID (the trailing number in a tweet URL). |
| `handle` | recommended | Author handle to show in the facade, e.g. `@jack`. |
| `text` | recommended | Tweet text snippet shown in the facade. Plain text — HTML is escaped. |
| `theme` | optional | `light` (default) or `dark`. |

## How it works

On insertion, the component renders a static facade in Shadow DOM using only the attributes you provide — no network calls. When the user clicks (or activates via Enter / Space), `https://platform.twitter.com/widgets.js` loads once (deduplicated across all instances on the page) and the real tweet replaces the facade via `twttr.widgets.createTweet`.

## License

MIT
