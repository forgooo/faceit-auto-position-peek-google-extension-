document.addEventListener('DOMContentLoaded', function () {
    var messageInput = document.getElementById('message');

    // Load saved message
    chrome.storage.sync.get('autoMessage', function(data) {
        if (data.autoMessage) {
            messageInput.value = data.autoMessage;
        }
    });

    // Save message
    document.getElementById('saveBtn').addEventListener('click', function () {
        var message = messageInput.value;
        chrome.storage.sync.set({ 'autoMessage': message }, function() {
            console.log('Message saved: ' + message);
        });
    });
});
