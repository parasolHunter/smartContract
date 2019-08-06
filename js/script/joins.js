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
  $scope.gameStatus = true;
  $scope.ajaxStatus = false;
  $scope.etherStr = "";
  $scope.iscode = 1;
  // var output = "";
  // if (typeof web3 !== 'undefined') {
  //   myContract.incomeView((err, res)=>{
  //     if (!err) {
  //       console.log(res)
  //       var staticIncomeWei = res[0].toString();
  //       $(".staticIncome").text(web3.utils.fromWei(staticIncomeWei, 'ether'))
  //     } else {
  //       output = "Error2";
  //       console.log(output);
  //     }
  //   });
  // }
  
	$scope.join=function(){
    if(isWeb() == 1){
      return
    }

		$("#blackInput input").val("");
		/* blackInput.show("邀请码","请输入邀请码","5","下一步","取消",function(){
			var uname = $("#blackInput input").val();
			alert(uname)
			$("#blackInput").hide();
		},function(){}); */
		
		
		blackInput.show("参与","请输入数量","• 最小投资为0.001个ETH","确认","取消",function(){
      var uname = $("#blackInput input").val();

      if(uname < 0.001){
        blackDialog.show('最小投资为0.001个ETH');
        $("#blackInput").hide();
        return;
      }

      if ($scope.ajaxStatus == true) {
        console.log("正在请求中。。。。。");
        return;
      }
      $scope.ajaxStatus = true;
  
      transaction(uname);
		},function(){});
  }
});
