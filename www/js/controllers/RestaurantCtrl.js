

/* Setup blank page controller */
angular.module('MetronicApp')
	.controller('RestaurantController', ['$rootScope','$scope', 'settings','restaurantService','$timeout',function($rootScope, $scope, settings,restaurantService,$timeout) {
	    var RestaurantCtrl = this;
			RestaurantCtrl.height = window.innerHeight*0.9;
      $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = true;

      });
          RestaurantCtrl.SearchOptions = [{
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

            // console.log("in there",RestaurantCtrl.SearchOptions);
          // function RestaurantsCtrl(RestaurantCtrl, Restaurants) {
            //
            RestaurantCtrl.search = {};

            RestaurantCtrl.singleSelect = RestaurantCtrl.SearchOptions[1].value;
            RestaurantCtrl.change = function(selected) {
              //do if's in case you use null or empty values
              console.log("44",selected);
              if (selected = SearchOption.optionName) {
                return selected;
              }
            }

            RestaurantCtrl.isCurrentCateArea= function(area){
              return $scope.currentArea!== null  && restaurant.area===area;
            }


            RestaurantCtrl.clearSearch = function() {
              RestaurantCtrl.search = null;
              RestaurantCtrl.search = {};

            }

           RestaurantCtrl.GetItem=function(restaurant){
            console.log("GetItem",restaurant);
            // var showitem ='123';
            RestaurantCtrl.showitem={};
            RestaurantCtrl.reset={};
            RestaurantCtrl.showitem.rid= restaurant.rid;
            // console.log(restaurant.rid);
            RestaurantCtrl.showitem.name= restaurant.name;
            RestaurantCtrl.showitem.address= restaurant.address;
            RestaurantCtrl.showitem.tel= restaurant.tel;
            RestaurantCtrl.showitem.hour= restaurant.hour;
            RestaurantCtrl.showitem.area= restaurant.area;
            RestaurantCtrl.reset.rid= restaurant.rid;
            RestaurantCtrl.reset.name= restaurant.name;
            RestaurantCtrl.reset.address= restaurant.address;
            RestaurantCtrl.reset.tel= restaurant.tel;
            RestaurantCtrl.reset.hour= restaurant.hour;
            RestaurantCtrl.reset.area= restaurant.area;
           }

            restaurantService.get_rrlist()
            .then(function (result) {
              RestaurantCtrl.restaurants = result;
            })
            .catch(function (error) {
              console.log(error)
            })
            RestaurantCtrl.ResetItem = function(restaurant){
              RestaurantCtrl.showitem.rid=reset.rid;
              RestaurantCtrl.showitem.name= reset.name;
              RestaurantCtrl.showitem.address=reset.address;
              RestaurantCtrl.showitem.tel= reset.tel;
              RestaurantCtrl.showitem.hour=reset.hour;
              RestaurantCtrl.showitem.area= reset.area;
            }

             RestaurantCtrl.restaurants = [];
             for (i = 0; i < RestaurantCtrl.restaurants.length; i++) {
               var data = {}
               data.rid = Restaurants.item[i].rid;
               data.name = Restaurants.item[i].name;
               data.address = Restaurants.item[i].address;
               data.tel = Restaurants.item[i].tel;
               data.hour = Restaurants.item[i].hour;
               data.area = Restaurants.item[i].area;
							 data.tel2 = Restaurants.item[i].tel2;
               RestaurantCtrl.restaurants.push(data)

             }

             RestaurantCtrl.selectArea = function(area){
               for (i=0; i< RestaurantCtrl.restaurants.length; i++){
                 if (RestaurantCtrl.restaurants[i].area !=area){
                   RestaurantCtrl.restaurants[i]=[];
                 }
               }
             }
             RestaurantCtrl.editandSubmit = function(){

             }

            var isClicked;
            var Highlightarea;
            RestaurantCtrl.addBackGroundColor = function(area) {
              console.log("143",RestaurantCtrl.showitem)
              if (!isClicked) {
                isClicked = true;
                Highlightarea = area;
                for (i = 0; i < RestaurantCtrl.restaurants.length; i++) {
                  if (RestaurantCtrl.restaurants[i].area == area) {
                    RestaurantCtrl.restaurants[i].style = {
                      "background-color": "#ff0000",
                      "color": "#ffffff",
                    }
                  }
                }
              } else {
                isClicked = false;
                for (i = 0; i < RestaurantCtrl.restaurants.length; i++) {
                  if (RestaurantCtrl.restaurants[i].area == Highlightarea) {
                    RestaurantCtrl.restaurants[i].style = {}
                  }

                }
                if (Highlightarea != area)
                  for (i = 0; i < RestaurantCtrl.restaurants.length; i++) {
                    RestaurantCtrl.addBackGroundColor(area)
                  }
              }
            }


}])
