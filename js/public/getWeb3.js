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

//canyu
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
        web3.eth.getGasPrice((err, res)=>{
          $scope.ajaxStatus = false;
					console.log(res);
					console.log(res);
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
function shouyi_r(){
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
      }
    } else {
      output = "Error1";
    }
    console.log(output);
  })
}

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


function isWeb(){
  if (typeof web3 == 'undefined') {
    blackConfirm.show("No web3? 需要安装MetaMask!",function(){
      location.href='https://metamask.io/';
    },function(){});  
    return flag = 1; 
  }
}
var abi = [
	{
	 "constant": false,
	 "inputs": [
		{
		 "name": "account",
		 "type": "address"
		}
	 ],
	 "name": "addWhitelisted",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "minWithDraw",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "activated",
	 "outputs": [
		{
		 "name": "",
		 "type": "bool"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [
		{
		 "name": "mminBuy",
		 "type": "uint256"
		},
		{
		 "name": "mmaxBuy",
		 "type": "uint256"
		},
		{
		 "name": "mminWithDraw",
		 "type": "uint256"
		}
	 ],
	 "name": "uptRunArgs",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [
		{
		 "name": "account",
		 "type": "address"
		}
	 ],
	 "name": "removeWhitelisted",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "luckyIncome",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "MAX_LUCK",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [
		{
		 "name": "account",
		 "type": "address"
		}
	 ],
	 "name": "isWhitelisted",
	 "outputs": [
		{
		 "name": "",
		 "type": "bool"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [],
	 "name": "withdraw",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [],
	 "name": "renounceWhitelistAdmin",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "parentIncome",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [
		{
		 "name": "amount",
		 "type": "uint256"
		},
		{
		 "name": "target",
		 "type": "address"
		}
	 ],
	 "name": "adminWithdraw",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "staticRand",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "ZERO_ADDR",
	 "outputs": [
		{
		 "name": "",
		 "type": "address"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [
		{
		 "name": "initFlag",
		 "type": "bool"
		}
	 ],
	 "name": "startGame",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "maxBuy",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "minBuy",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [],
	 "name": "renounceOwnership",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [
		{
		 "name": "account",
		 "type": "address"
		}
	 ],
	 "name": "addWhitelistAdmin",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "day",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [],
	 "name": "stopGame",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [
		{
		 "name": "plays",
		 "type": "address[]"
		},
		{
		 "name": "selfEths",
		 "type": "uint256[]"
		}
	 ],
	 "name": "uptPlayerEth",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "owner",
	 "outputs": [
		{
		 "name": "",
		 "type": "address"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "retreatIncome",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "isOwner",
	 "outputs": [
		{
		 "name": "",
		 "type": "bool"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "globalIncome",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "staticIncome",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "name": "playAddrs",
	 "outputs": [
		{
		 "name": "",
		 "type": "address"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "NAME",
	 "outputs": [
		{
		 "name": "",
		 "type": "string"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [
		{
		 "name": "account",
		 "type": "address"
		}
	 ],
	 "name": "isWhitelistAdmin",
	 "outputs": [
		{
		 "name": "",
		 "type": "bool"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "allIncomes",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		},
		{
		 "name": "",
		 "type": "uint256"
		},
		{
		 "name": "",
		 "type": "uint256"
		},
		{
		 "name": "",
		 "type": "uint256"
		},
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "name": "luckyDogs",
	 "outputs": [
		{
		 "name": "",
		 "type": "address"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [],
	 "name": "renounceWhitelisted",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "MAX_STATIC_RAND",
	 "outputs": [
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [
		{
		 "name": "target",
		 "type": "address"
		}
	 ],
	 "name": "usrInfo",
	 "outputs": [
		{
		 "name": "",
		 "type": "address"
		},
		{
		 "name": "",
		 "type": "address"
		},
		{
		 "name": "",
		 "type": "address"
		},
		{
		 "name": "",
		 "type": "uint256"
		},
		{
		 "name": "",
		 "type": "uint256"
		},
		{
		 "name": "",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [
		{
		 "name": "refAddr",
		 "type": "address"
		}
	 ],
	 "name": "buy",
	 "outputs": [],
	 "payable": true,
	 "stateMutability": "payable",
	 "type": "function"
	},
	{
	 "constant": false,
	 "inputs": [
		{
		 "name": "newOwner",
		 "type": "address"
		}
	 ],
	 "name": "transferOwnership",
	 "outputs": [],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "function"
	},
	{
	 "constant": true,
	 "inputs": [],
	 "name": "SYMBOL",
	 "outputs": [
		{
		 "name": "",
		 "type": "string"
		}
	 ],
	 "payable": false,
	 "stateMutability": "view",
	 "type": "function"
	},
	{
	 "inputs": [
		{
		 "name": "mmin",
		 "type": "uint256"
		},
		{
		 "name": "mmax",
		 "type": "uint256"
		},
		{
		 "name": "mminWithDraw",
		 "type": "uint256"
		}
	 ],
	 "payable": false,
	 "stateMutability": "nonpayable",
	 "type": "constructor"
	},
	{
	 "payable": true,
	 "stateMutability": "payable",
	 "type": "fallback"
	},
	{
	 "anonymous": false,
	 "inputs": [
		{
		 "indexed": true,
		 "name": "account",
		 "type": "address"
		}
	 ],
	 "name": "WhitelistedAdded",
	 "type": "event"
	},
	{
	 "anonymous": false,
	 "inputs": [
		{
		 "indexed": true,
		 "name": "account",
		 "type": "address"
		}
	 ],
	 "name": "WhitelistedRemoved",
	 "type": "event"
	},
	{
	 "anonymous": false,
	 "inputs": [
		{
		 "indexed": true,
		 "name": "account",
		 "type": "address"
		}
	 ],
	 "name": "WhitelistAdminAdded",
	 "type": "event"
	},
	{
	 "anonymous": false,
	 "inputs": [
		{
		 "indexed": true,
		 "name": "account",
		 "type": "address"
		}
	 ],
	 "name": "WhitelistAdminRemoved",
	 "type": "event"
	},
	{
	 "anonymous": false,
	 "inputs": [
		{
		 "indexed": true,
		 "name": "previousOwner",
		 "type": "address"
		},
		{
		 "indexed": true,
		 "name": "newOwner",
		 "type": "address"
		}
	 ],
	 "name": "OwnershipTransferred",
	 "type": "event"
	},
	{
	 "anonymous": false,
	 "inputs": [
		{
		 "indexed": true,
		 "name": "playerAddress",
		 "type": "address"
		},
		{
		 "indexed": true,
		 "name": "refAddress",
		 "type": "address"
		},
		{
		 "indexed": false,
		 "name": "isNewPlayer",
		 "type": "bool"
		},
		{
		 "indexed": false,
		 "name": "money",
		 "type": "uint256"
		},
		{
		 "indexed": false,
		 "name": "timeStamp",
		 "type": "uint256"
		}
	 ],
	 "name": "logUsrBuy",
	 "type": "event"
	},
	{
	 "anonymous": false,
	 "inputs": [
		{
		 "indexed": true,
		 "name": "playerAddress",
		 "type": "address"
		},
		{
		 "indexed": false,
		 "name": "money",
		 "type": "uint256"
		},
		{
		 "indexed": false,
		 "name": "timeStamp",
		 "type": "uint256"
		}
	 ],
	 "name": "logWithDraw",
	 "type": "event"
	},
	{
	 "anonymous": false,
	 "inputs": [
		{
		 "indexed": true,
		 "name": "who",
		 "type": "address"
		},
		{
		 "indexed": true,
		 "name": "target",
		 "type": "address"
		},
		{
		 "indexed": false,
		 "name": "money",
		 "type": "uint256"
		},
		{
		 "indexed": false,
		 "name": "timeStamp",
		 "type": "uint256"
		}
	 ],
	 "name": "logAdminWithDraw",
	 "type": "event"
	}
 ];
var contractAddress = '0x3e215c03e143ac6ead2ab2aafe9bc3fe23bc3ea5';/* 发布之后在以太坊上生成的合约地址 */
var contractAbi = web3.eth.contract(abi)
var myContract = contractAbi.at(contractAddress);