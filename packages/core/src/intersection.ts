/**
 * Run `callback` once when `element` scrolls within `rootMargin` of the
 * viewport. Falls back to immediate invocation in environments without
 * IntersectionObserver. Returns a disconnect function.
 */
export function whenVisible(
  element: Element,
  callback: () => void,
  rootMargin = '200px',
): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    callback();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
          return;
        }
      }
    },
    { rootMargin },
  );

  observer.observe(element);
  return () => observer.disconnect();
}
