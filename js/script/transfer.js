var userInfo = parse(getStore("userInfo"));
$("#oMobile").val(userInfo.a);
//ng渲染创业数据
var app = angular.module("myApp", []);

//自定义repeat完成指令
app.directive("repeatFinish", function($timeout) {
  return {
    restrict: "A",
    link: function(scope, elem, attr) {
      //当前循环至最后一个
      if (scope.$last === true) {
        $timeout(function() {
          //向父控制器传递事件消息
          scope.$eval(attr.repeatFinish); // 执行绑定的表达式
        }, 100);
      }
    }
  };
});

app.controller("myContr", function($scope, $http) {
	
	$scope.searchHome = function() {
	    $scope.data = {};
	    $scope.data.transCode = "10005";

	    if ($scope.ajaxStatus == true) {
	      console.log("正在请求中。。。。。");
	      return;
	    }
	    $scope.ajaxStatus = true;

	    loadingDialog.show();
	    $http({
	      url: publicUrl+'10005.do',
	      method: "POST",
	      params: {},
	      headers: {
	        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
	        "X-Requested-With": "XMLHttpRequest",
	        Accept: "*/*"
	      },
	      data: $.param($scope.data)
	    })
	      .success(function(response) {
	    	  if (!valid(response.respCode, 11)) {
	              tipsDialog.show(
	                retData.general.tipTitle,
	                response.respMsg,
	                "确定",
	                function() {
	                  clearStore();
	                  clearSession();
	                  window.location.href = redirectUrl;
	                }
	              );
	              return;
	            }
	        if (response.respCode == "00000") {
	          $scope.response = response;
	          setSession("w",response.w);
	          if(response.o != 0 || response.p != 0){
	        	  $scope.sf = response.p/(response.o+response.p);        	  
	          }else{
	        	  $scope.sf = 0;
	          }
	          
	        } else {
	          blackDialog.show(response.respMsg);
	        }

	        loadingDialog.hide();
	        $scope.ajaxStatus = false;
	        $scope.load();
	      })
	      .error(function(resp, status, header, config) {
	        loadingDialog.hide(); /* 遮罩层关闭 */
	        $scope.ajaxStatus = false;
	        blackDialog.show("连接超时");
	      });
	   };
	   $scope.searchHome();
	
 //发送短信
   $(".code").click(function() {
     var actionType = $(this).attr("actionType");
     // getCode(actionType, "enroll");
     if(!valid($scope.amt)){
			blackDialog.show(retData.transfer.msg3);
			return;
		}
		if(Number($scope.amt)<=0){
			blackDialog.show(retData.transfer.msg3);
			return;
		}
		
		if(!valid($scope.addr)){
			blackDialog.show(retData.transfer.msg5);
			return;
		}
		
     getCode(actionType);
   });
	   
	$scope.commit = function() {
		
		if(!valid($scope.amt)){
			blackDialog.show(retData.transfer.msg3);
			return;
		}
		if(Number($scope.amt)<=0){
			blackDialog.show(retData.transfer.msg11);
			return;
		}
		
		if(!valid($scope.addr)){
			blackDialog.show(retData.transfer.msg5);
			return;
		}
		
		if (!valid($scope.addr, 5)&&!valid($scope.addr, 14)) {
	      blackDialog.show(retData.general.phone);
	      return;
	    }
		
		if(!valid($scope.code)){
			blackDialog.show(retData.general.send);
			return;
		}
		
		$scope.data = {};
		$scope.data.transCode = "10011";
		$scope.data.amount = $scope.amt;
		$scope.data.addr = $scope.addr;
		$scope.data.code = $scope.code;

		if ($scope.ajaxStatus == true) {
			console.log("正在请求中。。。。。");
			return;
		}
		$scope.ajaxStatus = true;

		loadingDialog.show();
		$http({
			url: publicUrl + '10011.do',
			method: "POST",
			params: {},
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				Accept: "*/*"
			},
			data: $.param($scope.data)
		}).success(function(response) {
			if (!valid(response.respCode, 11)) {
		          tipsDialog.show(
		            retData.general.tipTitle,
		            response.respMsg,
		            "确定",
		            function() {
		              clearStore();
		              clearSession();
		              window.location.href = redirectUrl;
		            }
		          );
		          return;
		        }
			if (response.respCode == "00000") {
				blackDialog.reload(retData.transfer.msg12);
			} else {
				blackDialog.show(response.respMsg);
			}

			loadingDialog.hide();
			$scope.ajaxStatus = false;
		}).error(function(resp, status, header, config) {
			loadingDialog.hide();
			/* 遮罩层关闭 */
			$scope.ajaxStatus = false;
			blackDialog.show("连接超时");
		});
	};
	
	$scope.type=null;
	$scope.pageNum=1;
	$scope.pageSize=10;
	$scope.lastPage=false;
	$scope.transCode="10008";
	
	$scope.load = function() {
		$scope.data = {};
		$scope.data.type=$scope.type;
		$scope.data.pageNo=$scope.pageNum;
		$scope.data.pageSize=$scope.pageSize;
		$scope.data.transCode=$scope.transCode;

		if ($scope.ajaxStatus == true) {
			console.log("正在请求中。。。。。");
			return;
		}
		$scope.ajaxStatus = true;

		loadingDialog.show();
		$http({
			url: publicUrl + $scope.transCode + '.do',
			method: "POST",
			params: {},
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				Accept: "*/*"
			},
			data: $.param($scope.data)
		}).success(function(response) {
			if (!valid(response.respCode, 11)) {
		          tipsDialog.show(
		            retData.general.tipTitle,
		            response.respMsg,
		            "确定",
		            function() {
		              clearStore();
		              clearSession();
		              window.location.href = redirectUrl;
		            }
		          );
		          return;
		        }
			if (response.respCode == "00000") {
				if($scope.list!=null){
	    			var array = new Array();
	    			for(var i=0;i<$scope.list.length;i++){
	    				array.push($scope.list[i]);
	    			}
	    			for(var i=0;i<response.page.pageItems.length;i++){
	    				array.push(response.page.pageItems[i]);
	    			}
	    			$scope.list=array;
	    		}
	    		else{
	    			$scope.list=response.page.pageItems;
	    		}
				if(response.page.pagesAvailable<=$scope.pageNum){
	    			$scope.lastPage=true;
	    		}
			} else {
				blackDialog.show(response.respMsg);
			}

			loadingDialog.hide();
			$scope.ajaxStatus = false;
		}).error(function(resp, status, header, config) {
			loadingDialog.hide();
			/* 遮罩层关闭 */
			$scope.ajaxStatus = false;
			blackDialog.show("连接超时");
		});
	};
	
	$scope.tabEffect = function(i){
		$scope.topTab=i;
		var $tab=$(".tabItem").eq(i);
		var tw=$tab.outerWidth()/4;
		$(".topBorderLine").css({
			"width":tw,
			"margin-left":($tab.outerWidth()-tw)/2
		});
		var left=$scope.topTab*50;
		$(".topBorderLine").stop().transition({"left":left+"%"});
		if($scope.topTab == "0"){
			$scope.transCode="10008";
			$scope.type=null;
		}else{
			$scope.transCode="10009";
			$scope.type="6";
		}
		$scope.pageNum=1;
		$scope.list=null;
		$scope.lastPage=false;
		$scope.load();
	};
	$scope.tabEffect(0);
	
	$scope.loadmore = function(){
		$scope.pageNum++;
		$scope.load();
	};
});

