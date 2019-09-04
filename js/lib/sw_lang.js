//根据cookie决定调用哪种语言包
/*var uulanguage = (navigator.language || navigator.browserLanguage).toLowerCase();
if (uulanguage.indexOf("en") > -1) {
	$(".select-curr").attr("src","../img/icon/en.png");
	$("[data-localize]").localize("text", {pathPrefix: "../lang", language: "en"});
};*/
$(function(){
	$(".select-mask").height($(window).height());

	//初始化根据cookie调用json语言包
	if(getCookie("language") == "cn") {
		$(".select-curr").attr("src","../img/icon/cn.png");
		$("[data-localize]").localize("text", {pathPrefix: "../lang", language: "cn"}); 
		jsonCall({pathPrefix: "../lang", language: "cn", dataType: "json"});
	}else if(getCookie("language") == "en"){
		$(".select-curr").attr("src","../img/icon/en.png");
		$("[data-localize]").localize("text", {pathPrefix: "../lang", language: "en"});
		jsonCall({pathPrefix: "../lang", language: "en", dataType: "json"});
	}else if(getCookie("language") == "td"){
		$(".select-curr").attr("src","../img/icon/td.png");
		$("[data-localize]").localize("text", {pathPrefix: "../lang", language: "td"});
		jsonCall({pathPrefix: "../lang", language: "td", dataType: "json"});
	}else if(getCookie("language") == "jp"){
		$(".select-curr").attr("src","../img/icon/jp.png");
		$("[data-localize]").localize("text", {pathPrefix: "../lang", language: "jp"});
		jsonCall({pathPrefix: "../lang", language: "jp", dataType: "json"});
	}else if(getCookie("language") == "ko"){
		$(".select-curr").attr("src","../img/icon/ko.png");
		$("[data-localize]").localize("text", {pathPrefix: "../lang", language: "ko"});
		jsonCall({pathPrefix: "../lang", language: "ko", dataType: "json"});
	}else{
		$(".select-curr").attr("src","../img/icon/en.png");
		$("[data-localize]").localize("text", {pathPrefix: "../lang", language: "en"});
		jsonCall({pathPrefix: "../lang", language: "en", dataType: "json"});
	}
});

//设置语言cookie
function chgLang(lang) {
	setCookie("language",lang);
	parent.location.reload();
}
//切换选项框
$(".switchlan").on('click',function(){
	$(".select-mask").slideToggle();
});
//选中事件
$(".select-content .select-option").on('click', function(){
	var lang = $(this).attr("lang");
	chgLang(lang);
});
//委托事件
$(".select-mask").on('click',function(event){
	event.stopPropagation();
	$(this).fadeOut();
});