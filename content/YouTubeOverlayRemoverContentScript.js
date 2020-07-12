// Show a message on the console indicating that the extension was loaded on the webpage
console.info("YouTube Overlay Remover Loaded");
var currentStatus;

// Variable holding the current url
var currentURL = document.URL;

// Set a timeout variable in case the movie player doesn't load
var timeout;
// Set the target element to scan for changes
var targetNode = document.getElementById('movie_player');

// Primary target node
var primaryNode = document.getElementById('primary');
// Search page target node
var pageManagerTargetNode = document.getElementById('page-manager');

// Set the MutationObserver options
var primaryNodeObserverOptions = {
    // False to improve performance
    childList: false,
    // Monitor the class changes
    attributeFilter: ["class"],
    // Monitor nodes within the target node
    subtree: true
}

// Create the MutationObserver for the primary node
var primaryNodeObserver = new MutationObserver(primaryNodeMutationObserverCallback);
// Create the mutation observer for the page manager node
var pageManagerObserver = new MutationObserver(primaryNodeMutationObserverCallback);

function primaryNodeMutationObserverCallback(mutationList, mutationObserver) {
    // Get the current URL
    currentURL = document.URL;
    const regex = RegExp(".youtube.com\/watch*");
    if (regex.test(currentURL)) {
        // Check if the target element was succesfully gathered
        if (typeof targetNode !== 'undefined' && targetNode != null) {
            // Get the current status of the extension
            getCurrentStatus();
        } else {
            // The element was not gathered. Poll to gather it
            timeout = setTimeout(function () {
                targetNode = document.getElementById('movie_player');
                // If the target element was gathered
                if (typeof targetNode !== 'undefined' && targetNode != null) {
                    // Get the current status of the extension
                    getCurrentStatus();
                }
            }, 3000);
        }
    }
}

primaryNodeObserver.observe(primaryNode, primaryNodeObserverOptions);
pageManagerObserver.observe(pageManagerTargetNode, primaryNodeObserverOptions);

function getCurrentStatus() {
    // If the timeout was used
    if (typeof targetNode !== 'undefined' && targetNode != null) {
        // Clear it out
        clearTimeout(timeout);
    }

    // Depending on the type of browser the extension is running on, ask the background script for the extension's current state
    if (typeof browser !== 'undefined' && (typeof browser.runtime !== 'undefined' && browser.runtime != null)) {
        // Ask for the extension current state and set where to listen for the response
        browser.runtime.sendMessage({ "operation": "getCurrentState" }, handleGetStatusResponse);
    } else if (typeof chrome !== 'undefined' && (typeof chrome.runtime !== 'undefined' && chrome.runtime != null)) {
        // Ask for the extension current state and set where to listen for the response
        chrome.runtime.sendMessage({ "operation": "getCurrentState" }, handleGetStatusResponse);
    }
}

if (typeof browser !== 'undefined' && (typeof browser.runtime !== 'undefined' && browser.runtime != null)) {
    // Set a listener for when messages are received from the background script
    browser.runtime.onMessage.addListener(handleReceivedMessages);
} else if (typeof chrome !== 'undefined' && (typeof chrome.runtime !== 'undefined' && chrome.runtime != null)) {
    // Set a listener for when messages are received from the background script
    chrome.runtime.onMessage.addListener(handleReceivedMessages);
}


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

    // Get all elements with class 'ytp-ce-covering-overlay'
    elements = document.getElementsByClassName("ytp-ce-covering-overlay");
    // If there are elements
    if (elements.length > 0) {
        // Iterate through the elements
        for (var i = 0; i < elements.length; i++) {
            // Change the element display style to none
            elements[i].style.display = "none";
        }
    }

    // Get all elements with class 'ytp-ce-expanding-overlay'
    elements = document.getElementsByClassName("ytp-ce-expanding-overlay");
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

        // Get all elements with class 'ytp-ce-covering-overlay'
        elements = document.getElementsByClassName("ytp-ce-covering-overlay");
        // If there are elements
        if (elements.length > 0) {
            // Iterate through the elements
            for (var i = 0; i < elements.length; i++) {
                // Change the element display style to none
                elements[i].style.display = "block";
            }
        }

        // Get all elements with class 'ytp-ce-expanding-overlay'
        elements = document.getElementsByClassName("ytp-ce-expanding-overlay");
        // If there are elements
        if (elements.length > 0) {
            // Iterate through the elements
            for (var i = 0; i < elements.length; i++) {
                // Change the element display style to none
                elements[i].style.display = "block";
            }
        }
    }
}