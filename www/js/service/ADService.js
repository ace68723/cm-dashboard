'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */
angular.module('MetronicApp')
  .service('ADService', function ($http, $timeout,$q,API2_URL) {
    // getRestaurantLists
    function getADList() {
      var deferred = $q.defer();
        //init data
        var adLists = [];
          var allLists = [];
          var nyLists = [];
          var scLists = [];
          var dtLists = [];
          var mkLists = [];
          var miLists = [];
          var rhLists = [];
          // successCallback
          var successCallback = (response)=>{
            const data = response.data;
            console.log(data.ea_ad_rr);
            if(data.ev_result == 0){
             var adData = data.ea_ad_rr[0].adList;
            _.forEach(adData, function(ad, id) {
               var data = {};
               data.id = ad.id;
               data.rid = ad.rid;
               data.zone = ad.zone;
               data.rank = ad.rank;
               data.start_date = ad.start_date;
               data.end_date = ad.end_date;
               allLists.push(data);
             })
             var adData = data.ea_ad_rr[1].adList;
            _.forEach(adData, function(ad, id) {
               var data = {};
               data.id = ad.id;
               data.rid = ad.rid;
               data.zone = ad.zone;
               data.rank = ad.rank;
               data.start_date = ad.start_date;
               data.end_date = ad.end_date;
               scLists.push(data);
             })
             var adData = data.ea_ad_rr[2].adList;
            _.forEach(adData, function(ad, id) {
               var data = {};
               data.id = ad.id;
               data.rid = ad.rid;
               data.zone = ad.zone;
               data.rank = ad.rank;
               data.start_date = ad.start_date;
               data.end_date = ad.end_date;
               nyLists.push(data);
             })
             var adData = data.ea_ad_rr[3].adList;
            _.forEach(adData, function(ad, id) {
               var data = {};
               data.id = ad.id;
               data.rid = ad.rid;
               data.zone = ad.zone;
               data.rank = ad.rank;
               data.start_date = ad.start_date;
               data.end_date = ad.end_date;
               rhLists.push(data);
             })
             var adData = data.ea_ad_rr[4].adList;
            _.forEach(adData, function(ad, id) {
               var data = {};
               data.id = ad.id;
               data.rid = ad.rid;
               data.zone = ad.zone;
               data.rank = ad.rank;
               data.start_date = ad.start_date;
               data.end_date = ad.end_date;
               mkLists.push(data);
             });
             var adData = data.ea_ad_rr[5].adList;
            _.forEach(adData, function(ad, id) {
               var data = {};
               data.id = ad.id;
               data.rid = ad.rid;
               data.zone = ad.zone;
               data.rank = ad.rank;
               data.start_date = ad.start_date;
               data.end_date = ad.end_date;
               dtLists.push(data);
             });
             var adData = data.ea_ad_rr[6].adList;
            _.forEach(adData, function(ad, id) {
               var data = {};
               data.id = ad.id;
               data.rid = ad.rid;
               data.zone = ad.zone;
               data.rank = ad.rank;
               data.start_date = ad.start_date;
               data.end_date = ad.end_date;
               miLists.push(data);
             });
             adLists.push(allLists);
             adLists.push(scLists);
             adLists.push(nyLists);
             adLists.push(rhLists);
             adLists.push(mkLists);
             adLists.push(dtLists);
             adLists.push(miLists);
        deferred.resolve(adLists);
          }else {
            deferred.reject(response);
          }
        };
          // successCallback end

          //errorCallback
          var errorCallback = (response)=>{
        deferred.reject(response);
      };
          // errorCallback end

          $http({
             method: 'GET',
             url:'http://chanmao.us/api/v1/ad_top'
           }).then(successCallback,errorCallback);
       return deferred.promise;

    }
    // getRestaurantLists end

    // getRestaurantLists
    function getCloseInfomaiton(id) {
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
             });
        deferred.resolve(restaurantInfo);
          }else {
            deferred.reject(response);
          }
        };
          // successCallback end

          //errorCallback

          var errorCallback = (response)=>{
        deferred.reject(response);
      };
          // errorCallback end

          $http({
             method: 'GET',
             url:API2_URL+"rr_close/"+id
            //  params:{"rid":closeRestaurant.rid,"rid2":closeRestaurant.rid,}
          }).then(successCallback,errorCallback);
       return deferred.promise;

    }
    // getRestaurantLists end

   // updateCloseRestaurant
    function updateCloseRestaurant(closeInformation){
      console.log(closeInformation);

     var deferred = $q.defer();
       // successCallback
         var successCallback = (response) => {
          console.log(response);
       deferred.resolve(response);
     };
         // successCallback end

         //errorCallback
         var errorCallback = (response) => {
       deferred.reject(response);
     };
         $http({
             method:"PUT",
             url:API2_URL+"rr_close",
             data: {"rid":closeInformation.rid,
                    "start_time":closeInformation.start_time,
                    "end_time":closeInformation.end_time,
                    "id":closeInformation.id   }
           })
         .then(successCallback, errorCallback);
     return deferred.promise;
    }
   // updateCloseRestaurant end

   // addCloseRestaurant
  function addCloseRestaurant(newCloseRestaurant){
   var deferred = $q.defer();
        var successCallback =function(response){
          console.log(response);
      deferred.resolve(response);
    };
        var errorCallback = function(response){
      deferred.reject(response);
    };

        $http({
          method: 'POST',
          url: API2_URL+"rr_close",
          data: {"rid":newCloseRestaurant.rid,
                "start_time":newCloseRestaurant.start_time,
                 "end_time":newCloseRestaurant.end_time
                }
        }).then(successCallback, errorCallback);
   return deferred.promise;
  }

    return ({
      getADList : getADList,
      getCloseInfomaiton : getCloseInfomaiton,
      updateCloseRestaurant: updateCloseRestaurant,
      addCloseRestaurant : addCloseRestaurant
    });


});
