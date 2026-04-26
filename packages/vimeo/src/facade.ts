export interface FacadeData {
  title: string;
  thumbnail: string;
}

const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const PLAY_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
const INLINE_IMAGE_URL = /^data:image\/(?:avif|gif|jpe?g|png|webp);base64,[A-Za-z0-9+/=]+$/i;

function isNetworkFreeThumbnail(thumbnail: string): boolean {
  return INLINE_IMAGE_URL.test(thumbnail) || thumbnail.startsWith('blob:');
}

export function renderFacade(data: FacadeData): string {
  const title = escapeHtml(data.title);
  const bgStyle =
    data.thumbnail && isNetworkFreeThumbnail(data.thumbnail)
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
