import { LiteEmbed } from '@lite-embeds/core';
import { renderFacade } from './facade';
import { styles } from './styles';

const SPOTIFY_TYPES = ['track', 'album', 'playlist', 'episode', 'show'] as const;
type SpotifyType = (typeof SPOTIFY_TYPES)[number];

const COMPACT_TYPES: ReadonlySet<SpotifyType> = new Set(['track', 'episode']);

export class LiteSpotify extends LiteEmbed {
  static get observedAttributes(): string[] {
    return ['spotify-id', 'type', 'title', 'artist', 'theme'];
  }

  protected renderFacade(): void {
    const title = this.getAttribute('title') ?? '';
    const artist = this.getAttribute('artist') ?? '';

    this.shadow.innerHTML = `<style>${styles}</style>${renderFacade({ title, artist })}`;

    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute(
      'aria-label',
      title ? `Play ${title}${artist ? ` by ${artist}` : ''} on Spotify` : 'Play on Spotify',
    );
  }

  protected hydrate(): boolean {
    const id = this.getAttribute('spotify-id');
    if (!id || !/^[A-Za-z0-9]+$/.test(id)) return false;

    const type = (this.getAttribute('type') ?? 'track') as SpotifyType;
    if (!SPOTIFY_TYPES.includes(type)) return false;

    const themeParam = this.getAttribute('theme') === 'dark' ? '?theme=0' : '';
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/${type}/${id}${themeParam}`;
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = COMPACT_TYPES.has(type) ? '152px' : '352px';
    iframe.style.borderRadius = '12px';
    iframe.title = this.getAttribute('title') ?? 'Spotify embed';

    // Keep the <style> so :host display/contain rules survive.
    const facade = this.shadow.querySelector('.facade');
    if (facade) facade.replaceWith(iframe);
    else this.shadow.appendChild(iframe);
    this.removeAttribute('role');
    this.removeAttribute('tabindex');
    this.removeAttribute('aria-label');
    return true;
  }
}
