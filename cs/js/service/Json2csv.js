angular.module('MetronicApp')
.service('json2csv',function  ($q) {
  var json2csv = {};

	json2csv.ConvertToJSON = function(csv){
      var deferred = $q.defer();
      Papa.parse('data/deliver.csv', {
          download: true,
          header: true,
          complete: function(result) {
              deferred.resolve(result);
          }
      });
      return deferred.promise;
  }
  return json2csv
})
