var myApp = angular.module('myApp', []);
myApp.controller('closeRestaurantController',
['$rootScope', '$scope',  '$http','closeRestaurantService','$q',
function($rootScope, $scope, $http, closeRestaurantService,$q) {
  var crc = this;
  var crs = closeRestaurantService;
//  crs.getQTest();
  crc.search = {};
  crc.SearchOptions = [{
      "optionName": "RID",
      "value": "rid"
    }, {
      "optionName": "Restaurant Name",
      "value": "name"
    }
  ];
  crc.updateRestaurantList = function(){
   crs.getCloseRestaurants()
    .then((result)=>{
    console.log(result)
    crc.closeRestaurants = result;
    })
    .catch((error)=>{
      console.log(error)
    })
   }
  crc.updateRestaurantList();
  crc.restaurantEditing = false;
  crc.itemEditing = false;
  crc.singleSelect = crc.SearchOptions[0].value;
  crc.closeRestaurants = crs.closeRestaurants;
  crc.postCloseRestaurant = crs.addCloseRestaurant;
  crc.newCloseRestaurant ={};
  crc.updateOnClick = function(closeRestaurant){
    console.log(closeRestaurant)
    crs.updateCloseRestaurant(closeRestaurant)
    .then(crc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
    crc.cancelEditing();
  }

  crc.addOnClick = function(){
    console.log($scope)
    console.log(crc.newCloseRestaurant)
    crs.addCloseRestaurant(crc.newCloseRestaurant)
    .then(crc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
   }



  crc.editRestaurant = function(closeRestaurant){
    if(!crc.restaurantEditing){
      crc.restaurantEditing = true;
      crc.itemEditing = true;
      crc.editingRestaurant = [];
      _.forEach(closeRestaurants,function(closeRestaurant) {
        var data = {};
        data.rid = closeRestaurant.rid;
        data.close_id = closeRestaurant.close_id;
        data.name = closeRestaurant.name;
        data.start_time = closeRestaurant.start_time;
        data.end_time = closeRestaurant.end_time;
        crc.editingRestaurant.push(data)
      })
    }
  }

  crc.cancelEditing = function(){
      crc.restaurantEditing = false;
      crc.itemEditing = false;
      // cleanEditingSchedules()
  }

  crc.clearSearch = function() {
    crc.search = null;
    crc.search = {};
  }

  crc.startEditing = function(closeRestaurant){
      crc.restaurantEditing = true;
      // cleanEditingSchedules()
  }

  crc.resetAddForm = function(){
    crc.newCloseRestaurant={};
  }


  function addCloseRestaurant(){
    if(!crc.newCloseRestaurant.rid || !crc.newCloseRestaurant.start_time ||!crc.newCloseRestaurant.end_time ){

    }else{
      crc.closeRestaurants.push(crc.newCloseRestaurant);
      crc.resetAddForm();
      crc.postCloseRestaurant();
    }
  }









}])
