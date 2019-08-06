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
  $scope.dataList = [{amount: 0.55, time: '2019-08-06', status: 0},{amount: 0.55, time: '2019-05-11', status: 1},{amount: 0.55, time: '2019-01-12', status: 2}];
	$scope.join=function(){
    if(isWeb() == 1){
      return
    }

		$("#blackInput input").val("");
		
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
