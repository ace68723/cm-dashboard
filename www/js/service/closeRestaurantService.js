'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */


angular.module('MetronicApp')
  .service('closeRestaurantService', function ($http, $timeout,$q) {
    // getCloseRestaurants

    /*  input:
      response.data.ev_result:  0 ok | 1 fail
      response.data.ev_message: error message
      response.data.ea_restaurant:
      [
        {
          rid :"123"
          rr_name :"cccccc"
          start_time :"aaa"
          end_time :"nnn"
          close_id :"123"
        }
      ]

      export:
      {
          rid :"123",
          name:"ccccc",
          start_time: "aaa",
          end_time:"bbb"
          close_id:"123"
      }
    */

    function getCloseRestaurants() {
      var deferred = $q.defer();
        //init data
          var closeRestaurants = [];

          // successCallback
          var successCallback = (response)=>{
            const data = response.data;
            if(data.ev_result == 0){
             var restaurantData = data.ev_data;
            _.forEach(restaurantData, function(restaurant, id) {
               var data = {};
               data.rid = restaurant.rid;
               data.rr_name = restaurant.name;
               data.start_time = restaurant.start_time;
               data.end_time = restaurant.end_time;
               data.close_id = restaurant.id;
               closeRestaurants.push(data);
               closeRestaurants = _.sortBy(closeRestaurants,["close_id"])
              })
        deferred.resolve(closeRestaurants)
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
             url: "http://test.norgta.com/public/api/v1/rr_close"
           }).then(successCallback,errorCallback)
       return deferred.promise

    }
    // getCloseRestaurants end

   // updateCloseRestaurant
    function updateCloseRestaurant(closeRestaurant){
      console.log(closeRestaurant)

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
             data: {"rid":closeRestaurant.rid,
                    "start_time":closeRestaurant.start_time,
                    "end_time":closeRestaurant.end_time,
                    "id":closeRestaurant.close_id   }
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
          url: 'http://test.norgta.com/public/api/v1/rr_close',
          data: {"rid":newCloseRestaurant.rid,
                "start_time":newCloseRestaurant.start_time,
                 "end_time":newCloseRestaurant.end_time
                }
        }).then(successCallback, errorCallback);
   return deferred.promise
  }

    return ({
      getCloseRestaurants : getCloseRestaurants,
      updateCloseRestaurant: updateCloseRestaurant,
      addCloseRestaurant : addCloseRestaurant
    })


});
