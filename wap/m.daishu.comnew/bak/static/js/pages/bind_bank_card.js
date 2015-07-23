$(".verification").yzm(10,function(){
	alert("发送成功");
})


$(".clause").live("click",function(){
	
	if($(this).hasClass("on")){
		$(this).removeClass("on");
	}else{
		$(this).addClass("on");
	}
})
