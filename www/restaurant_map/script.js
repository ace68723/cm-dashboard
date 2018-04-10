angular.module('appMaps', ['uiGmapgoogle-maps'])
  .controller('mainCtrl', function($scope,$http) {
    $scope.map = {
      center: {
        latitude: 43.810265,
        longitude:  -79.291633
      },
      zoom: 16,
      bounds: {}
    };

    $scope.refresh = function () {
        var markers     = [];
        var restaurant  = [];
        $http.get('https://norgta.com/api/cmapp/v2/get_restaurant_list',{
           headers:{
             Authortoken:localStorage.getItem("userToken"),
             userloc:'0.000000,0.000000'

           }
        }).
          success(function(data, status, headers, config) {
            console.log(data)
            _.forEach(data.ea_restaurant_list, function(restaurant, key) {
              const markerIndex =  _.findIndex(markers, (marker) => {
                  if (marker.latitude == restaurant.rr_la
                      && marker.longitude == restaurant.rr_lo) {
                        return true;
                      }
                })
              var point = {};
              if(markerIndex == -1){
                point.latitude    = restaurant.rr_la;
                point.longitude   = restaurant.rr_lo;
                point.id          = key
                point.show        = false;
                point.options     =  {    draggable: false,
                                          labelAnchor: "26 0",
                                          labelClass: "marker-labels"
                                        };
                point.icon        = 'red.png';
                point.options.labelContent = '<span style="font-size:15px;font-weight:800;color: red;">'+   restaurant.name +'</span>'
                markers.push(point)
              } else {
                markers[markerIndex].options.labelContent += '<br/><span style="font-size:15px;font-weight:800;color: red;">'+   restaurant.name +'</span>'
              }




              // if (point.times > 100) {
              //   point.icon        = 'red.png'
              // } else if(point.times > 50){
                 // point.icon        = 'purple.png'
              // }else if(point.times > 20){
              //    point.icon        = 'orange.png'
              // }else if(point.times > 10){
              //    point.icon        = 'yellow.png'
              // }else if(point.times > 5){
                 // point.icon        = 'blue.png'
              // }else{
              //   point.icon          = 'red.png'
              // };
              // console.log(point)

            });


            $scope.cm_Markers = markers;
            $scope.re_markers = restaurant;
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      }

      $scope.refresh();
      setInterval(function () {
          $scope.refresh();
      }, 10000);
});
