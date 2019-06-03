
// Variable holding the on/off state for the web extention
var yorExtensionState = {"enabled": true};
// Add listener for receiving communication from background script
browser.runtime.onMessage.addListener( (message) => {
    removeOverlays();
  });

function removeOverlays() {
        browser.storage.local.get("yorExtensionState").then(gotYORState, onError);
        // Check if our extension is enabled
        if (yorExtensionState.enabled) {
            // Video overlays
            $('.ytp-ce-video').map(function () {
                // Hide the element
                $( this ).css('display', 'none');
            });
            // Channel overlays
            $('.ytp-ce-channel').map(function () {
                // Hide the element
                $( this ).css('display', 'none');
            });
            // Playlist overlays
            $('.ytp-ce-playlist').map(function () {
                // Hide the element
                $( this ).css('display', 'none');
            });
            
        } else {
            // Video overlays
            $('.ytp-ce-video').map(function () {
                // Show the element
                $( this ).css('display', 'inline');
            });
            // Channel overlays
            $('.ytp-ce-channel').map(function () {
                // Show the element
                $( this ).css('display', 'inline');
            });
            // Playlist overlays
            $('.ytp-ce-playlist').map(function () {
                // Show the element
                $( this ).css('display', 'inline');
            });
        }
        // Run the function every 3 seconds
        setTimeout(removeOverlays, 3000);
}

// When the switch state changes
$('#onOffSwitchYOR').change(function() {
    // Set the current state
    yorExtensionState.enabled = ($('#onOffSwitchYOR').is(":checked"));
    // Save the current state
    browser.storage.local.set({yorExtensionState});
    // Get the current active tab
    browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
        // YouTube URL pattern
        let urlPattern = new RegExp("^((http[s]?):\/\/.*youtube.com.*)");
        // Get the current active tab URL
        var currentTabUrl = tabs[0].url;
        // Check if we are on a YouTube webpage by URL
        if (urlPattern.test(currentTabUrl)) {
            // Reload the tab
            browser.tabs.reload();
        }
    });
});

$(document).ready(function() {
    // Load the extension previous state
    browser.storage.local.get("yorExtensionState").then(gotYORState, onError);
});


function gotYORState(item) {
    // Set the button to the previous state
    let enabledValue = item.yorExtensionState.enabled;
    if(typeof(enabledValue) === "boolean"){
        $('#onOffSwitchYOR').prop('checked', enabledValue);
        yorExtensionState.enabled = enabledValue;
    } else {
        console.log("Error while loading previous Youtube Overlay Remover On/Off state.");
    }
}

function onError(error) {
    console.log(error);
  }