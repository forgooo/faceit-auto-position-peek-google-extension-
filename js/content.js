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
                console.log("Map picked:", mapName);
                handleMapPick(mapName);
            }
        });
    });
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
