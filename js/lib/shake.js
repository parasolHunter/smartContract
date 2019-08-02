var speed = 25; //定义摇一摇加速度的临界值 值越小摇动的力度越小
		var x = y = z = lastX = lastY = lastZ = 0; //初始化x,y,z上加速度的默认值
        var isHaveShaked = false;//用于记录是否在动画执行中
        function init() { 
       //判断系统是否支持html5摇一摇的相关属性
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            } else {
                alert('not support mobile event');
            }
        }
        function deviceMotionHandler() {
//            获取x,y,z方向的即时加速度
            var acceleration = event.accelerationIncludingGravity;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed
                || Math.abs(z - lastZ) > speed) {
                //摇一摇实际场景就是加速度的瞬间暴增爆减
                if (!isHaveShaked) {
//                    alert(x);   //自己测试各坐标的值。。
//                    alert(y);
//                    alert(z);
                    //手机震动1秒
                    if (navigator.vibrate) {
                        navigator.vibrate(1000);//震动1000毫秒
                    } else if (navigator.webkitVibrate) {
                        navigator.webkitVibrate(1000);
                    }
                    //模拟网络请求做想干的事
                    isHaveShaked = true;
                    setTimeout(function () {
                        isHaveShaked = false;
                        //.....              
                        location.href='luckyRedPackets.html';
                    }, 1000);
                }
            }
//            保存历史加速度
            lastX = x;
            lastY = y;
            lastZ = z;
        }
        $(function(){
        	init();
        });