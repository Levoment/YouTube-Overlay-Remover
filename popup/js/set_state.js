// Variables holding the status button and the current state
var stateButton =  document.getElementById('statusButton');
var currentState;

// Get the current state of the extension
var sendMessage = browser.runtime.sendMessage({"operation": "getCurrentState"}, handleResponse);

// Function to handle responses from the background script
function handleResponse(message) {
    // Get the current state of the script
    currentState = message.currentStatus;
    // If enabled
    if (currentState) {
        // Set the status to show it is enabled
        stateButton.className = 'btn btn-primary btn-block';
        stateButton.innerText = 'Enabled';
    } else {
        // Set the status to show it is disabled
        stateButton.className = 'btn btn-danger btn-block';
        stateButton.innerText = 'Disabled';
    }
}

// Run the function to listen for clicks on the extension popup
listenForClicks();

function listenForClicks() {
    // Add an event listener for click
    document.addEventListener("click", (e) => {
        // If the click happened on the status button
        if (e.target.className.includes('btn')) {
            // Change the current state
            changeCurrentState();
        }
    });
}

function changeCurrentState() {
    // If the current is enabled
    if (currentState) {
        // Set the current state to disabled
        stateButton.className = 'btn btn-danger btn-block';
        stateButton.innerText = 'Disabled';
        // Save the current state
        browser.runtime.sendMessage({"operation": "setCurrentState", "currentStatus": false});
        // Update the current state
        currentState = false;
    } else {
        // Set the current state to enabled
        stateButton.className = 'btn btn-primary btn-block';
        stateButton.innerText = 'Enabled';
        // Save the current state
        browser.runtime.sendMessage({"operation": "setCurrentState", "currentStatus": true});
        // Update the current state
        currentState = true;
    }
}