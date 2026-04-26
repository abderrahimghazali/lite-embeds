import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    environmentOptions: {
      happyDOM: {
        settings: {
          disableIframePageLoading: true,
        },
      },
    },
    onConsoleLog(log) {
      // Suppress noise from happy-dom attempting to fetch the third-party
      // platform scripts/iframes the components inject during tests.
      if (log.includes('Iframe page loading is disabled')) return false;
      if (log.includes('Failed to execute "fetch()"')) return false;
      if (log.includes('AbortError')) return false;
      if (log.includes('The operation was aborted')) return false;
      return undefined;
    },
    include: ['packages/**/*.test.ts'],
  },
});
