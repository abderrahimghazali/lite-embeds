import { LiteEmbed, waitForElement } from '@lite-embeds/core';
import { renderFacade } from './facade';
import { styles } from './styles';

const TIKTOK_EMBED_SRC = 'https://www.tiktok.com/embed.js';

export class LiteTiktok extends LiteEmbed {
  static get observedAttributes(): string[] {
    return ['video-id', 'username'];
  }

  protected renderFacade(): void {
    const username = this.getAttribute('username') ?? '';

    this.shadow.innerHTML = `<style>${styles}</style>${renderFacade({ username })}`;

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', username ? `Watch TikTok by @${username}` : 'Watch on TikTok');
  }

  protected async hydrate(): Promise<boolean> {
    const videoId = this.getAttribute('video-id');
    const username = this.getAttribute('username');
    if (!videoId || !/^\d+$/.test(videoId)) return false;
    if (!username || !/^[A-Za-z0-9_.]+$/.test(username)) return false;

    const blockquote = document.createElement('blockquote');
    blockquote.className = 'tiktok-embed';
    blockquote.setAttribute('cite', `https://www.tiktok.com/@${username}/video/${videoId}`);
    blockquote.setAttribute('data-video-id', videoId);
    const section = document.createElement('section');
    blockquote.appendChild(section);

    this.shadow.innerHTML = `<style>${styles}</style><slot></slot>`;
    this.replaceChildren(blockquote);

    // TikTok's embed.js scans for `.tiktok-embed` blockquotes on each script
    // execution. Inject fresh per hydrate so subsequent instances also get
    // processed. The browser HTTP cache keeps subsequent injects cheap.
    const script = document.createElement('script');
    script.src = TIKTOK_EMBED_SRC;
    script.async = true;
    document.head.appendChild(script);
    await waitForElement(this, 'iframe');

    this.removeAttribute('role');
    this.removeAttribute('tabindex');
    this.removeAttribute('aria-label');
    return true;
  }
}
