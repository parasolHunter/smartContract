$(document).ready(function(){
	//提示框
	$(document.body).append('<div id="blackDialog"><div class="main"><table cellspacing="0" cellspacing="0"><tr style="border:none;"><td class="text" align="center" valign="middle"></td></tr></table></div></div>');
	//询问框
	$(document.body).append('<div id="blackConfirm" onclick="payOut(this)"><div class="main"><table cellspacing="0" cellspacing="0"><tr style="border:none;"><td colspan="2" class="text" align="center" valign="middle"></td></tr><tr><td><div class="flex justifyEnd input_btn"><div class="cancelBtn"></div><div class="confirmBtn"></div></div></td></tr></table></div></div>');
	//输入框
	$(document.body).append('<div id="blackInput" onclick="payOut(this)"><div class="main"><table cellspacing="0" cellspacing="0"><tr style="border:none;"><td colspan="2" class="title" align="center" valign="middle"></td></tr><tr style="border:none;"><td colspan="2" class="text" align="center" valign="middle"><input type="text" placeholder=""/><div class="tips"></div></td></tr><tr><td><div class="flex justifyEnd input_btn"><div class="cancelBtn"></div><div class="confirmBtn"></div></div></td></tr></table></div></div>');
	//温馨提示框
	$(document.body).append('<div id="tipsDialog" onclick="payOut(this)"><div class="tips_item"><div class="tips_item_content"><div class="tips_item_content_text1">温馨提示</div><div class="tips_item_content_text2"></div></div><div class="tips_item_content_btn"></div></div></div>');
	//支付提示框
	$(document.body).append('<div id="payDialog" onclick="payOut(this)"><div class="pay_item"><div class="pay_item_content"><div class="pay_item_content_text1">输入支付密码</div><div class="pay_item_content_text2"></div><div><input type="password" placeholder=""/></div></div><div class="pay_item_content_btn"></div></div></div>');
	//签到提示框
	$(document.body).append('<div id="signDialog" onclick="signOut(this)"><div class="sign"></div></div>');
});
var t=null;
var blackDialog = {
		defaultDelay : 1000,
		show : function(text,delay,callback){
			clearTimeout(t);
			$("#blackDialog .text").html(text);
			$("#blackDialog").fadeIn();
			if(delay==undefined||delay==null){
				delay = this.defaultDelay;
			}
			t=setTimeout(function(){
				$("#blackDialog").fadeOut(500);
			},delay);
		},
		reload : function(text,delay,callback){
			$("#blackDialog .text").html(text);
			$("#blackDialog").show();
			if(delay==undefined||delay==null){
				delay = this.defaultDelay;
			}
			setTimeout(function(){
				$("#blackDialog").fadeOut(500,function(){
					window.location.reload();
				});
			},delay);
		},
		redirect : function(text,redirectUrl,delay,callback){
			$("#blackDialog .text").html(text);
			$("#blackDialog").show();
			if(delay==undefined||delay==null){
				delay = this.defaultDelay;
			}
			setTimeout(function(){
				$('#blackDialog').fadeOut(500,function(){
					if(redirectUrl==undefined||redirectUrl == null){
						history.go(-1);
					}else{
						window.location.href=redirectUrl;
					}
				});
			},delay);
		}
};



var blackConfirm = {
		confirmBtn : '确认',
		cancelBtn : '取消',
		show : function(text,confirm,cancel,confirmBtn,cancelBtn){
			$("#blackConfirm .text").html(text);
			$("#blackConfirm").fadeIn();
			if(confirmBtn==undefined||confirmBtn==null){
				confirmBtn = this.confirmBtn;
			}else{
				confirmBtn = confirmBtn;
			}
			if(cancelBtn==undefined||cancelBtn==null){
				cancelBtn = this.cancelBtn;
			}else{
				cancelBtn = cancelBtn;
			}
			$("#blackConfirm .confirmBtn").html(confirmBtn).click(function(){
				$("#blackConfirm .confirmBtn").unbind();
				$("#blackConfirm .cancelBtn").unbind();
				$("#blackConfirm").hide();
				confirm();
			});
			$("#blackConfirm .cancelBtn").html(cancelBtn).click(function(){
				$("#blackConfirm .confirmBtn").unbind();
				$("#blackConfirm .cancelBtn").unbind();
				$("#blackConfirm").hide();
				cancel();
			});
		}
};


var blackInput = {
		defaultDelay : 2000,
		confirmBtn : '确认',
		cancelBtn : '取消',
		show : function(title,text,maxlength,confirmBtn,cancelBtn,callback){
			$("#blackInput .title").html(title);
			$("#blackInput input").attr("placeholder",text);
			$("#blackInput").fadeIn();
			if(maxlength!=undefined&&maxlength!=null){
				if(!valid(maxlength,0)){
					$("#blackInput .tips").text(maxlength);
				}else{
					$("#blackInput input").attr("maxlength",maxlength);
				}
			}
			if(confirmBtn==undefined||confirmBtn==null){
				confirmBtn = this.confirmBtn;
			}
			if(cancelBtn==undefined||cancelBtn==null){
				cancelBtn = this.cancelBtn;
			}
			$("#blackInput .confirmBtn").html(confirmBtn).click(function(){
				$("#blackInput .confirmBtn").unbind();
				$("#blackInput .cancelBtn").unbind();
//				$("#blackInput").hide();
				callback();  
			});
			$("#blackInput .cancelBtn").html(cancelBtn).click(function(){
				$("#blackInput .confirmBtn").unbind();
				$("#blackInput .cancelBtn").unbind();
				$("#blackInput").hide();
			});
		}
};

var tipsDialog = {
		show : function(text1,text2,confirmBtn,confirm){
			$("#tipsDialog .tips_item .tips_item_content .tips_item_content_text1").html(text1);
			$("#tipsDialog .tips_item .tips_item_content .tips_item_content_text2").html(text2);
			$("#tipsDialog").fadeIn();
			if(confirmBtn==undefined||confirmBtn==null){
				confirmBtn = this.confirmBtn;
			}
			$("#tipsDialog .tips_item .tips_item_content_btn").html(confirmBtn).click(function(){
				$("#tipsDialog .tips_item .tips_item_content_btn").unbind();
				$("#tipsDialog").hide();
				if(confirm!=undefined&&confirm!=null){
					confirm();
				}
			});
		}
};

var payDialog = {
		show : function(text,confirmBtn,confirm,message,maxlength){
			$("#payDialog .pay_item .pay_item_content .pay_item_content_text2").html(message);
			$("#payDialog input").attr("placeholder",text);
			if(maxlength!=undefined&&maxlength!=null){
				$("#payDialog input").attr("maxlength",maxlength);
			}
			$("#payDialog").fadeIn();
			if(confirmBtn==undefined||confirmBtn==null){
				confirmBtn = this.confirmBtn;
			}
			$("#payDialog .pay_item .pay_item_content_btn").html(confirmBtn).click(function(){
				//$("#payDialog .pay_item .pay_item_content_btn").unbind();
				if(confirm!=undefined&&confirm!=null){
					confirm();
				}
			});
		},
		hide : function(){
			$("#payDialog .pay_item .pay_item_content_btn").unbind();
			$("#payDialog").fadeOut();
		}
};

var signDialog = {
		defaultDelay : 2000,
		show : function(type,delay,callback){
			if(delay==undefined||delay==null){
				delay = this.defaultDelay;
			};
			if(type==0){
				$("#signDialog").fadeIn(function(){
					$(".sign").addClass("sign_active");
				});
			}else{
				$("#signDialog").fadeIn(function(){
					$(".sign").addClass("sign_pos_right sign_active");
				});
			};
		}
};

function signOut(){
	$("#signDialog").fadeOut(function(){
		$(".sign").removeClass("sign_active");
	});
};

function payOut(obj){
	var e=window.event || arguments.callee.caller.arguments[0];
	if(e.target.id == $(obj).attr("id")){
		$(obj).fadeOut();
	}
}

/*$(document).ready(function(){
	blackConfirm.show("确认",function(){dd()});
});
function dd(){
	alert(111)
}*/