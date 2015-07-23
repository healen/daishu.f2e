(function($){
	$.loading=function(opt){
		var HTMLS='<div class="loading"><i class="icoFt icon-loading4"></i></div>'
		if(opt=="add"){
			if($(".loading").length==0){
				$("body").append(HTMLS);
			}
		}else if(opt="remove"){
			if($(".loading").length==1){
				$(".loading").remove();
			}
			
		}
	}
})(Zepto);