import { beforeEach, describe, expect, it } from 'vitest';
import '../src/index';

describe('<lite-tiktok>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    for (const s of Array.from(document.head.querySelectorAll('script'))) {
      if (s.src.includes('tiktok.com')) s.remove();
    }
  });

  function getShadowHtml(selector: string): string {
    const el = document.querySelector(selector);
    if (!el || !el.shadowRoot) throw new Error(`Missing shadow root for ${selector}`);
    return el.shadowRoot.innerHTML;
  }

  it('registers as <lite-tiktok>', () => {
    expect(customElements.get('lite-tiktok')).toBeDefined();
  });

  it('renders a facade containing username and CTA', () => {
    document.body.innerHTML = `
      <lite-tiktok video-id="7000000000000000000" username="charlidamelio"></lite-tiktok>
    `;
    const html = getShadowHtml('lite-tiktok');
    expect(html).toContain('@charlidamelio');
    expect(html).toContain('Watch on TikTok');
  });

  it('escapes HTML in username', () => {
    document.body.innerHTML = `
      <lite-tiktok video-id="123" username="<script>x</script>"></lite-tiktok>
    `;
    const html = getShadowHtml('lite-tiktok');
    expect(html).not.toContain('<script>x</script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('sets ARIA / keyboard activation attributes on the host', () => {
    document.body.innerHTML = `
      <lite-tiktok video-id="123" username="charli"></lite-tiktok>
    `;
    const el = document.querySelector('lite-tiktok') as HTMLElement;
    expect(el.getAttribute('role')).toBe('button');
    expect(el.getAttribute('tabindex')).toBe('0');
    expect(el.getAttribute('aria-label')).toContain('charli');
  });

  it('does not load any third-party script before user activation', () => {
    document.body.innerHTML = `
      <lite-tiktok video-id="123" username="charli"></lite-tiktok>
    `;
    const scripts = Array.from(document.querySelectorAll('script')).map((s) => s.src);
    expect(scripts.some((src) => src.includes('tiktok.com'))).toBe(false);
  });

  it('hydrates with a tiktok-embed blockquote on click', () => {
    document.body.innerHTML = `
      <lite-tiktok video-id="7000000000000000000" username="charli"></lite-tiktok>
    `;
    const el = document.querySelector('lite-tiktok') as HTMLElement;
    el.click();
    const blockquote = el.querySelector('blockquote.tiktok-embed');
    expect(blockquote).not.toBeNull();
    expect(blockquote?.getAttribute('cite')).toBe(
      'https://www.tiktok.com/@charli/video/7000000000000000000',
    );
    expect(blockquote?.getAttribute('data-video-id')).toBe('7000000000000000000');
  });

  it('rejects non-numeric video-id', () => {
    document.body.innerHTML = `
      <lite-tiktok video-id="../evil" username="charli"></lite-tiktok>
    `;
    const el = document.querySelector('lite-tiktok') as HTMLElement;
    el.click();
    expect(el.querySelector('blockquote.tiktok-embed')).toBeNull();
  });

  it('rejects unsafe username characters', () => {
    document.body.innerHTML = `
      <lite-tiktok video-id="123" username="charli/../"></lite-tiktok>
    `;
    const el = document.querySelector('lite-tiktok') as HTMLElement;
    el.click();
    expect(el.querySelector('blockquote.tiktok-embed')).toBeNull();
  });
});
