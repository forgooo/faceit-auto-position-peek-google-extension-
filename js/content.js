// Функция для отправки сообщений в фоновый скрипт
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage(message);
}

function handleMapPick(mapPicked) {
    console.log('Карта пикнута:', mapPicked);
    sendMessageToBackground({ mapPicked });
}

function extractMapPickedInfo() {
    const mapPickContainers = document.querySelectorAll('[data-testid="matchPreference"]');

    mapPickContainers.forEach(container => {
        const stringHTML = container.textContent;

        const mapNames = ['Overpass', 'Mirage', 'Ancient', 'Anubis', 'Nuke', 'Inferno', 'Vertigo']; // Add other map names as needed

        mapNames.forEach(mapName => {
            if (stringHTML.includes(mapName)) {
                handleMapPick(mapName);
            }
        });
    });
}

// Вызываем функцию для извлечения информации о пикнутой карте, когда страница загружена
window.addEventListener('load', extractMapPickedInfo);
