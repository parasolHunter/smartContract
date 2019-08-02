var isLogon = window.sessionStorage.getItem("isLogon");
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
  $scope.url = publicUrl;
  $scope.redirectUrl = redirectUrl;
  $scope.ajaxStatus = false;

  $scope.dappsList = function(type) {
    location.href = 'dappsList.html?type='+type;
  };
  
  $scope.hatch = function(){
	  location.href = 'hatchDapps.html';
  };

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
      url: $scope.url,
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
          $scope.respData = response.respData;
          $scope.imageList = response.respData.imageList;
          $scope.defaultPrice = response.respData.defaultPrice;
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
  // $scope.searchHome();
});
