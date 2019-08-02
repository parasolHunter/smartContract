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
	$scope.isroll=1;
	
	$scope.roll=function(){
		if($scope.isroll==1){
			$(".roll_ball").addClass("roll_ball_active").parent().addClass("roll_main_active");
		}
	}
	$scope.roll();
	
  $scope.open=function(){
			if($scope.isroll==0){
				blackConfirm.show("确认开启收益自动置换ETV吗？",function(){
					$scope.isroll=1;
					$(".roll_ball").stop().transition({
							"left":"0.46rem",
							"background":"#00da9d",
							"box-shadow":"0px 0px 16px 1px #4b4e68"
					}).parent().css({
							"background":"#3fa385",
							"border":"0.04rem solid #3fa385"
					});
				},function(){},"确认","取消");
			}else{
				blackConfirm.show("确认关闭收益自动置换ETV吗？",function(){
					$scope.isroll=0;
					$(".roll_ball").stop().transition({
							"left":"-0.23rem",
							"background":"#a3a6b6",
							"box-shadow":"none"
					}).parent().css({
							"background":"#4b4e68",
							"border":"0.04rem solid #70758c"
					});
				},function(){},"确认","取消");
			}
	}
});
