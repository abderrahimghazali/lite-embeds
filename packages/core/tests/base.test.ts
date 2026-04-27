import { beforeEach, describe, expect, it } from 'vitest';
import { LiteEmbed } from '../src/base';

class PendingEmbed extends LiteEmbed {
  resolveHydration?: (didHydrate: boolean) => void;

  protected renderFacade(): void {
    this.shadow.innerHTML = '<button>load</button>';
  }

  protected hydrate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.resolveHydration = resolve;
    });
  }
}

describe('LiteEmbed loading state', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    if (!customElements.get('pending-embed')) {
      customElements.define('pending-embed', PendingEmbed);
    }
  });

  it('marks the host busy while hydration is pending', async () => {
    document.body.innerHTML = '<pending-embed></pending-embed>';
    const el = document.querySelector('pending-embed') as PendingEmbed;

    el.click();
    expect(el.hasAttribute('loading')).toBe(true);
    expect(el.getAttribute('aria-busy')).toBe('true');

    el.resolveHydration?.(true);
    await Promise.resolve();

    expect(el.hasAttribute('loading')).toBe(false);
    expect(el.hasAttribute('aria-busy')).toBe(false);
  });
});
