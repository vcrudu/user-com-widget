import type { TMessage } from "./types";
import userComWidgetTemplate from "./template.html";
import style from "./style.css";

class UserComWidget extends HTMLElement {
  private messages: TMessage[] = [];
  private messageInput: HTMLTextAreaElement| undefined;

  constructor() {
    super();

    // Attach a shadow root to the custom element
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Get the template content
    const template = document.createElement("template");
    template.innerHTML = `${userComWidgetTemplate}<style>${style}</style>`;

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
    this.messageInput = this.shadowRoot.getElementById("message-input") as HTMLTextAreaElement;

    if (
      !closedWidget ||
      !openWidget ||
      !closeButton ||
      !sendButton ||
      !this.messageInput
    ) {
      throw new Error(
        "Shadow root must be created before initializing the widget"
      );
    }

    this.messageInput.addEventListener("input", function () {
      // Reset the height to 'auto' to get the scroll height correctly
      this.style.height = "auto";
      // Set the height to the scroll height (content height)
      this.style.height = this.scrollHeight + "px";
    });

    sendButton.addEventListener("click", () => {
      if (!this.messageInput) {
        throw new Error("Messages input is not defined");
      } 

      const message = this.messageInput.value;
      console.log(message);
      if (message) {
        const messageItem = {
          id: this.messages.length + 1,
          author: "You",
          text: message,
          timestamp: Date.now(),
        };
        this.messages.push(messageItem);
        this.addMessageToUi(messageItem);
      }
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
  
  addMessageToUi(messageItem: TMessage) {
    const messageList = this.shadowRoot!.querySelector("ul.message-list");
    const messageTemplate = this.shadowRoot!.querySelector("li.message.user-message.display-none");
    
    if (messageList && messageTemplate && this.messageInput) {
      const newMessage = messageTemplate.cloneNode(true) as HTMLElement;
      newMessage.querySelector(".message-body p")!.textContent = messageItem.text;
      newMessage.querySelector(".message-body .tooltip")!.textContent = `${messageItem.author} at ${new Date(messageItem.timestamp).toLocaleString()}`;
      newMessage.classList.remove("display-none");
      messageList.appendChild(newMessage);
      this.messageInput.value = ""; // Clear the message input
    }
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
