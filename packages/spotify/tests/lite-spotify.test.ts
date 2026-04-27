import { beforeEach, describe, expect, it } from 'vitest';
import '../src/index';

describe('<lite-spotify>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function getShadowHtml(selector: string): string {
    const el = document.querySelector(selector);
    if (!el || !el.shadowRoot) throw new Error(`Missing shadow root for ${selector}`);
    return el.shadowRoot.innerHTML;
  }

  it('registers as <lite-spotify>', () => {
    expect(customElements.get('lite-spotify')).toBeDefined();
  });

  it('renders a facade containing title and artist', () => {
    document.body.innerHTML = `
      <lite-spotify spotify-id="abc123" title="Song Title" artist="Some Artist"></lite-spotify>
    `;
    const html = getShadowHtml('lite-spotify');
    expect(html).toContain('Song Title');
    expect(html).toContain('Some Artist');
    expect(html).toContain('Listen on Spotify');
  });

  it('escapes HTML in title and artist', () => {
    document.body.innerHTML = `
      <lite-spotify spotify-id="abc123" title="<img src=x onerror=alert(1)>" artist="<b>x</b>"></lite-spotify>
    `;
    const html = getShadowHtml('lite-spotify');
    expect(html).not.toContain('<img src=x');
    expect(html).not.toContain('<b>x</b>');
    expect(html).toContain('&lt;img');
  });

  it('sets ARIA / keyboard activation attributes on the host', () => {
    document.body.innerHTML = `
      <lite-spotify spotify-id="abc123" title="A" artist="B"></lite-spotify>
    `;
    const el = document.querySelector('lite-spotify') as HTMLElement;
    expect(el.getAttribute('role')).toBe('button');
    expect(el.getAttribute('tabindex')).toBe('0');
    expect(el.getAttribute('aria-label')).toContain('A');
  });

  it('re-renders facade and ARIA while attributes change before hydration', () => {
    document.body.innerHTML = `
      <lite-spotify spotify-id="abc123" title="Old title" artist="Old artist"></lite-spotify>
    `;
    const el = document.querySelector('lite-spotify') as HTMLElement;
    el.setAttribute('title', 'New title');
    el.setAttribute('artist', 'New artist');
    const html = getShadowHtml('lite-spotify');
    expect(html).toContain('New title');
    expect(html).toContain('New artist');
    expect(html).not.toContain('Old title');
    expect(el.getAttribute('aria-label')).toContain('New title');
  });

  it('does not load any third-party iframe before user activation', () => {
    document.body.innerHTML = `
      <lite-spotify spotify-id="abc123" title="A"></lite-spotify>
    `;
    const el = document.querySelector('lite-spotify');
    const iframe = el?.shadowRoot?.querySelector('iframe');
    expect(iframe).toBeNull();
  });

  it('hydrates with a Spotify iframe on click', async () => {
    document.body.innerHTML = `
      <lite-spotify spotify-id="4cOdK2wGLETKBW3PvgPWqT" type="track" title="A"></lite-spotify>
    `;
    const el = document.querySelector('lite-spotify') as HTMLElement;
    el.click();
    expect(el.hasAttribute('loading')).toBe(true);
    await Promise.resolve();
    const iframe = el.shadowRoot?.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toContain('open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT');
    iframe?.dispatchEvent(new Event('load'));
    await Promise.resolve();
    expect(el.hasAttribute('loading')).toBe(false);
  });

  it('rejects invalid spotify-id values', async () => {
    document.body.innerHTML = `
      <lite-spotify spotify-id="../evil/path" title="A"></lite-spotify>
    `;
    const el = document.querySelector('lite-spotify') as HTMLElement;
    el.click();
    await Promise.resolve();
    const iframe = el.shadowRoot?.querySelector('iframe');
    expect(iframe).toBeNull();
  });

  it('allows retry after a failed validation', async () => {
    document.body.innerHTML = `
      <lite-spotify spotify-id="../evil/path" title="A"></lite-spotify>
    `;
    const el = document.querySelector('lite-spotify') as HTMLElement;
    el.click();
    await Promise.resolve();
    expect(el.shadowRoot?.querySelector('iframe')).toBeNull();

    el.setAttribute('spotify-id', '4cOdK2wGLETKBW3PvgPWqT');
    el.click();
    await Promise.resolve();

    const iframe = el.shadowRoot?.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toContain('open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT');
    iframe?.dispatchEvent(new Event('load'));
    await Promise.resolve();
  });

  it('rejects unknown type values', async () => {
    document.body.innerHTML = `
      <lite-spotify spotify-id="abc123" type="evil" title="A"></lite-spotify>
    `;
    const el = document.querySelector('lite-spotify') as HTMLElement;
    el.click();
    await Promise.resolve();
    const iframe = el.shadowRoot?.querySelector('iframe');
    expect(iframe).toBeNull();
  });
});
