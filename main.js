
(function(){
    var F = {
        log : function(log){
            $('#log').html(log);
            chrome.tabs.sendRequest({greeting: log}, function(response) {

            });
        }
    };







    F.log('api start');
    chrome.browserAction.setBadgeText({text: "11111"});

})();


