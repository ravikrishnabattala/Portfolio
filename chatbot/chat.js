class ChatWidget {
  constructor(root) {
    this.root = root;
    this.toggle = root.querySelector("#chatbot-toggle");
    this.window = root.querySelector("#chat-window");
    this.form = root.querySelector("#chat-form");
    this.input = root.querySelector("#chat-input");
    this.sendBtn = root.querySelector("#chat-send");
    this.messages = root.querySelector("#chat-messages");
    this.typing = root.querySelector("#chat-typing");
    this.isOpen = false;

    this.bindEvents();
  }

  bindEvents() {
    this.toggle.addEventListener("click", () => {
      this.toggleWindow();
    });

    this.form.addEventListener("submit", (event) => {
      this.handleSubmit(event);
    });
  }

  toggleWindow() {
    if (this.isOpen) {
      this.closeWindow();
    } else {
      this.openWindow();
    }
  }

  openWindow() {
    this.isOpen = true;
    this.window.classList.add("chat-window--open");
    this.window.setAttribute("aria-hidden", "false");
    this.toggle.setAttribute("aria-expanded", "true");

    setTimeout(() => {
      this.input.focus();
    }, 100);
  }

  closeWindow() {
    this.isOpen = false;
    this.window.classList.remove("chat-window--open");
    this.window.setAttribute("aria-hidden", "true");
    this.toggle.setAttribute("aria-expanded", "false");
  }

  async handleSubmit(event) {
    event.preventDefault();

    const message = this.input.value.trim();

    if (!message) {
      return;
    }

    this.addMessage(message, "user");
    this.input.value = "";
    this.sendBtn.disabled = true;
    this.input.disabled = true;
    this.typing.hidden = false;

    try {
      const reply = await this.getBotReply(message);
      this.addMessage(reply, "bot");
    } catch (error) {
      console.error(error);
      this.addMessage("Unable to connect to the backend.", "error");
    } finally {
      this.typing.hidden = true;
      this.sendBtn.disabled = false;
      this.input.disabled = false;
      this.input.focus();
    }
  }

  async getBotReply(message) {
    const response = await fetch("https://python-ai-backend-jet.vercel.app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: message
      })
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    return data.answer;
  }

  addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `message message--${type}`;

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    message.appendChild(paragraph);
    this.messages.appendChild(message);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messages.scrollTop = this.messages.scrollHeight;
  }
}

window.initChatbot = function () {
  const chatbot = document.getElementById("chatbot");

  if (!chatbot) {
    console.error("Chatbot element not found.");
    return;
  }

  new ChatWidget(chatbot);
  console.log("Ravi chatbot initialized.");
};