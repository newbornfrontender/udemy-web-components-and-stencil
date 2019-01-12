class Tooltip extends HTMLElement {
  constructor() {
    super();

    console.log("It's working");
  }
}

customElements.define('uc-tooltip', Tooltip);
