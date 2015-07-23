(function($){
	/**
	 * [yzm description]
	 * @param  {[type]}
	 * @param  {[type]}
	 * @param  {Function}
	 * @return {[type]}
	 */
	$.fn.yzm=function(times,callBackStart,callBackEnd){
		var sves=times;
		var timeout=null;
		this.live("click",function(){
			callBackStart && callBackStart();
			if($(this).attr("disabled")!="disabled"){
				var that=$(this);
				clearInterval(timeout);
				that.attr("disabled", "disabled");
				timeout=setInterval(function(){
					that.val(times + "秒再次发送");
	                times--;
	                if (times < 0) {
	                    clearInterval(timeout);
	                    that.val("发送验证码");
	                    times = sves;
	                    that.removeAttr("disabled");
	                    callBackEnd && callBackEnd();
	                }
				},1000)

			}
		})
	}
	


})(Zepto)