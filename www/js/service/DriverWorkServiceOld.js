'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */


angular.module('MetronicApp')
  .service('driverWorkService', function ($http, API2_URL, $timeout,$q) {
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
   //get all customServiceList
    function getDriverLists(){
      var deferred = $q.defer();

        var driverLists = [];

        var successCallback = (response)=>{
          const data = response.data;
          if(data.ev_result == 0){
           var DriverScheduleListsData = data.ea_data;
          _.forEach(DriverScheduleListsData, function(DriverScheduleList, id) {
             var data = {};
             data.driver_id = DriverScheduleList.driver_id;
             data.driver_name = DriverScheduleList.driver_name;
             driverLists.push(data);
            })
      deferred.resolve(driverLists)
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
           url: API2_URL+"dr_list"
         }).then(successCallback,errorCallback)
     return deferred.promise
    }
   //get all customServiceList end

   // getCustomServiceSchedules
    function getDriverSchedules() {
      var deferred = $q.defer();
        //init data
          var driverSchedules = [];

          // successCallback
          var successCallback = (response)=>{
            const data = response.data;
            if(data.ev_result == 0){
             var driverSchedulesData = data.ea_data;
            _.forEach(driverSchedulesData, function(driverSchdule, id) {
               var data = {};
               data.id = driverSchdule.id;
               data.driver_id = driverSchdule.driver_id;
               data.wid = driverSchdule.wid;
               data.name = driverSchdule.name;
               data.driver_name = driverSchdule.driver_name;
               data.valid_from = driverSchdule.valid_from;
               data.valid_to = driverSchdule.valid_to;
               data.zone = driverSchdule.zone;
               data.comment = driverSchdule.comment;
               driverSchedules.push(data);

              })
        deferred.resolve(driverSchedules)
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
             url: API2_URL+"dr_work"
           }).then(successCallback,errorCallback)
       return deferred.promise

    }
   // getCustomServiceSchedules end

   // updateCustomServiceSchedule
    function updateDriverSchedule(driverSchdule){
      console.log(driverSchdule)

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
             url:API2_URL+"dr_work",
             data: {
                    "id":driverSchdule.id,
                    "driver_id":driverSchdule.driver_id,
                    "valid_from":driverSchdule.valid_from,
                    "valid_to":driverSchdule.valid_to,
                    "zone": driverSchdule.zone
                     }
           })
         .then(successCallback, errorCallback);
     return deferred.promise
    }
   // updateCustomServiceSchedule end

   // addCustomServiceSchedule
    function addDriverSchedule(newDriverSchedule){
      console.log(newDriverSchedule.driver_id)
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
          url: API2_URL+"dr_work",
          data: {"driver_id":newDriverSchedule.driver_id,
                "valid_from":newDriverSchedule.valid_from,
                 "valid_to":newDriverSchedule.valid_to,
                 "zone": newDriverSchedule.zone
                }
        }).then(successCallback, errorCallback);
      return deferred.promise
     }
   // addCustomServiceSchedule end

    function deletedDriverSchedule(driverSchdule){
      var deferred = $q.defer();
         var successCallback =function(response){
           console.log(response)
       deferred.resolve(response)
         }
         var errorCallback = function(response){
       deferred.reject(response)
         }

         $http({
           method: 'PATCH',
           url: API2_URL+"dr_work",
           data: {
             "id":driverSchdule.id
                 }
         }).then(successCallback, errorCallback);
       return deferred.promise
    }

    return ({
      getDriverLists : getDriverLists,
      getDriverSchedules : getDriverSchedules,
      updateDriverSchedule: updateDriverSchedule,
      addDriverSchedule : addDriverSchedule,
      deletedDriverSchedule : deletedDriverSchedule
    })


});
