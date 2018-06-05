'use strict';

/**
 * Config for the router
 */

var cliURLPage="/"+Acp.rootPath()+"/pages/";//客户端地址
angular.module('app').run(
    ['$rootScope', '$state', '$stateParams',
		function ($rootScope,   $state,   $stateParams) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;        
		}
    ]
)
.config(
    ['$stateProvider', '$urlRouterProvider',
		function ($stateProvider,   $urlRouterProvider) {
			
			
			
			$urlRouterProvider.otherwise('commonApp/home');
			$stateProvider.state('app', {
                abstract: true,
                url: '/app',
				templateProvider: function($timeout, $stateParams, $http) {
					var html = "";
					var url = cliURLPage+"admin/blocks/app.shtml";
					
					var data = {};
					pageRequest({
						url: url,
						data: data,
						callback: function(data) {
							html = data;
						}
					});
					
					return html;
				}
            })
			$stateProvider.state('memberApp', {
                 abstract: true,
                url: '/memberApp',
				templateProvider: function($timeout, $stateParams, $http) {
					
					var html = "";
					var url = cliURLPage+"member/blocks/app.shtml";
					var data = {};
					pageRequest({
						url: url,
						data: data,
						callback: function(data) {
							html = data;
						}
					});
					return html;
				}
            })
			$stateProvider.state('commonApp', {
                 abstract: true,
                url: '/commonApp',
				
				templateProvider: function($timeout, $stateParams, $http) {
					
					var html = "";
					var url = cliURLPage+"common/blocks/app.shtml";
					var data = {};
					pageRequest({
						url: url,
						data: data,
						callback: function(data) {
							
							html = data;
						}
					});
					return html;
				}
            })
			$stateProvider.state('phoneApp', {
                 abstract: true,
                url: '/phoneApp',
				
				templateProvider: function($timeout, $stateParams, $http) {
					
					var html = "";
					var url = cliURLPage+"phone/blocks/app.shtml";
					var data = {};
					pageRequest({
						url: url,
						data: data,
						callback: function(data) {
							
							html = data;
						}
					});
					return html;
				}
            })
			//管理员登录
			.state('app.login', {
				url: '/login',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/login.shtml";
							var data = {};
							
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    
                }
			})
			//会员登录
			.state('memberApp.login', {
				url: '/login',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"member/login.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    
                }
			})
			//内容管理
			.state('app.contentsList', {
				url: '/contentsList:cid',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/contents/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						},
						 resolve: {
							  deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
								  return $ocLazyLoad.load('ui.select').then(
									  function(){
										//  return $ocLazyLoad.load('js/controllers/select.js');
									  }
								  );
							  }]
						  }
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//添加和修改内容
			.state('app.contentsFrom', {
				url: '/contentsFrom:id&:cid&:cTitle',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/contents/form.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						},
						 resolve: {
							  deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
								  return $ocLazyLoad.load('ui.select').then(
									  function(){
										//  return $ocLazyLoad.load('js/controllers/select.js');
									  }
								  );
							  }]
						  }
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//分析内容
			.state('app.analyse', {
				url: '/analyse:cid&:id',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/contents/analyse.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//分析视频
			.state('app.contentsAnalyseVideo', {
				url: '/contentsAnalyseVideo:id',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/contents/analyseVideo.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//预览内容
			.state('app.contentsDetail', {
				url: '/contentsDetail:id&:cid',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/contents/detail.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						},
						 resolve: {
							  deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
								  return $ocLazyLoad.load('ui.select').then(
									  function(){
										//  return $ocLazyLoad.load('js/controllers/select.js');
									  }
								  );
							  }]
						  }
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//会员内容管理
			.state('memberApp.memberContentsList', {
				url: '/memberContentsList:cid&:catagoriesName',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"member/contents/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: memberNavbarProvider,
						controller: memberNavbarController
                    },
                    'menu': {
						templateProvider: memberMenuProvider,
						controller: memberMenuController
                    }
                }
			})
			//会员添加和修改内容
			.state('memberApp.memberContentsFrom', {
				url: '/memberContentsFrom:id&:cid&:cTitle',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"member/contents/form.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: memberNavbarProvider,
						controller: memberNavbarController
                    },
                    'menu': {
						templateProvider: memberMenuProvider,
						controller: memberMenuController
                    }
                }
			})
			//类别管理
			.state('app.catagoriesList', {
				url: '/catagoriesList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/catagories/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//问答管理的列表
			.state('app.questionList', {
				url: '/questionList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/question/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//问答的表达
			.state('app.questionForm', {
				url: '/questionForm:id',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/question/form.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			
			
			
			//用户管理
			.state('app.userList', {
				url: '/userList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/users/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						},
						 resolve: {
							  deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
								  return $ocLazyLoad.load('ui.select').then(
									  function(){
										//  return $ocLazyLoad.load('js/controllers/select.js');
									  }
								  );
							  }]
						  }
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//添加用户
			.state('app.userAdd', {
				url: '/userAdd',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/users/add.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//用户详情
			.state('app.userDetail', {
				url: '/userDetail:id',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/users/detail.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//修改用户
			.state('app.userUpdate', {
				url: '/userUpdate:id',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/users/update.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//会员修改自己的信息
			.state('memberApp.memberUserUpdate', {
				url: '/userUpdate:id',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"member/users/update.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: memberNavbarProvider,
						controller: memberNavbarController
                    },
                    'menu': {
						templateProvider: memberMenuProvider,
						controller: memberMenuController
                    }
                }
			})
			//用户组管理
			.state('app.usersGroup', {
				url: '/usersGroup',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/users/group.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//角色管理
			.state('app.rolesList', {
				url: '/rolesList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/roles/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//权限管理
			.state('app.permissionsList', {
				url: '/permissionsList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/permissions/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						},
						 resolve: {
							  deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
								  return $ocLazyLoad.load('ui.select').then(
									  function(){
										//  return $ocLazyLoad.load('js/controllers/select.js');
									  }
								  );
							  }]
						  }
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//权限设置
			.state('app.permissionsSet', {
				url: '/permissionsSet',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/permissions/set.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						},
						 resolve: {
							  deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
								  return $ocLazyLoad.load('ui.select').then(
									  function(){
										//  return $ocLazyLoad.load('js/controllers/select.js');
									  }
								  );
							  }]
						  }
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//机构管理
			.state('app.organizationList', {
				url: '/organizationList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/organization/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//机构表单，添加和修改
			.state('app.organizationFrom', {
				url: "/organizationFrom:id&:title",
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/organization/form.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//校历管理
			.state('app.schoolCalendarList', {
				url: '/schoolCalendarList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/schoolCalendar/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						},
						 resolve: {
							  deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
								  return $ocLazyLoad.load('ui.select').then(
									  function(){
										//  return $ocLazyLoad.load('js/controllers/select.js');
									  }
								  );
							  }]
						  }
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//校历表单，添加和修改
			.state('app.schoolCalendarFrom', {
				url: "/schoolCalendarFrom:id&:title",
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/schoolCalendar/form.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//班级管理
			.state('app.groupList', {
				url: '/groupList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/group/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						},
						 resolve: {
							  deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
								  return $ocLazyLoad.load('ui.select').then(
									  function(){
										//  return $ocLazyLoad.load('js/controllers/select.js');
									  }
								  );
							  }]
						  }
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//班级表单，添加和修改
			.state('app.groupFrom', {
				url: "/groupFrom:id&:title",
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/group/form.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//日志管理
			.state('app.logsList', {
				url: '/logsList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/logs/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//日志管理
			.state('app.logsList1', {
				url: '/logsList1',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							/*var url = cliURLPage+"admin/logs/list1.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});*/
							return html;
						}
					},
                  /*  'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },*/
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			
			//网站设置
			.state('app.systemWebsite', {
				url: '/systemWebsite',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/system/website.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//安全设置
			.state('app.systemSecure', {
				url: '/systemSecure',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"admin/system/secure.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: navbarProvider,
						controller: navbarController
                    },
                    'menu': {
						templateProvider: menuProvider,
						controller: menuController
                    }
                }
			})
			//游客的首页
			.state('commonApp.home', {
				url: '/home',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"common/home.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: commonNavbarProvider,
						controller: commonNavbarController
                    },
					'banner':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"common/blocks/banner.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
						
					}
                    
                }
			})
			//游客的案例分类界面
			.state('commonApp.commonContentsType', {
				url: '/commonContentsType',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"common/contents/type.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: commonNavbarProvider,
						controller: commonNavbarController
                    }
                    
                }
			})
			//游客的内容列表
			.state('commonApp.commonContentsList', {
				url: '/commonContentsList:cid&:typeId',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"common/contents/list.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						},
						 resolve: {
							  deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
								  return $ocLazyLoad.load('ui.select').then(
									  function(){
										//  return $ocLazyLoad.load('js/controllers/select.js');
									  }
								  );
							  }]
						  }
					},
                    'navbar': {
						templateProvider: commonNavbarProvider,
						controller: commonNavbarController
                    },
					
                }
			})
						//游客的内容列表
			.state('commonApp.commonContentsMyList', {
				url: '/commonContentsMyList',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"member/contents/myList.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: commonNavbarProvider,
						controller: commonNavbarController
                    },
					
                }
			})
			.state('commonApp.gerenzhongxin', {
				url: '/gerenzhongxin',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"member/contents/update.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: commonNavbarProvider,
						controller: commonNavbarController
                    },
					
                }
			})
			//游客的内容详情
			.state('commonApp.commonContentsDetail', {
				url: '/commonContentsDetail:id&:cid',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"member/contents/detail.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: commonNavbarProvider,
						controller: commonNavbarController
                    }
                }
			})
			//游客的简介界面
			.state('commonApp.commonContentsSynopsis', {
				url: '/commonContentsSynopsis:cid',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"common/contents/synopsis.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: commonNavbarProvider,
						controller: commonNavbarController
                    },
					'banner':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"common/blocks/banner.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
						
					}
                    
                }
			})
			//移动端的首页
			.state('phoneApp.home', {
				url: '/home',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/home.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/blocks/headerHome.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
                    },
					'footer':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/blocks/footer.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
						
					}
                    
                }
			})
			//移动端的文本搜索首页
			.state('phoneApp.textSearch', {
				url: '/textSearch',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/contents/textSearch.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/blocks/headerSearch.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
                    },
                    
                }
			})
			//移动端的语音搜索界面
			.state('phoneApp.yuyinSearch', {
				url: '/yuyinSearch',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/contents/yuyinSearch.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/blocks/headerSearch.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
                    },
                    
                }
			})
			//移动端的搜索结果界面
			.state('phoneApp.searchResult', {
				url: '/searchResult:text',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/contents/searchResult.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/blocks/headerSearchResult.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
                    },
                    
                }
			})
			//移动端的我的案例
			.state('phoneApp.myAnli', {
				url: '/myAnli',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/contents/myAnli.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
                    'navbar': {
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/blocks/headerSearch.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
                    },
					'footer':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/blocks/footer.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
						
					}
                    
                }
			})
			//移动端的我的个人中心
			.state('phoneApp.myInfo', {
				url: '/myInfo',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/contents/myInfo.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
					'footer':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/blocks/footer.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
						
					}
                    
                }
			})
						//移动端的登录
			.state('phoneApp.login', {
				url: '/login',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/contents/login.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					}
                    
                }
			})
			.state('phoneApp.phoneDetail', {
				url: '/phoneDetail:id',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/contents/detail.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
					},
					'navbar': {
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/blocks/headerSearch.shtml";
							var data = {};
							pageRequest({
								url: url,
								data: data,
								callback: function(data) {
									html = data;
								}
							});
							return html;
						}
                    }
                    
                }
			})
			
			
			function commonNavbarProvider($timeout, $stateParams, $http){
				var html = "";
				var url = cliURLPage+"common/blocks/header.shtml";
				var data = {};
				pageRequest({
					url: url,
					data: data,
					callback: function(data) {
						
						html = data;
					}
				});	                
				return html;
			}
			function commonNavbarController($scope, $state) {
				if(typeof ctrl == "function"){
					ctrl($scope, $state);
				}
			}
			
			
			function navbarProvider($timeout, $stateParams, $http){
				var html = "";
				var url = cliURLPage+"admin/blocks/header.shtml";
				var data = {};
				pageRequest({
					url: url,
					data: data,
					callback: function(data) {
						
						html = data;
					}
				});	                
				return html;
			}
			function navbarController($scope, $state) {
				if(typeof ctrl == "function"){
					ctrl($scope, $state);
				}
			}
			function menuProvider($timeout, $stateParams, $http){
				var html = "";
				var url = cliURLPage+"admin/blocks/aside.shtml";
				var data = {};
				pageRequest({
					url: url,
					data: data,
					callback: function(data) {
						
						html = data;
					}
				});	                
				return html;
			}
			function menuController($scope, $state) {
				if(typeof ctrl == "function"){
					ctrl($scope, $state);
				}
			}
			function memberNavbarProvider($timeout, $stateParams, $http){
				var html = "";
				var url = cliURLPage+"member/blocks/header.shtml";
				var data = {};
				pageRequest({
					url: url,
					data: data,
					callback: function(data) {
						
						html = data;
					}
				});	                
				return html;
			}
			function memberNavbarController($scope, $state) {
				if(typeof ctrl == "function"){
					ctrl($scope, $state);
				}
			}
			function memberMenuProvider($timeout, $stateParams, $http){
				var html = "";
				var url = cliURLPage+"member/blocks/aside.shtml";
				var data = {};
				pageRequest({
					url: url,
					data: data,
					callback: function(data) {
						
						html = data;
					}
				});	                
				return html;
			}
			function memberMenuController($scope, $state) {
				if(typeof ctrl == "function"){
					ctrl($scope, $state);
				}
			}
		}
    ]
);