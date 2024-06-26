'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */
angular.module('MetronicApp')
  .service('testListService', function ($http, $timeout,$q) {
    // getRestaurantLists
    function getRestaurantLists() {
      var deferred = $q.defer();
        //init data
          var restaurantLists = [];

          // successCallback
          var successCallback = (response)=>{
            const data = response.data;
            if(data.ev_result == 0){
             var restaurantListData = data.ea_data;
            _.forEach(restaurantListData, function(restaurant, id) {
               var data = {};
               data.rid = restaurant.rid;
               data.name = restaurant.name;
               data.address = restaurant.address;
               data.tel = restaurant.tel;
               data.area = restaurant.area;
               data.hour = restaurant.hour;
               data.status = restaurant.status;
               restaurantLists.push(data);

              })
        deferred.resolve(restaurantLists)
          }else {
            deferred.reject(response)
          }
          }
          // successCallback end

          //errorCallback
          var errorCallback = (response)=>{
        deferred.reject(response)
          }
          // errorCallback end

          $http({
             method: 'GET',
             url: "http://test.norgta.com/public/api/v1/rr_info"
           }).then(successCallback,errorCallback)
       return deferred.promise

    }
    // getRestaurantLists end

    // getRestaurantLists
    function getCloseInfomaiton(closeRestaurant) {

      var deferred = $q.defer();
        //init data
          var restaurantInfo = [];

          // successCallback
          var successCallback = (response)=>{
            const data = response.data;
            if(data.ev_result == 0){
             var restaurantInfoData = data.ea_data;
            _.forEach(restaurantInfoData, function(restaurant, id) {
               var data = {};
               data.id = restaurant.id;
               data.rid = restaurant.rid;
               data.start_time = restaurant.start_time;
               data.end_time = restaurant.end_time;
               restaurantInfo.push(data);
              })
        deferred.resolve(restaurantInfo)
          }else {
            deferred.reject(response)
          }
          }
          // successCallback end

          //errorCallback
          var para = closeRestaurant.rid;
          var errorCallback = (response)=>{
        deferred.reject(response)
          }
          // errorCallback end

          $http({
             method: 'GET',
             url:"http://test.norgta.com/public/api/v1/rr_close/"+closeRestaurant.rid
            //  params:{"rid":closeRestaurant.rid,"rid2":closeRestaurant.rid,}
           }).then(successCallback,errorCallback)
       return deferred.promise

    }
    // getRestaurantLists end

   // updateCloseRestaurant
    function updateCloseRestaurant(closeInformation){
      console.log(closeInformation)

     var deferred = $q.defer();
       // successCallback
         var successCallback = (response)=>{
          console.log(response)
       deferred.resolve(response)
         }
         // successCallback end

         //errorCallback
         var errorCallback = (response)=>{
       deferred.reject(response)
         }
         $http({
             method:"PUT",
             url:"http://test.norgta.com/public/api/v1/rr_close",
             data: {"rid":closeInformation.rid,
                    "start_time":closeInformation.start_time,
                    "end_time":closeInformation.end_time,
                    "id":closeInformation.id   }
           })
         .then(successCallback, errorCallback);
     return deferred.promise
    }
   // updateCloseRestaurant end

   // addCloseRestaurant
  function addCloseRestaurant(newCloseRestaurant){
   var deferred = $q.defer();
        var successCallback =function(response){
          console.log(response)
      deferred.resolve(response)
        }
        var errorCallback = function(response){
      deferred.reject(response)
        }

        $http({
          method: 'POST',
          url: "http://test.norgta.com/public/api/v1/rr_close",
          data: {"rid":newCloseRestaurant.rid,
                "start_time":newCloseRestaurant.start_time,
                 "end_time":newCloseRestaurant.end_time
                }
        }).then(successCallback, errorCallback);
   return deferred.promise
  }

    return ({
      getRestaurantLists : getRestaurantLists,
      getCloseInfomaiton : getCloseInfomaiton,
      updateCloseRestaurant: updateCloseRestaurant,
      addCloseRestaurant : addCloseRestaurant
    })


});
