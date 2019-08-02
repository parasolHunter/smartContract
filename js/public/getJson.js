var ajaxStatus = false;
var retData = '';

var jsonCall = function(options) {
	if (options.pathPrefix != null) {
		file = "" + options.pathPrefix + "/" + "text-" + options.language + "." + options.dataType;
	}
	var ajaxOptions = {
	    url: file,
	    type: 'get',
	    dataType: "json",
	    async: true,
	    beforeSend: function(){
			if(ajaxStatus == true){
				console.log("正在请求中。。。。。");
				return;
			}
			ajaxStatus = true;//锁定请求
			loadingDialog.show();//显示屏蔽层
		},
		success: function (ret) {
			console.log(ret);
//			localStorage.setItem("retDatas",JSON.stringify(ret));
			return retData = ret;
		},
		complete: function(){
			ajaxStatus = false;//解除锁定
			loadingDialog.hide();//关闭屏蔽层
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			ajaxStatus = false;//解除锁定
			loadingDialog.hide();//关闭屏蔽层
    	}
	};
	return $.ajax(ajaxOptions);
};

if(getCookie("language") == "en") {
	jsonCall({pathPrefix: "../lang", language: "en", dataType: "json"});
}else{
	jsonCall({pathPrefix: "../lang", language: "cn", dataType: "json"});	
}