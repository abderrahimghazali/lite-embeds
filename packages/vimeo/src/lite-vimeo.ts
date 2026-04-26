import { LiteEmbed } from '@lite-embeds/core';
import { renderFacade } from './facade';
import { styles } from './styles';

export class LiteVimeo extends LiteEmbed {
  static get observedAttributes(): string[] {
    return ['video-id', 'title', 'thumbnail', 'start'];
  }

  protected renderFacade(): void {
    const title = this.getAttribute('title') ?? '';
    const thumbnail = this.getAttribute('thumbnail') ?? '';

    this.shadow.innerHTML = `<style>${styles}</style>${renderFacade({ title, thumbnail })}`;

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', title ? `Play ${title} on Vimeo` : 'Play video on Vimeo');
  }

  protected hydrate(): boolean {
    const id = this.getAttribute('video-id');
    if (!id || !/^\d+$/.test(id)) return false;

    const params = new URLSearchParams({
      autoplay: '1',
      title: '0',
      byline: '0',
      portrait: '0',
    });
    const start = this.getAttribute('start');
    const fragment = start && /^\d+$/.test(start) ? `#t=${start}s` : '';

    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${id}?${params.toString()}${fragment}`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';
    iframe.style.inset = '0';
    iframe.title = this.getAttribute('title') ?? 'Vimeo video';

    // Replace only the facade; keep the <style> so :host stays positioned
    // (the iframe uses position:absolute and needs the host as containing block).
    const facade = this.shadow.querySelector('.facade');
    if (facade) facade.replaceWith(iframe);
    else this.shadow.appendChild(iframe);
    this.removeAttribute('role');
    this.removeAttribute('tabindex');
    this.removeAttribute('aria-label');
    return true;
  }
}
