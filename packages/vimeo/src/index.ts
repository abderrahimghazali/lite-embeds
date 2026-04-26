import { LiteVimeo } from './lite-vimeo';

export { LiteVimeo };

if (typeof customElements !== 'undefined' && !customElements.get('lite-vimeo')) {
  customElements.define('lite-vimeo', LiteVimeo);
}
