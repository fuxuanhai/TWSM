/**
 * 此js为公共方法
 */

function consoleLog(str){
	console.log(str);
};



function teacherLoginSuccess(teacherDate,fun,data){
	
	if((teacherDate.sid & 2)==2 || (teacherDate.sid & 4)==4){
		window.TOKEN(teacherDate.userToken);
		$.cookie("sid", teacherDate.sid,{ path: '/' });
		$.cookie("status", teacherDate.status,{path: '/' });
		$.cookie("statusText", teacherDate.statusText,{path: '/' });
		
		if(fun!=null && typeof fun=="function"){
				fun(data);
			}
	}else{
		$(".error").css('display','block');
		$(".error").text("只能非管理员用户登录");
	}
}

function adminLoginSuccess(adminDate,fun,data){
	
	
	if((adminDate.sid & 1)==1){
		window.TOKEN(adminDate.userToken);
		$.cookie("sid", adminDate.sid,{ path: '/' });
		$.cookie("status", adminDate.status,{path: '/' });
		$.cookie("statusText", adminDate.statusText,{path: '/' });
		if(fun!=null && typeof fun=="function"){
				fun(data);
			}
		
	}else{
		$(".error").text("只能管理员用户登录");
	}
}

function p(s) {
    return s < 10 ? '0' + s: s;
}

//时间戳转成时间
 function changeTime(timestamp){
	
		var date = new Date(timestamp);    //根据时间戳生成的时间对象
		var time = (date.getFullYear()) + "-" + 
				   p(date.getMonth() + 1) + "-" +
				   p(date.getDate()) + " " + 
				   p(date.getHours()) + ":" + 
				   p(date.getMinutes()) + ":" + 
				   p(date.getSeconds());
		return time;
 }


//获取列表前面的复选框的所有选中
 function getCheckedOfList(){
	var uid = [];
		var objArr = $(".i-checks input[type='checkbox']:checked");
		for(var i=0;i<objArr.length;i++){
			if(objArr.eq(i).attr('vid') !=null && objArr.eq(i).attr('vid') !=""){
				uid[uid.length]=  parseInt(objArr.eq(i).attr('vid')); 
			}	
		};	
	return uid;
 
 }



function getCurrentTime(){
	var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate(); 
	var h=myDate.getHours();       //获取当前小时数(0-23)
	var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	var s=myDate.getSeconds();  

	var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
	return now ; 
}

/*
alert提示的调用方法，$modal为angular模态框的变量，str为提示内容，
fun为点击确认后执行的方法，obj为fun的参数集合
*/
function alertHtml($modal,str,fun,obj){
	var url = cliURL+"pages/blocks/alert.shtml";
	var data = {};
	pageRequest({
		url: url,
		data: data,
		callback: function(data) {
			var modalInstance = $modal.open({
			 //  templateUrl: 'myModalContent.html',
				template:data,
				controller: 'alertHtml',
				size: "sm",
			});
			/*modalInstance.result.then(function (activity) {	
				console.log("点击ok执行成功");
			}, function () {
					console.log("点击cancel执行成功");
			});*/
		}
	});		
	app.controller('alertHtml', ['$scope', '$modalInstance',  function($scope, $modalInstance) {
		$scope.infoText=str;
		$scope.ok = function () {
			$modalInstance.close();
			if(fun!=null && typeof fun=="function"){
				fun(obj);
			}
		}	
	}]);
}

/*
删除提示弹层的调用方法，$modal为angular模态框的变量，str为提示内容，
fun为点击确认后执行的方法，obj为fun的参数集合
*/
function deleteHtml($modal,str,fun,obj){
	var url = cliURL+"pages/blocks/delete.shtml";
	var data = {};
	pageRequest({
		url: url,
		data: data,
		callback: function(data) {
			var modalInstance = $modal.open({
			 //  templateUrl: 'myModalContent.html',
				template:data,
				controller: 'deleteHtml',
				size: "sm",
			});
			/*modalInstance.result.then(function (activity) {	
				console.log("点击ok执行成功");
			}, function () {
					console.log("点击cancel执行成功");
			});*/
		}
	});		
	app.controller('deleteHtml', ['$scope', '$modalInstance',  function($scope, $modalInstance) {
		$scope.infoText=str;
		$scope.ok = function () {
			$modalInstance.close();
			if(fun!=null && typeof fun=="function"){
				fun(obj);
			}
		}
		$scope.cancel = function () {
		  $modalInstance.dismiss('cancel');
		};	
	}]);
}

//递归转换数据格式，把集合中list和他的子集合children，合并成一元数组options;
function changeList(list, deep) {
	
	var options = [];
	var pre = '|-';
	var tmp = deep;
	if(deep > 0) {
		while(tmp > 0) {
			pre += '--';
			tmp--;
		}
	}
	for(var i = 0; i < list.length; i++) {
		
		if(list[i].title=="" || list[i].title==null){
			list[i].title = list[i].text;
			list[i].text = pre + list[i].text;
		}else{
			list[i].text = list[i].title;
			list[i].title = pre + list[i].title;
		}
		
		options[options.length] = list[i];
		if(list[i].children) {
			var child = changeList(list[i].children, deep + 1);
			options = options.concat(child);
		}
	}
	return options;
}


//转换数据，把案例库的表单输入字符串信息转成json格式
function changeData(oneContent,catagories) {

			var id = oneContent.id;
			var cid = oneContent.cid;
			var addtime = oneContent.addtime.split(" ")[0];
			var lastTime = oneContent.lasttime;
			var obj = oneContent.content.value;
			var contents = eval(obj);
			var number = "";
			var title = "";
			var author = "";
			var type = "";
			var languageNum = "";
			var language = "";
			var industry = "";
			var key = "";
			var statue = "";
			var anliType = "";
			var liulanliang = "";
			var anliAbstract = "";
			var htmlVariable = "";
			var fujianArr="";
			var titleImgMd5 = "";
			var titleImg="../contents/imgs/home/banner.png";
			
			
			if(catagories!="" && catagories!=null){
				for(var j=0;j<catagories.length;j++){
					if(catagories[j].id == oneContent.cid){
						type = catagories[j].text;
						if(type=="" || type==null){
							type = catagories[j].title;
						}
					}
				}
			}
			
			for(var i=0;i<contents.length;i++){
				switch (contents[i].title){
					case "案例编号":
						number = contents[i].value;
						break;
					case "案例题目":
						title = contents[i].value;
						break;
					case "案例作者":
						author = contents[i].value;
						break;
					
					case "案例语种":
						languageNum= contents[i].value;
						if(languageNum==0){
							language = "中文";
						}else{
							language = "英文";
						}
						break;
					case "所属行业":
						industry= contents[i].value;
						break;
					case "关键词":
						key= contents[i].value;
						break;
					case "状态":
						statue = contents[i].value;
						break;
					case "案例类型":
						anliType = contents[i].value;
						break;
					case "浏览量":
						liulanliang= contents[i].value;
						if(liulanliang=="" || liulanliang==null){
							liulanliang=0;
						}
						break;
					case "案例摘要":
						anliAbstract = contents[i].value;
						break;
					case "内容":
						htmlVariable = contents[i].value;
						break;
					case "标题图片":
						if(contents[i].value[0]!="" && contents[i].value[0]!=null){
							titleImg =zeroURL + "common/file/image?id=" + contents[i].value[0] + "&size=";
							titleImgMd5 = contents[i].value[0];
						}
						
						break;
					case "案例附件":
						fujianArr = contents[i].value;	
						
					break;
				}
			}
			
			return {
				'id': id,
				'cid':cid,
				'addtime': addtime,
				'title': title,
				"number": number,
				"author": author,
				"type": type,
				"language": language,
				"languageNum": languageNum,
				"industry": industry,
				"liulanliang":liulanliang,
				"key": key,
				"statue": statue,
				"anliType":anliType,
				"titleImgMd5":titleImgMd5,
				"titleImg":titleImg,
				"anliAbstract": anliAbstract,
				"htmlVariable":htmlVariable,
				"fujianArr":fujianArr,
				'obj': obj
			}

		}

//分页的显示
function page(scope, count, currentPage1,pageSize) {
	if(count=="" || count==null || count==0 || count=="0"){
		scope.pageShow=false;
	}else{
		scope.pageShow=true;
	}
	if(pageSize=="" || pageSize==null){
		pageSize=15;
		
	}
	scope.pageCount = Math.ceil(count / pageSize);
	
	if(currentPage1 > scope.pageCount) {
		currentPage1 = scope.pageCount;
	}
	
	var pages = [];
	var startPage = 3;
	var endPage = 3;
	if(currentPage1 < 3) {
		startPage = 1;
		endPage = 5;
	}

	if(currentPage1 > (scope.pageCount - 2)) {
		startPage = 4;
		endPage = 3;
	}

	for(var i = 1; i <= scope.pageCount; i++) {
		
		if((currentPage1 - startPage) < i && i < (currentPage1 + endPage)) {
			pages[pages.length] = i;
		}
	}
	scope.pages = pages;
	if(currentPage1 <= 1) {
		scope.prevPage = 1;
	} else {
		scope.prevPage = currentPage1 - 1;
	}
	if(currentPage1 < scope.pageCount) {
		scope.nextPage = currentPage1 + 1;
	} else {
		scope.nextPage = scope.pageCount;
	}
}


var loadingModal={};
var loading = [];
//申请服务器的统一接口
function applicationService(applyData,type,fun,obj){
	
	
	
	//申请接口时启动加载状态界面
	if(obj!="" && obj!=null){
		
		var url = cliURL+"pages/blocks/Loading.shtml";
		var data = {};
		pageRequest({
			url: url,
			data: data,
			callback: function(data) {
				if(loading.length<1){
					obj.append("<div id='modal' class='bigLoad'>"+data+"</div>")
				}
				loading.push(type)	
			}
		});	
	}
	
	var opts = {};
	opts.data = applyData;
	opts.callback =  function(data) {
		
			//申请接口结束后关闭加载状态界面
			if(obj!="" && obj!=null){			
				loading.splice($.inArray(type,loading),1);
				if(loading.length<1){
					$("#modal").remove();
				}
			}
			
			fun(data);
		}
	console.log(type)
	switch (type){
		
		//管理员界面的接口
		case "login":   //登录
		//	opts.url = zeroURL + 'api/common/users/login.do';
			opts.url = "adminLogin.login";
			break;
		case "adminToken":   //管理员根据令牌获取用户信息
		//	opts.url = zeroURL + 'api/admin/users/getByToken.do';
			opts.url = "adminHeader.getByToken";
			break;
		case "adminConfigGet":    //获取系统设置
			//opts.url = zeroURL + 'api/common/config/get.do';	
			opts.url = "adminHeader.configGet";
			break;
		case "adminPassword":    //修改自己的密码
			opts.url = "adminHeader.adminPassword";
			break;	
		case "commonSignOut":   //fxh 前台退出
			opts.url = "commonHeader.commonSignOut";
			break;
		case "adminSignOut":   //退出
			opts.url = "adminHeader.adminSignOut";
			break;
		case "adminAsideCatList":    //左边导航获取类别列表
			opts.url = "adminAside.catagoriesList";
			break;
		case "admincontentList":    //获取内容列表，（包括活动，项目，报名）
			opts.url = "adminContentsList.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "admincontentListAll":    //获取内容列表，（包括活动，项目，报名）
			opts.url = "adminContentsList.listAll?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "adminContentListCatList":    //内容列表界面获取类别列表
			opts.url = "adminContentsList.catList";
			break;
		
		case "commonContentListCatList":    //内容列表界面获取类别列表
			opts.url = "commonContentsDetail.catList";
			break;
	
			
		case "adminContentDelete":    //删除活动
			opts.url = "adminContentsList.delete";
			break;
		case "adminConFromCatList":    //表单右边多级菜单获取类别列表
			opts.url = "adminContentsFrom.catagoriesList";
			break;
		case "adminConFromGetInfo":    //表单获取某个活动详情
			opts.url = "adminContentsFrom.getInfo";
			break;
		case "adminConFromAdd":    //表单添加内容
			opts.url = "adminContentsFrom.add";
			break;
		case "adminConFromEdit":    //表单修改内容
			opts.url = "adminContentsFrom.edit";
			break;
		
		case "adminConAnalyse":    //分析案例库
			opts.url = "adminContentsConAnalyse.addTag";
			break;	
		case "adminContentVideo":	//分析案例库中的视频
			opts.url = "adminContentsAnalyseVideo.video";
			break;
		
		case "adminContentDetailCatList":    //预览获取类别列表
			opts.url = "adminContentsDetail.catList";
			break;
		case "adminConDetailGetInfo":    //预览获取详情
			opts.url = "adminContentsDetail.getInfo";
			break;
		
			
			
			
		case "adminCatagoriesList":    //获取类别列表
			opts.url = "adminCatagories.list";
			break;
		case "adminCatagoriesGet":    //获取指定类别详情
			opts.url = "adminCatagories.get";
			break;
		case "adminCatagoriesEdit":    //修改类别
			opts.url = "adminCatagories.edit";
			break;
		case "adminCatagoriesAdd":    //添加类别
			opts.url = "adminCatagories.add";
			break;
		case "adminCatagoriesDelete":    //删除类别
			opts.url = "adminCatagories.delete";
			break;
		case "adminCatagoriesSort":    //上下移类别
			opts.url = "adminCatagories.sort";
			break;
		case "adminQuestionList":	//问题的列表
			opts.url = "adminQuestion.list";
			break;
		case "adminQuestionDelete":	//删除问题
			opts.url = "adminQuestion.delete";
			break;
		case "adminQuestionAdd":	//添加问题
			opts.url = "adminQuestionForm.add";
			break;
		case "adminQuestionGet":	//添加问题
			opts.url = "adminQuestionForm.get";
			break;
		case "adminQuestionUpdate":	//修改问题
			opts.url = "adminQuestionForm.update";
			break;
		
			
			
			
		case "adminUsersListSysRoleList":    //用户列表界面获取系统角色
			opts.url = "adminUsersList.sysRoles";
			break;
		case "adminUsersList":    //获取用户列表
			opts.url = "adminUsersList.list?pc="+applyData.pc+"&pn="+applyData.pn;;
			break;
		case "adminUsersDelete":    //删除用户
			opts.url = "adminUsersList.delete";
			break;
		case "adminUsersAddSysRole":    //添加用户界面获取系统角色
			opts.url = "adminUsersAdd.sysRoles";
			break;	
		case "adminUsersAdd":    //添加用户
			opts.url = "adminUsersAdd.add";
			break;
		case "adminUsersUpdataSysRole":    //修改用户界面获取系统角色
			opts.url = "adminUsersUpdate.sysRoles";
			break;	
		case "adminUsersUpdata":    //修改用户
			opts.url = "adminUsersUpdate.update";
			break;	
		case "adminUsersUpdataGet":    //获取用户信息
			opts.url = "adminUsersUpdate.get";
			break;	
		case "adminUsersDetailSysRole":    //用户详情界面获取系统角色
			opts.url = "adminUsersDetail.sysRoles";
			break;	
		case "adminUsersDetailGet":    //获取用户信息
			opts.url = "adminUsersDetail.get";
			break;	
		case "adminUsersDetailRepassword":    //重置密码
			opts.url = "adminUsersDetail.resetPassword";
			break;
		case "adminUsersGroupSetList":    //用户组弹出框的用户组列表
			opts.url = "adminUserGroupSet.list";
			break;	
		case "adminUsersGroupSetGet":    //获取用户的用户组列表
			opts.url = "adminUserGroupSet.getUserGroup";
			break;	
		case "adminUsersRolesSetGet":    //角色设置的弹框获取用户组角色
			opts.url = "adminUserRolesSet.getGroupRole";
			break;
		case "adminUsersRolesSetListByUid":    //角色设置的弹框获取用户的角色列表
			opts.url = "adminUserRolesSet.listByUid";
			break;
		case "adminUsersRolesSetRolesSave":    //角色设置的弹框保存角色设置
			opts.url = "adminUserRolesSet.rolesSave";
			break;
		case "adminUsersGroupList":    //获取用户组列表
			opts.url = "adminUserGroup.list";
			break;
		case "adminUsersGroupRolesList":    //获取角色列表
			opts.url = "adminUserGroup.rolesList";
			break;
		case "adminUsersGroupGet":    //获取用户组详情
			opts.url = "adminUserGroup.getGroupInfo";
			break;
		case "adminUsersGroupAdd":    //添加用户组
			opts.url = "adminUserGroup.add";
			break;
		case "adminUsersGroupEdit":    //修改用户组
			opts.url = "adminUserGroup.edit";
			break;
		case "adminUsersGroupDelete":    //删除用户组
			opts.url = "adminUserGroup.delete";
			break;
		case "adminUsersGroupSort":    //上下移用户组
			opts.url = "adminUserGroup.sort";
			break;
		case "adminRolesListBySys":    //根据系统角色获取角色列表
			opts.url = "adminRolesList.listOfSysRole";
			break;	
		case "adminRolesListOfModule":    //根据模块标题分组显示权限
			opts.url = "adminRolesList.listOfModule";
			break;	
		case "adminRolesGet":    //获取角色详情
			opts.url = "adminRolesList.getRoleById";
			break;	
		case "adminRolesAdd":    //添加角色
			opts.url = "adminRolesList.add";
			break;
		case "adminRolesEdit":    //修改角色
			opts.url = "adminRolesList.edit";
			break;	
		case "adminRolesDelete":    //删除角色
			opts.url = "adminRolesList.delete";
			break;	
		case "adminRolesSort":    //上下移角色
			opts.url = "adminRolesList.sort";
			break;	
		case "adminPermissionsListSysRole":    //权限列表界面的获取系统角色
			opts.url = "adminPermissionsList.sysRole";
			break;	
		case "adminPermissionsListGetModuleTitle":    //权限列表界面的获取模块标题列表
			opts.url = "adminPermissionsList.getModuleTitle";
			break;
		case "adminPermissionsList":    //获取权限列表
			opts.url = "adminPermissionsList.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "adminPermissionsListDelete":    //删除权限
			opts.url = "adminPermissionsList.delete";
			break;
		case "adminPermissionsSetAdd":    //添加权限列表
			opts.url = "adminPermissionsSet.add";
			break;
		case "adminPermissionsSetEdit":    //修改权限列表
			opts.url = "adminPermissionsSet.edit";
			break;
			
		case "adminOrganizationsList":    //获取机构列表
			opts.url = "adminOrganizationsList.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "adminOrganizationFormList":    //机构表单中获取机构列表
			opts.url = "adminOrganizationForm.list";
			break;	
			
		case "adminOrganizationFormAdd":    //添加机构
			opts.url = "adminOrganizationForm.add";
			break;
		case "adminOrganizationFormUpdate":    //修改机构
			opts.url = "adminOrganizationForm.update";
			break;
		case "adminOrganizationFormGet":    //获取机构详情机构
			opts.url = "adminOrganizationForm.get";
			break;
			
		case "adminOrganizationsListDelete":    //删除机构
			opts.url = "adminOrganizationsList.delete";
			break;
			
		case "adminSchoolCalenderList":    //获取校历列表
			opts.url = "adminSchoolCalenderList.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;	
		case "adminSchoolCalenderListOrgList":    //校历列表界面获取机构列表
		
			opts.url = "adminSchoolCalenderList.OrgList";
			break;	
		case "adminSchoolCalenderListDelete":    //删除校历
			opts.url = "adminSchoolCalenderList.delete";
			break;
			
		case "adminSchoolCalendarFormList":    //机构表单中获取机构列表
			opts.url = "adminSchoolCalendarForm.list";
			break;		
			
		case "adminSchoolCalendarFormAdd":    //添加校历
			opts.url = "adminSchoolCalendarForm.add";
			break;
		case "adminSchoolCalendarFormUpdate":    //修改校历
			opts.url = "adminSchoolCalendarForm.update";
			break;
		case "adminSchoolCalendarFormGet":    //获取校历详情
			opts.url = "adminSchoolCalendarForm.get";
			break;
		case "adminGroupList":    //获取班级列表
			opts.url = "adminGroupList.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;	
		case "adminGroupFormList":    //获取机构列表
			opts.url = "adminGroupForm.list";
			break;
		case "adminGroupFormAdd":    //添加班级
			opts.url = "adminGroupForm.add";
			break;
		case "adminGroupFormUpdate":    //修改班级
			opts.url = "adminGroupForm.update";
			break;
		case "adminGroupFormGet":    //获取班级详情
			opts.url = "adminGroupForm.get";
			break;
		case "adminGroupListDelete":    //删除班级
			opts.url = "adminGroupList.delete";
			break;
			
			
			
			
			
		case "adminLogsList":    //获取日志列表
			opts.url = "adminLogsList.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;	
		case "adminSystemSecureSysRole":    //安全设置界面的获取系统角色
			opts.url = "adminSystemSecure.sysRole";
			break;
		case "adminSystemSecureConfigGet":    //获取安全设置详情
			opts.url = "adminSystemSecure.configGet";
			break;
		case "adminSystemSecureConfigAdd":    //保存安全设置
			opts.url = "adminSystemSecure.configAdd";
			break;	
		case "adminSystemWebsiteConfigGet":    //获取网络设置详情
			opts.url = "adminSystemWebsite.configGet";
			break;
		case "adminSystemWebsiteConfigAdd":    //保存网络设置
			opts.url = "adminSystemWebsite.configAdd";
			break;	
			
			
		//会员界面的接口
		case "memberLogin":   //登录
			opts.url = "memberLogin.login";
			break;	
		case "memberToken":   //管理员根据令牌获取用户信息
		//	opts.url = zeroURL + 'api/admin/users/getByToken.do';
			opts.url = "memberHeader.getByToken";
			break;
		case "memberConfigGet":    //获取系统设置
			opts.url = "memberHeader.configGet";
			break;
		case "memberPassword":    //修改自己的密码
			opts.url = "memberHeader.memberPassword";
			break;	
		case "memberSignOut":   //退出
			opts.url = "memberHeader.SignOut";
			break;
		case "memberAsideCatList":    //左边导航获取类别列表
			opts.url = "memberAside.catagoriesList";
			break;
		case "memberContentList":    //获取内容列表
			opts.url = "memberContentsList.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "memberContentDelete":    //删除内容列表
			opts.url = "memberContentsList.delete";
			break;
	
		case "memberConFromGetInfo":    //表单获取某个活动详情
			opts.url = "memberContentsFrom.getInfo";
			break;
		case "memberConFromAdd":    //表单添加内容
			opts.url = "memberContentsFrom.add";
			break;
		case "memberConFromEdit":    //表单修改内容
			opts.url = "memberContentsFrom.edit";
			break;
		case "memberUserGetInfo":    //会员  根据用户令牌获取用户信息
			opts.url = "memberUsersUpdate.getInfo";
			break;
		case "memberUserUpdate":    //会员修改自己的信息
			opts.url = zeroURL + 'api/member/users/edit.do';
			opts.url = "memberUsersUpdate.edit";
			break;
		

		//游客界面的接口
		case "commonHeaderLogin":   //登录
			opts.url = "commonHeader.login";
			break;
		
		case "commonConfigGet":    //获取系统设置
			opts.url = "commonHeader.configGet";
			break;	
		case "conmonHeaderGetCount":    //获取案例的总数
			opts.url = "commonHeader.getAllCountContent";
			break;	
			
		case "commonCatagoriesList":    //游客获取类别列表
			opts.url = "commonHeader.catagoriesList";
			break;
		case "commonHomeCatList":    //游客获取类别列表
			opts.url = "commonHome.catagoriesList";
			break;
		case "commonHomeConList":    //游客首页获取内容列表
			opts.url = "commonHome.contentsList?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "commonHomeConListAll":    //游客首页获取内容列表
			opts.url = "commonHome.contentsListAll?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "commonContentsListCat":    //游客列表页获取类别列表
			opts.url = "commonContentsLsit.catagoriesList";
			break;
		case "commonContentsList":    //游客列表页获取内容列表
			opts.url = "commonContentsLsit.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "commonContentsListAll":    //游客列表页获取内容列表
			opts.url = "commonContentsLsit.listAll?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "commonContentsTypeCat":    //案例分类页获取案例的子级类别列表
			opts.url = "commonContentsType.catagoriesList";
			break;
		case "commonContentsSysnopsis":    //游客正文页内容详情
			opts.url = "commonContentsSysnopsis.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "commonContentsMyListCat":    //我的案例界面的类别列表
			opts.url = "commonContentsMyList.cat";
			break;
		case "commonContentsMyListList":    //我的案例界面的案例列表
			opts.url = "commonContentsMyList.list";
			break;
		case "commonContentslistCollect":    //游客列表页获取收藏列表
			opts.url = "commonContentsMyList.myShoucangList?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "commonContentsDetailCat":    //游客的内容页获取类别列表
			opts.url = "commonContentsDetail.catagoriesList";
			break;
		case "commonContentsDetailGet":    //游客的内容页获取内容详情
			opts.url = "commonContentsDetail.get";
			break;
		case "commonContentsDetailEdit":    //游客的内容页获取内容详情
			opts.url = "commonContentsDetail.edit";
			break;
		case "commonContentsDetailVideo":    //游客的内容页获取视频分析详情
			opts.url = "commonContentsDetail.video";
			break;
		case "commonContentsDetailCollect":    //游客的内容页收藏
			opts.url = "commonContentsDetail.collect";
			break;
		case "commonContentsDetailDeleteCollect":    //游客的内容页取消收藏
			opts.url = "commonContentsDetail.deleteCollect";
			break;
		case "commonContentsDetailGetCollect":    //游客的内容页获取收藏状态
			opts.url = "commonContentsDetail.getCollect";
			break;	
		case "commonContentsDetailList":    //游客列表页获取内容列表
			opts.url = "commonContentsDetail.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;	
		
		case "phoneHomeCat":    //手机端的首页获取类别列表
			opts.url = "phoneHome.cat";
			break;
		
			break;
		case "phoneHomeList":    //游客首页获取内容列表
			opts.url = "phoneHome.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "phoneHomeListAll":    //游客首页获取内容列表
			opts.url = "phoneHome.listAll?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "phoneResultList":    
			opts.url = "phoneContentSearchResult.list?pc="+applyData.pc+"&pn="+applyData.pn;
		case "phoneResultListAll":    //游客首页获取内容列表
			opts.url = "phoneContentSearchResult.listAll?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "phoneConMyListList":    //游客首页获取内容列表
			opts.url = "phoneConMyList.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "phoneConMyShoucangList":    //游客首页获取内容列表
			opts.url = "phoneConMyList.collect?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "phoneContentsDetailGet":    //手机端的内容页获取内容详情
			opts.url = "phoneContentsDetail.get";
			break;
		case "phoneContentsDetailEdit":    //手机端的内容页修改浏览量+1
			opts.url = "phoneContentsDetail.edit";
			break;
		case "phoneContentsDetailAddVoice":    //手机端的内容页添加发言
			opts.url = "phoneContentsDetail.addVoice";
			break;
		case "phoneContentsDetailCollect":    //手机端的内容页收藏
			opts.url = "phoneContentsDetail.collect";
			break;
		case "phoneContentsDetailDeleteCollect":    //手机端的内容页收藏
			opts.url = "phoneContentsDetail.deleteCollect";
			break;
		case "phoneContentsDetailGetCollect":    //手机端的内容页收藏
			opts.url = "phoneContentsDetail.getCollect";
			break;
			
			
		case "phoneContentsDetailCat":    //手机端的内容页获取类别列表
			opts.url = "phoneContentsDetail.catagoriesList";
			break;	
		case "phoneContentsTextSearchCat":    //手机端的搜索页获取类别列表
			opts.url = "phoneContentsTextSearch.catagoriesList";
			break;	
		case "phoneContentSearchResultList":    //手机端的搜索结果页获取内容列表
			opts.url = "phoneContentSearchResult.list";
			break;	
		case "phoneContentSearchResultCat":    //手机端的首页获取类别列表
			opts.url = "phoneContentSearchResult.cat";
			break;
		case "phoneContentYuanchengList":    //手机端的远程页获取班级列表
			opts.url = "phoneContentYuancheng.list";
			break;	
		case "phoneSignOut":   //退出
			opts.url = "phoneMyInfo.signOut";
			break;
		case "phoneToken":   //退出
			opts.url = "phoneMyInfo.phoneToken";
			break;
			
		case "phoneConMyInfoList":    //手机端我的界面获取我的案例列表和总是
			opts.url = "phoneMyInfo.list?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "phoneConMyInfoShoucang":    //手机端我的界面获取我的收藏列表和总是
			opts.url = "phoneMyInfo.shoucang?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "phoneBlockFooterConfigGet":    //手机端我的界面获取我的收藏列表和总是
			opts.url = "phoneBlockFooter.get";
			break;
		case "phoneContentsErweimaGet":    //手机端二维码获取
			opts.url = "phoneContentsErweima.get";
			break;	
		case "phoneContentsErweimaDownload":    //手机端二维码下载
			opts.url = "phoneContentsErweima.download";
			break;		
			
			
			
		
			
/*		case "memberToken":   //会员根据令牌获取用户信息
			opts.url = zeroURL + 'api/member/users/getCurrentUserInfo.do';
			break;
		
		case "signOut":   //退出
			opts.url = zeroURL + 'api/common/users/signOut.do';
			break;	
			
		case "configAdd":   //添加系统设置
			opts.url = zeroURL + 'api/admin/config/save.do';
			break;
		case "configGet":    //获取系统设置
			opts.url = zeroURL + 'api/common/config/get.do';		
			break;
		case "groupList":    //获取用户组列表
			opts.url = zeroURL + 'api/admin/group/list.do';	
			break;
		case "getUserGroup":    //获取用户的用户组列表
			opts.url = zeroURL + 'api/admin/group/getUserGroup.do';		
			break;
		case "getGroupRole":    //获取用户组角色
			opts.url = zeroURL + 'api/admin/roles/getGroupRole.do';		
			break;
		
		case "listByUid":    //获取用户的角色列表
			opts.url = zeroURL + 'api/admin/roles/listByUid.do';		
			break;	
		case "resetPassword":    //重置密码
			opts.url = zeroURL + 'api/admin/users/resetPassword.do';		
			break;
		case "rolesList":    //获取角色列表
			opts.url = zeroURL + 'api/admin/roles/list.do';	
			break;
		case "rolesSave":    //保存角色设置
			opts.url = zeroURL + 'api/admin/roles/save.do';	
			break;
			
			
		case "groupAdd":    //添加用户组
			opts.url = zeroURL + 'api/admin/group/add.do';		
			break;
		case "getGroupInfo":    //获取用户组详情
			opts.url = zeroURL + 'api/admin/group/getGroupById.do';		
			break;
		case "groupEdit":    //修改用户组
			opts.url = zeroURL + 'api/admin/group/edit.do';		
			break;
		case "groupDelete":    //删除用户组
			opts.url = zeroURL + 'api/admin/group/deleteGroup.do';		
			break;
		case "groupSort":    //上下移用户组，排序
			opts.url = zeroURL + 'api/admin/group/sort.do';		
			break;
		case "getModuleTitle":    //获取模块标题列表
			opts.url = zeroURL + 'api/admin/permissions/getModuleTitle.do';		
			break;
		case "permissionsAdd":    //添加权限
			opts.url = zeroURL + 'api/admin/permissions/add.do';		
			break;
		case "permissionsUpdate":    //修改权限
			opts.url = zeroURL + 'api/admin/permissions/edit.do';		
			break;
		case "permissionsList":    //获取权限列表
			opts.url = zeroURL + 'api/admin/permissions/list.do?pc='+applyData.pc+'&pn='+applyData.pn;			
			break;
		case "permissionsDelete":    //删除权限
			opts.url = zeroURL + 'api/admin/permissions/delete.do';		
			break;
		case "logsList":    //获取日志列表
			opts.url = zeroURL + 'api/admin/logs/list.do?pc='+applyData.pc+'&pn='+applyData.pn;		
			break;
		case "listBySysRole":    //根据系统角色获取角色列表
			opts.url = zeroURL + 'api/admin/roles/listOfSysRole.do';		
			break;
		case "listByModule":    //根据模块标题分组显示权限
			opts.url = zeroURL + 'api/admin/permissions/listOfModule.do';		
			break;	
		case "getRoleById":    //获取角色详情
			opts.url = zeroURL + 'api/admin/roles/getRoleById.do';		
			break;	
		case "rolesAdd":    //添加角色
			opts.url = zeroURL + 'api/admin/roles/add.do';		
			break;	
		case "rolesEdit":    //修改角色
			opts.url = zeroURL + 'api/admin/roles/edit.do';		
			break;	
		case "rolesDelete":    //删除角色
			opts.url = zeroURL + 'api/admin/roles/delete.do';		
			break;	
		case "rolesSork":    //排序角色
			opts.url = zeroURL + 'api/admin/roles/sort.do';		
			break;
		case "userList":    //获取用户列表
			opts.url = zeroURL + 'api/admin/users/list.do?pc='+applyData.pc+'&pn='+applyData.pn;
			break;
		case "userGetInfo":    //获取某个用户详细信息
			opts.url = zeroURL + 'api/admin/users/getByUid.do';
			break;
		case "memberUserGetInfo":    //会员  根据用户令牌获取用户信息
			opts.url = zeroURL + 'api/member/users/getCurrentUserInfo.do';
			break;
		
			
			
		case "register":    //注册用户
			opts.url = zeroURL + 'api/users/register.do';
			break;
		case "userAdd":    //添加用户
			opts.url = zeroURL + 'api/admin/users/add.do';
			break;
		case "userUpdate":    //修改用户
			opts.url = zeroURL + 'api/admin/users/edit.do';
			break;
		case "memberUserUpdate":    //会员修改自己的信息
			opts.url = zeroURL + 'api/member/users/edit.do';
			break;
		case "password":    //修改自己的密码
			opts.url = zeroURL + 'api/admin/users/password.do';
			break;
		case "memberPassword":    //会员修改自己的密码
			opts.url = zeroURL + 'api/member/users/password.do';
			break;
		
		
		
			
			
			
		case "userDelete":    //删除用户
			opts.url = zeroURL + 'api/admin/users/delete.do';
			break;
		case "userImport":    //导入用户
			opts.url = zeroURL + 'api/admin/users/import.do';
			break;	
		case "sysRoleList":    //获取系统角色列表
			opts.url = zeroURL + 'api/admin/roles/sysRoles.do';
			break;
		case "catagoriesList":    //获取类别列表
			opts.url = cmsURL + "api/admin/catagories/list.do";
			break;
		case "catagoriesGet":    //获取指定类别详情
			opts.url = cmsURL + "api/admin/catagories/list.do";
			break;
		case "catagoriesAdd":    //添加类别
			opts.url = cmsURL + "api/admin/catagories/add.do";
			break;
		case "catagoriesEdit":    //修改类别
			opts.url = cmsURL + "api/admin/catagories/edit.do";
			break;
		case "catagoriesSort":    //排序类别
			opts.url = cmsURL + "api/admin/catagories/sort.do";
			break;
		case "catagoriesDelete":    //删除类别
			opts.url = cmsURL + "api/admin/catagories/delete.do";
			break;
		
		case "contentList":    //获取内容列表，（包括活动，项目，报名）
			opts.url = cmsURL + "api/admin/content/list.do?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "memberContentList":    //会员获取个人内容列表
			opts.url = cmsURL + "api/member/content/list.do?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "contentAdd":    //添加内容列表，（包括活动，项目，报名）
			opts.url = cmsURL + "api/admin/content/add.do";
			break;
		case "memberContentAdd":    //会员添加内容列表
			opts.url = cmsURL + "api/member/content/add.do";
			break;
		case "contentUpdate":    //修改活动
			opts.url = cmsURL + "api/admin/content/edit.do";
			break;
		case "memberContentUpdate":    //会员修改活动
			opts.url = cmsURL + "api/member/content/edit.do";
			break;
		case "contentDelete":    //删除活动
			opts.url = cmsURL + "api/admin/content/delete.do";
			break;
		case "memberContentDelete":    //会员删除内容
			opts.url = cmsURL + "api/member/content/delete.do";
			break;

		case "contentGetInfo":    //获取某个活动详情
			opts.url = cmsURL + "api/admin/content/get.do";
			break;
		case "commonCatagoriesList":    //游客获取类别列表
			opts.url = cmsURL + "api/common/catagories/list.do";
			break;
		case "commonContentsList":    //游客获取内容列表
			opts.url = cmsURL + "api/common/content/list.do?pc="+applyData.pc+"&pn="+applyData.pn;
			break;
		case "commonContentsGet":    //游客获取指定内容
			opts.url = cmsURL + "api/common/content/get.do";
			break;
			
			
		case "adminUpdateEnroll":    //修改报名信息
			opts.url = cmsURL + "api/content/edit_admin.do";
			break;
		case "contentDeleteTeacher":    //老师端删除参赛历史
			opts.url = cmsURL + "api/content/teacher_delete.do";
			break;	
		case "contentRelease":    //发布活动
			opts.url = cmsURL + "api/content/status.do";
			break;
		case "contentyCancelRelease":    //取消发布活动
			opts.url = cmsURL + "api/content/status.do"
			break;
		case "activityCount":    //根据条件查询统计报表
			opts.url = cmsURL + "api/content/activityCount.do";
			break;*/
			
	}

	apiRequest(opts);
	
	
	
}

