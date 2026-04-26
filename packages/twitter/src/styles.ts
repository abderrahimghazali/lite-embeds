export const styles = `
:host {
  display: block;
  contain: content;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --lite-twitter-bg: #fff;
  --lite-twitter-fg: #0f1419;
  --lite-twitter-muted: #536471;
  --lite-twitter-border: #cfd9de;
  --lite-twitter-accent: #1d9bf0;
}
:host([theme="dark"]) {
  --lite-twitter-bg: #15202b;
  --lite-twitter-fg: #f7f9f9;
  --lite-twitter-muted: #8b98a5;
  --lite-twitter-border: #38444d;
}
:host(:focus-visible) {
  outline: 2px solid var(--lite-twitter-accent);
  outline-offset: 2px;
  border-radius: 12px;
}
.facade {
  background: var(--lite-twitter-bg);
  color: var(--lite-twitter-fg);
  border: 1px solid var(--lite-twitter-border);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: background 0.15s;
  max-width: 550px;
  box-sizing: border-box;
}
.facade:hover {
  background: color-mix(in srgb, var(--lite-twitter-bg), var(--lite-twitter-fg) 4%);
}
.header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.handle {
  font-weight: 700;
  font-size: 0.95em;
}
.text {
  white-space: pre-wrap;
  line-height: 1.4;
  margin: 0;
  font-size: 0.95em;
}
.cta {
  margin-top: 12px;
  color: var(--lite-twitter-accent);
  font-size: 0.85em;
}
.logo {
  width: 18px;
  height: 18px;
  fill: var(--lite-twitter-fg);
  margin-left: auto;
  flex-shrink: 0;
}
`;
