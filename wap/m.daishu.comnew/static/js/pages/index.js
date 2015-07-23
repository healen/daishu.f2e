var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    effect: 'cube',
    grabCursor: true,
    cube: {
        shadow: false,
        slideShadows: false,
        shadowOffset: 20,
        shadowScale: 0.94
    },
    loop: true,
    //autoplay: 4000,
    onTouchMove: function(swiper){
        $(".intopic").addClass("noradius");
    },
    onTouchEnd: function(swiper){
         $(".intopic").removeClass("noradius");
         

    },
   onSlideChangeEnd: function(swiper){
     $('.huala').chaffle().trigger("mouseover");

    }
});
$(".timer").each(function(){
    var _this=$(this);
    var h=$(this).find(".h");
    var m = $(this).find(".m");
    djs(_this,h,m);
})

function djs(obj,hh,mm,ss){
    function GetRTime(){
    var timeString=obj.attr("data-time");
    var EndTime= new Date(timeString);
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var d =0;
    var h =0;
    var m =0;
    var s =0;
    if(t>=0){
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
    hh.html(h);
    mm.html(m);
    if(ss){
        ss.html(s);
    }
   
    }
    setInterval(GetRTime,0);
}



