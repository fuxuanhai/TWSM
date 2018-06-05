/**
 * 此文档为接口文档，必须依赖jquery和jquery.cookie
 */
//框架接口，发布时需要改成对应的接口地址，isDeploy需要改为false
window.API={
	zeroURL:"http://219.223.223.208:3721/phbs-uc/",
	cmsURL:"http://219.223.223.208:3722/phbs-cms/"
};
Acp.authorizeApi="http://192.168.1.2:81/phbs-uc/users/authorize;http://219.223.223.208:3721/phbs-uc/users/authorize";
//Acp.authorizeApi="http://192.168.11.225:3721/phbs-uc/users/authorize;http://192.168.11.3:81/phbs-uc/users/authorize";

if(!apiRequest || typeof apiRequest != "function"){
	function apiRequest(options){
		Acp.api(options);
	}
}
if(!pageRequest || typeof pageRequest != "function"){
	function pageRequest(options){
		Acp.page(options);
	}
}