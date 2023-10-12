class UserComWidget extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow root to the custom element
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Get the template content
    const template = document.getElementById(
      "user-com-widget-template"
    ) as HTMLTemplateElement;
    const templateContent = template.content.cloneNode(true);

    // Append the template content to the shadow root
    shadowRoot.appendChild(templateContent);

    // Initialize the widget
    this.initializeWidget();
  }

  initializeWidget() {
    if (!this.shadowRoot) {
      throw new Error(
        "Shadow root must be created before initializing the widget"
      );
    }

    // Get elements from the shadow root
    const closedWidget = this.shadowRoot.getElementById("closed-widget");
    const openWidget = this.shadowRoot.getElementById("open-widget");
    const closeButton = this.shadowRoot.getElementById("close-button");
    const sendButton = this.shadowRoot.getElementById("send-button");
    const messagesInput = this.shadowRoot.getElementById("message-input");

    if (
      !closedWidget ||
      !openWidget ||
      !closeButton ||
      !sendButton ||
      !messagesInput
    ) {
      throw new Error(
        "Shadow root must be created before initializing the widget"
      );
    }

    messagesInput.addEventListener("input", function () {
      // Reset the height to 'auto' to get the scroll height correctly
      this.style.height = "auto";
      // Set the height to the scroll height (content height)
      this.style.height = this.scrollHeight + "px";
    });

    // Event listeners and other initialization logic go here
    closedWidget.addEventListener("click", () => {
      closedWidget.style.display = "none";
      openWidget.style.display = "flex";
      setTimeout(() => {
        openWidget.classList.add("open");
      }, 10);
    });

    closeButton.addEventListener("click", () => {
      closedWidget.style.display = "block";
      openWidget.classList.remove("open");
      setTimeout(() => {
        openWidget.style.display = "none";
      }, 150);
    });
  }

  connectedCallback() {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "reset.css");
    this.shadowRoot!.appendChild(linkElem.cloneNode(true));
    // Initially set the widget to be closed
    const openWidget = this.shadowRoot!.getElementById("open-widget");
    if (openWidget) {
      openWidget.style.display = "none"; // Hide the open state of the widget
    }
  }
}

customElements.define("user-com-widget", UserComWidget);
