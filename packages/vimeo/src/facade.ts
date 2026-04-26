export interface FacadeData {
  title: string;
  thumbnail: string;
}

const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const PLAY_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;

export function renderFacade(data: FacadeData): string {
  const title = escapeHtml(data.title);
  const bgStyle = data.thumbnail
    ? ` style="background-image:url(&quot;${escapeHtml(data.thumbnail)}&quot;)"`
    : '';
  return `
    <div class="facade" part="facade"${bgStyle}>
      <div class="cta">Play on Vimeo</div>
      <div class="play" aria-hidden="true">${PLAY_ICON}</div>
      ${title ? `<div class="title">${title}</div>` : ''}
    </div>
  `;
}
