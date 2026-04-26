# @lite-embed/core

Shared base class and helpers for [`lite-embed`](https://github.com/abderrahimghazali/lite-embed) components. You typically don't install this directly — install a platform package such as `@lite-embed/twitter` and the right pieces come along.

## Exports

- `LiteEmbed` — abstract `HTMLElement` subclass. Subclasses implement `renderFacade()` and `hydrate()`. Handles click / keyboard activation and Shadow DOM setup.
- `loadScript(src)` — dedup'd script injector. Multiple components on the same page that share an embed script only trigger one network request.
- `whenVisible(element, callback)` — IntersectionObserver helper for opt-in lazy work.

## License

MIT
