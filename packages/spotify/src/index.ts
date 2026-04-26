import { LiteSpotify } from './lite-spotify';

export { LiteSpotify };

if (typeof customElements !== 'undefined' && !customElements.get('lite-spotify')) {
  customElements.define('lite-spotify', LiteSpotify);
}
