import { LiteTwitter } from './lite-twitter';

export { LiteTwitter };

if (typeof customElements !== 'undefined') {
  if (!customElements.get('lite-twitter')) {
    customElements.define('lite-twitter', LiteTwitter);
  }
  if (!customElements.get('lite-x')) {
    customElements.define('lite-x', class extends LiteTwitter {});
  }
}
