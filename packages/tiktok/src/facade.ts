export interface FacadeData {
  username: string;
}

const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const TIKTOK_LOGO = `<svg viewBox="0 0 24 24" class="logo" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.13a8.16 8.16 0 005 .19V4.86a4.85 4.85 0 01-2.07-1.83 4.83 4.83 0 01-2.07 4.27z"/></svg>`;
const PLAY_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;

export function renderFacade(data: FacadeData): string {
  const username = escapeHtml(data.username);
  return `
    <div class="facade" part="facade">
      <div class="header">
        <span class="handle">@${username || 'tiktok'}</span>
        ${TIKTOK_LOGO}
      </div>
      <div class="body">
        <div class="play" aria-hidden="true">${PLAY_ICON}</div>
      </div>
      <div class="cta">Watch on TikTok</div>
    </div>
  `;
}
