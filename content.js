// content.js

// Функция для отправки сообщений в фоновый скрипт
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage(message);
}

// Функция для обработки события "пик карты" командой
function handleMapPick(mapPicked) {
    console.log('Карта пикнута:', mapPicked);
    // Здесь вы можете добавить код для отправки сообщения с информацией о пикнутой карте в фоновый скрипт
}

// Помещаем скрипт для извлечения информации о пикнутой карте
function extractMapPickedInfo() {
    // Получаем все элементы с классом "sc-eWzPuF", предполагая, что это контейнеры для каждого блока информации о пикнутой карте
    const mapPickContainers = document.querySelectorAll('.sc-eWzPuF');

    // Проходим по каждому контейнеру
    mapPickContainers.forEach(container => {
        // Ищем элементы, содержащие информацию о карте
        const mapElement = container.querySelector('.sc-jItbzw .bctuZo');

        // Если элемент с информацией о карте найден, извлекаем текст карты
        if (mapElement) {
            const mapPicked = mapElement.textContent;
            // Вызываем функцию для обработки пикнутой карты
            handleMapPick(mapPicked);
        }
    });
}

// Вызываем функцию для извлечения информации о пикнутой карте, когда страница загружена
window.addEventListener('load', extractMapPickedInfo);
