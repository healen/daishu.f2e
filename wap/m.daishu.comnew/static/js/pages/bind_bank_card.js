$(".verification").yzm(10,function(){
	alert("发送成功");
})


$(".clause").on("click",function(){
	if($(this).hasClass("on")){
		$(this).removeClass("on");
	}else{
		$(this).addClass("on");
	}
})
