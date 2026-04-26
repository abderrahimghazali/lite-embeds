export const styles = `
:host {
  display: block;
  contain: content;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --lite-instagram-bg: #fff;
  --lite-instagram-fg: #262626;
  --lite-instagram-muted: #8e8e8e;
  --lite-instagram-border: #dbdbdb;
  --lite-instagram-gradient: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  max-width: 540px;
}
:host(:focus-visible) {
  outline: 2px solid #cc2366;
  outline-offset: 2px;
  border-radius: 8px;
}
.facade {
  background: var(--lite-instagram-bg);
  color: var(--lite-instagram-fg);
  border: 1px solid var(--lite-instagram-border);
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
  transition: transform 0.15s;
}
.facade:hover {
  transform: translateY(-1px);
}
.header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--lite-instagram-border);
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--lite-instagram-gradient);
  flex-shrink: 0;
  padding: 2px;
  box-sizing: border-box;
}
.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--lite-instagram-bg);
}
.username {
  font-weight: 600;
  font-size: 0.9em;
}
.logo {
  width: 22px;
  height: 22px;
  fill: var(--lite-instagram-fg);
  margin-left: auto;
}
.body {
  aspect-ratio: 1 / 1;
  background: var(--lite-instagram-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
}
.body svg {
  width: 56px;
  height: 56px;
  fill: rgba(255, 255, 255, 0.9);
}
.caption {
  padding: 12px 16px;
  font-size: 0.9em;
  white-space: pre-wrap;
  line-height: 1.4;
}
.cta {
  padding: 0 16px 14px;
  color: var(--lite-instagram-muted);
  font-size: 0.8em;
}
`;
