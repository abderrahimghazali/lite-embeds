import { LiteEmbed, loadScript } from '@lite-embeds/core';
import { renderFacade } from './facade';
import { styles } from './styles';

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const INSTAGRAM_EMBED_SRC = 'https://www.instagram.com/embed.js';
const KINDS = ['p', 'reel', 'tv'] as const;
type Kind = (typeof KINDS)[number];

export class LiteInstagram extends LiteEmbed {
  static get observedAttributes(): string[] {
    return ['shortcode', 'kind', 'username', 'caption'];
  }

  protected renderFacade(): void {
    const username = this.getAttribute('username') ?? '';
    const caption = this.getAttribute('caption') ?? '';

    this.shadow.innerHTML = `<style>${styles}</style>${renderFacade({ username, caption })}`;

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute(
      'aria-label',
      username ? `View Instagram post by ${username}` : 'View on Instagram',
    );
  }

  protected async hydrate(): Promise<boolean> {
    const shortcode = this.getAttribute('shortcode');
    if (!shortcode || !/^[A-Za-z0-9_-]+$/.test(shortcode)) return false;

    const kindAttr = this.getAttribute('kind') ?? 'p';
    const kind: Kind = KINDS.includes(kindAttr as Kind) ? (kindAttr as Kind) : 'p';

    const blockquote = document.createElement('blockquote');
    blockquote.className = 'instagram-media';
    blockquote.setAttribute('data-instgrm-captioned', '');
    blockquote.setAttribute(
      'data-instgrm-permalink',
      `https://www.instagram.com/${kind}/${shortcode}/`,
    );
    blockquote.setAttribute('data-instgrm-version', '14');

    await loadScript(INSTAGRAM_EMBED_SRC);

    this.shadow.innerHTML = '<style>:host{display:block}</style><slot></slot>';
    this.replaceChildren(blockquote);
    window.instgrm?.Embeds.process();

    this.removeAttribute('role');
    this.removeAttribute('tabindex');
    this.removeAttribute('aria-label');
    return true;
  }
}
