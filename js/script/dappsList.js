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
  $scope.lastPage = false;
  $scope.pageNum = 1;
  
  $scope.platform = getQueryArray();
  $scope.name = "";
  $scope.category = "全部";
  
  $scope.search = function(keyword) {
	  $scope.pageNum = 1;
	  $scope.category = "";
	  $scope.list = null;
	  if(keyword){
		  $scope.name = keyword;  
	  }else{
		  $scope.name = "";		  
	  }
	  $scope.load();
  };
  
  $scope.sort = function(e,type){
		$(e.target).addClass("active").siblings().removeClass("active");
		$scope.pageNum = 1;
		$scope.category = type;
		$scope.list = null;
		$scope.load();
  };

  $scope.details = function(id,platform,name,logo,ua_of_24hours,tx_of_24hours,value_of_24hours,value_sum,contracts,website,description){
	  location.href = `dappsDetails.html?id=${id}&platform=${platform}&name=${escape(name)}&logo=${logo}&ua_of_24hours=${ua_of_24hours}&tx_of_24hours=${tx_of_24hours}&value_of_24hours=${value_of_24hours}&value_sum=${value_sum}&contracts=${contracts}&website=${website}&description=${escape(description)}`;
  };
  
  $scope.load = function() {
    $scope.data = {};
    $scope.data.transCode="10020";
    $scope.data.platform = $scope.platform;
    $scope.data.current = $scope.pageNum;
    $scope.data.page_size = 10;
    $scope.data.category = $scope.category;
    $scope.data.name = $scope.name;
//    $scope.data.secret = 'r}{XJ7foC{Z[A%&aOPd3@tcz7[d9jz48';

    if ($scope.ajaxStatus == true) {
      console.log("正在请求中。。。。。");
      return;
    }
    $scope.ajaxStatus = true;

    loadingDialog.show();
    $http({
      url: publicUrl + '10020.do',
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
        	$scope.pageNum = $scope.dapps.current+1;
	  		
	  		if($scope.list!=null){
	  			var array = new Array();
	  			for(var i=0;i<$scope.list.length;i++){
	  				array.push($scope.list[i]);
	  			}
	  			for(var i=0;i< $scope.dapps.data.length;i++){
	  				array.push($scope.dapps.data[i]);
	  			}
	  			$scope.list=array;
	  		}
	  		else{
	  			$scope.list = $scope.dapps.data;
	  		}
	  		
  			$scope.lastPage = !$scope.dapps.has_next;
  			
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
   $scope.loadmore = function(){
		$scope.pageNum++;
		$scope.load();
	};
});
