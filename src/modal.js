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
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgb(0, 0, 0, .26);
          z-index: 2;
        }

        header {
          padding: 1rem;
        }

        h1 {
          font-size: 1.2rem;
        }

        #main {
          padding: 1rem;
        }

        #actions {
          display: flex;
          justify-content: flex-end;
          padding: 1rem;
          border-top: 1px solid #ccc;
        }

        button {
          margin: 0 .35rem;
        }
      </style>

      <div id="backdrop"></div>

      <div id="modal">
        <header>
          <h1>Please Confirm</h1>
        </header>

        <section id="main">
          <slot></slot>
        </section>

        <section id="actions">
          <button>Cancel</button>
          <button>Okay</button>
        </section>
      </div>
    `;
  }
}

customElements.define('uc-modal', Modal);
