'use strict';

/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize"
]);


/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);


/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout4',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
// MetronicApp.controller('HeaderController', ['$scope', function($scope) {
//     $scope.$on('$includeContentLoaded', function() {
//         Layout.initHeader(); // init header
//     });
// }]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

// /* Setup Layout Part - Quick Sidebar */
// MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {
//     $scope.$on('$includeContentLoaded', function() {
//        setTimeout(function(){
//             QuickSidebar.init(); // init quick sidebar
//         }, 2000)
//     });
// }]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

//===============================================================================
//old api API_URL product
MetronicApp.constant("API_URL", "https://chanmao.ca/index.php?r=");
//new api API2_URL product
MetronicApp.constant("API2_URL", "https://chanmao.us/api/v1/");
MetronicApp.constant("API3_URL", "https://chanmao.us/api/v1/");

//Important! API2_URL test
// MetronicApp.constant("API2_URL", "http://test.norgta.com/public/api/v1/");
// MetronicApp.constant("API2_URL", "https://chanmao.us/api/v1/");

//===============================================================================

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function($stateProvider, $urlRouterProvider,$httpProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");
    $httpProvider.interceptors.push('authInterceptor');

    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",
            cache: true,
            controller: "DashboardController as dc",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',
                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/pages/scripts/dashboard.min.js',
                            'js/controllers/DashboardController.js'

                        ]
                    });
                }]
            }
        })

        // Restaurant Search
        .state('searchRes', {
            url: "/searchRes.html", //url address
            templateUrl: "views/CloseList.html", //view
            data: {pageTitle: '馋猫订餐 Dashboard'},
            cache: true,
            controller: "closeListController as clc" //controller
        })
        // .state('driverSchedule', {
        //     url: "/driverSchedule.html", //url address
        //     templateUrl: "views/driverSchedule.html", //view
        //     controller:"driverchangename as dcn" //controller
        // })
        .state('customService',{
            url:"/customService.html", //url address
            templateUrl:"views/customService.html", //views
            controller:"customServiceController as csc" //controller
        })
        .state('driverSchdule',{
            url:"/driverSchdule.html", //url address
            templateUrl:"views/DriverSchdule.html", //views
            controller:"driverScheduleController as dsc" //controller
        })
        .state('csSchedule',{
            url:"/csSchedule.html", //url address
            templateUrl:"views/CustomServiceSchedule.html", //views
            controller:"customServiceScheduleController as cssc" //controller
        })
        .state('reslocation',{
            url:"/reslocation.html", //url address
            templateUrl:"views/restaurantLocation.html" //views
        })
        .state('ad',{
            url:"/ad.html", //url address
            templateUrl:"views/ad.html", //views
            controller:"ADController as adc" //controller
        })


        // Blank Page


        // .state('blank', {
        //     url: "/blank",
        //     templateUrl: "views/blank.html",
        //     data: {pageTitle: 'Blank Page Template'},
        //     controller: "BlankController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'MetronicApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     'js/controllers/BlankController.js'
        //                 ]
        //             });
        //         }]
        //     }




        // Dashboard
        // .state('searchRes', {
        //     url: "/searchRes.html",
        //     templateUrl: "RestaurantListModuel/search-res.html"
        //     // templateUrl: "views/login.html",
        //     // data: {pageTitle: '馋猫订餐 Dashboard'},
        //     controller: "DashboardController as dc",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'MetronicApp',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     // 'assets/global/plugins/morris/morris.css',
        //                     // 'assets/global/plugins/morris/morris.min.js',
        //                     // 'assets/global/plugins/morris/raphael-min.js',
        //                     // 'assets/global/plugins/jquery.sparkline.min.js',
        //                     //
        //                     // 'assets/pages/scripts/dashboard.min.js',
        //                     // 'js/controllers/DashboardController.js'
        //                     'js/controllers/restaurant.js'

        //                 ]
        //             });
        //         }]
        //     }
        // })


}]);


/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state","dashboardService", function($rootScope, settings, $state,dashboardService) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
    dashboardService.get_init();
    dashboardService.getRole()
    .then(function(role){
      $rootScope.role = role;

    })
    .catch(function(role){
      $rootScope.role = role;
      console.log($rootScope.role)
    });

}]);
