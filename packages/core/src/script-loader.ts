const loaded = new Map<string, Promise<void>>();

/**
 * Inject a script tag once, dedup'd across multiple components on the same
 * page. Returns a promise that resolves when the script has loaded.
 */
export function loadScript(src: string): Promise<void> {
  const existing = loaded.get(src);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

  loaded.set(src, promise);
  return promise;
}

/**
 * Test-only: clear the script cache so tests start with a clean slate.
 */
export function _resetScriptCache(): void {
  loaded.clear();
}
