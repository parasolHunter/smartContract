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
  $scope.invitationUrl = '';
  $scope.iscode=1;
  if (typeof web3 !== 'undefined') {
    setTimeout(function () {
      shouyi_r('income');
    },400)
  }
  $scope.coin = function() {
    if(isWeb() == 1){
      return
    }
    blackConfirm.show("是否确认提取？",function(){
      withdraw("111")
		},function(){});
  }
});
