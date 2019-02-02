class Modal extends HTMLElement {
  isOpen = false;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }

        :host([opened]) #modal {
          top: 15vh;
        }

        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, .75);
          z-index: 1;
          opacity: 0;
          pointer-events: none;
        }

        #modal {
          position: fixed;
          top: 10vh;
          left: 25vw;
          width: 50vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgb(0, 0, 0, .26);
          z-index: 2;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease-out;
        }

        header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }

        ::slotted(h1) {
          margin: 0;
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
          <slot name="title">Please Confirm Payment</slot>
        </header>

        <section id="main">
          <slot></slot>
        </section>

        <section id="actions">
          <button id="cancel-btn">Cancel</button>
          <button id="confirm-btn">Okay</button>
        </section>
      </div>
    `;

    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[1].addEventListener('slotchange', (e) =>
      console.dir(slots[1].assignedNodes()),
    );

    const cancelBtn = this.shadowRoot.querySelector('#cancel-btn');
    const confirmBtn = this.shadowRoot.querySelector('#confirm-btn');

    cancelBtn.addEventListener('click', this._cancel.bind(this));
    confirmBtn.addEventListener('click', this._confirm.bind(this));

    cancelBtn.addEventListener('cancel', () =>
      console.log('Cancel inside the component'),
    );

    const backdrop = this.shadowRoot.querySelector('#backdrop');

    backdrop.addEventListener('click', this._cancel.bind(this));
  }

  attributeChangedCallback(name, prev, next) {
    if (name === 'opened') {
      if (this.hasAttribute('opened'))
        //  this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
        //  this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
        //  this.shadowRoot.querySelector('#modal').style.opacity = 1;
        //  this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
        this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  static get observedAttributes() {
    return ['opened'];
  }

  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }

  hide() {
    if (this.hasAttribute('opened')) this.removeAttribute('opened');
    this.isOpen = false;
  }

  _cancel(event) {
    this.hide();

    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this.hide();

    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define('uc-modal', Modal);
