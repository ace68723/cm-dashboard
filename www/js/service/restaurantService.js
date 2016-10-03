angular.module('MetronicApp')
.service('restaurantService',function  ($http,$interval,API_URL,$q) {
    var restaurantService = {};
    var cachedData;
    restaurantService.get_rrlist = function() {
        var deferred = $q.defer();
        if(cachedData){
          deferred.resolve(cachedData);
        }else{
          $http({
            method: 'GET',
            url: API_URL+'MobMonitor/rrinfo',
          }).then(function successCallback(response) {
              cachedData= response.data.rrinfo;
              deferred.resolve(cachedData);

          }, function errorCallback(response) {
             // alertService.alert(response);
              deferred.reject(respose);
          });
        }
        return deferred.promise;

    };


  return restaurantService
})
