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

  it('escapes HTML in title and thumbnail', () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="123" title="<script>x</script>" thumbnail="javascript:alert(1)"></lite-vimeo>
    `;
    const html = getShadowHtml('lite-vimeo');
    expect(html).not.toContain('<script>x</script>');
    expect(html).toContain('&lt;script&gt;');
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

  it('hydrates with a Vimeo iframe on click', () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="76979871" title="Demo"></lite-vimeo>
    `;
    const el = document.querySelector('lite-vimeo') as HTMLElement;
    el.click();
    const iframe = el.shadowRoot?.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toContain('player.vimeo.com/video/76979871');
    expect(iframe?.src).toContain('autoplay=1');
  });

  it('rejects non-numeric video-id', () => {
    document.body.innerHTML = `
      <lite-vimeo video-id="../evil" title="A"></lite-vimeo>
    `;
    const el = document.querySelector('lite-vimeo') as HTMLElement;
    el.click();
    expect(el.shadowRoot?.querySelector('iframe')).toBeNull();
  });
});
