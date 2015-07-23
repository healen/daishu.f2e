(function($){
	$.fn.tab=function(root,callback) {
	    this.live("click", function() {
	        var pare = $(this).parents(root);
	        var index = $(this).index();
	        $(this).addClass("on").siblings().removeClass("on");
	        pare.find(".conto").eq(index).show();
	        pare.find(".conto").eq(index).siblings().hide();
	        callback && callback();

	    });
	}
})(Zepto);