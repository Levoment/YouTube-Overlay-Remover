// Show a message on the console indicating that the extension was loaded on the webpage
console.info("YouTube Overlay Remover Loaded");
var currentStatus;

// Set a listener for when messages are received from the background script
browser.runtime.onMessage.addListener(handleReceivedMessages);

function handleReceivedMessages(message, sender, sendResponse) {
    // If the message is 'yorStatusChanged'
    if (message.operation == 'yorStatusChanged') {
        // Set the current status
        currentStatus = message.currentStatus;
        if (currentStatus) {
            // Observe changes in the DOM
            observer.observe(targetNode, observerOptions);
        }
    }
}

// Set the target element to scan for changes
var targetNode = document.getElementById('movie_player');

// Set the MutationObserver options
var observerOptions = {
    // False to improve performance
    childList: false,
    // Monitor the class changes
    attributeFilter: ["class"],
    // Monitor nodes within the target node
    subtree: true
}

// Create the MutationObserver
var observer = new MutationObserver(mutationObserverCallback);

// Get the current state of the extension
var sendMessage = browser.runtime.sendMessage({ "operation": "getCurrentState" }, handleGetStatusResponse);

// Function to handle responses from the background script
function handleGetStatusResponse(message) {
    currentStatus = message.currentStatus;
    // If enabled
    if (message.currentStatus) {
        // Start observing for changes in the DOM
        observer.observe(targetNode, observerOptions);
    }
}

function mutationObserverCallback(mutationList, mutationObserver) {
    // Get all elements with class 'ytp-ce-element'
    var elements = document.getElementsByClassName("ytp-ce-element");
    // If elements were found
    if (elements.length > 0) {
        // Iterate through the elements
        for (var i = 0; i < elements.length; i++) {
            // Change the element display style to none
            elements[i].style.display = "none";
        }
    }
    // Get all elements with class 'branding-img'
    elements = document.getElementsByClassName("branding-img");
    // If there are elements
    if (elements.length > 0) {
        // Iterate through the elements
        for (var i = 0; i < elements.length; i++) {
            // Change the element display style to none
            elements[i].style.display = "none";
        }
    }

    // Get all elements with class 'ytp-ce-expanding-image'
    elements = document.getElementsByClassName("ytp-ce-expanding-image");
    // If there are elements
    if (elements.length > 0) {
        // Iterate through the elements
        for (var i = 0; i < elements.length; i++) {
            // Change the element display style to none
            elements[i].style.display = "none";
        }
    }

    // Get all elements with class 'ytp-ce-channel'
    elements = document.getElementsByClassName("ytp-ce-channel");
    // If there are elements
    if (elements.length > 0) {
        // Iterate through the elements
        for (var i = 0; i < elements.length; i++) {
            // Change the element display style to none
            elements[i].style.display = "none";
        }
    }

    // Check if the extension status is disabled
    if (!currentStatus) {
        elements = document.getElementsByClassName("ytp-ce-element");
        // If elements were found
        if (elements.length > 0) {
            // Iterate through the elements
            for (var i = 0; i < elements.length; i++) {
                // Change the element display style to block
                elements[i].style.display = "block";
            }
        }
        // Get all elements with class 'branding-img'
        elements = document.getElementsByClassName("branding-img");
        // If there are elements
        if (elements.length > 0) {
            // Iterate through the elements
            for (var i = 0; i < elements.length; i++) {
                // Change the element display style to block
                elements[i].style.display = "block";
            }
        }

        // Get all elements with class 'ytp-ce-expanding-image'
        elements = document.getElementsByClassName("ytp-ce-expanding-image");
        // If there are elements
        if (elements.length > 0) {
            // Iterate through the elements
            for (var i = 0; i < elements.length; i++) {
                // Change the element display style to block
                elements[i].style.display = "block";
            }
        }

        // Get all elements with class 'ytp-ce-channel'
        elements = document.getElementsByClassName("ytp-ce-channel");
        // If there are elements
        if (elements.length > 0) {
            // Iterate through the elements
            for (var i = 0; i < elements.length; i++) {
                // Change the element display style to block
                elements[i].style.display = "block";
            }
        }
    }

}