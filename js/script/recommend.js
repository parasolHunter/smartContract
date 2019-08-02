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
  $scope.invitationCode = '';
	$scope.iscode=1;
  $scope.copy = function(message) {
				var input = document.createElement("input");
				input.value = message;
				document.body.appendChild(input);
				input.select();
				input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
				document.body.removeChild(input);
				blackDialog.show("复制成功");
	}
  if(getSession('invitationCode')){
    $scope.invitationCode = getSession('invitationCode');
  }
  $scope.build = function(){
    $scope.invitationCode = Math.random();
  }
});
