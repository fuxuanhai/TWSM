

var captchaLibrary = {};

//空验证
captchaLibrary.isNull = function(str){
	
	if(str=="" || str==null){
		return false;  //为空
	}else{
		return true;	//不为空
	}
}

//长度验证,startLength为最小长度，endLength为最大长度，
captchaLibrary.length = function(str,startLength,endLength){
	if(startLength<=str.length && str.length<=endLength){
		return true;  
	}else{
		return false;	//超出长度范围
	}
}

//账号验证,长度6-32,首位为字母,含有英文字母或者数字或者下划线
captchaLibrary.account = function(str){
	var p = /^[a-zA-Z][a-zA-Z0-9_]{5,31}$/;
	if(!p.test(str)) {
		return false;
	}else{
		return true;
	}
}

//密码验证,长度必须大于5,必须同时含有一个大小写字母和数字[0-9a-zA-Z]{6,}
captchaLibrary.password = function(str){
	var p = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([\S]*){6,}$/;
	if(!p.test(str)){
		return false;
	}else{
		return true;
	}
}



//身份证验证
captchaLibrary.idCard = function(str){
 
	var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
		21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",
		34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
		43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川"
		,52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",
		64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	function isCardID(sId){
		var iSum=0 ;
		var info="" ;
		if(!/^\d{17}(\d|x)$/i.test(sId)) 
			return false;  //你输入的身份证长度或格式错误
		sId=sId.replace(/x$/i,"a");
		if(aCity[parseInt(sId.substr(0,2))]==null) 
			return false;  //"你的身份证地区非法"
		sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
		var d=new Date(sBirthday.replace(/-/g,"/")) ;
		if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
			return false;  //"身份证上的出生日期非法"
		for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
		if(iSum%11!=1) return false;   //"你输入的身份证号非法"
		return true;//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")
	}
	if(!isCardID(str)) {
		return false;   //身份证格式错误
	}else{
		return true;
	}
}

//邮箱验证
captchaLibrary.email = function(str){
	var p = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!p.test(str)) {
		return false;
	}else{
		return true;
	}
}

//电话验证，纯数字
captchaLibrary.phone = function(str){
	var p = /^[0-9]*$/;
	if(!p.test(str)) {
		return false;
	}else{
		return true;
	}
}

