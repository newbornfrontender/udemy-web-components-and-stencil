class Tooltip extends HTMLElement {
  _tooltipContainer;

  constructor() {
    super();
  }

  connectedCallback() {
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    this.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = 'This is the tooltip text content!';
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);
