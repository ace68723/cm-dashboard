angular.module('MetronicApp')
.service('restaurantService',function  ($http,$interval,API_URL,$q) {
    var restaurantService = {};
    restaurantService.get_rrlist = function() {
        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: API_URL+'MobMonitor/rrinfo',
        }).then(function successCallback(response) {
            lo_data= response.data.rrinfo;
            deferred.resolve(lo_data);

        }, function errorCallback(response) {
           // alertService.alert(response);
            deferred.reject(respose);
        });
        
        return deferred.promise;
        
    };


  return restaurantService
})