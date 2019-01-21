class Tooltip extends HTMLElement {
  _tooltipContainer;
  _tooltipIcon;
  _tooltipText = 'Some dummy tooltip text';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host([important]) {
          padding: .15rem;
          background-color: var(--color-primary, lightgrey);
        }

        :host-context(p[context]) {
          font-weight: bold;
        }

        ::slotted(.highlight) {
          border-bottom: 2px dotted orange;
        }

        div {
          position: absolute;
          top: 1.5rem;
          left: .75rem;
          padding: .15rem;
          font-weight: normal;
          color: white;
          background-color: black;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, .25);
          z-index: 1;
        }

        .icon {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          color: white;
          background-color: black;
          border-radius: 50%;
        }
      </style>

      <slot>Some default</slot><span class="icon"> ?</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('text'))
      this._tooltipText = this.getAttribute('text');

    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener(
      'mouseenter',
      this._showTooltip.bind(this),
    );
    this._tooltipIcon.addEventListener(
      'mouseleave',
      this._hideTooltip.bind(this),
    );

    this.style.position = 'relative';
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal === newVal) return;

    if (attrName === 'text') this._tooltipText = newVal;
  }

  static get observedAttributes() {
    return ['text'];
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);
