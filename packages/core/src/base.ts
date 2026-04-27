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
  private hydrating = false;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    if (this.shadow.childElementCount === 0) {
      this.renderFacade();
    }
    if (!this.hydrated && !this.hydrating) {
      this.addActivationListeners();
    }
  }

  attributeChangedCallback(): void {
    if (!this.isConnected || this.hydrated || this.hydrating) return;
    this.renderFacade();
  }

  protected handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.activate();
    }
  };

  protected activate = (): void => {
    if (this.hydrated || this.hydrating) return;
    this.hydrating = true;
    this.setLoading(true);
    this.removeActivationListeners();
    void Promise.resolve(this.hydrate())
      .then((didHydrate) => {
        if (didHydrate === false) {
          this.hydrating = false;
          this.setLoading(false);
          this.addActivationListeners();
          return;
        }
        this.hydrated = true;
        this.hydrating = false;
        this.setLoading(false);
      })
      .catch(() => {
        this.hydrating = false;
        this.setLoading(false);
        this.addActivationListeners();
      });
  };

  private addActivationListeners(): void {
    this.addEventListener('click', this.activate);
    this.addEventListener('keydown', this.handleKeydown);
  }

  private removeActivationListeners(): void {
    this.removeEventListener('click', this.activate);
    this.removeEventListener('keydown', this.handleKeydown);
  }

  private setLoading(loading: boolean): void {
    if (loading) {
      this.setAttribute('loading', '');
      this.setAttribute('aria-busy', 'true');
      return;
    }
    this.removeAttribute('loading');
    this.removeAttribute('aria-busy');
  }

  protected abstract renderFacade(): void;
  protected abstract hydrate(): boolean | Promise<boolean>;
}
