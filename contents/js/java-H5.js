/**
 * 此js为移动端调用网页的js方法
 */
 //JAVA调用网页js进行搜索动作，这里关键词往往是语音识别的结果
function startSearch(searchWord){	
	var cliURL=window.location.protocol+"//"+window.location.host+"/"+window.location.pathname.split("/")[1]+"/";
	window.location.href=cliURL+"pages/phoneIndex.shtml#/phoneApp/searchResult"+searchWord+"&";
}
//传回网页，网页使用ajax方式将内容回传给服务器，同步显示或者存入数据库
function commitVoiceComment(comment){
	var applyData = {content:[{"voice": comment, "isOver": 0, "content_id":parseInt($.cookie("anliId"))}]};
	var type= "phoneContentsDetailAddVoice";
	var opts={};
	opts.data = applyData;
	opts.callback =  function(data) {
			//申请接口结束的回调函数
			var status = data.status;
			var statusText = data.statusText;
			if(status == 1) {
				
			} else {
				alertHtml($modalOBj,"发言失败,原因："+statusText);
			}
		}
	opts.url = "phoneContentsDetail.addVoice";
	opts.sync = true;
	apiRequest(opts);
}


 //一次发言结束，将最终结果回传给服务器
function commitVoiceCommentEnd(comment){
	
	var applyData = {content:[{"voice": comment, "isOver": 1, "content_id": parseInt($.cookie("anliId"))}]};
	var type= "phoneContentsDetailAddVoice";
	applicationService(applyData,type,function(data){
		var status = data.status;
		var statusText = data.statusText;
		if(status == 1) {
			//alert("发言成功");
			alertHtml($modalOBj,"发言成功");
		} else {
			alertHtml($modalOBj,"发言失败,原因："+statusText);
		}
	},$('body'));
	
}

