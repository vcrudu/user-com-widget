class UserComWidget extends HTMLElement {

    constructor() {
      super();

      // Attach a shadow root to the custom element
      const shadowRoot = this.attachShadow({ mode: 'open' });

      // Get the template content
      const template = document.getElementById('user-com-widget-template') as HTMLTemplateElement;
      const templateContent = template.content.cloneNode(true);
      
      // Append the template content to the shadow root
      shadowRoot.appendChild(templateContent);
      
      // Initialize the widget
      this.initializeWidget();
    }
    
    initializeWidget() {
      if (!this.shadowRoot) {
        throw new Error('Shadow root must be created before initializing the widget');
      }

      // Get elements from the shadow root
      const closedWidget = this.shadowRoot.getElementById('closed-widget');
      const openWidget = this.shadowRoot.getElementById('open-widget');
      const closeButton = this.shadowRoot.getElementById('close-button');
      const sendButton = this.shadowRoot.getElementById('send-button');
      
      if (!closedWidget || !openWidget || !closeButton || !sendButton) {
        throw new Error('Shadow root must be created before initializing the widget');
      }

      // Event listeners and other initialization logic go here
      closedWidget.addEventListener('click', () => {
        closedWidget.style.display = 'none';
        openWidget.style.display = 'block';
      });
      
      closeButton.addEventListener('click', () => {
        openWidget.style.display = 'none';
        closedWidget.style.display = 'block';
      });
    }
  }

customElements.define('user-com-widget', UserComWidget);