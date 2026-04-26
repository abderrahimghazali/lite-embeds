export const styles = `
:host {
  display: block;
  contain: content;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --lite-spotify-bg: #f5f5f5;
  --lite-spotify-fg: #121212;
  --lite-spotify-muted: #6a6a6a;
  --lite-spotify-accent: #1db954;
  max-width: 100%;
}
:host([theme="dark"]) {
  --lite-spotify-bg: #181818;
  --lite-spotify-fg: #ffffff;
  --lite-spotify-muted: #b3b3b3;
}
:host(:focus-visible) {
  outline: 2px solid var(--lite-spotify-accent);
  outline-offset: 2px;
  border-radius: 12px;
}
.facade {
  background: var(--lite-spotify-bg);
  color: var(--lite-spotify-fg);
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: background 0.15s;
  box-sizing: border-box;
}
.facade:hover {
  background: color-mix(in srgb, var(--lite-spotify-bg), var(--lite-spotify-fg) 6%);
}
.play {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--lite-spotify-accent);
  display: flex;
  align-items: center;
  justify-content: center;
}
.play svg {
  width: 20px;
  height: 20px;
  fill: #fff;
  margin-left: 2px;
}
.meta {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}
.title {
  font-weight: 700;
  font-size: 0.95em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.artist {
  font-size: 0.85em;
  color: var(--lite-spotify-muted);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cta {
  font-size: 0.8em;
  color: var(--lite-spotify-muted);
  margin-top: 6px;
}
.logo {
  width: 22px;
  height: 22px;
  fill: var(--lite-spotify-accent);
  flex-shrink: 0;
  margin-left: auto;
}
`;
