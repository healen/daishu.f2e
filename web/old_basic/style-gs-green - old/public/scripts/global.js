$(function(){	
	$(".i-tips").live('hover',function(event){ 
		if(event.type=='mouseenter'){ 
			var self = $(this);
			var aTop = self.offset().top + 35;
			var aLeft = self.offset().left-84;
			var aHeight = self.outerHeight();
			var aWidth = self.outerWidth();
			var content = '';
			if($(this).hasClass("i-mortgage")){
				content = self.parent().nextAll(".mortgage-tips").html();
			}else{
				content = self.parent().nextAll(".guarantee-tips").html();
			}
			
			$("body").append("<div class='tool-tips' style='position: absolute;left:"+aLeft+"px;top:"+aTop+"px'><div class='tool-tips-up'></div><div class='items p15'>"+content+"</div></div>");
		}else{ 
			$(".tool-tips").remove();	
		} 
	}) 
	$(".table-list-item").hover(function(){
		$(this).addClass("bg-gray");	
	},function(){
		$(this).removeClass("bg-gray");		
	})
	$(".invest-speed-line").each(function(){
		$(this).animate({width:$(this).attr("data-value")+"%"});
	})
	$(".nav-list-top").hover(function(){
        var index = $(".nav-list-top").index($(this));
		$(".nav-dropdown").eq(index).show();	
	},function(){
        var index = $(".nav-list-top").index($(this));
		$(".nav-dropdown").eq(index).hide();	
	})
	
	$("#online-service-hide").click(function(){
		$("#online-service-show").show();
		$(this).hide();	
		$("#online-service-show").animate({right:0},200);
	})
	$("#online-service-show").hover(function(){

	},function(){
		$("#online-service-show").animate({right:-140},200);	
		$("#online-service-hide").show(350);
	})
});
function setcookie(name,value){   
    var Days = 30;   
    var exp  = new Date();   
    exp.setTime(exp.getTime() + Days*24*60*60*1000);   
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();   
};