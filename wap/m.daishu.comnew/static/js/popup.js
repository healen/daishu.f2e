// JavaScript Document

(function($) {
    /*弹出层*/
    $.popup = function(opts) {

        var closeHTML = "";//关闭按钮HTML

        
        var btnShowHTML = "";//功能按钮HTML
        var btnsHTML = "";//按钮
        var scalestring = "";//展开效果
        /*默认参数*/
        var docuemntW=$(document).width();
        var documentH=$(document).height();
        var dialogW,dialogH;




        var Default = {
                transfrom: "", //效果
                title: "", //标题
                content: "", //内容
                close: true, //是否关闭
                closeCallback:null,
                Dwidth: "",
                popupPosition:"fixed",
                btnList: [
                    {
                        "class": "",
                        "text": "确认",
                        "callback": null
                    },
                    {
                        "class": "comfbox",
                        "text": "取消",
                        "callback": null
                    }
                ]
        };
        var obj = $.extend(Default, opts);
        
        if (obj.transfrom === "x") {
            scalestring     = "X";
        } else if (obj.transfrom === "y") {
            scalestring = "Y";
        } else if (obj.transfrom === "z") {
            scalestring = "Z";
        }

         /*是否关闭*/
        obj.close ? closeHTML = "<a class='close'><i class='icoFt icon-cross'></i></a>" : closeHTML = "";

        if (obj.btnList.length > 0) {
            for (var i = 0; i < obj.btnList.length; i++) {
                btnsHTML += "<span class='popupbtn " + obj.btnList[i]['class'] + "'>" + obj.btnList[i]['text'] + "</span>";
            }
            btnShowHTML = "<div class='popupbtnbox'>" + btnsHTML + "</div>";

        }else{
            btnShowHTML = "";
        }
        obj.Dwidth = "" ? "" : obj.Dwidth;//弹出层样式
        /*是否有按钮*/
       
       
        if (typeof obj.content === "staring") {
            obj.content;
        } else if (typeof obj.content === "function") {
            obj.content = (obj.content)();
        }
        var popupHTML = "<div class='popup'>"
                + "<div class='dialog " + obj.popupStyle + "' style='width:"+obj.Dwidth+";-webkit-transform:scale" + scalestring + "(0)'>"
                + "<section class='dialog-content'>"
                + "<div class='dialog-title'><span>" + obj.title + "</span>" + closeHTML + "</div>"
                + "<div class='warp'>"
                + obj.content
                + "</div>"
                + btnShowHTML
                + "</div>"
                + "</section>"
                + "</div>"
                + "</div>";
        $("#popup").append(popupHTML);
        if ($(".popup .popupbtn").length > 0) {
            $(".popup .popupbtn").bind("tap", function() {
                var i = $(this).index();
                (obj.btnList[i]['callback'])&&(obj.btnList[i]['callback'])();
            });
        }
        $(".popup a.close").on("tap", function () {
            $.close(".popup");
            (obj.closeCallback) && (obj.closeCallback)();
            window.ontouchmove = function(e) {
                e.preventDefault && e.preventDefault();
                e.returnValue = true;
                e.stopPropagation && e.stopPropagation();
                return true;
            };
        });
        function showPopup(object) {
            var timeout = null;
            clearTimeout(timeout);
            $(object).css({
                "display": "-webkit-box",
                "-webkit-box-pack": "center",
                "-webkit-box-align": "center"
            });
            timeout = setTimeout(function() {
                $(object).find(".dialog").css({
                    "-webkit-transform": "scale" + scalestring + "(1)"
                });
            }, 300);
        }
        showPopup(".popup");
        //在弹框时关闭Loading效果
        $('.loading').remove();
        $.close = function(element, callback) {
            var timeout = null;
            clearTimeout(timeout);
            $(element).find(".dialog").css({
                "-webkit-transform": "scale" + scalestring + "(0)"
            });
            timeout = setTimeout(function() {
                $(element).attr("style", "");
                $(".popup").remove();
            }, 400);

            callback && callback();
        };
    };



})(Zepto);













