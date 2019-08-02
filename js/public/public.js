const publicUrl = '../../';
const redirectUrl = "login.html";
//ajax的再次封装
var method = {
  ajax: obj => {
    $.ajax({
      url: obj.url || {},
      type: "POST",
      dataType: "json",
      data: obj.data || {},
      //跨域
      /*xhrFields: {
				withCredentials: true
			},
			crossDomain: true,*/
      //选择是否支持异步刷新，默认为true
      async: obj.async || {},
      beforeSend: obj.beforeSend || {},
      success:
        obj.success ||
        (data => {
          console.log(data);
        }),
      complete: obj.complete || {},
      error:
        obj.error ||
        (XMLHttpRequest,
        textStatus,
        errorThrown => {
          blackDialog.show("连接超时");
          console.log(XMLHttpRequest.status);
          console.log(XMLHttpRequest.readyState);
          console.log(textStatus);
        })
    });
  }
};
function setStore(key, value) {
  window.localStorage.setItem(key, value);
}
function getStore(key) {
  return window.localStorage.getItem(key);
}
function removeStore(key) {
  return window.localStorage.removeItem(key);
}
function clearStore() {
  window.localStorage.clear();
}
function setSession(key, value) {
  window.sessionStorage.setItem(key, value);
}
function getSession(key) {
  return window.sessionStorage.getItem(key);
}
function removeSession(key) {
  return window.sessionStorage.removeItem(key);
}
function clearSession() {
  window.sessionStorage.clear();
}
function stringify(array) {
  return JSON.stringify(array);
}
function parse(array) {
  return JSON.parse(array);
}
function getQueryStr(str, locString) {
  var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return "";
}
function getQueryArray() {
  var oUrl = window.location.href;
  var arr = oUrl.split("?");
  if (arr.length <= 1) {
    return null;
  }
  var oM = "";
  var arry = new Array();
  if (oUrl.indexOf("&")) {
    if (arr[1].split("&").length > 1) {
      for (var i = 0; i < arr[1].split("&").length; i++) {
        arry[i] = arr[1].split("&")[i].split("=")[1];
      }
      return arry;
    }
    oM = arr[1].split("&")[0].split("=")[1];
  } else {
    oM = arr[1].split("=")[1];
  }
  return oM;
}
//输入框格式text,添加oninput="xxx(this)"
//保留一位小数
function xiaoshu1(obj) {
  obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
  obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  obj.value = obj.value
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3"); //只能输入两个小数
  if (obj.value.indexOf(".") < 0 && obj.value != "") {
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj.value = parseFloat(obj.value);
  }
}
//保留两位小数
function xiaoshu(obj) {
  obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
  obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  obj.value = obj.value
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
  if (obj.value.indexOf(".") < 0 && obj.value != "") {
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj.value = parseFloat(obj.value);
  }
}
//保留4位小数
function xiaoshu4(obj) {
  obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
  obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  obj.value = obj.value
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, "$1$2.$3"); //只能输入两个小数
  if (obj.value.indexOf(".") < 0 && obj.value != "") {
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj.value = parseFloat(obj.value);
  }
}

//只能为正整数
function zhengshu(obj) {
  if (obj.value.substr(0) == "0") {
    obj.value = obj.value.replace(/[^1-9]/g, "");
  }
  obj.value = obj.value.replace(/\D/g, "");
}

//只能为字母或数字
function letterNumber(obj) {
  var reg = /^[^\u4e00-\u9fa5]+$/;
  if (!reg.test(obj.value.substr(0))) {
    obj.value = "";
  }
}

//去掉所有的html标记
function removeHtml(html) {
  var text = html.replace(/<\/?[^>]*>/gim, "");
  return text;
}

//去掉所有空格
function removeSpaces(str) {
  var newStr = str.replace(/\s+/g, "");
  return newStr;
}

//去掉前后空格
function removeSpace(str) {
  var newStr = str.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
  return newStr;
}

//输入框格式text,添加onkeyup="isChinese(this)",onbeforepaste="isPasteChinese()"
//只能为中文
function isChinese(obj) {
  obj.value = obj.value.replace(/[^\u4E00-\u9FA5]/g, "");
}

function isPasteChinese() {
  clipboardData.setData(
    "text",
    clipboardData.getData("text").replace(/[^\u4E00-\u9FA5]/g, "")
  );
}

//存cookies函数
function setCookie(name, value) {
  var Days = 30; //此 cookie 将被保存 30 天
  var exp = new Date(); //new Date("December 31, 9998");
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//取cookies函数
function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

//转换百分数保留两位小数
function toPercent(point) {
  var str = Number(point * 100).toFixed(2);
  str += "%";
  return str;
}
//验证手机号码
function isMobile(data) {
  var reg = /^1[345789]\d{9}$/;
  if (!reg.test(data) && !valid(data, 14)) {
    blackDialog.show(retData.login.correctMobile);
    $("#oMobile").focus();
    return false;
  } else {
    return data;
  }
}
function closeMask(obj) {
  var e = window.event || arguments.callee.caller.arguments[0];
  if (e.target.id == $(obj).attr("id")) {
    $(obj).fadeOut();
  }
}
//把时间戳格式化成-日期格式
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
//把日期格式转成-时间戳
function timeToTimestamp(date) {
  var time = new Date(date);
  // 有三种方式获取
  time = time.getTime();
  return time;
}

function copy(obj) {
  var input = document.createElement("input");
  input.value = obj;
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, input.value.length), document.execCommand("Copy");
  document.body.removeChild(input);
}
//创建下载任务
function saveDownload() {
	var img = document.getElementById("testImg"); // 获取要下载的图片
    var alink  = document.createElement('a'); // 创建一个a节点插入的document
    var event = new MouseEvent('click'); // 模拟鼠标click点击事件
    alink.download = 'beautifulGirl'; // 设置a节点的download属性值
    alink.href = img.src; // 将图片的src赋值给a节点的href
   	alink.dispatchEvent(event);  
}