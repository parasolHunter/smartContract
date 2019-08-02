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
	if(getCookie("language") == "en") {
		$scope.types=[{
			"id": "0",
			"name": "Game"
		}, {
			"id": "1",
			"name": "Market Place"
		},{
			"id": "2",
			"name": "Quiz"
		},{
			"id": "3",
			"name": "Social"
		},{
			"id": "4",
			"name": "other"
		}];
		$scope.pts=[{
			"id": "0",
			"name": "Ethereum"
		}, {
			"id": "1",
			"name": "EOS"
		},{
			"id": "2",
			"name": "Tron"
		}];
	}else{
		$scope.types=[{
			"id": "0",
			"name": "游戏"
		}, {
			"id": "1",
			"name": "交易市场"
		},{
			"id": "2",
			"name": "竞猜"
		},{
			"id": "3",
			"name": "社交"
		},{
			"id": "4",
			"name": "其他"
		}];
		$scope.pts=[{
			"id": "0",
			"name": "Ethereum"
		}, {
			"id": "1",
			"name": "EOS"
		},{
			"id": "2",
			"name": "Tron"
		}];
	}
	
	
	
	$scope.dappType=null;
	$scope.platform=null;
	$scope.choose = function(id,name){
		if($scope.type==0){
			$scope.dappType=name;
		}else{
			$scope.platform=name;
		}
		$(".dd").eq($scope.type).find(".item2").html(name);
		$scope.isSpec(0,$scope.name);
	};
	
	$scope.commit = function() {
		
		if(!valid($scope.appName)){
			blackDialog.show(retData.hatchDapps.msg9);
			return;
		}
		console.log($scope.email)
		if(!valid($scope.email)){
			blackDialog.show(retData.hatchDapps.msg10);
			return;
		}
		if(!valid($scope.addrUrl)){
			blackDialog.show(retData.hatchDapps.msg11);
			return;
		}
		if(!valid($scope.dappType)){
			blackDialog.show(retData.hatchDapps.msg12);
			return;
		}
		if(!valid($scope.platform)){
			blackDialog.show(retData.hatchDapps.msg13);
			return;
		}
		if(!valid($scope.contract)){
			blackDialog.show(retData.hatchDapps.msg14);
			return;
		}
		if(!valid($scope.remark)){
			blackDialog.show(retData.hatchDapps.msg15);
			return;
		}
		
		$scope.data = {};
		$scope.data.transCode = "10013";
		$scope.data.dappName = $scope.appName;
		$scope.data.dappEmail = $scope.email;
		$scope.data.dappUrl = $scope.addrUrl;
		$scope.data.dappType = $scope.dappType;
		$scope.data.platform = $scope.platform;
		$scope.data.contract = $scope.contract;
		$scope.data.remark = $scope.remark;

		if ($scope.ajaxStatus == true) {
			console.log("正在请求中。。。。。");
			return;
		}
		$scope.ajaxStatus = true;

		loadingDialog.show();
		$http({
			url: publicUrl + '10013.do',
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
				blackDialog.redirect("添加成功","dapps.html");
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
});

