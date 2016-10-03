
angular.module('MetronicApp').controller('SidebarController', function(dashboardService,$rootScope, $state,$scope, $http, $timeout,$interval,$modal,$log,auth,API_URL) {
	var SidebarCtrl = this;
	$scope.$on('$viewContentLoaded', function() {
		// initialize core components
		App.initAjax();
	});

	// console.log("height",SidebarCtrl.h2);
	// set sidebar closed and body solid layout mode
	// $rootScope.settings.layout.pageContentWhite = true;
	// $rootScope.settings.layout.pageBodySolid = false;
	// $rootScope.settings.layout.pageSidebarClosed = true;

	SidebarCtrl.ChangeToHome = function () {
		$state.go('dashboard');
	};
	SidebarCtrl.ChangeToSearchRes = function () {
		 $state.go('searchRes');
	};



});
