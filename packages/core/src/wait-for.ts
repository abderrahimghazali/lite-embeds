export function waitForElement(
  root: ParentNode,
  selector: string,
  timeoutMs = 8000,
): Promise<Element | null> {
  const existing = root.querySelector(selector);
  if (existing) return Promise.resolve(existing);

  if (typeof MutationObserver === 'undefined') {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const found = root.querySelector(selector);
      if (found) finish(found);
    });

    const finish = (element: Element | null): void => {
      observer.disconnect();
      window.clearTimeout(timeout);
      resolve(element);
    };

    observer.observe(root as Node, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => finish(root.querySelector(selector)), timeoutMs);
  });
}
