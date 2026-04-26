import { beforeEach, describe, expect, it } from 'vitest';
import '../src/index';

describe('<lite-instagram>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function getShadowHtml(selector: string): string {
    const el = document.querySelector(selector);
    if (!el || !el.shadowRoot) throw new Error(`Missing shadow root for ${selector}`);
    return el.shadowRoot.innerHTML;
  }

  it('registers as <lite-instagram>', () => {
    expect(customElements.get('lite-instagram')).toBeDefined();
  });

  it('renders a facade containing username and caption', () => {
    document.body.innerHTML = `
      <lite-instagram shortcode="CxYzAbC123" username="@nasa" caption="Hello world"></lite-instagram>
    `;
    const html = getShadowHtml('lite-instagram');
    expect(html).toContain('@nasa');
    expect(html).toContain('Hello world');
    expect(html).toContain('View on Instagram');
  });

  it('escapes HTML in username and caption', () => {
    document.body.innerHTML = `
      <lite-instagram shortcode="abc" username="<x>" caption="<script>alert(1)</script>"></lite-instagram>
    `;
    const html = getShadowHtml('lite-instagram');
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('sets ARIA / keyboard activation attributes on the host', () => {
    document.body.innerHTML = `
      <lite-instagram shortcode="abc" username="@nasa"></lite-instagram>
    `;
    const el = document.querySelector('lite-instagram') as HTMLElement;
    expect(el.getAttribute('role')).toBe('button');
    expect(el.getAttribute('tabindex')).toBe('0');
    expect(el.getAttribute('aria-label')).toContain('@nasa');
  });

  it('does not load any third-party script before user activation', () => {
    document.body.innerHTML = `
      <lite-instagram shortcode="abc" username="@a"></lite-instagram>
    `;
    const scripts = Array.from(document.querySelectorAll('script')).map((s) => s.src);
    expect(scripts.some((src) => src.includes('instagram.com'))).toBe(false);
  });

  it('rejects invalid shortcode values', () => {
    document.body.innerHTML = `
      <lite-instagram shortcode="../evil" username="@a"></lite-instagram>
    `;
    const el = document.querySelector('lite-instagram') as HTMLElement;
    el.click();
    expect(el.querySelector('blockquote.instagram-media')).toBeNull();
  });
});
