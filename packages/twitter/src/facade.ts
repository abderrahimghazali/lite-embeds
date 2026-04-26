export interface FacadeData {
  handle: string;
  text: string;
}

const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const X_LOGO = `<svg viewBox="0 0 24 24" class="logo" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;

export function renderFacade(data: FacadeData): string {
  const handle = escapeHtml(data.handle);
  const text = escapeHtml(data.text);
  return `
    <div class="facade" part="facade">
      <div class="header">
        <span class="handle">${handle}</span>
        ${X_LOGO}
      </div>
      <p class="text">${text}</p>
      <div class="cta">View on X →</div>
    </div>
  `;
}
