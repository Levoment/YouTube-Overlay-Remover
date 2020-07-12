// Add a listener for incoming messages
if (typeof browser !== 'undefined' && (typeof browser.runtime !== 'undefined' && browser.runtime != null)) {
    browser.runtime.onMessage.addListener(handleMessages);
} else if (typeof chrome !== 'undefined' && (typeof chrome.runtime !== 'undefined' && chrome.runtime != null)) {
    chrome.runtime.onMessage.addListener(handleMessages);
}

// Variable to keep the extension status
var currentStatus;

// Function to handle incoming messages
function handleMessages(message, sender, sendResponse) {
    // If asked to set the current state
    if (message.operation == 'setCurrentState') {
        // Set the current state (enabled or disabled)
        currentStatus = message.currentStatus;
        // Query the tabs and notify the content scripts of changes
        if (typeof browser !== 'undefined' && (typeof browser.runtime !== 'undefined' && browser.runtime != null)) {
            let querying = browser.tabs.query({
            }, notifyOfChanges);
        } else if (typeof chrome !== 'undefined' && (typeof chrome.runtime !== 'undefined' && chrome.runtime != null)) {
            let querying = chrome.tabs.query({
            }, notifyOfChanges);
        }
        
    } else if (message.operation == 'getCurrentState') {
        // We are asked to give the current state of the extension
        // Get if we currently have a status
        if (currentStatus != null) {
            // Respond with the current status
            sendResponse({ "currentStatus": currentStatus });
        } else {
            // Respond with status: enabled
            sendResponse({ "currentStatus": true });
        }
    }
}

// Function to notify the content scripts of changes
function notifyOfChanges(tabs) {
    // Iterate through all the given tabs
    for (let tab of tabs) {
        // Send a message to the tabs to indicate the content scripts the status of the extension
        if (typeof browser !== 'undefined' && (typeof browser.runtime !== 'undefined' && browser.runtime != null)) {
            browser.tabs.sendMessage(
                tab.id,
                { "operation": "yorStatusChanged", "currentStatus": currentStatus }
            );
        } else if (typeof chrome !== 'undefined' && (typeof chrome.runtime !== 'undefined' && chrome.runtime != null)) {
            chrome.tabs.sendMessage(
                tab.id,
                { "operation": "yorStatusChanged", "currentStatus": currentStatus }
            );
        }
        
    }
}