'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */
angular.module('MetronicApp')
  .service('closeListService', function ($http, $timeout,$q,API2_URL,API3_URL) {
    // getRestaurantLists
    function getRestaurantLists() {
      var deferred = $q.defer();
        //init data
          var restaurantLists = [];

          // successCallback
          var successCallback = (response)=>{
            const data = response.data;
            console.log(response)
            if(data.ev_result == 0){
             var restaurantListData = data.ea_data;
            _.forEach(restaurantListData, function(restaurant, id) {
               var data = {};
               if(restaurant.area == 'Downtown') {
                 restaurant.area = 'GTA Downtown'
               }
               data.tel2 = restaurant.tel2;
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
             url: API2_URL+"rr_info"
           }).then(successCallback,errorCallback)
       return deferred.promise

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
              })
        deferred.resolve(restaurantInfo)
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
             url:API2_URL+"rr_close/"+id
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
                     alert("修改成功");
          console.log(response)
       deferred.resolve(response)
         }
         // successCallback end

         //errorCallback
         var errorCallback = (response)=>{
                     alert("修改失败,请联系Sam");
       deferred.reject(response)
         }
         $http({
             method:"PUT",
             url:API2_URL+"rr_close",
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
                    alert("添加成功");
          console.log(response);
      deferred.resolve(response);
    };
        var errorCallback = function(response){
                    alert("添加失败,请联系Sam");
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

  function getResDetail(id){
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
          url: API3_URL+"get_rr_detail",
          data: {
            "iv_rid":id
                }
        }).then(successCallback, errorCallback);
   return deferred.promise;
  }

  function getResDetailFinance(id){
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
          url: API3_URL+"get_rr_detail_finance",
          data: {
            "iv_rid":id
                }
        }).then(successCallback, errorCallback);
   return deferred.promise
  }
  function editResDetailFinance(restaurantDetailFinance){
   var deferred = $q.defer();
        var successCallback =function(response){
          alert("修改成功");
          console.log(response)
      deferred.resolve(response)
        }
        var errorCallback = function(response){
          alert("修改失败,请联系Sam");
      deferred.reject(response)
        }

        $http({
          method: 'PUT',
          url: API3_URL+"edit_rr_detail_finance",
          data: {
            "iv_rid": restaurantDetailFinance.rid,
            "iv_rate": restaurantDetailFinance.rate,
            "iv_bname": restaurantDetailFinance.bname,
            "iv_owner": restaurantDetailFinance.owner,
            "iv_email": restaurantDetailFinance.email,
            "iv_bank_transit":restaurantDetailFinance.bank_transit,
            "iv_bank_name": restaurantDetailFinance.bank_name,
            "iv_bank_instit": restaurantDetailFinance.bank_instit,
            "iv_bank_account": restaurantDetailFinance.bank_account,
            "iv_comment": restaurantDetailFinance.comment,
            "iv_pay_method": restaurantDetailFinance.pay_method,
            "iv_pay_cycle": JSON.stringify(restaurantDetailFinance.pay_cycle)
                }
        }).then(successCallback, errorCallback);
   return deferred.promise
  }

  function getLateNight(id){
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
          url: API3_URL+"get_rr_open",
          data: {
            "iv_rid":id
                }
        }).then(successCallback, errorCallback);
   return deferred.promise
  }
  function addLateNight(lateNightinfo){
   var deferred = $q.defer();
        var successCallback =function(response){
                    alert("添加成功");
          console.log(response)
      deferred.resolve(response)
        }
        var errorCallback = function(response){
                    alert("添加失败,请联系Sam");
      deferred.reject(response)
        }

        $http({
          method: 'POST',
          url: API3_URL+"add_rr_open",
          data: {
            "iv_rid":lateNightinfo.rid,
            "iv_weekday":lateNightinfo.weekday,
            "iv_stime": lateNightinfo.stime,
            "iv_etime": lateNightinfo.etime
                }
        }).then(successCallback, errorCallback);
   return deferred.promise
  }
  function editLateNight(lateNightinfo){
   var deferred = $q.defer();
        var successCallback =function(response){
                    alert("修改成功");
          console.log(response)
      deferred.resolve(response)
        }
        var errorCallback = function(response){
                    alert("修改失败,请联系Sam");
      deferred.reject(response)
        }

        $http({
          method: 'PUT',
          url: API3_URL+"edit_rr_open",
          data: {
            "iv_id": lateNightinfo.id,
            "iv_rid":lateNightinfo.rid,
            "iv_weekday":parseInt(lateNightinfo.weekday, 10),
            "iv_stime": lateNightinfo.stime,
            "iv_etime": lateNightinfo.etime
                }
        }).then(successCallback, errorCallback);
   return deferred.promise
  }
  function deleteLateNight(lateNightinfo){
    var deferred = $q.defer();
         var successCallback =function(response){
                     alert("删除成功");
           console.log(response)
       deferred.resolve(response)
         }
         var errorCallback = function(response){
                     alert("删除失败,请联系Sam");
       deferred.reject(response)
         }
 
         $http({
           method: 'PUT',
           url: API3_URL+"delete_rr_open",
           data: {
             "iv_id": lateNightinfo.id,
             "iv_rid":lateNightinfo.rid,
             "iv_weekday":parseInt(lateNightinfo.weekday, 10)
                 }
         }).then(successCallback, errorCallback);
    return deferred.promise
   }
  function editResDetail(restaurantDetail){
    var deferred = $q.defer();
         var successCallback =function(response){
                     alert("修改成功");
           console.log(response)
       deferred.resolve(response)
         }
         var errorCallback = function(response){
                     alert("修改失败,请联系Sam");
       deferred.reject(response)
         }

         $http({
           method: 'PUT',
           url: API3_URL+"edit_rr_detail",
           data: {
            "iv_rid": restaurantDetail.rid,
            "iv_name": restaurantDetail.name,
            "iv_desc": restaurantDetail.desc,
            "iv_area": restaurantDetail.area,
            "iv_logo_id": restaurantDetail.logo_id,
            "iv_postal": restaurantDetail.postal,
            "iv_tel1": restaurantDetail.tel1,
            "iv_tel2": restaurantDetail.tel2,
            "iv_province": restaurantDetail.province,
            "iv_prvn": restaurantDetail.prvn,
            "iv_addr": restaurantDetail.addr,
            "iv_apt_no": restaurantDetail.apt_no,
            "iv_start_amount": parseInt(restaurantDetail.start_amount,10),
            "iv_mob_banner": restaurantDetail.mob_banner,
            "iv_status": restaurantDetail.status,
            "iv_rate":restaurantDetail.rate}
         }).then(successCallback, errorCallback);
    return deferred.promise
   }

   function addNewRestaurant(newRestaurant){
     var deferred = $q.defer();
          var successCallback =function(response){
                      alert("添加成功");
            console.log(response)
        deferred.resolve(response)
          }
          var errorCallback = function(response){
                      alert("添加失败,请联系Sam");
        deferred.reject(response)
          }

          $http({
            method: 'POST',
            url: API3_URL+"add_rr_detail",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'},
            data: {
              "iv_username":newRestaurant.username,
              "iv_password":newRestaurant.password,
              "iv_appid":newRestaurant.appid,
             "iv_name": newRestaurant.name,
             "iv_desc": newRestaurant.desc,
             "iv_area": newRestaurant.area,
             "iv_logo_id": newRestaurant.logo_id,
             "iv_postal": newRestaurant.postal,
             "iv_tel1": newRestaurant.tel1,
             "iv_tel2": newRestaurant.tel2,
             "iv_settle_type":parseFloat(newRestaurant.settle_type),
             "iv_province": newRestaurant.province,
             "iv_prvn": newRestaurant.prvn,
             "iv_addr": newRestaurant.addr,
             "iv_apt_no": newRestaurant.apt_no,
             "iv_start_amount": parseInt(newRestaurant.start_amount,10),
             "iv_mob_banner": newRestaurant.mob_banner,
             "iv_status": newRestaurant.status,
             "iv_rate":newRestaurant.rate,
             "iv_fbid": newRestaurant.fbid,
             "iv_bname":newRestaurant.bname,
             "iv_email":newRestaurant.email,
             "iv_bank_name":newRestaurant.bank_name,
             "iv_bank_transit": newRestaurant.bank_transit,
             "iv_bank_instit": newRestaurant.bank_instit,
             "iv_bank_account":newRestaurant.bank_account,
             "iv_comment":newRestaurant.comment,
             "iv_pay_method":newRestaurant.pay_method,
             "iv_pay_cycle":newRestaurant.pay_cycle
           }
          }).then(successCallback, errorCallback);
     return deferred.promise
    }


    return ({
      getRestaurantLists : getRestaurantLists,
      getCloseInfomaiton : getCloseInfomaiton,
      updateCloseRestaurant: updateCloseRestaurant,
      addCloseRestaurant : addCloseRestaurant,
      getResDetail: getResDetail,
      getLateNight: getLateNight,
      addLateNight: addLateNight,
      editLateNight: editLateNight,
      getResDetailFinance: getResDetailFinance,
      editResDetail: editResDetail,
      addNewRestaurant: addNewRestaurant,
      editResDetailFinance: editResDetailFinance,
      deleteLateNight: deleteLateNight
    })


});
