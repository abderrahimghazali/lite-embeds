export const styles = `
:host {
  display: block;
  contain: content;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --lite-vimeo-bg: #1a1d20;
  --lite-vimeo-fg: #ffffff;
  --lite-vimeo-accent: #00adef;
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--lite-vimeo-bg);
  border-radius: 8px;
  overflow: hidden;
}
:host(:focus-visible) {
  outline: 2px solid var(--lite-vimeo-accent);
  outline-offset: 2px;
}
.facade {
  position: absolute;
  inset: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
}
.facade::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%);
  pointer-events: none;
}
.play {
  position: relative;
  z-index: 1;
  width: 72px;
  height: 48px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, transform 0.15s;
}
.facade:hover .play {
  background: var(--lite-vimeo-accent);
  transform: scale(1.05);
}
.play svg {
  width: 24px;
  height: 24px;
  fill: #fff;
  margin-left: 3px;
}
.title {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 12px;
  z-index: 1;
  color: var(--lite-vimeo-fg);
  font-size: 0.95em;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cta {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  color: var(--lite-vimeo-fg);
  font-size: 0.75em;
  background: rgba(0, 0, 0, 0.55);
  padding: 4px 8px;
  border-radius: 4px;
}
`;
