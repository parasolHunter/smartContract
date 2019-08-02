function valid(a,type,b){
	var reg = null;
	var result = true;
	
	//判断输入是否为空或undefined
	if(a==""||a==null||a==undefined) result=false;
	
	switch(type){
    	case 0:
    		//校验正整数
    		reg = /^[1-9]\d*$/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 1:
    		//校验必须两位小数--^[0-9]+(\.[0-9]{2})?$
    		//可以1位
    		reg = /^[0-9]+(.[0-9]{1,2})?$/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 2:
    		//校验两数字大小
    		if(a>b) result=false;
    		break;
    	case 3:
    		//校验两数字相除余数是否为0
    		if(a%b!=0) result=false;
    		break;
    	case 4:
    		//校验两数字是否相等
    		if(a!=b) result=false;
    		break;
    	case 5:
    		//校验手机号--^1(3|4|5|6|7|8)\d{9}$
    		reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 6:
    		//校验8到20位登录密码,字母或数字
    		reg = /^[A-Za-z0-9]{8,20}$/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 7:
    		//校验支付密码
    		reg = /^[0-9]{6}$/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 8:
    		//校验银行卡号
    		reg = /^[A-Za-z0-9]+$/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 9:
    		//校验身份证号
    		reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 10:
    		//校验8到20位登录密码（英文+数字）
    		reg = /(?=^.*?[a-zA-Z])(?=^.*?\d)^(.{8,20})$/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 11:
    		//判断接口返回错误码
    		if(a=="400"||a=="500") result=false;
    		break;
    	case 12:
    		//校验a是否低于b
    		if(a>=b) result=false;
    		break;
    	case 13:
    		//校验6位支付密码，（英文+数字）
    		reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,6}$/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 14:
    		//校验邮箱
    		reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    		if(!(reg.test(a))) result=false;
    		break;
    	case 15:
    		//校验4-16位，字母+数字同时出现
    		reg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{4,16}$/;
    		if(!(reg.test(a))) result=false;
    		break;
	}
	return result;
}