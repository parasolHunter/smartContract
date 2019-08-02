//倒计时，pttime为秒
function countdown(pttime){
	var time = setInterval(function() {
		if (pttime > 0) {
			pttime++;
		} else {
			clearInterval(time);
		}
		show_time(pttime);
	}, 1000);
}
//处理显示时间
function show_time(pttime) {
	// 相差天数
	var days = Math.floor(pttime / (24 * 3600));
	// 相差小时
	var leave1 = pttime % (24 * 3600);
	var hours = Math.floor(leave1 / (3600));
	// 相差分数
	var leave2 = leave1 % (3600);
	var minutes = Math.floor(leave2 / (60));
	// 相差秒数
	var leave3 = leave2 % (60);
	var seconds = Math.round(leave3);

	// 时分秒为单数时、前面加零站位
	if (hours < 10)
		hours = "0" + hours;
	if (minutes < 10)
		minutes = "0" + minutes;
	if (seconds < 10)
		seconds = "0" + seconds;
	surplustime = days + '天' + hours + ':' + minutes + ':' + seconds;
	return surplustime;//返回已处理的显示时间
}