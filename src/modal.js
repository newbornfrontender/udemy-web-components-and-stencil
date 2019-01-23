class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, .75);
          z-index: 1;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25vw;
          width: 50vw;
          height: 20rem;
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgb(0, 0, 0, .26);
          z-index: 2;
        }
      </style>

      <div id="backdrop"></div>

      <div id="modal"></div>
    `;
  }
}

customElements.define('uc-modal', Modal);
