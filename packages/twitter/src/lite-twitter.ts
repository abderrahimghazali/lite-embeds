import { LiteEmbed, loadScript } from '@lite-embed/core';
import { renderFacade } from './facade';
import { styles } from './styles';

declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTweet: (
          tweetId: string,
          target: HTMLElement,
          options?: Record<string, unknown>,
        ) => Promise<HTMLElement | undefined>;
      };
    };
  }
}

const TWITTER_WIDGET_SRC = 'https://platform.twitter.com/widgets.js';

export class LiteTwitter extends LiteEmbed {
  static get observedAttributes(): string[] {
    return ['tweet-id', 'handle', 'text', 'theme'];
  }

  protected renderFacade(): void {
    const handle = this.getAttribute('handle') ?? '';
    const text = this.getAttribute('text') ?? '';

    this.shadow.innerHTML = `<style>${styles}</style>${renderFacade({ handle, text })}`;

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', `Load tweet from ${handle || 'Twitter'}`);
  }

  protected async hydrate(): Promise<void> {
    const tweetId = this.getAttribute('tweet-id');
    if (!tweetId) return;

    await loadScript(TWITTER_WIDGET_SRC);
    if (!window.twttr) return;

    const container = document.createElement('div');
    this.shadow.replaceChildren(container);

    await window.twttr.widgets.createTweet(tweetId, container, {
      theme: this.getAttribute('theme') ?? 'light',
    });

    this.removeAttribute('role');
    this.removeAttribute('tabindex');
    this.removeAttribute('aria-label');
  }
}
