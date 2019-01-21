class Tooltip extends HTMLElement {
  _tooltipContainer;
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

    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
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
