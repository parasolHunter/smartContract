// 移动端省市区三级联动选择插件
var page_obj= {
    init: function () {
    	area_obj.intProvince();
    },
};

var a,b,e;
var areaCont;
var expressArea;
var areaList = $("#areaList");
var areaTop = areaList.offset().top;

var areaArr = new Array();

var type0 = 0;  // city
var type1 = 1;	// qu

var area_obj= {
	/* 初始化省份 */
	intProvince: function () {
    	var ajaxTimeout = $.ajax({
    		url: "../../nnc.php",
            type : "POST",
            dataType : "json",
            traditional: true,
            timeout :15000,
            data: {
            	"transCode":"10034"
    	    },
            success : function(data) {
    	    	if(data.respCode == '00000'){
    	    		a = data.respData.area0List;
    	    		areaCont = "";
    	    		var appElement = document.querySelector('[ng-controller=myContr]');
    	    		var $scope = angular.element(appElement).scope(); 
    	    		if($scope.temp != $scope.hhrType){
    	    			$scope.area = null;
    	    			$scope.areaArr = null;
    	    			$scope.$apply();
    	    		}
    	    		if($scope.hhrType == "" || $scope.hhrType == null || $scope.hhrType == undefined || $scope.hhrType != "1省代理"){
    	    			for (var i=0; i<a.length; i++) {
    	    				areaCont += '<li onClick="selectP('+i+',0,'+a[i].id+','+type0+');">'+a[i].areaName+'</li>';
    	    				// 点击传选中的i、id、类型city（查市）
    	    			}
    	    		}else{
    	    			for (var i=0; i<a.length; i++) {
    	    				areaCont += '<li onClick="selectD('+i+');">'+a[i].areaName+'</li>';
    	    				// 点击传选中的i、id、类型city（查市）
    	    			}
    	    		}
    	    		areaList.html(areaCont);
    			}else{
    				blackDialog.show(data.respMsg)
    			}
            },
            complete : function(XMLHttpRequest,status){ // 请求完成后最终执行参数
                if(status=='timeout'){
                    ajaxTimeout.abort();
                    // blackDialog.show("请查看网络是否正常或网络是否畅通");
                }
                if(status=='error'){
                	// blackDialog.show("请查看网络是否正常或网络是否畅通");
                }
            }
        });
    	$("#areaBox").scrollTop(0);
    	$("#backUp").removeAttr("onClick").hide();
    },
    intCityAndQu:function(pnum,cnum,id,type){
    	var ajaxTimeout = $.ajax({
    		url:"../../areaJsonList.htm",
            type : "POST",
            dataType : "json",
            traditional: true,
            timeout :15000,
            data: {
            	"pid":id
    	    },
            success : function(data) {
            	if(data.ok){
            		areaCont = "";
            		areaList.html("");
            		
            		if(type == "0"){
            			b = data.areaList;
            			
            			var appElement = document.querySelector('[ng-controller=myContr]');
        	    		var $scope = angular.element(appElement).scope(); 
        	    		if($scope.hhrType == "" || $scope.hhrType == null || $scope.hhrType == undefined || $scope.hhrType != "2市代理"){
        	    			for (var j=0; j<b.length; j++) {
                				areaCont += '<li onClick="selectC('+pnum+','+j+','+b[j].id+','+type1+');">'+b[j].areaName+'</li>';
                			}
        	    		}else{
        	    			for (var j=0; j<b.length; j++) {
                				areaCont += '<li onClick="selectD('+j+');">'+b[j].areaName+'</li>';
                			}
        	    		}
            			
            			expressArea = a[pnum].areaName+"/";
            			$("#backUp").attr("onClick", "area_obj.intProvince();").show();
            			
            			areaArr[0] = a[pnum].id;
            		}
            		if(type == "1"){
            			e = data.areaList;
            			var appElement = document.querySelector("[ng-controller=myContr]");
            			var $scope = angular.element(appElement).scope(); 
            			$scope.xian = e;
            			if($scope.xian.length == 0){
            				var appElement = document.querySelector('[ng-controller=myContr]');
            				var $scope = angular.element(appElement).scope(); 
            				$scope.temp = $scope.hhrType;
            				if($scope.hhrType == "1省代理"){
            					expressArea = a[pnum].areaName;
            					areaArr[0] = a[pnum].id;
            				}else{
            					expressArea += b[cnum].areaName;
            					areaArr[1] = b[cnum].id;
            				}
            				areaArr.splice(2,1);
            				$(".area").val(expressArea);
            				$scope.area = expressArea;
            				$scope.areaArr = areaArr;
            				$scope.$apply();
            				clockArea();
            				return
            			}
            			
                		for (var k=0; k<e.length; k++) {
                			areaCont += '<li onClick="selectD('+k+');">' + e[k].areaName + '</li>';
                		}
                		expressArea += b[cnum].areaName;
                		$("#backUp").attr("onClick", "selectP("+pnum+",0,"+a[pnum].id+","+type0+");");
                		
                		areaArr[1] = b[cnum].id;
            		}
            		
            		areaList.html(areaCont);
            		$("#areaBox").scrollTop(0);
            	}else{
            		blackDialog.show(data.respMsg);
            	}
            },
            complete : function(XMLHttpRequest,status){ // 请求完成后最终执行参数
                if(status=='timeout'){
                    ajaxTimeout.abort();
                    // blackDialog.show("请查看网络是否正常或网络是否畅通");
                }
                if(status=='error'){
                	// blackDialog.show("请查看网络是否正常或网络是否畅通");
                }
            }
        });
    }
};

$(function() {
    FastClick.attach(document.body);
    page_obj.init();
});

/* 选择省份 */
function selectP(pnum,cnum,parentId,type) {
	area_obj.intCityAndQu(pnum,0,parentId,type);
}

/* 选择城市 */
function selectC(pnum,cnum,parentId,type) {
	area_obj.intCityAndQu(pnum,cnum,parentId,type);
}

/* 选择区县 */
function selectD(d) {
	var appElement = document.querySelector('[ng-controller=myContr]');
	var $scope = angular.element(appElement).scope(); 
	$scope.temp = $scope.hhrType;
	if($scope.hhrType == "" || $scope.hhrType == null || $scope.hhrType == undefined || $scope.hhrType == "3区县代理"){
		expressArea += "/"+e[d].areaName;
		areaArr[2] = e[d].id;
	}else if($scope.hhrType == "1省代理"){
		expressArea = a[d].areaName;
		areaArr[0] = a[d].id;
	}else{
		expressArea += b[d].areaName;
		areaArr[1] = b[d].id;
	}
	$(".area").val(expressArea);
	$scope.area = expressArea;
	$scope.areaArr = areaArr;
//	if($scope.setAddr){
//		$scope.addrSet(expressArea,areaArr);
//	}
	$scope.$apply();
	clockArea();
}

/* 关闭省市区选项 */
function clockArea() {
	$("#areaMask").fadeOut();
	$("#areaLayer").animate({"bottom": "-100%"});
	area_obj.intProvince();
}

$(function() {
	/* 打开省市区选项 */
	$("#expressArea").click(function() {
		$("#areaMask").fadeIn();
		$("#areaLayer").animate({"bottom": 0});
	});
	$("#expressArea_1").click(function() {
		$("#areaMask").fadeIn();
		$("#areaLayer").animate({"bottom": 0});
	});
	/* 关闭省市区选项 */
	$("#areaMask, #closeArea").click(function() {
		clockArea();
	});
});