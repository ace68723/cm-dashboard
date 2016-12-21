'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */


angular.module('MetronicApp')
  .service('customServiceService', function ($http, $timeout,$q) {
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
    function getCustomServiceLists(){
      var deferred = $q.defer();

        var customServiceLists = [];

        var successCallback = (response)=>{
          const data = response.data;
          if(data.ev_result == 0){
           var customServiceListData = data.ea_data;
          _.forEach(customServiceListData, function(customServiceList, id) {
             var data = {};
             data.uid = customServiceList.uid;
             data.username = customServiceList.username;
             customServiceLists.push(data);
             customServiceLists = _.sortBy(customServiceLists,["uid"])
            })
      deferred.resolve(customServiceLists)
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
           url: "http://test.norgta.com/public/api/v1/cs_role"
         }).then(successCallback,errorCallback)
     return deferred.promise
    }
   //get all customServiceList end

   // getCustomServiceSchedules
    function getCustomServiceSchedules() {
      var deferred = $q.defer();
        //init data
          var customServiceSchedules = [];

          // successCallback
          var successCallback = (response)=>{
            const data = response.data;
            if(data.ev_result == 0){
             var cServiceData = data.ea_data;
            _.forEach(cServiceData, function(customServiceSchedule, id) {
               var data = {};
               data.id = customServiceSchedule.id;
               data.uid = customServiceSchedule.uid;
               data.username = customServiceSchedule.username;
               data.valid_from = customServiceSchedule.valid_from;
               data.valid_to = customServiceSchedule.valid_to;
               data.zone = customServiceSchedule.zone;
               customServiceSchedules.push(data);

              })
        deferred.resolve(customServiceSchedules)
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
             url: "http://test.norgta.com/public/api/v1/cs_work"
           }).then(successCallback,errorCallback)
       return deferred.promise

    }
   // getCustomServiceSchedules end

   // updateCustomServiceSchedule
    function updateCustomServiceSchedule(customServiceSchedule){
      console.log(customServiceSchedule)

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
             url:"http://test.norgta.com/public/api/v1/cs_work",
             data: {
                    "id":customServiceSchedule.id,
                    "uid":customServiceSchedule.uid,
                    "valid_from":customServiceSchedule.valid_from,
                    "valid_to":customServiceSchedule.valid_to,
                    "zone":customServiceSchedule.zone
                     }
           })
         .then(successCallback, errorCallback);
     return deferred.promise
    }
   // updateCustomServiceSchedule end

   // addCustomServiceSchedule
    function addCustomServiceSchedule(newCustomServiceSchdule){
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
          url: 'http://test.norgta.com/public/api/v1/cs_work',
          data: {"uid":newCustomServiceSchdule.uid,
                "valid_from":newCustomServiceSchdule.valid_from,
                 "valid_to":newCustomServiceSchdule.valid_to,
                 "zone": newCustomServiceSchdule.zone
                }
        }).then(successCallback, errorCallback);
   return deferred.promise
  }
   // addCustomServiceSchedule end

    function deleteCustomServiceSchedule(customServiceSchedule){
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
           url: 'http://test.norgta.com/public/api/v1/cs_work',
           data: {
             "id":customServiceSchedule.id
                 }
         }).then(successCallback, errorCallback);
    return deferred.promise
    }
    return ({
      getCustomServiceLists : getCustomServiceLists,
      getCustomServiceSchedules : getCustomServiceSchedules,
      updateCustomServiceSchedule: updateCustomServiceSchedule,
      addCustomServiceSchedule : addCustomServiceSchedule,
      deleteCustomServiceSchedule : deleteCustomServiceSchedule
    })


});
