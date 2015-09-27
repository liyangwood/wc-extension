(function(){

    var host = 'https://wx2.qq.com';
    var port = null;

    var F = {
        log : function(str){
            var log = $('#js_log').html();

            $('#js_log').html(str+'<br/><br/>'+log);
        },
        eval : chrome.devtools.inspectedWindow.eval,
        evalString : function(str){
            return chrome.devtools.inspectedWindow.eval('('+str+')');
        },
        checkRequest : function(request){
            var url = request.url;
            if(url.indexOf('wx2.qq.com/cgi-bin/mmwebwx-bin/webwxsync') > 0) return 'webwxsync';
            if(url.indexOf('wx2.qq.com/cgi-bin/mmwebwx-bin/webwxbatchgetcontact') > 0) return 'webwxbatchgetcontact';
            if(url.indexOf('wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetcontact') > 0) return 'webwxgetcontact';


            return false;
        },

        wxRequest : function(type, request, callback){
            callback = callback || function(){};
            request.getContent(function(content){
                switch(type){
                    case 'webwxsync':
                        F.log(content);
                        break;
                    case 'webwxgetcontact':
                        var json = JSON.parse(content);
                        var h = '';
                        $.each(json.MemberList, function(index, item){
                            h += '<img title="'+item.UserName+'" style="width:20px;height:20px;" src="'+host+item.HeadImgUrl+'" />';
                            F.log(JSON.stringify(item));
                        });

                        $('#img_div').html(h);

                        break;
                }
            }, 'utf8');

        },

        sendTextMessage : function(opts){

            F.postMessage({
                WX_TYPE : 'sendTextMessage',
                Content: "你好",
                MsgType: 1,
                ToUserName: "@f7f7e5d884a103872aec32944c9dbcfacf23d47fb86a5eac52fa0f267efcd464"
            });

            return;
            var injector = null;
            F.eval('angular.element(document.body).injector().get("chatFactory")', function(rs, err){
                if(err){
                    F.log(err);
                    return;
                }
                injector = rs;
                F.log(JSON.stringify(rs));

                //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.runtime.sendMessage({obj: rs}, function(response) {

                    });
               // });

                return;

                //var chat = injector.get('chatFactory');
                //F.log(chat);

                var chat = rs;

                var tmpMsg = chat.createMessage({
                    Content: "你好",
                    MsgType: 1,
                    ToUserName: "@f7f7e5d884a103872aec32944c9dbcfacf23d47fb86a5eac52fa0f267efcd464"
                });
                F.log(JSON.stringify(tmpMsg));
                chat.sendMessage(tmpMsg);

            });

        },

        postMessage : function(msg){
            port.postMessage(msg);
        }
    };

    port = chrome.extension.connect({
        name: "Sample Communication"
    });

    port.onMessage.addListener(function (msg) {
        F.log(msg);
    });


    chrome.devtools.network.onFinished.addListener(function(request){
        var flag = F.checkRequest(request.request);
        if(flag){
            F.wxRequest(flag, request);
        }
    });



    $('.js_btn').click(function(){
        F.sendTextMessage();
    });

})();
