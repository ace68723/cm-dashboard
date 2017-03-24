
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
	SidebarCtrl.ChangetoCloseRes = function(){
		dashboardService.getRole()
		.then(SidebarCtrl.GotoCloseRes())
		.catch((error)=>{
			console.log(error)
			window.location="index.html#/dashboard.html"
		})
	}
	SidebarCtrl.GotoCloseRes = function (){
		$state.go('closeRestaurant')
	}

	SidebarCtrl.ChangetoCustomSer = function (){
		dashboardService.getRole()
		.then(SidebarCtrl.GotoCustomSer())
		.catch((error)=>{
			console.log(error)
			window.location="index.html#/dashboard.html"
		})
	}
	SidebarCtrl.GotoCustomSer = function (){
  	$state.go('customService')
  }



	SidebarCtrl.ChangetoDriverSchedule = function (){
		dashboardService.getRole()
		.then(SidebarCtrl.GotoDriverSchedule())
		.catch((error)=>{
			console.log(error)
			window.location="index.html#/dashboard.html"
		})
	}
	SidebarCtrl.GotoDriverSchedule = function (){
		$state.go('driverSchdule')
	}
	SidebarCtrl.ChangetoCsSchedule = function (){
		dashboardService.getRole()
		.then(SidebarCtrl.GotoCsSchedule())
		.catch((error)=>{
			console.log(error)
			window.location="index.html#/dashboard.html"
		})
	}
	SidebarCtrl.GotoCsSchedule = function (){
		$state.go('csSchedule')
	}



});
