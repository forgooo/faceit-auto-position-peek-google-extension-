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
                chrome.storage.sync.get('autoMessage', function(data) {
                    var savedPositions = data.autoMessage[message.mapPicked.toLowerCase()];
                    sendMessageToChat(savedPositions);
                });
            }
        });
    });
}

function sendMessageToChat(message) {
    // Identify the chat input field element
    const chatInput = document.querySelector('textarea[placeholder*="Message"]');
    if (chatInput) {
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

// Call the function initially when DOM content is loaded
document.addEventListener('DOMContentLoaded', extractMapPickedInfo);

// Create a MutationObserver to watch for changes in the document
const observer = new MutationObserver(function(mutations) {
    // Run the function whenever there's a change in the document
    extractMapPickedInfo();
});

// Configure the MutationObserver to watch for changes in the entire document body
const observerConfig = { childList: true, subtree: true };

// Start observing changes in the document body
observer.observe(document.body, observerConfig);
