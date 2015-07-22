(function($){
    $.fn.swipe=function(options){
        var defaults={
            timeout:5000,//5000ms
            events:'mouseenter'
        }
        var obj=$.extend(defaults,options);
        var domThis=this;
        var num=domThis.find("li").length;
        var strBtn='<div class="btnlst">';
        var timeInterval=null;
        for(var i=0;i<num;i++){
            strBtn+="<span>&nbsp;</span>";
        }
        strBtn+="</div>";
        $(domThis).append(strBtn);
        $(domThis).find(".btnlst>span:first").addClass("on");
        if(num<=1){
            domThis.find(".btnlst").hide();
        }
        var btn=$(domThis).find(".btnlst span");
        var li=$(domThis).find("li");
        btn.bind(obj.events,function(){
            var n=$(this).index();
            li.eq(n).stop(false,true).fadeIn(1000).siblings().stop(false,true).fadeOut(1000)
            $(this).addClass("on").siblings().removeClass("on");
        });
        if(typeof obj.timeout=="number"){
           
            clearInterval(timeInterval);
             var i=1
            timeInterval=setInterval(function(){
                speedT(".btnlst>span")
            },obj.timeout);

            li.hover(function(){
                 clearInterval(timeInterval);
            },function(){
                timeInterval=setInterval(function(){
                    speedT(".btnlst>span")
                },obj.timeout);
            })
            
        }
        function speedT(element){
            $(domThis).find(element).eq(i).trigger(obj.events);
            if(i<num-1){
                i++;
            }else{
                i=0;
            }
        }

    }
})(jQuery)