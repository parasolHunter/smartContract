$(document).ready(function(){
	$("body").css({"opacity":1});
	resizeBaseContent(1);//无底部
});
//isfoot=1底部0.98,2底部1.2rem,空则无底部
function resizeBaseContent(ishead,isfoot){
	var ratio = 100 * $(window).width() / 750;
	var header = 0;
	var footer = 0;
	if(ishead == 1){
		header = 1.7 * ratio;
	}
	if(isfoot == 1){
		footer = 0.98 * ratio;
	}else if(isfoot == 2){
		footer = 1.2 * ratio;
	}
	
	if($("#bottom_resizeContent").height()){
		var bottom_resizeContent = 1.2 * ratio;
		$("#baseContent").height($(window).height()-header-footer-1-bottom_resizeContent);
	}else{
		//通用
		$("#baseContent").height($(window).height()-header-footer-1);		
	}
}