export interface FacadeData {
  username: string;
  caption: string;
}

const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const INSTAGRAM_LOGO = `<svg viewBox="0 0 24 24" class="logo" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`;
const CAMERA_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12.75a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zM12 8.25a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM18.75 21H5.25a3.255 3.255 0 01-3.25-3.25v-9.5A3.255 3.255 0 015.25 5h2.06l1.43-2.142A1 1 0 019.572 2.4h4.857a1 1 0 01.832.458L16.69 5h2.06A3.255 3.255 0 0122 8.25v9.5A3.255 3.255 0 0118.75 21z"/></svg>`;

export function renderFacade(data: FacadeData): string {
  const username = escapeHtml(data.username);
  const caption = escapeHtml(data.caption);
  return `
    <div class="facade" part="facade">
      <div class="header">
        <div class="avatar"><div class="avatar-inner"></div></div>
        <span class="username">${username || 'instagram'}</span>
        ${INSTAGRAM_LOGO}
      </div>
      <div class="body">${CAMERA_ICON}</div>
      ${caption ? `<div class="caption">${caption}</div>` : ''}
      <div class="cta">View on Instagram</div>
    </div>
  `;
}
