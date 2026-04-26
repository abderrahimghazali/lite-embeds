import { beforeEach, describe, expect, it } from 'vitest';
import '../src/index';

describe('<lite-twitter>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers as <lite-twitter>', () => {
    expect(customElements.get('lite-twitter')).toBeDefined();
  });

  it('registers <lite-x> as alias', () => {
    expect(customElements.get('lite-x')).toBeDefined();
  });

  function getShadowHtml(selector: string): string {
    const el = document.querySelector(selector);
    if (!el || !el.shadowRoot) throw new Error(`Missing shadow root for ${selector}`);
    return el.shadowRoot.innerHTML;
  }

  it('renders a facade containing handle and text', () => {
    document.body.innerHTML = `
      <lite-twitter tweet-id="123" handle="@example" text="hello world"></lite-twitter>
    `;
    const html = getShadowHtml('lite-twitter');
    expect(html).toContain('@example');
    expect(html).toContain('hello world');
    expect(html).toContain('View on X');
  });

  it('escapes HTML in text', () => {
    document.body.innerHTML = `
      <lite-twitter tweet-id="123" handle="@a" text="<script>alert(1)</script>"></lite-twitter>
    `;
    const html = getShadowHtml('lite-twitter');
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('sets ARIA / keyboard activation attributes on the host', () => {
    document.body.innerHTML = `
      <lite-twitter tweet-id="123" handle="@a" text="hi"></lite-twitter>
    `;
    const el = document.querySelector('lite-twitter') as HTMLElement;
    expect(el.getAttribute('role')).toBe('button');
    expect(el.getAttribute('tabindex')).toBe('0');
    expect(el.getAttribute('aria-label')).toContain('@a');
  });

  it('does not load any third-party script before user activation', () => {
    document.body.innerHTML = `
      <lite-twitter tweet-id="123" handle="@a" text="hi"></lite-twitter>
    `;
    const scripts = Array.from(document.querySelectorAll('script')).map((s) => s.src);
    expect(scripts.some((src) => src.includes('twitter.com'))).toBe(false);
  });
});
