var lastYORExtensionState;
// Filter tabs only with the following pattern
const youtubePattern = "*://*.youtube.com/*";

// Encapsulate the filters
const tabFilter = {
  urls: [youtubePattern],
  properties: ["status"]
}

 function tabUpdated(tabId, changeInfo, tab) {
     // Check if the change status for the tab is complete
     if(tab.status == 'complete') {
         // Check if we can grab the tab's URL
        if (tab.url) {
            // If the tab's URL has "youtube.com"
            if (tab.url.includes("youtube.com")) {
                // Send a message to the content script
                browser.tabs.sendMessage(tabId, {status: "change"});
            }
        }
    }
  }
  // Set the listener for when a tab is updated
  browser.tabs.onUpdated.addListener(tabUpdated, tabFilter);