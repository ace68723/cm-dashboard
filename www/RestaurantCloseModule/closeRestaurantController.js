var myApp = angular.module('myApp', []);
myApp.controller('closeRestaurantController',
['$rootScope', '$scope',  '$http','closeRestaurantService','$q',
function($rootScope, $scope, $http, closeRestaurantService,$q) {
  var crc = this;
  var crs = closeRestaurantService;
//  crs.getQTest();
  crc.SearchOptions = [{
      "optionName": "RID",
      "value": "rid"
    }, {
      "optionName": "Restaurant Name",
      "value": "name"
    }
  ];
  // var testFunc = function(result){
  //   var deferred = $q.defer();
  //   crc.QTEstArray = result;
  //   deferred.resolve(result)
  //   console.log(crc.QTEstArray)
  //   return deferred.promise
  // }
  var testFunc = function(result){
    var deferred = $q.defer();
    crc.QTEstArray = result;
    deferred.resolve(result)
    console.log(crc.QTEstArray)
    return deferred.promise
  }
  var testFunc2 = function(result){
    crc.QTEstArray2 = result;
    console.log(crc.QTEstArray2)
  }
  crs.getQTest()
  .then(testFunc)
  .then(testFunc2)
  .catch(function(){

  })

//  crc.QTEstArray = crs.getQTest();
  //console.log(crc.QTEstArray)
  crc.singleSelect = crc.SearchOptions[0].value;
  crc.closeRestaurants = crs.closeRestaurants;
  crc.postCloseRestaurant = crs.addCloseRestaurant;
  crc.updateCloseRestaurant = crs.updateCloseRestaurant;
  console.log(crs)

  crs.getCloseRestaurants()
    .then(()=>{

    })
    .catch((error)=>{
      console.log(error)
    })

  crc.editRestaurant = function(closeRestaurant){
    if(!closeRestaurant.isEditing){
      closeRestaurant.isEditing = true;
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

  crc.cancelEditing = function(closeRestaurant){
      closeRestaurant.isEditing = false;
      crc.itemEditing = false;
      // cleanEditingSchedules()
  }

  crc.clearSearch = function() {
    crc.search = null;
    crc.search = {};
  }

  crc.startEditing = function(closeRestaurant){
      closeRestaurant.isEditing = true;
      // cleanEditingSchedules()
  }

  crc.resetAddForm = function(){
    crc.newCloseRestaurant={};
  }

  var newCloseRestaurant ={
    rid : "",
    start_time: "",
    end_time :""
  }
  function addCloseRestaurant(){
    crc.newCloseRestaurant = newCloseRestaurant;
    if(!crc.newCloseRestaurant.rid || !crc.newCloseRestaurant.start_time ||!crc.newCloseRestaurant.end_time ){

    }else{
      crc.closeRestaurants.push(crc.newCloseRestaurant);
      crc.resetAddForm();
      crc.postCloseRestaurant();
    }
  }









}])
