angular.module('appMaps', ['uiGmapgoogle-maps'])
  .controller('mainCtrl', function($scope,$http) {
    $scope.map = {
      center: {
        latitude: 43.789581,
        longitude:  -79.337173
      },
      zoom: 12,
      bounds: {}
    };

    $scope.refresh = function () {
        var markers     = [];
        var restaurant  = [];
        $http.get('https://www.chanmao.ca/index.php?r=MobAly10/DriverLoc',{
           headers:{
             Authortoken:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDYxMSIsImV4cGlyZWQiOjE1MTkyNDMyMDAsImxhc3Rsb2dpbiI6MTUxMzIxMTc3M30.EuptXmt9F6lJNM2Oin7qXkz3kbgoiCaJzK2SDQVG1bw'
           }
        }).
          success(function(data, status, headers, config) {

            _.forEach(data.drivers, function(driver, key) {
              var point = {};
              point.latitude    = driver.lat;
              point.longitude   = driver.lng;
              point.id          = key
              point.show        = false;
              point.options     =  {    draggable: false,
                                        labelAnchor: "26 0",
                                        labelClass: "marker-labels"
                                      };
              // console.log(point.times)
              if(driver.workload <3 ){
                  point.icon        = 'red.png';
                  point.options.labelContent = '<span style="font-size:15px;font-weight:800;color: red;">'+   driver.driver_name + ' ' +driver.workload  +'</span>'
              }else{
                point.icon        = 'blue.png';
                point.options.labelContent = '<p style="font-size:15px;">'+ driver.driver_name + ' ' + driver.workload +  '</p>'
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
              markers.push(point)
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
