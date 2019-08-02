/** *******纯jq*********** */
var s = "";
var ajaxStatus = false;
function getvercode() {
	var checkCodeImg = document.getElementById("checkCodeImg");
	checkCodeImg.src = "../../code.do?temp" + new Date().getTime().toString(36);
}

function getCode(actionType, enr) {
	var mobile = $("#oMobile").val();

	if (!valid(mobile, 5) && !valid(mobile, 14)) {
		blackDialog.show(retData.login.correctMobile);
		$("#oMobile").focus();
		return;
	}

	var data = {};
	data.transCode = "10001";
	data.mobilePhone = mobile;
	data.actionType = actionType;

	var veriCode = $("#veriCode").val();

	if(enr == 'yes'){
		if (!valid(veriCode)) {
			blackDialog.show($("#veriCode").attr("placeholder"));
			$("#veriCode").focus();
			return;
		}
		data.veriCode = veriCode;
	}

	method.ajax({
		url : publicUrl + '10001.do',
		data : data,
		async : true,
		beforeSend : function() {
			if (ajaxStatus == true) {
				console.log("正在请求中。。。。。");
				return;
			}
			ajaxStatus = true; // 锁定请求
			loadingDialog.show(); // 显示屏蔽层
		},
		success : function(ret) {
			if (ret.respCode == "99999" || ret.respCode == "99990"
					|| ret.respCode == "1") {
				blackDialog.redirect(ret.respMsg, redirectUrl);
			}
			if (ret.respCode == "00000") {
				s = 60;
				blackDialog.show(retData.general.sentSuccess);
				return;
			} else {
				blackDialog.show(ret.respMsg);
				if (enr == "yes") {
					getvercode();
				}
			}
		},
		complete : function() {
			ajaxStatus = false; // 解除锁定
			loadingDialog.hide(); // 关闭屏蔽层
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			ajaxStatus = false; // 解除锁定
			loadingDialog.hide(); // 关闭屏蔽层
		}
	});
}
function reSendMsg() {
	if (s > 0) {
		$(".code").html(s + retData.general.reacquire).attr("disabled",
				"disabled");
	} else {
		$(".code").html(retData.general.send).removeAttr("disabled");
	}
	s--;
}
var timer = setInterval(reSendMsg, 1000);

/** *******ng混用jq********* */
var countdownSetInterval = null;
// 定时器进行定时
function setIntervalFuc() {
	if (countdownSetInterval != null) {
		console.log("清空计时");
		clearInterval(countdownSetInterval);
	}
	var countdownTime = 60;
	countdownSetInterval = setInterval(function() {
		console.log("倒计时中...");
		countdownTime--;
		if (countdownTime > 0) {
			$(".code").css({
				background : "#999999"
			}).html(countdownTime + "秒后重新获取").attr("disabled", "disabled");
		} else {
			$(".code").css({
				background : "#2fb054"
			}).html("获取验证码").removeAttr("disabled");
			clearInterval(countdownSetInterval);
		}
	}, 1000);
}
function ngGetCode(actionType) {
	var appElement = document.querySelector("[ng-controller=myContr]");
	var $scope = angular.element(appElement).scope();
	$scope.publicUrl = publicUrl;
	console.log($scope.url + "----" + actionType);
	if ($scope.username == "" || $scope.username == null
			|| $scope.username == undefined) {
		blackDialog.show("请输入手机号码");
		return false;
	}
	if (!/^1[345789]\d{9}$/.test($scope.username)) {
		blackDialog.show("手机号码输入错误，请重新输入");
		return false;
	}
	$(".proupLoad").show();
	$.ajax({
		url : $scope.publicUrl,
		type : "POST",
		dataType : "json",
		data : {
			transCode : "10004PC",
			mobilePhone : $scope.username,
			actionType : actionType
		},
		success : function(response) {
			console.log(response);
			$(".proupLoad").hide();
			if (response.respCode == "00000") {
				blackDialog.show("短信验证码发送成功");
				setIntervalFuc();
			} else if (response.respCode == "99999") {
				blackDialog.redirect("正在初始化，请稍候再进行操作", "login.html");
			} else {
				blackDialog.show(response.respMsg);
			}
		}
	});
}
