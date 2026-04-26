# @lite-embeds/core

[![npm](https://img.shields.io/npm/v/@lite-embeds/core?style=flat-square)](https://www.npmjs.com/package/@lite-embeds/core)
![bundle](https://img.shields.io/badge/gzip-0.6%20KB-success?style=flat-square)
[![license](https://img.shields.io/npm/l/@lite-embeds/core?style=flat-square&color=blue)](../../LICENSE)

Shared base class and helpers for [`lite-embeds`](https://github.com/abderrahimghazali/lite-embeds) components. You typically don't install this directly — install a platform package such as `@lite-embeds/twitter` and the right pieces come along.

## Exports

- `LiteEmbed` — abstract `HTMLElement` subclass. Subclasses implement `renderFacade()` and `hydrate()`. Handles click / keyboard activation and Shadow DOM setup.
- `loadScript(src)` — dedup'd script injector. Multiple components on the same page that share an embed script only trigger one network request.
- `whenVisible(element, callback)` — IntersectionObserver helper for opt-in lazy work.

## License

MIT
