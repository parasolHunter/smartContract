var urlRopsten = 'ropsten.infura.io/v3/f80e07a587c24a5a9d8fc1874d266553';
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    //新版metamask
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          // Request account access if needed
          ethereum.enable();
          // Acccounts now exposed
      } catch (error) {
          // User denied account access...
      }
    } else if (window.web3) {// Legacy dapp browsers...
      // Use Mist/MetaMask's provider
      if (web3.currentProvider.isMetaMask == true) {
        console.log("MetaMask可用");
        // TokenContract = new web3.eth.Contract(config.abi, config.contractAddress);
      } else {
        console.log("非MetaMask环境");
      }
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
    }
  } else {
    console.log("No web3? 需要安装MetaMask");
    // window.web3 = new Web3(new Web3.providers.HttpProvider(urlRopsten));
    blackConfirm.show("No web3? 需要安装MetaMask!",function(){
      location.href='https://metamask.io/';
    },function(){});
  }
})

function showAccounts() {
  web3.eth.getAccounts((err, res) => {
    console.log(res);
    var output = "";

    if (!err) {
      output = res.join("<br />");
    } else {
      output = "Error";
    }
    if (res.length == 0) {
        console.log('请检查钱包是否解锁');
      } else {
        console.log(output);
      }
  })
}

//当前交易哈希获得信息
function parseResultObject(res){
  var output = "";

  for (var key in res) {
    if (res.hasOwnProperty(key)) {

      if( Object.prototype.toString.call( res[key] ) === '[object Array]' ) {
        var arrObj = res[key];

        if(arrObj.length == 0) {
          output += key + " -> []<br />";
        } else {

          for(var i=0; i < arrObj.length; i++){
            for (var key2 in arrObj[i]) {
              if (arrObj[i].hasOwnProperty(key2)) {
                output += key + "["+i+"]." + key2 + "-> " + arrObj[i][key2] + "<br />";
              }
            }
          }

        }
      } else {
        output += key + " -> " + res[key] + "<br />";
      }
    }
  }
  return output;
}
//当前交易哈希获得信息
function getTransactionReceipt(transactionHash){
  web3.eth.getTransactionReceipt(transactionHash, (err, res) => {
    console.log("tradeLists = "+res);
    var output = "";
    if (!err) {
      output += parseResultObject(res);
    } else {
      output = "Error";
    }
    console.log(output);
    console.log(res);
  })
}

//join or transaction
function transaction(amount){
  var appElement = document.querySelector('[ng-controller=myContr]');
  var $scope = angular.element(appElement).scope(); 

  web3.eth.getAccounts((err, res) => {
    $scope.ajaxStatus = false;
    if (!err) {
      for (i=0; i< res.length; i++){
        var account = res[i];

        if ($scope.ajaxStatus == true) {
          console.log("正在请求中。。。。。");
          return;
        }
        $scope.ajaxStatus = true;
        loadingDialog.show();
        web3.eth.getGasPrice((err, res)=>{
          $scope.ajaxStatus = false;
          
					console.log(res);

          var transactionObject = {
              from: account,
              gasPrice: res,
              gas: "2100000",
              value: web3.utils.toWei(amount, 'ether'),
              data: ""
          };
          var myAccount = getQueryArray()==null?"0x4311a864285c39a73Cc07f1D7AA75eE74400bBe0":getQueryArray();
          console.log("myAccount = "+myAccount);

          myContract.buy(myAccount, transactionObject, (err2, res2)=>{
            $scope.ajaxStatus = false;
            loadingDialog.hide();
            if (!err2) {
              // web3.eth.getBalance(res[i]) returns an instanceof BigNumber
              location.reload();
            } else {
              output = "Error2";
              console.log(output);
              location.reload();
            }
            $("#blackInput").hide();
          })
        });
      }
    } else {
      output = "Error1";
    }
    console.log(output);
  })
}


//home
function home(){
	myContract.staticIncome((err, res)=>{
		if (!err) {
			var staticIncomeWei = res.toString();
			$(".staticIncome").text(web3.utils.fromWei(staticIncomeWei, 'ether'))
		} else {
			output = "Error2";
			console.log(output);
		}
	});
	myContract.globalIncome((err, res)=>{
		if (!err) {
			var globalIncomeWei = res.toString();
			$(".globalIncome").text(web3.utils.fromWei(globalIncomeWei, 'ether'))
		} else {
			output = "Error2";
			console.log(output);
		}
	});
	myContract.luckyIncome((err, res)=>{
		if (!err) {
			var luckyIncomeWei = res.toString();
			$(".luckyIncome").text(web3.utils.fromWei(luckyIncomeWei, 'ether'))
		} else {
			output = "Error2";
			console.log(output);
		}
	});
	myContract.retreatIncome((err, res)=>{
		if (!err) {
			var retreatIncomeWei = res.toString();
			$(".retreatIncome").text(web3.utils.fromWei(retreatIncomeWei, 'ether'))
		} else {
			output = "Error2";
			console.log(output);
		}
	});
	myContract.parentIncome((err, res)=>{
		if (!err) {
			var parentIncomeWei = res.toString();
			$(".parentIncome").text(web3.utils.fromWei(parentIncomeWei, 'ether'))
		} else {
			output = "Error2";
			console.log(output);
		}
	});
}
//tibi
function withdraw(amount){
  var appElement = document.querySelector('[ng-controller=myContr]');
  var $scope = angular.element(appElement).scope(); 

  web3.eth.getAccounts((err, res) => {
    $scope.ajaxStatus = false;
    if (!err) {
      for (i=0; i< res.length; i++){
        var account = res[i];

        if ($scope.ajaxStatus == true) {
          console.log("正在请求中。。。。。");
          return;
        }
        $scope.ajaxStatus = true;
        web3.eth.getGasPrice((err, res)=>{
          $scope.ajaxStatus = false;
          console.log(res);

          var transactionObject = {
              from: account,
              gasPrice: res,
              gas: "550000",
              data: ""
          };
          myContract.withdraw(transactionObject, (err2, res2)=>{
            if (!err2) {
              // web3.eth.getBalance(res[i]) returns an instanceof BigNumber
              location.reload();
            } else {
              output = "Error2";
              console.log(output);
              location.reload();
            }
          })
        });
      }
    } else {
      output = "Error1";
    }
    console.log(output);
  })
}


//shouyi
function shouyi_r(type){
  var appElement = document.querySelector('[ng-controller=myContr]');
  var $scope = angular.element(appElement).scope(); 

  web3.eth.getAccounts((err, res) => {
    $scope.ajaxStatus = false;
    if (!err) {
      for (i=0; i< res.length; i++){
        var account = res[i];

        // if ($scope.ajaxStatus == true) {
        //   console.log("正在请求中。。。。。");
        //   return;
        // }
        // $scope.ajaxStatus = true;
        
				myContract.usrInfo(account,(err2, res2)=>{
					if (!err2) {
						console.log(res2)
						var shouyi_balance = res2[3].toString();
						var shouyi_sum = res2[4].toString();
						$(".shouyi_balance").text(Number(web3.utils.fromWei(shouyi_balance, 'ether')).toFixed(6));
						$(".shouyi_sum").text(Number(web3.utils.fromWei(shouyi_sum, 'ether')).toFixed(6));
					} else {
						output = "Error2";
						console.log(output);
					}
        })
        if(type == 'join'){
          var _url = api+'/records/'+account;
        }else if(type == 'income'){
          var _url = api+'/incomes/'+account;
        }
        $.ajax({
          url: _url,
          type: 'GET',
          dataType: 'json',
          // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          // headers: {'Content-Type': 'application/json;charset=UTF-8'},
          //跨域
          // xhrFields: {
          //     withCredentials: true
          // },
			    // crossDomain: true,
          // dataType: 'jsonp',
          timeout: 30000,
          success: function (res) {
            if(type == 'join'){
              var joinslist = res.data.detail;
              // for(var i = 0; i < joinslist.length; i++){
              //   joinslist[i].amount = Number(web3.utils.fromWei(joinslist[i].amount.toString(), 'ether')).toFixed(6);
              // }
              $scope.joinslist = joinslist;
              $scope.$apply();
            }else if(type == 'income'){
              var incomeslist = res.data.detail;
              // for(var i = 0; i < incomeslist.length; i++){
              //   incomeslist[i].amount = Number(web3.utils.fromWei(incomeslist[i].amount.toString(), 'ether')).toFixed(6);
              // }
              $scope.incomeslist = incomeslist;
              $scope.$apply();
            }
          },
          error: function (XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest, textStatus);
          },
          complete: function (XMLHttpRequest, textStatus) {
          }
        });
      }
    } else {
      output = "Error1";
    }
    console.log(output);
  })
}
//tuijian
function tuijian (){
  var appElement = document.querySelector('[ng-controller=myContr]');
  var $scope = angular.element(appElement).scope(); 

  web3.eth.getAccounts((err, res) => {
    console.log(res)
    $scope.ajaxStatus = false;
    if (!err) {
      for (i=0; i< res.length; i++){
        var account = res[i];
        // if ($scope.ajaxStatus == true) {
        //   console.log("正在请求中。。。。。");
        //   return;
        // }
        // $scope.ajaxStatus = true;
        var _url = api+'/achievements/income/'+account;

        $.ajax({
          url: _url,
          type: 'GET',
          dataType: 'json',
          // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          // headers: {'Content-Type': 'application/json;charset=UTF-8'},
          //跨域
          // xhrFields: {
          //     withCredentials: true
          // },
			    // crossDomain: true,
          // dataType: 'jsonp',
          timeout: 30000,
          success: function (res) {
            $scope.yeji = res.data;
            $scope.tuijianlist = res.data.son;
            $scope.$apply();
          },
          error: function (XMLHttpRequest, textStatus) {
            console.log(XMLHttpRequest, textStatus);
          },
          complete: function (XMLHttpRequest, textStatus) {
          }
        });
      }
    } else {
      output = "Error1";
    }
    console.log(output);
  })
}

function isWeb(){
  if (typeof web3 == 'undefined') {
    blackConfirm.show("No web3? 需要安装MetaMask!",function(){
      location.href='https://metamask.io/';
    },function(){});  
    return flag = 1; 
  }
}

var contractAbi = window.web3.eth.contract(abi);
var myContract = contractAbi.at(contractAddress);