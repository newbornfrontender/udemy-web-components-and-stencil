class ConfirmLink extends HTMLAnchorElement {
  _color = 'blue'
  _activeColor = 'red'

  connectedCallback() {
    this.style.color = 'red'
    this.style.textDecoration = 'none'

    this.addEventListener('mouseover', () => this._changeColor(this._color))
    this.addEventListener('mouseleave', () => this._changeColor(this._activeColor))
    this.addEventListener('click', (event) => {
      if (!confirm('Do you really want to leave?')) event.preventDefault();
    });

  }
  _changeColor(color) {
    return this.style.color = color
  }
}

customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' });
