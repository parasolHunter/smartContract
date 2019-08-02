var shengId = '';//申明变量
var shiId = '';
var xianId = '';
var provinceList = null;

var data = {};
data.transCode = '10034';

var ajaxStatus = false;
method.ajax({
	data: data,
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
    	if (ret.respCode == '99999' || ret.respCode == '99990' || ret.respCode == '1') {
			blackDialog.redirect(ret.respMsg,redirectUrl);
		} 

    	if(ret.respCode == '00000'){
    		var e = ret.respData.area0List;
    		provinceList = e;
    		for (var i = 0;i < e.length;i++) {
    			if(e[i].areaName.length < 6){
    				var oHtml = '<option value="'+ e[i].id +'">' + e[i].areaName + '</option>';
    			}else{
    				var oHtml = '<option value="'+ e[i].id +'">' + e[i].areaName.substr(0,5) + '&hellip;</option>';
    			}
    			
    			$("#province").append(oHtml);
    		}
		}else{
			blackDialog.show(ret.respMsg);
		}
    	
    	return provinceList;
	},
	complete: function(){
		ajaxStatus = false;//解除锁定
		loadingDialog.hide();//关闭屏蔽层
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		ajaxStatus = false;//解除锁定
		loadingDialog.hide();//关闭屏蔽层
	}
});

var shi = null;
function searchCity(shengId){
	if(ajaxStatus == true){
		console.log("正在请求中。。。。。");
		return;
	}
	ajaxStatus = true;//锁定请求
	loadingDialog.show();//显示屏蔽层
	$.ajax({
		url: '../../areaJsonList.htm',
	    data: {"pid":shengId},
	    scriptCharset:'gb2312',
	    type: "POST",
	    dataType: 'json',
	    success: function(ret) {
	    	console.log(ret);
	    	shi = ret.areaList;
	    	var shiHtml = '';
	    	
			for (var z = 0;z < shi.length;z++) {
				
				if(shi[z].areaName.length < 6){
    				shiHtml += '<option value="'+ shi[z].id +'">' + shi[z].areaName + '</option>';
    			}else{
    				shiHtml += '<option value="'+ shi[z].id +'">' + shi[z].areaName.substr(0,5) + '&hellip;</option>';
    			}
				
			}
			$("#city").append(shiHtml);

			ajaxStatus = false;//解除锁定
	    	loadingDialog.hide();//关闭屏蔽层
			
	    	return shi;		
	    }
	});
}
$('#province').change(function () {
	
	$('#city option:not(#oShi)').remove();
	$('#xian option:not(#oXian)').remove();
	shengId = $('#province').find("option:selected").val();
	if(shengId == ''){
		/* layer.msg('请先选择省',{"icon":3,"time":2000}); */
		return false;
	}
	searchCity(shengId);
});

function searchXian(shiId){
	if(ajaxStatus == true){
		console.log("正在请求中。。。。。");
		return;
	}
	ajaxStatus = true;//锁定请求
	loadingDialog.show();//显示屏蔽层
	
	$.ajax({
		url: '../../areaJsonList.htm',
	    data: {"pid":shiId},
	    scriptCharset:'gb2312',
	    type: "POST",
	    dataType: 'json',
	    success: function(ret) {
	    	//console.log(ret);
	    	var xian = ret.areaList;
	    	
	    	var appElement = document.querySelector("[ng-controller=myContr]");
			var $scope = angular.element(appElement).scope(); 
			$scope.xian = xian;
			
			for (var i = 0;i < xian.length;i++) {
				
				if(xian[i].areaName.length < 6){
    				var xianHtml = '<option value="'+ xian[i].id +'">' + xian[i].areaName + '</option>';
    			}else{
    				var xianHtml = '<option value="'+ xian[i].id +'">' + xian[i].areaName.substr(0,5) + '&hellip;</option>';
    			}
				
				$("#xian").append(xianHtml);
				
			}
			$("#xian").change(function () {
				xianId = $('#xian').find("option:selected").val();
			});
			
			ajaxStatus = false;//解除锁定
	    	loadingDialog.hide();//关闭屏蔽层
	    }
	})
}

//此处用点击事件  防止 省选择直辖市  市的数据只有一个   不能改变  而不触发事件
$('#city').change(function () {	
	
	$('#xian option:not(#oXian)').remove();
	shiId = $('#city').find("option:selected").val();
	if(shiId == ''){
		/* layer.msg('请先选择市',{"icon":3,"time":2000}); */
		return false;
	}
	searchXian(shiId);
})