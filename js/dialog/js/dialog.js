$(document).ready(function(){
	//提示框
	//$(document.body).append('<div id="blackDialog" style="display:none;width:100%; height:100%; position:absolute; top:0;left:0; z-index:9999999999; "><div style="width:5.4rem; height:1rem; font-size: 0.26rem; color:#fff; text-align:center; position:absolute; left:50%; top:50%; margin-left:-2.6rem; margin-top:-0.75rem;border-radius:0.2rem; "><table cellspacing="0" cellspacing="0" style="width:100%; height:100%; border:none; position:absolute; left:0px; top:0px;border-radius:0.2rem;"><tr style="border:none;"><td class="text" align="center" valign="middle" style="line-height:0.3rem; color:#FFF; padding:0.3rem; border:none; background-color:rgba(0,0,0,0.8);border-radius:0.2rem;"></td></tr></table></div></div>');
	//询问框
	$(document.body).append('<div class="mask"><div class="dialog1"><div class="close"><img src="../dialog/img/close.png" /></div><h3></h3><p><span></span></p><button class="diaConfirm"></button><button class="back bgcolor-white"></button></div></div>');
	//协议询问框
	$(document.body).append('<div class="maskXieyi"><div class="dialog1"><div class="close"><img src="../dialog/img/close.png" /></div><h3></h3><p><input type="checkbox" name="" style="padding-top:0.266rem" id="xieyi" value="" /><span></span></p><button class="diaConfirm"></button><button class="back bgcolor-white"></button></div></div>');
	
	$(".mask .close").click(function(){
		$(".mask").fadeOut(500);
	});
	$(".maskXieyi .close").click(function(){
		$(".maskXieyi").fadeOut(500);
	});
	// 点击任何地方，让弹窗消失
	$(".mask").click(function(){   
		$(".mask").fadeOut(500);
	});
	// 点击任何地方，让弹窗消失
	$(".maskXieyi").click(function(){   
		$(".maskXieyi").fadeOut(500);
	});
	// 点击弹窗 阻拦(外层事件)(stopPropagation阻拦click事件冒泡) 及实现了 点击弹窗之外的任何地方  让弹窗隐藏
	$('.dialog1').click(function(event){ 
		event.stopPropagation();  
	});
});
var whiteDialog = {
			defaultDelay : 2000,
			confirm : '确认',
			back : '返回',
			show : function(callback,callback2,text1,text2,confirm,back,skin){
				$(".mask").on('touchmove', function (event) {
					event.stopPropagation();
				});
				if(skin == 'skin-default'){
					$(".desc").addClass("color-red");
					
					$(".diaConfirm").addClass("bgcolor-red");
					
					$(".back").addClass("bordcolor-red color-red");
				}
				if(skin == 'skin-blue'){
					$(".desc").removeClass("color-red");
					$(".desc").addClass("color-blue");
					
					$(".diaConfirm").removeClass("bgcolor-red");
					$(".diaConfirm").addClass("bgcolor-blue");
					
					$(".back").removeClass("bordcolor-red color-red");
					$(".back").addClass("bordcolor-blue color-blue");
				}
				$(".dialog1 h3").html(text1);
				$(".dialog1 p span").html(text2);
				$(".dialog1 p span").on('click',function(){
					$('.proup').css('display','block');	
				});
				
				//$(".dialog1 .desc").html(text);
				$(".mask").show();
				if(confirm==undefined||confirm==null){
						confirm = this.confirm;
				}
				if(back==undefined||back==null){
						back = this.back;
				}
				$(".dialog1 .diaConfirm").html(confirm).click(function(){
					$(".mask").fadeOut(500);
					callback();
				});
				$(".dialog1 .back").html(back).click(function(){
					$(".mask").fadeOut(500);
					callback2();
				});
			},
			xieyi : function(callback,callback2,text1,text2,confirm,back,skin){
				$(".maskXieyi").on('touchmove', function (event) {
					event.stopPropagation();
				});
				if(skin == 'skin-default'){
					$(".desc").addClass("color-red");
					
					$(".diaConfirm").addClass("bgcolor-red");
					
					$(".back").addClass("bordcolor-red color-red");
				}
				if(skin == 'skin-blue'){
					$(".desc").removeClass("color-red");
					$(".desc").addClass("color-blue");
					
					$(".diaConfirm").removeClass("bgcolor-red");
					$(".diaConfirm").addClass("bgcolor-blue");
					
					$(".back").removeClass("bordcolor-red color-red");
					$(".back").addClass("bordcolor-blue color-blue");
				}
				$(".dialog1 h3").html(text1);
				$(".dialog1 p span").html(text2);
				$(".dialog1 p span").on('click',function(){
					$('.proup').css('display','block');	
				});
				
				//$(".dialog1 .desc").html(text);
				$(".maskXieyi").show();
				if(confirm==undefined||confirm==null){
						confirm = this.confirm;
				}
				if(back==undefined||back==null){
						back = this.back;
				}
				$(".dialog1 .diaConfirm").html(confirm).click(function(){
					callback();
					//$(".maskXieyi").fadeOut(500);
				});
				$(".dialog1 .back").html(back).click(function(){
					$(".maskXieyi").fadeOut(500);
					callback2();
				});
			}
	};