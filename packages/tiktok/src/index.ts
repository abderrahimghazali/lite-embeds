import { LiteTiktok } from './lite-tiktok';

export { LiteTiktok };

if (typeof customElements !== 'undefined' && !customElements.get('lite-tiktok')) {
  customElements.define('lite-tiktok', LiteTiktok);
}
