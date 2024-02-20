document.addEventListener('DOMContentLoaded', function () {
    var saveBtn = document.getElementById('saveBtn');

    // Add click event listener to the save button
    saveBtn.addEventListener('click', function () {
        // Retrieve position data from input fields
        var miragePosition = document.getElementById('mirage').value;
        var nukePosition = document.getElementById('nuke').value;
        var overpassPosition = document.getElementById('overpass').value;
        var vertigoPosition = document.getElementById('vertigo').value;
        var ancientPosition = document.getElementById('ancient').value;
        var infernoPosition = document.getElementById('inferno').value;
        var anubisPosition = document.getElementById('anubis').value;

        // Send message to background script to save position data
        chrome.runtime.sendMessage({
            saveMessage: {
                mirage: miragePosition,
                nuke: nukePosition,
                overpass: overpassPosition,
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
            document.getElementById('overpass').value = savedPositions.overpass || '';
            document.getElementById('vertigo').value = savedPositions.vertigo || '';
            document.getElementById('ancient').value = savedPositions.ancient || '';
            document.getElementById('inferno').value = savedPositions.inferno || '';
            document.getElementById('anubis').value = savedPositions.anubis || '';
        }
    });
});
