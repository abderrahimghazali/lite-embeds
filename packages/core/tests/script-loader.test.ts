import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { _resetScriptCache, loadScript } from '../src/script-loader';

describe('loadScript', () => {
  beforeEach(() => {
    _resetScriptCache();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.head.innerHTML = '';
  });

  it('clears failed loads from the cache so they can be retried', async () => {
    let attempts = 0;

    vi.spyOn(document.head, 'appendChild').mockImplementation((node: Node): Node => {
      attempts += 1;
      const script = node as HTMLScriptElement;
      if (attempts === 1) {
        script.onerror?.(new Event('error'));
      } else {
        script.onload?.(new Event('load'));
      }
      return node;
    });

    await expect(loadScript('https://example.com/embed.js')).rejects.toThrow(
      'Failed to load https://example.com/embed.js',
    );
    await expect(loadScript('https://example.com/embed.js')).resolves.toBeUndefined();
    expect(attempts).toBe(2);
  });
});
