/**
 * weixinSDK 封装
 */
var appElement = document.querySelector("[ng-controller=myContr]");
var $scope = angular.element(appElement).scope(); 
var weixin={
	ismicro:true,
    init:function(request,host,jsApiList,readyFun,errorFun){
    	var ua = window.navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i) != 'micromessenger'){ //判断是否是微信内置浏览器
			this.ismicro = false;
			return;
		}
        if(readyFun && $.isFunction(readyFun)){
            wx.ready(readyFun);
        }
        if(errorFun && $.isFunction(errorFun)){
            wx.error(errorFun);
        }
        $.ajax({
            type : "post",
            url : request,
            dataType: "json",
            data : {transCode:"WxConfigServiceV1","url":window.location.href},
            success : function(data){
                if(data.respCode=="00000"){
                    wx.config({
                    	debug: false,
                        appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature,// 必填，签名，见附录1
                        jsApiList : jsApiList// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                }else{
                	blackDialog.show(data.respMsg);
                }
            }
        });
    },

    setMenuShareAppMessage:function(weixintitle,weixindesc,weixinlink,weixinimgUrl,success_fuc,cancel_fuc){
        wx.onMenuShareAppMessage({
            title: weixintitle, // 分享标题
            desc: weixindesc, // 分享描述
            link: weixinlink, // 分享链接
            imgUrl: weixinimgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success:success_fuc,
            cancel:cancel_fuc
        });
    },

    setMenuShareTimeline:function(weixintitle,weixinlink,weixinimgUrl,success_fuc,cancel_fuc){
        wx.onMenuShareTimeline({
            title: weixintitle,
            link: weixinlink, // 分享链接
            imgUrl: weixinimgUrl, // 分享图标
            success:success_fuc,
            cancel:cancel_fuc
        });
    },
    
    setMenuShareQQ:function(weixintitle,weixindesc,weixinlink,weixinimgUrl,success_fuc,cancel_fuc){
        wx.onMenuShareQQ({
            title: weixintitle, // 分享标题
            desc: weixindesc, // 分享描述
            link: weixinlink, // 分享链接
            imgUrl: weixinimgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success:success_fuc,
            cancel:cancel_fuc
        });
    },

    setScanner:function(){
		if(!this.ismicro){ //判断是否是微信内置浏览器
			blackDialog.show("请在微信中打开");
			return;
		}
		
		wx.scanQRCode({
			debug: false,
	        needResult : 1,           // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
	        desc : 'scanQRCode desc',
	        success : function(res) {
				if(res.resultStr.indexOf("?") == "-1"){
					$scope.result = res.resultStr;
				}else{
					$scope.result = res.resultStr.split("?")[1];
				}
	        	$scope.scanPayee();
	        }
	    })
    },
    
    //获取地理位置
    getLocation:function(){
    	loadingDialog.show();
    	wx.getLocation({
    		type : 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    	    success: function (res) {
    	    	wgs84_lng = res.longitude;
                wgs84_lat = res.latitude;
                baiduLocation(res.longitude, res.latitude);
    	    },
    	    cancel : function(res) {
    	    	loadingDialog.hide();
            }
    	});
    },
    
    //获取内置地图
    openLocation:function(lat,log,name,addr){
    	wx.openLocation({
    		latitude: lat, // 纬度，浮点数，范围为90 ~ -90
    		longitude: log, // 经度，浮点数，范围为180 ~ -180。
    		name: name, // 位置名
    		address: addr, // 地址详情说明
    		scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
    		infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
		});
    }
};

//根据经纬度获取地址
function baiduLocation(longitude, latitude){
	var json = GPS.bd_encrypt(latitude, longitude);
	var myGeo = new BMap.Geocoder();
	// 根据坐标得到地址描述
	myGeo.getLocation(new BMap.Point(json.lon, json.lat), function(result){
		if (result){
			//alert(JSON.stringify(result));
			//alert("您当前的位置：" + result.addressComponents.city);
			$scope.loadCity(result.point.lng,result.point.lat,result.addressComponents.city);
		}else{
			loadingDialog.hide();
		}
	});
}