'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */


angular.module('MetronicApp')
  .service('customerServiceSchduleService', function ($http, API2_URL, $timeout,$q) {

   //get all driverList
    function getCustomServiceLists(){
      var deferred = $q.defer();

        var csLists = [];

        var successCallback = (response)=>{
          const data = response.data;
          if(data.ev_result == 0){
           var csScheduleListsData = data.ea_data;
          _.forEach(csScheduleListsData, function(csScheduleList, id) {
             var data = {};
             data.uid = csScheduleList.uid;
             data.username = csScheduleList.username;
             csLists.push(data);
            })
      deferred.resolve(csLists)
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
           url: API2_URL+"cs_list"
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
    function getcsSchedules() {
      var deferred = $q.defer();
        //init data
          var csSchedules = [];

          // successCallback
          var successCallback = (response)=>{
            const data = response.data;
            if(data.ev_result == 0){
             var csSchedulesData = data.ea_data;
            _.forEach(csSchedulesData, function(csSchedule, id) {
               var data = {};
               data.id = csSchedule.id;
               data.uid = csSchedule.uid;
               data.week = csSchedule.week_index;
               data.username = csSchedule.username;
               data.valid_from = csSchedule.valid_from;
               data.valid_to = csSchedule.valid_to;
               data.zone = csSchedule.zone.name;
               csSchedules.push(data);
              })
        deferred.resolve(csSchedules)
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
             url: API2_URL+"cs_work_t"
           }).then(successCallback,errorCallback)
       return deferred.promise

    }
   // getAllDriverSchedule end

   // getDriverScheduleThisWeek
    function getThisWeekSchedule(cs) {
       var deferred = $q.defer();
         //init data
           var csThisWeekSchedules = [];

           // successCallback
           var successCallback = (response)=>{
             const data = response.data;
             if(data.ev_result == 0){
              var csSchedulesData = data.ea_data;
             _.forEach(csSchedulesData, function(csSchedule, id) {
                var data = {};
                data.uid = csSchedule.uid;
                data.date = csSchedule.week;
                data.username = csSchedule.username;
                data.valid_from = csSchedule.valid_from;
                data.valid_to = csSchedule.valid_to;
                var thisStart = data.valid_from.split(" ");
                data.start_date = thisStart[0];
                data.start_time =thisStart[1];
                var thisEnd = data.valid_to.split(" ");
                data.end_date = thisEnd[0];
                data.end_time = thisEnd[1];
                data.zone = csSchedule.zone.name;
                csThisWeekSchedules.push(data);
               })
            deferred.resolve(csThisWeekSchedules)
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
              url: API2_URL+"cs_work_t/"+ cs.uid
            }).then(successCallback,errorCallback)
        return deferred.promise

     }
   // getDriverScheduleThisWeek end

   // getDriverScheduleNextWeek
    function getNextWeekSchedule(cs) {
         var deferred = $q.defer();
           //init data
             var csNextWeekSchedules = [];

             // successCallback
             var successCallback = (response)=>{
               const data = response.data;
               if(data.ev_result == 0){
                var csSchedulesData = data.ea_data;
               _.forEach(csSchedulesData, function(csSchedule, id) {
                  var data = {};
                  data.driver_id = csSchedule.driver_id;
                  data.date = csSchedule.week;
                  data.driver_name = csSchedule.driver_name;
                  data.valid_from = csSchedule.valid_from;
                  data.valid_to = csSchedule.valid_to;
                  var thisStart = data.valid_from.split(" ");
                  data.start_date = thisStart[0];
                  data.start_time =thisStart[1];
                  var thisEnd = data.valid_to.split(" ");
                  data.end_date = thisEnd[0];
                  data.end_time = thisEnd[1];
                  data.zone = csSchedule.zone.name;
                  csNextWeekSchedules.push(data);
                 })
              deferred.resolve(csNextWeekSchedules)
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
                url: API2_URL+"cs_work_n/"+cs.uid
              }).then(successCallback,errorCallback)
          return deferred.promise
       }
   // getDriverScheduleNextWeek end

   // updateDriverSchedule
    function updateCsSchedule(cs){

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
             url:API2_URL+"cs_work",
             data: {
                    "id":cs.id,
                    "uid":cs.uid,
                    "valid_from":cs.valid_from,
                    "valid_to":cs.valid_to,
                    "zone": cs.zone
                     }
           })
         .then(successCallback, errorCallback);
     return deferred.promise
    }
   // updateDriverSchedule end

   // addDriverSchedule
    function addCsSchedule(schedule){
     var deferred = $q.defer();
        var successCallback =function(response){
      deferred.resolve(response)
        }
        var errorCallback = function(response){
      deferred.reject(response)
        }

        $http({
          method: 'POST',
          url: API2_URL+"cs_work",
          data: [{"uid":schedule.uid,
                "valid_from":schedule.start_date+' '+schedule.start_time,
                 "valid_to":schedule.end_date+' '+schedule.end_time,
                 "zone": schedule.zone
                }]
        }).then(successCallback, errorCallback);
      return deferred.promise
     }
   // addDriverSchedule end

    function deletedCsSchedule(cs){
      var deferred = $q.defer();
         var successCallback =function(response){
       deferred.resolve(response)
         }
         var errorCallback = function(response){
       deferred.reject(response)
         }

         $http({
           method: 'PATCH',
           url: API2_URL+"cs_work",
           data: {
             "id":cs.id
                 }
         }).then(successCallback, errorCallback);
       return deferred.promise
    }

    return ({
      getThisWeek :getThisWeek,
      getNextWeek : getNextWeek,
      getCustomServiceLists : getCustomServiceLists,
      getcsSchedules : getcsSchedules,
      getThisWeekSchedule : getThisWeekSchedule,
      getNextWeekSchedule : getNextWeekSchedule,
      updateCsSchedule: updateCsSchedule,
      addCsSchedule : addCsSchedule,
      deletedCsSchedule : deletedCsSchedule
    })


});
