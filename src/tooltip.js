class Tooltip extends HTMLElement {
  _tooltipContainer;
  _tooltipText = 'Some dummy tooltip text';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host([important]) {
          background-color: lightgrey;
        }

        div {
          position: absolute;
          color: white;
          background-color: black;
          z-index: 1;
        }

        ::slotted(.highlight) {
          border-bottom: 2px dotted orange;
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
