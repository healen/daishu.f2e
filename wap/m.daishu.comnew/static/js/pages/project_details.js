$(".tabbtn").tab(".content-tab");
$("div[data-jd]").each(function(){
	var num_jd=$(this).attr("data-jd");
	$(this).css({
		width:num_jd
	})
})