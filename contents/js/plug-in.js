
//上传图片插件
function uploadeImg(){
	// 初始化Web Uploader
		var BASE_URL = '../contents/ueditor/third-party/webuploader';
		var uploader = WebUploader.create({

			// 选完文件后，是否自动上传。
			auto: true,
			// swf文件路径
			swf: BASE_URL + '/Uploader.swf',

			// 文件接收服务端。
			server: Acp.uploader.getUploadApi("adminSystemWebsite.upload"),

			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick: '#filePicker',

			// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
			resize: false
		});  
		
		setTimeout(function(){
			$("#filePicker input").removeAttr("multiple");
		},1000)
		
		
		//当文件上传成功时触发。
		uploader.on('uploadSuccess', function(file, response) {
			
				var md5 = jQuery.parseJSON(response._raw).data.md5;
				$("#bannerId").val(md5);
				
			
		});

		// 当有文件添加进来的时候
		uploader.on("fileQueued", function(file) {
			var $li = $(
					"<div id='" + file.id + "' class='file-item thumbnail' style='float:left;margin-right:10px'>" +
					"<img>"
					//   +"<div class='info'>"+file.name+"</div>"  
					+
					"</div>"
				),
				$img = $li.find("img");
			$("#fileList").empty();
			// $list为容器jQuery实例
			$("#fileList").append($li);

			// 创建缩略图
			// 如果为非图片文件，可以不用调用此方法。
			// thumbnailWidth x thumbnailHeight 为 100 x 100
			var thumbnailWidth = 100;
			var thumbnailHeight = 100;
			uploader.makeThumb(file, function(error, src) {
				if(error) {
					$img.replaceWith("<span>不能预览</span>");
					return;
				}

				$img.attr("src", src);
			}, thumbnailWidth, thumbnailHeight);

		});
	
}



function editorBaidu(){
	
		UE.delEditor('editor');
		var editor = UE.getEditor('editor', {
			//这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
			toolbars: [
				['FullScreen', 'Source', 'Undo', 'Redo', 'Bold', 'italic', 'underline', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'fontfamily', 'fontsize', 'test', 'insertimage','preview']
			],
			//focus时自动清空初始化时的内容
			autoClearinitialContent: false,
			//关闭字数统计
			wordCount: false,
			//关闭elementPath
			elementPathEnabled: false,
			// 服务器统一请求接口路径
			//serverUrl: "",
			//默认的编辑区域高度
			initialFrameHeight: 300,
			//	initialContent:$scope.htmlVariable
			//更多其他参数，请参考ueditor.config.js中的配置项
		});
	
}




//WdatePicker()