/**
 * Base class for facade-pattern social embed web components.
 *
 * Subclasses implement `renderFacade()` (static placeholder) and `hydrate()`
 * (load real platform script and replace facade). Click and keyboard
 * (Enter / Space) activation are handled here.
 */
export abstract class LiteEmbed extends HTMLElement {
  protected hydrated = false;
  protected shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    if (this.shadow.childElementCount > 0) return;
    this.renderFacade();
    this.addEventListener('click', this.activate);
    this.addEventListener('keydown', this.handleKeydown);
  }

  protected handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.activate();
    }
  };

  protected activate = (): void => {
    if (this.hydrated) return;
    this.hydrated = true;
    this.removeEventListener('click', this.activate);
    this.removeEventListener('keydown', this.handleKeydown);
    void this.hydrate();
  };

  protected abstract renderFacade(): void;
  protected abstract hydrate(): void | Promise<void>;
}
