(function($){

    $.popup=function(opts){
        var closeHTML = "";//关闭按钮HTML
        //功能按钮HTML
        var btnShowHTML = "";
        var btnsHTML = "";
        /*默认参数*/
        var docuemntW=$(document).width();
        var documentH=$(document).height();

        var dialogW,dialogH
        
        var Default = {
                title: "标题", //标题
                content: "内容", //内容
                close: true, //是否关闭
                closeCallback:null,
                Dwidth: "",
                popupPosition:"fixed",
                btnList: [
                    // {
                    //     "class": "",
                    //     "text": "确认",
                    //     "callback": null
                    // },
                    // {
                    //     "class": "comfbox",
                    //     "text": "取消",
                    //     "callback": null
                    // }
                ]
        };


        var obj = $.extend(Default, opts);

         /*是否关闭*/
        obj.close ? closeHTML = "<a class='close'></a>" : closeHTML = "";

        if (obj.btnList.length > 0) {
            for (var i = 0; i < obj.btnList.length; i++) {
                btnsHTML += "<span class='popupbtn " + obj.btnList[i]['class'] + "'>" + obj.btnList[i]['text'] + "</span>";
            }
            btnShowHTML = "<div class='popupbtnbox'>" + btnsHTML + "</div>";

        }else{
            btnShowHTML = "";
        }
        obj.Dwidth = "" ? "" : obj.Dwidth;//弹出层样式
        if (typeof obj.content === "string") {
            obj.content;
        } else if (typeof obj.content === "function") {
            obj.content = (obj.content)();
        }
        var popupHTML = "<div class='popup'>"
                + "<div class='mask'></div>"
                + "<div class='dialog' style='position:"+obj.popupPosition+";width:"+obj.Dwidth+"px'>"
                + closeHTML 
                + "<div class='dialog-content'>"
                + "<div class='dialog-title'><span>" + obj.title + "</span></div>"
                + "<div class='warp'>"
                + obj.content
                + "</div>"
                + btnShowHTML
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>";
        $("#popup").html(popupHTML);

        $(".popup .mask").css({
            "width":docuemntW,
            "height":documentH,
            "background-color":"#000000",
            "opacity":"0.5",
            "position":"fixed",
            "top":"0px",
            "left":"0px",
            "z-index":"1000"
        })
        dialogW=$(".popup .dialog").width();
        dialogH=$(".popup .dialog").height();

        $(".popup .dialog").css({
            "z-index":"1001",
            "left":"50%",
            "top":"50%",
            "margin-left":-dialogW/2,
            "margin-top":-dialogH/2
        })

        if ($(".popup .popupbtn").length > 0) {
            $(".popup .popupbtn").bind("click", function() {
                var i = $(this).index();
                (obj.btnList[i]['callback'])&&(obj.btnList[i]['callback'])();
            });
        }


        $(".popup a.close").live("click", function() {
            $.close(".popup");
            (obj.closeCallback)&&(obj.closeCallback)();
        });

         function showPopup(object) {
            $(object).css({
                "display": "block"
            });
        }
        showPopup(".popup");

        $.close = function(element, callback) {
            $(element).css({
                "display":"none"
            });
            callback && callback();
        };
    }


})(jQuery)