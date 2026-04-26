import { beforeEach, describe, expect, it } from 'vitest';
import '../src/index';

describe('<lite-vimeo>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function getShadowHtml(selector: string): string {
    const el = document.querySelector(selector);
    if (!el || !el.shadowRoot) throw new Error(`Missing shadow root for ${selector}`);
    return el.shadowRoot.innerHTML;
  }

  it('registers as <lite-vimeo>', () => {
    expect(customElements.get('lite-vimeo')).toBeDefined();
  });

  it('renders a facade containing title and CTA', () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="76979871" title="The Mountain"></lite-vimeo>
    `;
    const html = getShadowHtml('lite-vimeo');
    expect(html).toContain('The Mountain');
    expect(html).toContain('Play on Vimeo');
  });

  it('escapes HTML in title and ignores remote thumbnails', () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="123" title="<script>x</script>" thumbnail="javascript:alert(1)"></lite-vimeo>
    `;
    const html = getShadowHtml('lite-vimeo');
    expect(html).not.toContain('<script>x</script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('background-image');
  });

  it('allows inline thumbnails without a network request', () => {
    document.body.innerHTML = `
      <lite-vimeo
        video-id="123"
        title="Demo"
        thumbnail="data:image/png;base64,iVBORw0KGgo="
      ></lite-vimeo>
    `;
    const html = getShadowHtml('lite-vimeo');
    expect(html).toContain('background-image');
    expect(html).toContain('data:image/png;base64,iVBORw0KGgo=');
  });

  it('sets ARIA / keyboard activation attributes on the host', () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="123" title="Demo"></lite-vimeo>
    `;
    const el = document.querySelector('lite-vimeo') as HTMLElement;
    expect(el.getAttribute('role')).toBe('button');
    expect(el.getAttribute('tabindex')).toBe('0');
    expect(el.getAttribute('aria-label')).toContain('Demo');
  });

  it('does not load a Vimeo iframe before user activation', () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="123" title="Demo"></lite-vimeo>
    `;
    const el = document.querySelector('lite-vimeo');
    expect(el?.shadowRoot?.querySelector('iframe')).toBeNull();
  });

  it('hydrates with a Vimeo iframe on click', async () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="76979871" title="Demo"></lite-vimeo>
    `;
    const el = document.querySelector('lite-vimeo') as HTMLElement;
    el.click();
    await Promise.resolve();
    const iframe = el.shadowRoot?.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toContain('player.vimeo.com/video/76979871');
    expect(iframe?.src).toContain('autoplay=1');
  });

  it('sets Vimeo start time as a URL fragment', async () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="76979871" title="Demo" start="30"></lite-vimeo>
    `;
    const el = document.querySelector('lite-vimeo') as HTMLElement;
    el.click();
    await Promise.resolve();
    const iframe = el.shadowRoot?.querySelector('iframe');
    expect(iframe?.src).toContain('#t=30s');
    expect(iframe?.src).not.toContain('%23t=30s');
  });

  it('rejects non-numeric video-id', async () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="../evil" title="A"></lite-vimeo>
    `;
    const el = document.querySelector('lite-vimeo') as HTMLElement;
    el.click();
    await Promise.resolve();
    expect(el.shadowRoot?.querySelector('iframe')).toBeNull();
  });
});
