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
                    var savedPositions = data.autoMessage[mapName.toLowerCase()];
                    console.log(savedPositions);
                    sendMessageToChat(savedPositions);
                });
                observer.disconnect(); // Disconnect the observer when a map is picked
            }
        });
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.positions) {
        // Call sendMessageToChat function with the received positions
        sendMessageToChat(message.positions);
    }
});

function sendMessageToChat(message) {
    Test("in");
    // Find all textarea elements whose placeholder starts with "Message team_"
    const textAreas = document.querySelectorAll('textarea[placeholder^="Message team_"]');

    // Loop through each textarea element
    textAreas.forEach(textArea => {
        // Extract the team name from the placeholder attribute
        const placeholder = textArea.getAttribute('placeholder');
        const teamName = placeholder.replace('Message team_', ''); // Extract team name

        // Fill the chat input field with the message
        textArea.value = message;

        // Trigger a 'input' event on the input field to simulate user input (if necessary)
        textArea.dispatchEvent(new Event('input'));

        // Trigger a 'keydown' event on the input field to simulate Enter key press
        textArea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
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
