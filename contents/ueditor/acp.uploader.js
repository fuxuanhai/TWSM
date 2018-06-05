/**
 * 适配配置，因Acp需要先签名在正常调用，可能与一些第三方插件有冲突，可通过此属性扩展兼容；
 * 引用此文件前必须先引用acp.js；
 * 此脚本适配ueditor、uploader；
 * 此脚本可以根据实际情况进行修改，但必须保证版本的兼容；
 */
Acp.uploader={
	/**
	 * 获取上传接口,如果是百度编辑器，需要将isUeditor设置为true.
	 */
	getUploadApi:function(key,isUeditor){		
		/**
		 * 上传接口签名，需在上传前调用此方法进行签名
		 */
		function uploadSignature(api){
			var userToken = Acp.userToken();
			var signature = "";
			var authorize = "";
			if(!Acp.isDeploy()){
				Acp.signature(api,userToken,"","",function(data){
					if(data.status!="1"){
						alert(data.data);
						return;
					}
					signature = data.data;
				},false,true);
			}

			Acp.authorize(api,userToken,signature,function(data){
				if(data.status=="1"){
					authorize = data.data;
				}else{
					return;
				}
			},true);
			
			return {
				signature:signature,
				authorize:authorize
			};
		}
		
		var apiByKey = Acp.getApiByKey(key);
		var url = apiByKey.url;
		var token = uploadSignature(url);
		
		if(url.indexOf('?')>-1){
			url += '&';
		}else{
			url += '?';
		}
		url += 'signature='+token.signature+'&authorize='+token.authorize;
		if(isUeditor){
			url += '&referrer=ueditor';
		}
		return url;
	}	
}