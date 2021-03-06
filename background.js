(function(){

    chrome.extension.onConnect.addListener(function (port) {
        port.onMessage.addListener(function (message) {

            chrome.tabs.query({
                "status": "complete",
                "currentWindow": true
                //"url": "http://www.google.co.in/"
            }, function (tabs) {

                for (tab in tabs) {
                    //Sending Message to content scripts
                    chrome.tabs.sendMessage(tabs[tab].id, message);
                }
            });

        });
        //Posting back to Devtools
        chrome.extension.onMessage.addListener(function (message, sender) {
            port.postMessage(message);
        });
    });

})();