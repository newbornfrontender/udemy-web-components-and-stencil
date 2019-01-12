class Tooltip extends HTMLElement {
  _tooltipContainer;
  _tooltipText = 'Some dummy tooltip text';

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.hasAttribute('text'))
      this._tooltipText = this.getAttribute('text');

    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    this.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.color = 'white';
    this._tooltipContainer.style.backgroundColor = 'black';
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.zIndex = '1';
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);
