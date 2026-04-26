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

  protected hydrate(): void {
    const id = this.getAttribute('video-id');
    if (!id || !/^\d+$/.test(id)) return;

    const params = new URLSearchParams({
      autoplay: '1',
      title: '0',
      byline: '0',
      portrait: '0',
    });
    const start = this.getAttribute('start');
    if (start && /^\d+$/.test(start)) params.set('#t', `${start}s`);

    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${id}?${params.toString()}`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';
    iframe.style.inset = '0';
    iframe.title = this.getAttribute('title') ?? 'Vimeo video';

    this.shadow.replaceChildren(iframe);
    this.removeAttribute('role');
    this.removeAttribute('tabindex');
    this.removeAttribute('aria-label');
  }
}
