(function($){
    $.fn.ieplaceholder=function(className){
        if(navigator.userAgent.indexOf("MSIE")!=-1) {

            this.each(function(){
                var placehold=$(this).attr("placeholder");
                $(this).addClass(className).val(placehold);
                $(this).focus(function(){
                    if($(this).val()==placehold){
                        $(this).removeClass(className).val("");
                    }
                });
                $(this).blur(function(){
                    if($(this).val().length==0||/\s*\t*/.test($(this).val())){
                        $(this).addClass(className).val(placehold);
                    }
                })
            }); 
            
           
        } 

    }
})(jQuery)