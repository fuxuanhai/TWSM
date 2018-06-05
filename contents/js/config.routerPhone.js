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
			
			
			
			$urlRouterProvider.otherwise('phoneApp/login');
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
				url: '/searchResult:text&:cid',
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
				url: '/myAnli:typeId',
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
			//移动端的远程界面
			.state('phoneApp.yuancheng', {
				url: '/yuancheng',
				views: {
					'':{
						templateProvider: function($timeout, $stateParams, $http) {
							var html = "";
							var url = cliURLPage+"phone/contents/yuancheng.shtml";
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
			
		}
    ]
);