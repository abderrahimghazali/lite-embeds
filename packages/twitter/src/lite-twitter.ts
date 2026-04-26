import { LiteEmbed, loadScript } from '@lite-embeds/core';
import { renderFacade } from './facade';
import { styles } from './styles';

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (target?: HTMLElement) => void;
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
    if (!tweetId || !/^\d+$/.test(tweetId)) return;

    const handle = this.getAttribute('handle') ?? 'i';
    const safeHandle = /^[A-Za-z0-9_]+$/.test(handle) ? handle : 'i';

    // widgets.js sizes the embedded iframe via postMessage, then locates the
    // iframe by id with `document.getElementById` — which can't pierce shadow
    // roots. Render the blockquote in light DOM (like Instagram and TikTok)
    // so the resizer finds the iframe and the embed displays at full height.
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'twitter-tweet';
    const theme = this.getAttribute('theme');
    if (theme === 'dark' || theme === 'light') {
      blockquote.setAttribute('data-theme', theme);
    }
    const link = document.createElement('a');
    link.href = `https://twitter.com/${safeHandle}/status/${tweetId}`;
    blockquote.appendChild(link);

    this.shadow.innerHTML = '<style>:host{display:block}</style><slot></slot>';
    this.replaceChildren(blockquote);

    await loadScript(TWITTER_WIDGET_SRC);
    window.twttr?.widgets.load(this);

    this.removeAttribute('role');
    this.removeAttribute('tabindex');
    this.removeAttribute('aria-label');
  }
}
