var isLogon = window.sessionStorage.getItem("isLogon");
//ng渲染创业数据
var app = angular.module("myApp", []);

//自定义repeat完成指令
app.directive("ngEnter", function() {
    return {
        link: function(scope, element, attrs) {
        	element.bind("keypress",function(event){
        		if(event.which===13){
        			scope.$apply(function(){
        				scope.$eval(attrs.ngEnter);
        			})
        			event.preventDefault();
        		}
        	})
        }
    };
});

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
  $scope.ajaxStatus = false;
  $scope.platform = getQueryArray()[1];
  $scope.name = unescape(getQueryArray()[2]);
  
  $scope.logo = getQueryArray()[3];
  $scope.ua_of_24hours = getQueryArray()[4];
  $scope.tx_of_24hours = getQueryArray()[5];
  $scope.value_of_24hours = getQueryArray()[6];
  $scope.value_sum = getQueryArray()[7];
  $scope.contracts = getQueryArray()[8];
  $scope.website = getQueryArray()[9];
  $scope.description = unescape(getQueryArray()[10]);
  console.log($scope.description);
  $scope.load = function() {
    $scope.data = {};
    $scope.data.transCode="10021";
    $scope.data.id = getQueryArray()[0];
//    $scope.data.secret = 'r}{XJ7foC{Z[A%&aOPd3@tcz7[d9jz48';

    if ($scope.ajaxStatus == true) {
      console.log("正在请求中。。。。。");
      return;
    }
    $scope.ajaxStatus = true;

    loadingDialog.show();
    $http({
      url: publicUrl + '10021.do',
      method: "POST",
      params: {},
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        Accept: "*/*",
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
        	$scope.dapps = JSON.parse(response.dapps);
        	console.log($scope.dapps);
        	$scope.list = $scope.dapps.data;
        } else {
          blackDialog.show(response.respMsg);
        }

        loadingDialog.hide();
        $scope.ajaxStatus = false;
      })
      .error(function(resp, status, header, config) {
        loadingDialog.hide(); /* 遮罩层关闭 */
        $scope.ajaxStatus = false;
        blackDialog.show("连接超时");
      });
  };
   $scope.load();
});
