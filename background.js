// Background script (background.js)
// This script runs in the background and can be used to handle events or perform tasks that need to happen independently of the web pages.

// Example: Listen for messages from content script and perform actions
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Handle messages here
});
