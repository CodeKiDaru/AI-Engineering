
let previousInteractionId = null;

async function sendMessage() {
    const input = document.getElementById("question");
    const chatBox = document.getElementById("chat-box");
    const button = document.querySelector("button");

    const question = input.value.trim();

    if (!question) return;

    // Show user message
    chatBox.innerHTML += `
    <div class="message user"></div>
  `;

    chatBox.lastElementChild.textContent = question;

    input.value = "";

    // Loading message
    const loading = document.createElement("div");
    loading.className = "message bot";
    loading.textContent = "Muskan is typing...";
    chatBox.appendChild(loading);

    chatBox.scrollTop = chatBox.scrollHeight;
    button.disabled = true;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question,
                previousInteractionId: previousInteractionId
            })
        });

        const data = await response.json();

        loading.textContent = data.reply || "No response received.";

        previousInteractionId = data.interactionId;

    } catch (error) {
        loading.textContent = "Error connecting to server!";
        console.error(error);
    }

    button.disabled = false;
    input.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message using Enter key
document.getElementById("question")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });