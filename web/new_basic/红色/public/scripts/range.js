/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function($){
    $.fn.range=function(opt){
        opt.darg=false;
        var _this=this;
        var eachthis;
        opt.init=function(obj){
            obj.each(function(){
               randler(this);
            });
        }
       
    
        var doHanderbar      = this.find(".handerbar");
        var dragging           =false;
        var iX

        doHanderbar.mousedown(function(e){
                var doLine=$(this).parent().find(".line");
                var partent=$(this).parents(".range");
                var doInitNumber=partent.find("input[name='InitNumber']");//初始值
                var doStepNumber=partent.find("input[name='StepNumber']");//步数
                var doResult=partent.find("input[name='Result']");//
                var doStep=partent.find("input[name='Step']");
                var doClassprise=partent.find(".prise");
               
                var doRangebar= $(this).parent();
                var widths=parseInt(doRangebar.width()/doStepNumber.val()/10);
                dragging = true;
                var _this =$(this);
                iX = e.clientX - this.offsetLeft;
                // this.setCapture && this.setCapture();
                document.onmousemove = function(e) {
                    if (dragging) {
                        var e = e || window.event;
                        var oX = e.clientX - iX;
                        if(e.clientX<=_this.parent().offset().left){
                            oX=_this.parent().offset().left;
                            return 
                        }else if(e.clientX>=_this.parent().offset().left+_this.parent().width()){
                            oX=_this.parent().width();
                            return
                        }
                       
                        var num=doLine.width()/widths;
                        var fidx=parseInt(num);
                        doInitNumber.val(fidx);
                        doClassprise.val(fidx*doStep.val()/10);
                        _this.css({"left":oX + "px"});
                        doLine.css({"width":(oX+14)+"px"});
                    }
                };
                $(document).mouseup(function(e) {
                  // if(){

                  // }
                  if(e.target.className=="numbar add"||e.target.className=="numbar plus"){
                    return;
                  }
                    if(doInitNumber.val()<=0){
                      _this.css({"left":-14 + "px"});
                      doLine.css({"width":0+"px"});
                      doInitNumber.val(0);
                    }
                   if(doInitNumber.val()>=doStepNumber.val()*10-3){
                      _this.css({"left":doRangebar.width()-14 + "px"});
                      doLine.css({"width":doRangebar.width()+"px"});
                      doInitNumber.val(doStepNumber.val()*10);
                      doClassprise.val();
        
                      doClassprise.val(doResult.val()*doStepNumber.val()/10);
                    }
                    dragging = false;
                    e.cancelBubble = true;
                })
        })





     
        function randler(op){
                var domInitNumber     = $(op).find("input[name='InitNumber']");//初始值
                var domStep           = $(op).find("input[name='Step']");//步长
                var domStepNumber     = $(op).find("input[name='StepNumber']");//总步数
                var domResult         = $(op).find("input[name='Result']");//返回值

                var domRangebar       = $(op).find(".rangebar");
                var domHanderbar      = $(op).find(".handerbar");
                var domShowScale      = $(op).find('.showScale');
                var domshowSmallScale = $(op).find('.showSmallScale');
                var panter            = $(op).find(".prise");
                var domLine           = $(op).find(".line");

              


                
               /*已知 初始值  步长  求返回值 
                *
                *初始值*步长=返回值
                *
                **/
                domResult.val(domInitNumber.val()*domStep.val());
               /*
               *已知 返回值  步长  求步数
               *(返回值/步长)取整=步数
               * 
               */
                if(domStepNumber.val()==""){
                     domStepNumber.val(parseInt(domResult.val()/domStep.val()));
                }
                /*
               *已知 返回值  总步数  步长
               *(返回值/总步数)取整=步长
               * 
               */
                if(domStep.val()==""){
                     domStep.val(parseInt(domResult.val()/domStepNumber.val()));
                }
               /**/
               var current = parseInt(domRangebar.width()/domStepNumber.val());

               if(parseInt(domInitNumber.val()) > parseInt(domStepNumber.val())*10){
                    
                    return ;
               }
               domHanderbar.css({
                    left:current/10*domInitNumber.val()-14+"px"
                },100);
               domLine.css({
                    width:current/10*domInitNumber.val()+14+"px"
               },100);
               /*拖拽*/

               if(panter){
                    panter.val(domResult.val()/10);
                    panter.keyup(function(){
                        var parents    =$(this).parents(".range");
                        var val        =$(this).val();
                        var Step       =parents.find("input[name='Step']");
                        var StepNumber =parents.find("input[name='StepNumber']");
                        var InitNumber =parents.find("input[name='InitNumber']");
                        var dom        =parents.find(".rangebar");
                        var Handerbar  =parents.find(".handerbar");
                        var Line       = parents.find(".line");
                        var beishu     =val/Step.val()/StepNumber.val();
                        var W          =dom.width()*beishu;


                        if($(this).val() ==""||isNaN($(this).val())){
                          return;
                        }
                        

                        

                        if($(this).val() > Step.val()*StepNumber.val()){
                          W=dom.width();
                        }

                        Handerbar.css({
                            left:W-14+"px"
                          });
                          Line.css({
                            width:W+"px"
                          });
                          domResult.val(parseInt($(this).val())*10)

                          var inits=parseInt(domResult.val()/Step.val());
                          InitNumber.val(inits);
                       
                        


                        
                    })
               }

                

               var HTMLbigScale="";
               var HTMLSmallScale="";
               for(var i=0;i<=parseInt(domStepNumber.val());i++){
                    HTMLbigScale+="<div class='big-scale' style='left:"+current*i+"px'><span>"+i*domStep.val()+domShowScale.attr("data-Company")+"</span></div>";
                    for(var j=0;j<=domStepNumber.val()*10;j++){
                        HTMLSmallScale+="<div class='samll-scale' style='left:"+parseInt(current/10*j)+"px'></div>\n"
                    }
               }

             
               if(domShowScale){
                    domShowScale.html(HTMLbigScale);
               }
               if(domshowSmallScale){
                    domshowSmallScale.html(HTMLSmallScale);
               }


        }
        $(_this).find("div.add").click(function(){
            var par=$(this).parents(".range");
            var InitNumber=par.find("input[name='InitNumber']").val();
            var StepNumber=par.find("input[name='StepNumber']").val();
           
            if(parseInt(InitNumber) >= parseInt(StepNumber)*10){
                return ;
            }
             InitNumber++
            par.find("input[name='InitNumber']").val(InitNumber);
           
            opt.init(par);
           
        })
        $(_this).find("div.plus").click(function(){
            var par=$(this).parents(".range");
            var InitNumber=par.find("input[name='InitNumber']").val();
            var StepNumber=par.find("input[name='StepNumber']").val();
          
            if(parseInt(InitNumber) <= 0){
                return ;
            }
            InitNumber--
            par.find("input[name='InitNumber']").val(InitNumber)
            opt.init(par);
        });

        var timeout=null

        $(_this).find("div.add").mousedown(function(){
            clearInterval(timeout);
            var $This=$(this);
            timeout=setInterval(function(){
              $This.trigger("click");
            },200);
            $(this).mouseup(function(){
              clearInterval(timeout);
            })
        })

        $(_this).find("div.plus").mousedown(function(){
            clearInterval(timeout);
            var $This=$(this);
            timeout=setInterval(function(){
              $This.trigger("click");
            },200);
            $(this).mouseup(function(){
              clearInterval(timeout);
            })
        })

       








        opt.init(_this);

        // $(_this).find("input").change(function(){
        //     opt.init(_this);
        // })


    }
})(jQuery)