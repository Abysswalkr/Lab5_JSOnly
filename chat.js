document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.backgroundColor = "white";

 // Crear contenedor principal
const chatContainer = document.createElement("div");
chatContainer.style.width = "400px";
chatContainer.style.height = "600px";
chatContainer.style.display = "flex";
chatContainer.style.flexDirection = "column";
chatContainer.style.justifyContent = "flex-end";
chatContainer.style.border = "1px solid #ccc";
chatContainer.style.overflow = "hidden";
document.body.appendChild(chatContainer);
chatContainer.style.borderRadius = "10px";
chatContainer.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
chatContainer.style.backgroundColor = "#f0f0f0";

const themeToggleButton = document.createElement("button");
themeToggleButton.textContent = "Cambiar tema";
themeToggleButton.style.margin = "10px";

const list = document.createElement('ul');
list.style.flexGrow = "1";
list.style.overflowY = "auto";
list.style.padding = "10px";

const textArea = document.createElement('textarea');
textArea.style.width = "calc(100% - 20px)";
textArea.style.margin = "10px";
textArea.maxLength = 140;
textArea.style.borderRadius = "5px";
textArea.style.border = "1px solid #ccc";
textArea.style.padding = "5px";

textArea.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        postMessage();
        event.preventDefault(); // Prevents new line in text field.
    }
});

const button = document.createElement('button');
button.textContent = 'Enviar';
button.style.margin = "10px";
button.style.borderRadius = "5px";
button.style.border = "none";
button.style.padding = "10px 20px";
button.style.backgroundColor = "#4CAF50";
button.style.color = "white";
button.style.cursor = "pointer";

chatContainer.appendChild(themeToggleButton);
chatContainer.appendChild(list);
chatContainer.appendChild(textArea);
chatContainer.appendChild(button);

button.style.transition = "all 0.5s ease"; // Smooth transition

button.onmouseover = function() {
    this.style.backgroundColor = "#4CAF50"; // Changes to green color
    this.style.color = "white"; // White text
};

button.onmouseout = function() {
    this.style.backgroundColor = ""; // Returns to original color
    this.style.color = ""; // Original text color
};

function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "light") {
        document.body.style.backgroundColor = "black";
        chatContainer.style.backgroundColor = "grey";
        themeToggleButton.style.color = "black";
        themeToggleButton.style.backgroundColor = "white";
        localStorage.setItem("theme", "dark");
    } else {
        document.body.style.backgroundColor = "white";
        chatContainer.style.backgroundColor = "#f0f0f0";
        themeToggleButton.style.color = "white";
        themeToggleButton.style.backgroundColor = "black";
        localStorage.setItem("theme", "light");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        toggleTheme();
    }
});

themeToggleButton.addEventListener("click", toggleTheme);
themeToggleButton.style.borderRadius = "5px";
themeToggleButton.style.border = "1px solid #ccc";
themeToggleButton.style.padding = "10px 20px";
themeToggleButton.style.marginBottom = "10px";
themeToggleButton.style.cursor = "pointer";

async function getMessages() {
    const response = await fetch('http://localhost:3000/messages');
    const messages = await response.json();

    // Save scroll position before adding new messages
    const isScrolledToBottom = list.scrollHeight - list.clientHeight <= list.scrollTop + 1;

    list.innerHTML = '';
    messages.forEach(({username, message}) => {
        const item = document.createElement('li');
        item.textContent = username + ': ' + message;
        list.appendChild(item);

        const urlRegex = /(https?:\/\/\S+\.(jpg|jpeg|png|gif))/g;
        const found = message.match(urlRegex);

        if (found) {
            // For each found url, create a preview
            found.forEach(url => {
                const image = new Image();
                image.src = url;
                image.style.maxWidth = '200px'; // Adjust preview size
                image.style.maxHeight = '200px';
                item.appendChild(image);
            });
        } else {
            // This else block might not be needed since the message is already being added above
        }

        // If user was scrolled to the bottom, move scroll to bottom
        if (isScrolledToBottom) {
            list.scrollTop = list.scrollHeight;
        }
    });
}

async function postMessage() {
    // Implement logic to post messages
}

button.addEventListener('click', postMessage);
textArea.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        postMessage();
    }
});

// Implement auto-refresh of messages
setInterval(getMessages, 5000)});
