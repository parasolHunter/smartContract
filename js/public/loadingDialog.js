$(document).ready(function(){
	$(document.body).append('' +
			'<style>' +
			'#loadingDialog{' +
			'	opacity:0;'+
			'	transition: opacity 1s;'+
			'	-moz-transition: opacity 1s;' +
			'	transition: opacity 1s;;' +
			'	-o-transition: opacity 1s;' +
			'}' +
			'#loadingDialog .img{' +
			'	-webkit-animation:loadingDialogRotate 1s linear infinite;' +
			'	-webkit-transform:rotate(30deg);' +
			'}' +
			'@-webkit-keyframes loadingDialogRotate{' +
			'	0%{' +
			'		-webkit-transform:rotate(0deg);' +
			'	}' +
			'	100%{' +
			'		-webkit-transform:rotate(360deg);' +
			'	}' +
			'}' +
			'</style>' +
			'<div id="loadingDialog" style="width:100%; height:100%; background-color:rgba(0,0,0,0.5); position:fixed; left:0px; top:0px; z-index:999999999;display:none;">' +
			'	<div class="img" style="width:81px; height:80px; background:url(../img/icon/loading_run.png) center center no-repeat; position:absolute; left:50%; top:50%; margin-left:-40px; margin-top:-40px;"></div>' +
			'</div>');
});
var loadingDialog = {
	show : function(callback){
			$("#loadingDialog").on('touchmove', function (event) {
				event.stopPropagation();
			});
		//$("#loadingDialog").fadeIn(500,callback);
		//setTimeout(function(){
			$("#loadingDialog").show();
			$("#loadingDialog").css("opacity","1");
		//},0)
	},
	hide : function(callback){
			$("#loadingDialog").on('touchmove', function (event) {
				event.stopPropagation();
			});
		//$("#loadingDialog").fadeOut(500,callback);
		//setTimeout(function(){
			$("#loadingDialog").hide();
			$("#loadingDialog").css("opacity","0");
		//},0)
	},
};