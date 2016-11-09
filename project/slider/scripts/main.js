requirejs.config({
	shim: {
	  'fullPage': ['jquery'],
	  'DD_belatedPNG_0.0.8a': ['jquery']
    },
	paths:{
		jquery:'jquery.min',
		'fullPage' : 'fullPage.min',
		'DD_belatedPNG_0.0.8a' : 'DD_belatedPNG_0.0.8a-min'
	}
});

requirejs(['jquery','fullPage','DD_belatedPNG_0.0.8a'],function($){

	var Common ={
      $:function(id){return document.getElementById(id);},
      bannerhover:function(){
          var  $top_btn_android = $(".btnbig.a");
          var  $top_btn_ios = $(".btnbig.i");
          var  $top_code = $(".btnbig").parent().next();
          $top_btn_android.hover(function(){
                  if($(this).has(!'.currb')){
                     $(this).siblings().removeClass('currb');
                     $(this).addClass('currb');
                     $top_code.find(".andrcodeb").css("display","block");
                     $top_code.find(".iphocodeb").css("display","none");
                         
                  }else{
                        $top_code.find(".andrcodeb").css("display","block");
                        $top_code.find(".iphocodeb").css("display","none");
                  }
          });
          
          $top_btn_ios.hover(function(){
                  if($(this).has(!'.currb')){
                     $(this).siblings().removeClass('currb');
                     $(this).addClass('currb');
                     $top_code.find(".andrcodeb").css("display","none");
                     $top_code.find(".iphocodeb").css("display","block");
                  }else{
                         
                     $top_code.find(".andrcodeb").css("display","none");
                     $top_code.find(".iphocodeb").css("display","block");
                  }
          })
            
          var  $bottom_btn_android = $(".btnsmal.a");
          var  $bottom_btn_ios = $(".btnsmal.i");
          var  $bottom_code = $(".btnsmal").parent().next();
          $bottom_btn_android.hover(function(){
                  if($(this).has(!'.curr')){
                     $(this).siblings().removeClass('curr');
                     $(this).addClass('curr');
                     $bottom_code.find(".andrcode").css("display","block");
                     $bottom_code.find(".iphocode").css("display","none");
                         
                  }else{
                        $bottom_code.find(".andrcode").css("display","block");
                        $bottom_code.find(".iphocode").css("display","none");
                  }
          });
          
          $bottom_btn_ios.hover(function(){
                  if($(this).has(!'.curr')){
                     $(this).siblings().removeClass('curr');
                     $(this).addClass('curr');
                     $bottom_code.find(".andrcode").css("display","none");
                     $bottom_code.find(".iphocode").css("display","block");
                  }else{
                         
                     $bottom_code.find(".andrcode").css("display","none");
                     $bottom_code.find(".iphocode").css("display","block");
                  }
          })

          $('.arrow').on("click",function(){
              $.fn.fullpage.moveTo($(this).attr("data-menuanchor"));
          });
      }
    };



	 // 页面初始化
    $(function() {



     if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { 
        $('.arrow').hide();
        $('.content .wrap .load').css("margin","40px");
        Height = $(window).height();
        $(".section1,.section2,.section3").height(Height);
		DD_belatedPNG.fix('.btnbig, .currb.btnbig, .iconIphobg, .iconAndrbg,.btnsmal,.iconIphosm,.curr.iconIphosm,.iconAndrsm,.curr.iconAndrsm,.andrcode,.iphocode,.btnsmal,.btnsmal.curr,h2,a,img,background'); 
      } else{
        $('#dowebok').fullpage({
           'navigation': true
        });

      }
        Height = $(window).height();
        $(".section0,.section1,.section2,.section3,.section5").height(Height);

        var w = $(window).width();
        var posiw = w/2-51;
        $('.arrow').css({"bottom":"0","left": posiw});
        $(".fp-tableCell").height(0);
        
        Common.bannerhover();

    }); 

//**==============手机滚图============================================================================
/**
			 * parallelRoll 左右无缝滚动
			 * boxName : 最外层盒子类名
			 * tagName : 滚动标签元素
			 * time : 滚动间隔时间
			 * direction : 滚动方向  right-->向右    left-->向左
			 * visual : 可视数
			 * prev : 上一张
			 * next : 下一张
			 * author : MR chen  370489175@qq.com
			 * Date: 15-03-19
			 * */
			(function($){
				$.fn.parallelRoll = function(options){
					var opts = $.extend({}, $.fn.parallelRoll.defaults, options);
					var _this = this;					
					var l = _this.find(opts.tagName).length;
					var autoRollTimer;
					var flag = true; // 防止用户快速多次点击上下按钮
					var arr = new Array();
					/**
					 * 如果当  (可视个数+滚动个数 >滚动元素个数)  时  为不出现空白停顿   将滚动元素再赋值一次
					 * 同时赋值以后的滚动元素个数是之前的两倍  2 * l.
					 * */
					if(opts.amount + opts.visual > l){
						_this[0].innerHTML += _this[0].innerHTML;
						l = 2 * l;
					}else{
						l = l;
					}					
					var w = $(opts.tagName).outerWidth(true); //计算元素的宽度  包括补白+边框
					_this.css({width: (l * w) + 'px'}); // 设置滚动层盒子的宽度
					return this.each(function(){
						_this.closest('.'+opts.boxName).hover(function(){							
							clearInterval(autoRollTimer);
						},function(){							
							switch (opts.direction){
								case 'left':
									autoRollTimer = setInterval(function(){
										left();
									},opts.time);
								break;
								case 'right':
									autoRollTimer = setInterval(function(){
										right();
									},opts.time);
								break;
								default : 
									console.log('参数错误！');
								break;
							}							
						}).trigger('mouseleave');
						$('.'+opts.prev).on('click',function(){
							flag ? left() : "";
						});
						$('.'+opts.next).on('click',function(){
							flag ? right() : "";
						});
					});					
					function left(){
						flag = false;
						_this.animate({marginLeft : -(w*opts.amount)},1000,function(){
							_this.find(opts.tagName).slice(0,opts.amount).appendTo(_this);
							_this.css({marginLeft:0});
							flag = true;
						});
					};
					function right(){
						flag = false;
						arr = _this.find(opts.tagName).slice(-opts.amount);										
						for(var i = 0; i<opts.amount; i++){
							$(arr[i]).css({marginLeft : -w*(i+1)}).prependTo(_this);
						}										
						_this.animate({marginLeft : w*opts.amount},1000,function(){
							_this.find(opts.tagName).removeAttr('style');
							_this.css({marginLeft:0});
							flag = true;
						});
					};
				};
				//插件默认选项
			    $.fn.parallelRoll.defaults = {
			    	boxName : 'box',
			        tagName : 'dd',
			        time : 3000,  // 
			        direction : 'left', // 滚动方向
			        visual : 1, //可视数
			        prev : 'prev',
			        next : 'next',
			        amount : 1   // 滚动数  默认是1
			    };
			})(jQuery);
			
			$(document).ready(function(){
				$("#roll").parallelRoll({
					amount : 1
				});	
							
			});

// 方法结束
});