const messagesEl = document.getElementById("messages");
const formEl = document.getElementById("chat-form");
const inputEl = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const convListEl = document.getElementById("conv-list");
const newConvBtn = document.getElementById("new-conv-btn");
const subtitleEl = document.getElementById("chat-subtitle");

let currentConversationId = null;

function addBubble(role, text) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function clearMessages() {
  messagesEl.innerHTML = "";
}

async function refreshConversationList() {
  const res = await fetch("/api/conversations");
  const conversations = await res.json();
  convListEl.innerHTML = "";
  for (const conv of conversations) {
    const item = document.createElement("div");
    item.className = "conv-item" + (conv.id === currentConversationId ? " active" : "");
    item.textContent = conv.title || "New conversation";
    item.title = conv.title || "New conversation";
    item.addEventListener("click", () => switchConversation(conv.id));
    convListEl.appendChild(item);
  }
  return conversations;
}

async function switchConversation(convId) {
  currentConversationId = convId;
  clearMessages();
  const res = await fetch(`/api/conversations/${convId}`);
  if (res.ok) {
    const data = await res.json();
    for (const m of data.messages) {
      addBubble(m.role, m.content);
    }
    subtitleEl.textContent = data.title || "Ask a question about the target repo";
  }
  await refreshConversationList();
}

async function startNewConversation() {
  const res = await fetch("/api/conversations", { method: "POST" });
  const conv = await res.json();
  currentConversationId = conv.id;
  clearMessages();
  subtitleEl.textContent = "Ask a question about the target repo";
  await refreshConversationList();
}

newConvBtn.addEventListener("click", startNewConversation);

function toolLabel(event) {
  const input = event.input ? JSON.stringify(event.input) : "";
  return `\u{1F527} ${event.tool} ${input}`;
}

async function sendMessage(message) {
  addBubble("user", message);
  sendBtn.disabled = true;

  const assistantBubble = addBubble("assistant", "…");
  let assistantText = "";
  let gotResult = false;

  try {
    const res = await fetch("/api/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, conversation_id: currentConversationId }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      // SSE allows \r\n line endings (sse-starlette uses them) — normalize
      // so the \n\n event-separator search below works.
      buffer = (buffer + decoder.decode(value, { stream: true })).replace(/\r\n/g, "\n");

      let sep;
      while ((sep = buffer.indexOf("\n\n")) !== -1) {
        const rawEvent = buffer.slice(0, sep);
        buffer = buffer.slice(sep + 2);
        const dataLine = rawEvent
          .split("\n")
          .find((line) => line.startsWith("data:"));
        if (!dataLine) continue;
        const event = JSON.parse(dataLine.slice(5).trim());

        if (event.type === "session") {
          currentConversationId = event.session_id ? currentConversationId : currentConversationId;
        } else if (event.type === "tool_use") {
          assistantBubble.insertAdjacentElement(
            "beforebegin",
            (() => {
              const b = document.createElement("div");
              b.className = "msg tool";
              b.textContent = toolLabel(event);
              return b;
            })()
          );
          messagesEl.scrollTop = messagesEl.scrollHeight;
        } else if (event.type === "text") {
          assistantText += event.text;
          assistantBubble.textContent = assistantText;
          messagesEl.scrollTop = messagesEl.scrollHeight;
        } else if (event.type === "result") {
          gotResult = true;
          currentConversationId = event.conversation_id;
          assistantBubble.textContent = event.reply;
          assistantBubble.className = event.is_error ? "msg error" : "msg assistant";
          await refreshConversationList();
        }
      }
    }

    if (!gotResult) {
      assistantBubble.textContent =
        "The connection to the server dropped before an answer arrived — is the server still running? Try sending again.";
      assistantBubble.className = "msg error";
    }
  } catch (err) {
    assistantBubble.textContent =
      "Couldn't reach the server. Make sure it's running (uv run uvicorn server.main:app) and try again.";
    assistantBubble.className = "msg error";
  } finally {
    sendBtn.disabled = false;
  }
}

formEl.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const message = inputEl.value.trim();
  if (!message) return;
  inputEl.value = "";
  sendMessage(message);
});

(async function init() {
  const conversations = await refreshConversationList();
  if (conversations.length > 0) {
    await switchConversation(conversations[0].id);
  } else {
    await startNewConversation();
  }
})();
