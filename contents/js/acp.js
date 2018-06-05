console.log=(function(raw){
	return function(text){
		raw.call(console,text);
	}
})(console.log);
//获取或者设置用户令牌
window.TOKEN=function(userToken, path){
	if(userToken){
		Acp.userToken(userToken, path);
	}else{
		return Acp.userToken();
	}
	
};
var Acp = {
	/**
	 * 可访问的接口
	 */
	apis:{},
	/**
	 * ajax请求类型
	 */
	contentType:"text/plain",
	/**
	 * ajax请求方法
	 */
	method:"POST",
	/**
	 * 授权接口地址,项目中需要将此地址修改。可按如下格式修改：<br/>
	 * 开发环境授权接口地址;发布环境授权接口地址<br/>
	 * 注意两个接口地址之间通过分号隔开。脚本通过Acp.isDeploy()自动控制当前环境需要的接口地址<br/>
	 */
	authorizeApi:"http://192.168.1.3:81/phbs-uc/users/authorize",
	/**
	 * 是否开发状态，根据当前访问地址判断，如果请求地址为localhost或者127.0.0.1，则表示开发状态，其它请求地址一律为发布状态。<br/>
	 */
	isDeploy:function(){
		if('localhost'==location.hostname || '127.0.0.1'==location.hostname){
			return true;
		}
		return false;
	},
	/**
	 * 获取或者设置用户令牌
	 */
	userToken:function(userToken, path){
		if(userToken){
			if(!path){
				path = '/';
			}
			$.cookie('userToken',userToken,{path: path });
		}else{
			var token = $.cookie('userToken');
			if(!token){
				return "";
			}
			return token;
		}
	},
	/**
	 * 根据url获取API接口地址
	 */
	getApiByKey:function(url){
		var path = url.match(/^[^?#&]+/);
		var key1 = url.match(/[^.]+/)[0];
		var key2 = url.match(/\.[^?&]+/)[0].split('.')[1];
		var param = url.match(/[?&].*/);
		var source = Acp.apis[key1]["source"];
		url = Acp.apis[key1][key2];
		if(param){
			url += param[0];
		}
		return {
			url: url,
			source:source
		}
	},
	/**
	 * 判断url是否页面请求
	 */
	isPage:function(url){
		var path = url.split(/\?|#|\&/)[0];
		var result = /\.shtml$/.test(path);
		return result;
	},
	/**
	 * 根据请求结果检查签名是否正确
	 */
	signCheck:function (data){
		var result = {
			"1000":"调用错误，请传入请求接口地址",
			"1001":"验证码错误",
			"10002":"令牌错误",
			"10003":"授权失败"
		}
		if(data in result){
			return {
				status: data,
				statusText:result[data]
			}
		}
		return true;
	},
	/**
	 * 获取当前根目录,不包含域名及端口
	 */
	rootPath:function(){
		var path = location.pathname;
		var partials = path.split('/');
		if(partials && partials.length > 1){
			return partials[1];
		}
		return "";
	},
	/**
	 * 签名
	 * sync表示是否同步，如果为true则表示同步，false表示异步,默认false
	 */
	signature:function(api,userToken,requestData,source,callback, enforce, sync){
		api = api?encodeURIComponent(api):'';
		sync = sync||false;
		var url = '/'+Acp.rootPath()+'/clientSecure.action?userToken='+userToken+'&api='+api;
		if(source){
			url+="&source="+source;
		}
		if(enforce){//强刷令牌
			url += '&enforce=1';
		}
		var cacheContent = Acp.cache(url, requestData);
		if(cacheContent){
			callback(cacheContent);
			return;
		}
		$.ajax({
			url:url,
			type:Acp.method,
			contentType:Acp.contentType,
			//async:!Acp.isPage(api),
			async:!sync,
			data:requestData,
			success:function(data,status,xhq){
		    	var result = Acp.signCheck(data);
		    	if(result !== true){
		    		data = result;
		    	}else{
		    		data = {
		    			status:"1",
		    			data:data
		    		}
		    	}
				Acp.cache(url, requestData, data);
		    	callback(data);
			},
			error:function(xhq,error,e){
				throw error;
			}
		});
	},
	/**
	 * 授权
	 * sync表示是否同步，如果为true则表示同步，false表示异步,默认false
	 */
	authorize:function (api,userToken,signature,callback,sync){
		api = api?encodeURIComponent(api):'';
		sync = sync||false;
		if(!signature){
			signature = "";
		}
		var url = '';
		var authUrl = Acp.authorizeApi.split(/;|；/);
		if(Acp.isDeploy()){//开发环境
			url = authUrl[0];
		}else{//发布环境
			url = authUrl[1];
		}
		url += '?userToken='+userToken+'&signature='+signature+'&authorize=&api='+api;
		var cacheContent = Acp.cache(url);
		if(cacheContent){
			callback(cacheContent);
			return;
		}
		$.ajax({
			url:url,
			type:Acp.method,
			contentType:Acp.contentType,
			//async:!Acp.isPage(api),
			async:!sync,
		    data:null,
		    success:function(data,status,xhq){
		    	var result = Acp.signCheck(data);
		    	if(result !== true){
		    		data = result;
		    	}else{
		    		data = {
		    			status:"1",
		    			data:data
		    		}
		    	}
				Acp.cache(url, null, data);
		    	callback(data);
		    },
		    error:function(xhq,error,e){
		    	throw error;
		    }
		});
	},
	/**
	 * 业务
	 * sync表示是否同步，如果为true则表示同步，false表示异步,默认false
	 */
	business:function (api,userToken,signature,authorize,requestData,callback,sync){
		var url = api;
		api = api?encodeURIComponent(api):'';
		sync = sync||false;
		authorize = encodeURIComponent(authorize);
		if(url.indexOf('?')!=-1){
			url += '&userToken='+userToken+'&signature='+signature+'&authorize='+authorize+'&api='+api;
		}else{
			url += '?userToken='+userToken+'&signature='+signature+'&authorize='+authorize+'&api='+api;
		}
		var cacheContent = Acp.cache(url, requestData);
		if(cacheContent){
			callback(cacheContent);
			return;
		}
		$.ajax({
			url:url,
			type:Acp.method,
			contentType:Acp.contentType,
			//async:!Acp.isPage(url),
			async:!sync,
			data:requestData,
			success:function(data, status, xhq){
		    	var result = Acp.signCheck(data);
		    	if(result !== true){
		    		data = result;
		    	}
		    	if(Acp.isDeploy() && Acp.isPage(url)){
		    		data = {
		    			page:data
		    		};
		    	}else{
		    		data = JSON.parse(data);
		    	}
				Acp.cache(url, requestData, data);
		    	callback(data);
			}
		});
	},
	/**
	 * 根据请求地址和请求参数在客户端缓存数据，如果没有缓存数据则返回null
	 */
	cache:function(url,params,content){
		var url_key = md5(url);
		var params_key = "";
		if(params){
			params_key = md5(params);
		}
		var key = url_key+','+params_key;
		var timestamp = new Date().getTime();
		if(content){
			var data = {
				"timestamp":timestamp,
				"content":content
			}
			data = JSON.stringify(data);
			sessionStorage.setItem(key,data);
			return;
		}
		var value = sessionStorage.getItem(key);
		if(!value){
			return null;
		}
		value = JSON.parse(value);
		if(value.timestamp+3000 < timestamp){
			sessionStorage.removeItem(key);
			return null;
		}
		return value.content;
	},
	/**
	 * options json对象，包含以下参数
	 * 	url:接口地址的键，在config.json中配置
	 *  data:请求数据
	 *  callback:请求回调函数
	 *  sync:是否同步执行，默认为异步。此参数已过期
	 *  step:执行步骤，默认全部执行，1：只执行第一步签名；2：执行到授权；3：执行到接口请求。此参数已过期
	 *  enforce:强制更新签名令牌，当签名错误时使用
	 *  示例：
	 {
		url: $url,
		data: $data,
		callback: $callback
	 }
	 */
	api:function(options){
		if(!options.url){
			return;
		}else {
			if(!Acp.isPage(options.url)){//页面请求不需要转换url
				/**
				 * options.url必须满足key.key2(?&)params的格式，其中?和&后面为请求参数
				 */
				var apiBykey = Acp.getApiByKey(options.url);
				var source = apiBykey.source;
				options.url = apiBykey.url;
			}
		}
		var userToken = Acp.userToken();
		if(!options.sync){
			options.sync = false;
		}
		var requestData = JSON.stringify(options.data);
		if(Acp.isDeploy()){//开发环境
			Acp.authorize(options.url,userToken,"",function(data){
				if(options.step==2){
					options.callback(data);
					return;
				}
				if(data.status){
					var authorizeCode = data.data;
					Acp.business(options.url,userToken,"",authorizeCode,requestData,function(data){
						options.callback(data);
					},Acp.isPage(options.url));
				}else{
					options.callback(data);
				}
			},Acp.isPage(options.url));
		}else{//发布环境
			Acp.signature(options.url,userToken,requestData,source,function(data){
				if(data.status!="1"){
					if(!options.enforce){
						options.enforce = true;
						Acp.api(options);
					}else{
						alert(data.statusText);
					}
					return;
				}
				var signature = data.data;
				Acp.authorize(options.url,userToken,signature,function(data){
					if(options.step==2){
						options.callback(data);
						return;
					}
					if(data.status){
						var authorizeCode = data.data;
						Acp.business(options.url,userToken,signature,authorizeCode,requestData,function(data){
							options.callback(data);
						},Acp.isPage(options.url));
					}else{
						options.callback(data);
					}
				},Acp.isPage(options.url));
			}, options.enforce,Acp.isPage(options.url));
		}
	},
	/**
	 * 请求页面,示例:
	 {
		url: $url,
		data: $data,
		callback: $callback,,
	 }
	 */
	page:function(options){
		if(!options.step){
			options.step = 3;
		}
		var callback = options.callback;
		options.callback=function(data){
			if(Acp.isDeploy()){//开发环境
				$.ajax({
					url:"../config.json",
					type:'GET',
					async:false,
					dataType:'json',
					success:function(data,status,xhq){
						Acp.apis = data;
					},
					error:function(xhq,error,e){
						throw error;
					}
				});
				callback(data.page);
			}else{//发布版本
				callback(data.page);
				if(data.api){
					for(var key in data.api){
						Acp.apis[key] = data.api[key];
						Acp.apis[key]["source"] = data.source;
					}
				}
			}
		}
		Acp.api(options);
	}
}