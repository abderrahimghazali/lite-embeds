import { LiteInstagram } from './lite-instagram';

export { LiteInstagram };

if (typeof customElements !== 'undefined' && !customElements.get('lite-instagram')) {
  customElements.define('lite-instagram', LiteInstagram);
}
