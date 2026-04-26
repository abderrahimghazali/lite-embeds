const loaded = new Map<string, Promise<void>>();

/**
 * Inject a script tag once, dedup'd across multiple components on the same
 * page. Returns a promise that resolves when the script has loaded.
 */
export function loadScript(src: string): Promise<void> {
  const existing = loaded.get(src);
  if (existing) return existing;

  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  const promise = new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => {
      loaded.delete(src);
      script.remove();
      reject(new Error(`Failed to load ${src}`));
    };
  });

  loaded.set(src, promise);
  document.head.appendChild(script);
  return promise;
}

/**
 * Test-only: clear the script cache so tests start with a clean slate.
 */
export function _resetScriptCache(): void {
  loaded.clear();
}
