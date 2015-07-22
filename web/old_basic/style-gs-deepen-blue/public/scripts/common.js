(function ($) {
    function alertpopup(content, title, width, height) {
        if (height > 0) {
            content = "<div style='text-align:center;height:" + height + "px;line-height:" + height + "px;'>" + content + "</div>";
        }

        $.popup({
            title: title, //标题
            content: content, //内容
            close: false, //是否关闭
            closeCallback: false,
            popupStyle: "",
            popupPosition: "fixed",
            Dwidth: width,
            btnList: [
                {
                    "class": "",
                    "text": "确认",
                    "callback": function () {
                        $.close(".popup");
                    }
                }
            ]
        });
    }

    function confirmpopup(content, callback, title, width, height) {
        if (height > 0) {
            content = "<div style='text-align:center;height:" + height + "px;line-height:" + height + "px;'>" + content + "</div>";
        }

        $.popup({
            title: title, //标题
            content: content, //内容
            close: false, //是否关闭
            closeCallback: false,
            popupStyle: "",
            popupPosition: "fixed",
            Dwidth: width,
            btnList: [
                {
                    "class": "",
                    "text": "确认",
                    "callback": function () {
                        callback && callback();
                    }
                },
                {
                    "class": "comfbox",
                    "text": "取消",
                    "callback": function () {
                        $.close(".popup");
                    }
                }
            ]
        });
    }

    function pagepopup(url, title, width, okbtnText, okbtnCallBack, cancalbtnText, cancelbtnCallBack) {
        $.ajax({
            url: url,
            global: true,
            type: 'GET',
            dataType: "html",
            success: function (result) {
                $.popup({
                    title: title, //标题
                    content: result, //内容
                    close: true, //是否关闭
                    closeCallback: null,
                    popupStyle: "jihuo",
                    popupPosition: "fixed",
                    Dwidth: width,
                    btnList: [
                         {
                             "class": "",
                             "text": okbtnText,
                             "callback": function () {
                                 if (typeof okbtnCallBack == "function") {
                                     okbtnCallBack && okbtnCallBack();
                                     return;
                                 }

                                 $.close(".popup");
                             }
                         },
                         {
                             "class": "comfbox",
                             "text": cancalbtnText,
                             "callback": function () {
                                 if (typeof cancelbtnCallBack == "function") {
                                     cancelbtnCallBack && cancelbtnCallBack();
                                     return;
                                 }

                                 $.close(".popup");
                             }
                         }
                    ]
                });
            },
            error: function () {
                $.alert("格式错误");
            }
        });
    }

    function pagepopupnobtn(url, title, width) {
        $.ajax({
            url: url,
            global: true,
            type: 'GET',
            dataType: "html",
            success: function (result) {
                $.popup({
                    title: title, //标题
                    content: result, //内容
                    close: true, //是否关闭
                    closeCallback: null,
                    popupStyle: "jihuo",
                    popupPosition: "fixed",
                    Dwidth: width,
                    btnList: [
                    ]
                });
            },
            error: function () {
                $.alert("格式错误");
            }
        });
    }

    //消息提示框
    $.alert = function (content, title, width, height) {
        if (title == "undefined" || title == null) {
            title = "确认信息";
        }

        if (width == "undefined" || width == null) {
            width = 350;
        }

        if (height == "undefined" || height == null) {
            height = 50;
        }

        alertpopup(content, title, width, height);
    };

    //信息确认框
    $.confirm = function (content, callback, title, width, height) {
        if (title == "undefined" || title == null) {
            title = "确认信息";
        }

        if (width == "undefined" || width == null) {
            width = 350;
        }

        if (height == "undefined" || height == null) {
            height = 50;
        }

        confirmpopup(content, callback, title, width, height);
    };

    //有按钮弹出框
    $.page = function (url, title, width, okbtnText, okbtnCallBack, cancalbtnText, cancelbtnCallBack) {
        if (okbtnText == "undefined" || okbtnText == null) {
            okbtnText = "确认";
        }

        if (cancalbtnText == "undefined" || cancalbtnText == null) {
            cancalbtnText = "取消";
        }

        if (okbtnCallBack == "undefined" || okbtnCallBack == null) {
            okbtnCallBack = null;
        }

        if (cancelbtnCallBack == "undefined" || cancelbtnCallBack == null) {
            cancelbtnCallBack = null;
        }

        pagepopup(url, title, width, okbtnText, okbtnCallBack, cancalbtnText, cancelbtnCallBack);
    };

    //无按钮弹出框
    $.openpopup = function (url, title, width) {
        if (title == "undefined" || title == null) {
            title = "确认信息";
        }

        if (width == "undefined" || width == null) {
            width = 350;
        }

        pagepopupnobtn(url, title, width);
    };

    $.logout = function () {
        $.confirm("确定是否要退出？", function () {
            $.ajax({
                url: $('#hidLogoutSubmitUrl').val(),
                type: 'POST',
                dataType: "json",
                success: function (result) {
                    if (result.State) {
                        window.location.href = window.location.href;
                        $.close('.popup');
                        return;
                    }

                    $.alert(result.Message);
                },
                error: function () {
                    $.alert("格式错误");
                }
            });
        });
    }

    $.login = function () {
        $.page($("#hidLoginPartUrl").val(), "用户登录", 480, "登录", login(function () {
            window.location.href = window.location.href;
            $.close('.popup');
        }));
    };
})(jQuery);