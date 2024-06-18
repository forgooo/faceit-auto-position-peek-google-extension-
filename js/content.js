// Функция для отправки сообщений в фоновый скрипт
function sendMessageToBackground(message) {
    console.log(`Sending message to background: ${JSON.stringify(message)}`);
    chrome.runtime.sendMessage(message);
}

function handleMapPick(mapPicked) {
    console.log(`Map picked: ${mapPicked}`);
    sendMessageToBackground({ mapPicked });
}

function Test(test) {
    console.log(`Test: ${test}`);
    sendMessageToBackground({ test });
}

function extractMapPickedInfo() {
    Test("works");
    const mapPickContainers = document.querySelectorAll('.middleSlot');

    mapPickContainers.forEach(container => {
        const stringHTML = container.textContent;

        const mapNames = ['Dust2', 'Mirage', 'Ancient', 'Anubis', 'Nuke', 'Inferno', 'Vertigo'];

        mapNames.forEach(mapName => {
            if (stringHTML.includes(mapName)) {
                handleMapPick(mapName);
                setTimeout(() => {  // Добавляем задержку в 1 секунду перед отправкой сообщения
                    chrome.storage.sync.get('autoMessage', function(data) {
                        if (chrome.runtime.lastError) {
                            console.error(`Error getting storage data: ${chrome.runtime.lastError}`);
                        } else {
                            var savedPositions = data.autoMessage ? data.autoMessage[mapName.toLowerCase()] : null;
                            console.log(`Saved positions for ${mapName}:`, savedPositions);
                            if (savedPositions) {
                                sendMessageToChat(savedPositions);
                            } else {
                                console.warn(`No saved positions found for ${mapName}`);
                            }
                        }
                    });
                }, 1000);
                observer.disconnect(); // Disconnect the observer when a map is picked
            }
        });
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.positions) {
        console.log(`Received positions: ${message.positions}`);
        sendMessageToChat(message.positions);
    }
});

function sendMessageToChat(message) {
    Test("in");
    // Find all textarea elements whose placeholder starts with "Message team_"
    const textAreas = document.querySelectorAll('textarea[placeholder^="Message team_"]');

    console.log(`Found ${textAreas.length} text area(s)`);

    // Loop through each textarea element
    textAreas.forEach(textArea => {
        // Fill the chat input field with the message
        textArea.value = message;

        // Trigger a 'input' event on the input field to simulate user input (if necessary)
        textArea.dispatchEvent(new Event('input', { bubbles: true }));

        // Trigger a 'keydown' event on the input field to simulate Enter key press
        textArea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, which: 13, bubbles: true }));
        Test("sended");
    });
}


// Function to check for URL changes and re-enable the observer
function checkURLChange() {
    const currentURL = window.location.href;
    if (currentURL !== previousURL) {
        console.log(`URL changed from ${previousURL} to ${currentURL}`);
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
    console.log('DOM mutations detected');
    // Run the function whenever there's a change in the document
    extractMapPickedInfo();
});

// Configure the MutationObserver to watch for changes in the entire document body
const observerConfig = { childList: true, subtree: true };

// Variable to store the previous URL
let previousURL = window.location.href;

// Check for URL changes periodically
setInterval(checkURLChange, 1000); // Check every second for URL changes
