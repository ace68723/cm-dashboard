

/* Setup blank page controller */
angular.module('MetronicApp')
	.controller('RestaurantListController', ['$rootScope','$scope', 'settings','restaurantService','$timeout',function($rootScope, $scope, settings,restaurantService,$timeout) {
	    var RestaurantListCtrl = this;
			RestaurantListCtrl.height = window.innerHeight*0.9;
      $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = true;

      });
          RestaurantListCtrl.SearchOptions = [{
            "optionName": "RID",
            "value": "rid"
          }, {
            "optionName": "Restaurant Name",
            "value": "name"
          }, {
            "optionName": "Restaurant Address",
            "value": "address"
          }, {
            "optionName": "Telephone",
            "value": "tel"
          }, {
            "optionName": "Open Hour",
            "value": "hour"
          }, {
            "optionName": "Area",
            "value": "area"
          }, ];

            // console.log("in there",RestaurantListCtrl.SearchOptions);
          // function RestaurantsCtrl(RestaurantListCtrl, Restaurants) {
            //
            RestaurantListCtrl.search = {};

            RestaurantListCtrl.singleSelect = RestaurantListCtrl.SearchOptions[1].value;
            RestaurantListCtrl.change = function(selected) {
              //do if's in case you use null or empty values
              console.log("44",selected);
              if (selected == Select) {}
              if (selected = SearchOption.optionName) {
                return selected;
              }
            }

            RestaurantListCtrl.isCurrentCateArea= function(area){
              return $scope.currentArea!== null  && restaurant.area===area;
            }
            

            RestaurantListCtrl.clearSearch = function() {
              console.log("clearSearch",RestaurantListCtrl.search);
              RestaurantListCtrl.search = null;
              console.log("76",RestaurantListCtrl.restaurants);
              RestaurantListCtrl.search = {};

            }

           RestaurantListCtrl.GetItem=function(restaurant){
            console.log("GetItem",restaurant);
            // var showitem ='123';
            RestaurantListCtrl.showitem={};
            RestaurantListCtrl.reset={};
            RestaurantListCtrl.showitem.rid= restaurant.rid;
            // console.log(restaurant.rid);
            RestaurantListCtrl.showitem.name= restaurant.name;
            RestaurantListCtrl.showitem.address= restaurant.address;
            RestaurantListCtrl.showitem.tel= restaurant.tel;
            RestaurantListCtrl.showitem.hour= restaurant.hour;
            RestaurantListCtrl.showitem.area= restaurant.area;
            RestaurantListCtrl.reset.rid= restaurant.rid;
            RestaurantListCtrl.reset.name= restaurant.name;
            RestaurantListCtrl.reset.address= restaurant.address;
            RestaurantListCtrl.reset.tel= restaurant.tel;
            RestaurantListCtrl.reset.hour= restaurant.hour;
            RestaurantListCtrl.reset.area= restaurant.area;
           }
            
            restaurantService.get_rrlist()
            .then(function (result) {
              RestaurantListCtrl.restaurants = result;
            })
            .catch(function (error) {
              console.log(error)
            })
            RestaurantListCtrl.ResetItem = function(restaurant){
              RestaurantListCtrl.showitem.rid=reset.rid;
              RestaurantListCtrl.showitem.name= reset.name;
              RestaurantListCtrl.showitem.address=reset.address;
              RestaurantListCtrl.showitem.tel= reset.tel;
              RestaurantListCtrl.showitem.hour=reset.hour;
              RestaurantListCtrl.showitem.area= reset.area;
            }

             RestaurantListCtrl.restaurants = [];
             for (i = 0; i < RestaurantListCtrl.restaurants.length; i++) {
               var data = {}
               data.rid = Restaurants.item[i].rid;
               data.name = Restaurants.item[i].name;
               data.address = Restaurants.item[i].address;
               data.tel = Restaurants.item[i].tel;
               data.hour = Restaurants.item[i].hour;
               data.area = Restaurants.item[i].area;
               RestaurantListCtrl.restaurants.push(data)

             }

             RestaurantListCtrl.selectArea = function(area){
               for (i=0; i< RestaurantListCtrl.restaurants.length; i++){
                 if (RestaurantListCtrl.restaurants[i].area !=area){
                   RestaurantListCtrl.restaurants[i]=[];
                 }
               }
             }
             RestaurantListCtrl.editandSubmit = function(){

             }
            
            var isClicked;
            var Highlightarea;
            RestaurantListCtrl.addBackGroundColor = function(area) {
              console.log("143",RestaurantListCtrl.showitem)
              if (!isClicked) {
                isClicked = true;
                Highlightarea = area;
                for (i = 0; i < RestaurantListCtrl.restaurants.length; i++) {
                  if (RestaurantListCtrl.restaurants[i].area == area) {
                    RestaurantListCtrl.restaurants[i].style = {
                      "background-color": "#ff0000",
                      "color": "#ffffff",
                    }
                  }
                }
              } else {
                isClicked = false;
                for (i = 0; i < RestaurantListCtrl.restaurants.length; i++) {
                  if (RestaurantListCtrl.restaurants[i].area == Highlightarea) {
                    RestaurantListCtrl.restaurants[i].style = {}
                  }

                }
                if (Highlightarea != area)
                  for (i = 0; i < RestaurantListCtrl.restaurants.length; i++) {
                    RestaurantListCtrl.addBackGroundColor(area)
                  }
              }
            }

           
}])
