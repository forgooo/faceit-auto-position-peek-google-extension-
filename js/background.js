// Background script (background.js)
// This script runs in the background and can be used to handle events or perform tasks that need to happen independently of the web pages.

// Listen for messages from content script and perform actions
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.mapPicked) {
        // Log the picked map to the console
        console.log('Map picked:', message.mapPicked);
        chrome.storage.sync.get('autoMessage', function(data) {
            var savedPositions = data.autoMessage[message.mapPicked.toLowerCase()];
            console.log(savedPositions);
        });
    }



    if (message.test) {
        // Log the picked map to the console
        console.log(message.test);
    }

    // Check if the message contains data to be saved to Chrome storage
    if (message.saveMessage) {
        // Save the message to Chrome storage
        chrome.storage.sync.set({ 'autoMessage': message.saveMessage }, function() {
            console.log('Position saved:', message.saveMessage);
        });
    }
    // You can add more message handling logic here if needed
});
