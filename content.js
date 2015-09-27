(function(){
    chrome.extension.onMessage.addListener(function (message, sender) {
        console.log(message, sender);

        switch(message.WX_TYPE){
            case 'sendTextMessage' :

                var js = document.createElement('script');
                js.src = 'https://127.0.0.1:3001/wxjs/test.js';
                document.head.appendChild(js);

                return;
                var chat = F.getChatObject();

                var tmpMsg = chat.createMessage({
                    Content: message.Content,
                    MsgType: 1,
                    ToUserName: message.ToUserName
                });
                chat.sendMessage(tmpMsg);

                chrome.extention.sendMessage('send message success');

                break;
        }


        //chrome.extension.sendMessage("My URL is" + window.location.origin);
    });

    //alert(111);


    var CHAT_OBJECT = null;
    var F = {
        init : function(){
            var injector = angular.element(document.body).injector();
            CHAT_OBJECT = injector.get('chatFactory');

        },
        getChatObject : function(){
            if(!CHAT_OBJECT){
                F.init();
            }

            return CHAT_OBJECT;
        }
    };



})();
