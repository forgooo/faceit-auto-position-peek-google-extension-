// Функция для отправки сообщений в фоновый скрипт
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage(message);
}

function handleMapPick(mapPicked) {
    sendMessageToBackground({ mapPicked });
}

function Test(test) {
    sendMessageToBackground({ test });
}

function extractMapPickedInfo() {
    Test("works");
    const mapPickContainers = document.querySelectorAll('.middleSlot');

    mapPickContainers.forEach(container => {
        const stringHTML = container.textContent;

        const mapNames = ['Overpass', 'Mirage', 'Ancient', 'Anubis', 'Nuke', 'Inferno', 'Vertigo'];

        mapNames.forEach(mapName => {
            if (stringHTML.includes(mapName)) {
                handleMapPick(mapName);
                observer.disconnect(); // Disconnect the observer when a map is picked
            }
        });
    });
}

function sendMessageToChat(message) {
    // Identify the chat input field element
    const chatInput = document.querySelector('textarea[placeholder*="Message"]');
    if (chatInput && chatInput.closest('.chat-input')) {
        // Fill the chat input field with the message
        chatInput.value = message;

        // Trigger a 'input' event on the input field to simulate user input (if necessary)
        chatInput.dispatchEvent(new Event('input'));
        
        // Trigger a 'keydown' event on the input field to simulate Enter key press
        chatInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    } else {
        console.error('Chat input field not found.');
    }
}

// Function to check for URL changes and re-enable the observer
function checkURLChange() {
    const currentURL = window.location.href;
    if (currentURL !== previousURL) {
        // If URL has changed, re-enable the observer and set the previous URL to the current one
        observer.observe(document.body, observerConfig); // Re-enable the observer
        previousURL = currentURL;
    }
}

// Call the function initially when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    extractMapPickedInfo();
    checkURLChange(); // Check URL change when DOM is loaded
});

// Create a MutationObserver to watch for changes in the document
const observer = new MutationObserver(function(mutations) {
    // Run the function whenever there's a change in the document
    extractMapPickedInfo();
});

// Configure the MutationObserver to watch for changes in the entire document body
const observerConfig = { childList: true, subtree: true };

// Variable to store the previous URL
let previousURL = window.location.href;

// Check for URL changes periodically
setInterval(checkURLChange, 1000); // Check every second for URL changes
