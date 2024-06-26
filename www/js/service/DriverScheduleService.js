'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */


angular.module('MetronicApp')
  .service('driverScheduleService', function ($http, API2_URL, $timeout,$q) {

   //get all driverList
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
   //get all driverList end

   //get Weeks
    function getThisWeek(){
       var deferred = $q.defer();

         var thisWeek = [];

         var successCallback = (response)=>{
           const data = response.data;
           if(data.ev_result == 0){
             var thisWeekData = data.ea_data;
             _.forEach(thisWeekData,function(thisweek, id){
               var data = {};
               data.id = id;
               data.date = thisweek;
               thisWeek.push(data)
             })
              deferred.resolve(thisWeek)
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
            url: API2_URL+"datesTW"
          }).then(successCallback,errorCallback)
      return deferred.promise
     }

    function getNextWeek(){
        var deferred = $q.defer();

          var nextWeek = [];

          var successCallback = (response)=>{
            const data = response.data;
            if(data.ev_result == 0){
              var nextWeekData = data.ea_data;
             _.forEach(nextWeekData, function(next, id){
               var data = {};
               data.id = id;
               data.date = next;
               nextWeek.push(data)
             })
               deferred.resolve(nextWeek)
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
             url: API2_URL+"datesNW"
           }).then(successCallback,errorCallback)
       return deferred.promise
      }
   //get Weeks end

   // getAllDriverSchedule
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
               data.week = driverSchdule.week_index;
               data.driver_name = driverSchdule.driver_name;
               data.valid_from = driverSchdule.valid_from;
               data.valid_to = driverSchdule.valid_to;
               data.zone = driverSchdule.zone.name;
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
             url: API2_URL+"dr_work_t"
           }).then(successCallback,errorCallback)
       return deferred.promise

    }
   // getAllDriverSchedule end

   // getDriverScheduleThisWeek
    function getThisWeekSchedule(driver) {
       var deferred = $q.defer();
         //init data
           var driverThisWeekSchedules = [];

           // successCallback
           var successCallback = (response)=>{
             const data = response.data;
             if(data.ev_result == 0){
              var driverSchedulesData = data.ea_data;
             _.forEach(driverSchedulesData, function(driverSchdule, id) {
                var data = {};
                data.driver_id = driverSchdule.driver_id;
                data.date = driverSchdule.week_index;
                data.driver_name = driverSchdule.driver_name;
                data.valid_from = driverSchdule.valid_from;
                data.valid_to = driverSchdule.valid_to;
                var thisStart = data.valid_from.split(" ");
                data.start_date = thisStart[0];
                data.start_time =thisStart[1];
                var thisEnd = data.valid_to.split(" ");
                data.end_date = thisEnd[0];
                data.end_time = thisEnd[1];
                data.zone = driverSchdule.zone.name;
                driverThisWeekSchedules.push(data);
               })
            deferred.resolve(driverThisWeekSchedules)
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
              url: API2_URL+"dr_work_t/"+driver.driver_id
            }).then(successCallback,errorCallback)
        return deferred.promise

     }
   // getDriverScheduleThisWeek end

   // getDriverScheduleNextWeek
    function getNextWeekSchedule(driver) {
         var deferred = $q.defer();
           //init data
             var driverNextWeekSchedules = [];

             // successCallback
             var successCallback = (response)=>{
               const data = response.data;
               if(data.ev_result == 0){
                var driverSchedulesData = data.ea_data;
               _.forEach(driverSchedulesData, function(driverSchdule, id) {
                  var data = {};
                  data.driver_id = driverSchdule.driver_id;
                  data.date = driverSchdule.week_index;
                  data.driver_name = driverSchdule.driver_name;
                  data.valid_from = driverSchdule.valid_from;
                  data.valid_to = driverSchdule.valid_to;
                  var thisStart = data.valid_from.split(" ");
                  data.start_date = thisStart[0];
                  data.start_time =thisStart[1];
                  var thisEnd = data.valid_to.split(" ");
                  data.end_date = thisEnd[0];
                  data.end_time = thisEnd[1];
                  data.zone = driverSchdule.zone.name;
                  driverNextWeekSchedules.push(data);
                 })
              deferred.resolve(driverNextWeekSchedules)
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
                url: API2_URL+"dr_work_n/"+driver.driver_id
              }).then(successCallback,errorCallback)
          return deferred.promise
       }
   // getDriverScheduleNextWeek end

   // updateDriverSchedule
    function updateDriverSchedule(driver){

     var deferred = $q.defer();
       // successCallback
         var successCallback = (response)=>{
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
                    "id":driver.id,
                    "driver_id":driver.driver_id,
                    "valid_from":driver.valid_from,
                    "valid_to":driver.valid_to,
                    "zone": driver.zone
                     }
           })
         .then(successCallback, errorCallback);
     return deferred.promise
    }
   // updateDriverSchedule end

   // addDriverSchedule
    function addDriverSchedule(schedule){
     var deferred = $q.defer();
        var successCallback =function(response){
      deferred.resolve(response)
        }
        var errorCallback = function(response){
      deferred.reject(response)
        }

        $http({
          method: 'POST',
          url: API2_URL+"dr_work",
          data: [{"driver_id":schedule.driver_id,
                "valid_from":schedule.start_date+' '+schedule.start_time,
                 "valid_to":schedule.end_date+' '+schedule.end_time,
                 "zone": schedule.zone
                }]
        }).then(successCallback, errorCallback);
      return deferred.promise
     }
   // addDriverSchedule end

    function deletedDriverSchedule(driver){
      var deferred = $q.defer();
         var successCallback =function(response){
       deferred.resolve(response)
         }
         var errorCallback = function(response){
       deferred.reject(response)
         }

         $http({
           method: 'PATCH',
           url: API2_URL+"dr_work",
           data: {
             "id":driver.id
                 }
         }).then(successCallback, errorCallback);
       return deferred.promise
    }

    return ({
      getThisWeek :getThisWeek,
      getNextWeek : getNextWeek,
      getDriverLists : getDriverLists,
      getDriverSchedules : getDriverSchedules,
      getThisWeekSchedule : getThisWeekSchedule,
      getNextWeekSchedule : getNextWeekSchedule,
      updateDriverSchedule: updateDriverSchedule,
      addDriverSchedule : addDriverSchedule,
      deletedDriverSchedule : deletedDriverSchedule
    })


});
