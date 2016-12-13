angular.module('myApp')
  .service('closeRestaurantService', function ($http, $timeout,$q) {

    function getCloseRestaurants() {
      console.log('getCloseRestaurant')
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
    var getRestaurantData = function(result){
      var deferred = $q.defer();
      function successCallback(response) {
          const data = response.data;
            if(data.ev_result == 0){
             //  var restaurant = {};
             //  for (i=0, i<30, i++){
             //    restaurant.rid = data.ev_data[i].rid;
             //    restaurant.name = data.ev_data[i].rr_name;
             //    restaurant.start_time = data.ev_data[i].start_time;
             //    restaurant.end_time = data.ev_data[i].end_time;
             //    restaurant.close_id = data.ev_data[i].close_id;
             //    closeRestaurants.push(restaurant)
             //  }

             _.forEach(closeRestaurant, function(restaurant, id) {
                var data = {};
                data.rid = restaurant.rid;
                data.name = restaurant.rr_name;
                data.start_time = restaurant.start_time;
                data.end_time = restaurant.end_time;
                data.close_id = restaurant.close_id;
                closeRestaurantList.push(data);
               })
               return closeRestaurants
            }
          }, function errorCallback(response) {
       }
      closeRestaurants= result;
      deferred.resolve(result)
      return deferred.promise
    }
      var closeRestaurants = [];
      $http({
         method: 'GET',
         url: "http://test.norgta.com/public/api/v1/rr_close"
         header:
       })
       .then(getRestaurantData)

    }

    function getQTest(){
      var deferred = $q.defer();
      var QTEstArray=[];
      var TestObject = {test:"test"};
      QTEstArray.push(TestObject);
      $timeout(function () {
      deferred.resolve(QTEstArray)
      console.log(QTEstArray)
       }, 500);

     return deferred.promise
    }

    function updateCloseRestaurant(){
      $http({
        method:"PUT",
        url:"http://test.norgta.com/public/api/v1/rr_close/close_id",
        data: {restaurant_information: crc.updateRestaurantInformation},
        config:""
      })
     .then(
         function(response){
           // success callback
         },
         function(response){
           // failure callback
         }
      );
    }
  function addCloseRestaurant(){
    $http({
      method: 'POST',
      url: 'http://test.norgta.com/public/api/v1/rr_close/',
      headers: {
        'Authortoken': "",
      },
      data: {restaurant_information: crc.newCloseRestaurant }
    }).then(function successCallback(response) {
        console.log(response)
    }, function errorCallback(response) {
      console.log(response)
      });
      }

    return ({
      getCloseRestaurants : getCloseRestaurants,
      updateCloseRestaurant: updateCloseRestaurant,
      addCloseRestaurant : addCloseRestaurant,
      getQTest : getQTest
    })


});
