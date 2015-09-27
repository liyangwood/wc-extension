(function(){

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
        },

        sendMessage : function(){
            var chat = F.getChatObject();

            var tmpMsg = chat.createMessage({
                Content: "sljfsldfjslfj",
                MsgType: 1,
                ToUserName: "@f3d5773cd75898cbae1e24c4100716077cae2d7f94f3cadfba7b87f7dc862cf3"
            });
            alert(JSON.stringify(tmpMsg));
            alert(chat.sendMessage)
            chat.sendMessage(tmpMsg);
        }

    };

    F.sendMessage();

})();