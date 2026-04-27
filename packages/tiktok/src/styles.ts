export const styles = `
:host {
  display: block;
  contain: content;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --lite-tiktok-bg: #000;
  --lite-tiktok-fg: #fff;
  --lite-tiktok-muted: #b3b3b3;
  --lite-tiktok-pink: #ff0050;
  --lite-tiktok-cyan: #00f2ea;
  max-width: 325px;
  position: relative;
}
:host(:focus-visible) {
  outline: 2px solid var(--lite-tiktok-cyan);
  outline-offset: 2px;
  border-radius: 8px;
}
:host([loading])::after {
  content: "";
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  width: 28px;
  height: 28px;
  margin: -14px 0 0 -14px;
  border: 3px solid rgba(255, 255, 255, 0.28);
  border-top-color: var(--lite-tiktok-cyan);
  border-radius: 50%;
  animation: lite-tiktok-spin 0.8s linear infinite;
  pointer-events: none;
}
@keyframes lite-tiktok-spin {
  to {
    transform: rotate(360deg);
  }
}
.facade {
  background: var(--lite-tiktok-bg);
  color: var(--lite-tiktok-fg);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
  transition: transform 0.15s;
}
.facade:hover {
  transform: translateY(-2px);
}
.facade::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(0, 242, 234, 0.2), transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 0, 80, 0.25), transparent 55%);
  pointer-events: none;
}
.header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.handle {
  font-weight: 700;
  font-size: 0.95em;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}
.logo {
  width: 26px;
  height: 26px;
  fill: var(--lite-tiktok-fg);
}
.body {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.play {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
}
.play svg {
  width: 26px;
  height: 26px;
  fill: #fff;
  margin-left: 3px;
}
.cta {
  position: relative;
  z-index: 1;
  font-size: 0.8em;
  color: var(--lite-tiktok-muted);
  text-align: center;
}
`;
