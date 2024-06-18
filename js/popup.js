document.addEventListener('DOMContentLoaded', function () {
    var saveBtn = document.getElementById('saveBtn');

    // Add click event listener to the save button
    saveBtn.addEventListener('click', function () {
        // Retrieve position data from input fields
        var miragePosition = document.getElementById('mirage').value;
        var nukePosition = document.getElementById('nuke').value;
        var dust2Position = document.getElementById('dust2').value;
        var vertigoPosition = document.getElementById('vertigo').value;
        var ancientPosition = document.getElementById('ancient').value;
        var infernoPosition = document.getElementById('inferno').value;
        var anubisPosition = document.getElementById('anubis').value;

        // Send message to background script to save position data
        chrome.runtime.sendMessage({
            saveMessage: {
                mirage: miragePosition,
                nuke: nukePosition,
                dust2: dust2Position,
                vertigo: vertigoPosition,
                ancient: ancientPosition,
                inferno: infernoPosition,
                anubis: anubisPosition
            }
        }, function(response) {
            // Output a message to the console indicating that the map positions have been saved
            console.log('Map positions saved successfully:', response);
        });
    });

    // Retrieve saved position data and populate input fields
    chrome.storage.sync.get('autoMessage', function(data) {
        var savedPositions = data.autoMessage;
        if (savedPositions) {
            document.getElementById('mirage').value = savedPositions.mirage || '';
            document.getElementById('nuke').value = savedPositions.nuke || '';
            document.getElementById('dust2').value = savedPositions.dust2 || '';
            document.getElementById('vertigo').value = savedPositions.vertigo || '';
            document.getElementById('ancient').value = savedPositions.ancient || '';
            document.getElementById('inferno').value = savedPositions.inferno || '';
            document.getElementById('anubis').value = savedPositions.anubis || '';
        }
    });
});
