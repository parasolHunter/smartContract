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

          var transactionObject = {
              from: account,
              gasPrice: res,
              gas: "450000",
              to: '0x7C612D4C740aA0d4ad2D08D31BCba6476144E584',
              value: web3.utils.toWei(amount, 'ether'),
              data: ""
          };
          var myAccount = getQueryArray();
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
				"name": "_pid",
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
		"inputs": [],
		"name": "immediately",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "activated_",
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
		"name": "incomeView",
		"outputs": [
			{
				"name": "",
				"type": "uint256[4]"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
var contractAddress = '0xc67c1e05e0804a16e7b65947c20fcdf63e171c3b';/* 发布之后在以太坊上生成的合约地址 */
var contractAbi = web3.eth.contract(abi)
var myContract = contractAbi.at(contractAddress);