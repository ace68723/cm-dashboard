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
    $scope.options = {
      scrollwheel: false
    };
    $scope.cm_data = [];

    $scope.marker = {
      id: 0,
      coords: {
        latitude: 43.789581,
        longitude: -79.337173
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
         console.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
         console.log(lat);
         console.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels",
          };
        }
      }
    };

    var markers     = [];
    var restaurant  = [];
    var r_point     = {};
    var order_times = 0;
    // $scope.polygons = [
    //         {
    //             id: 1,
    //             path: [
    //                 {
    //                     latitude: 43.778829976863506,
    //                     longitude: -79.26443149151612
    //                 },
    //                 {
    //                     latitude: 43.77015339016421,
    //                     longitude: -79.26116992535401
    //                 },
    //                 {
    //                     latitude: 43.776320093697336,
    //                     longitude: -79.23160125317384
    //                 },
    //                 {
    //                     latitude: 43.78552248357863,
    //                     longitude: -79.23524905743409
    //                 }
    //             ],
    //             stroke: {
    //                 color: '#6060FB',
    //                 weight: 3
    //             },
    //             editable: true,
    //             draggable: false,
    //             geodesic: false,
    //             visible: true,
    //             fill: {
    //                 color: '#ff0000',
    //                 opacity: 0.3
    //             }
    //         }
    //     ];
    $http.get('data/sorted_locations.json').
      success(function(data, status, headers, config) {
        $scope.cm_data = data;
        _.forEach(data, function(point, key) {
          // console.log(point, key);
          //
          //
          // Marker: {"id":3,
          //          "icon":"assets/images/plane.png",
          //          "latitude":37,
          //          "longitude":-122,
          //          "showWindow":true,
          //          "title":"Plane",
          //          "options":{
          //            "labelContent":"Markers id 3",
          //            "labelAnchor":"26 0",
          //            "labelClass":"marker-labels"
          //          }
          //        }
          point.latitude    = point.loc_la;
          point.longitude   = point.loc_lo;
          point.id          = key
          point.show        = false;
          point.title       = point.times + 'times ' + point.loc_la_lo  ;
          point.options     =  {
                                    draggable: true,
                                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                                    labelAnchor: "26 0",
                                    labelClass: "marker-labels",
                                    title:"123"
                                  };
          // console.log(point.times)
             point.icon        = 'red.png'
          // if (point.times > 100) {
          //   point.icon        = 'red.png'
          // } else if(point.times > 50){
          //    point.icon        = 'purple.png'
          // }else if(point.times > 20){
          //    point.icon        = 'orange.png'
          // }else if(point.times > 10){
          //    point.icon        = 'yellow.png'
          // }else if(point.times > 5){
          //    point.icon        = 'blue.png'
          // }else{
          //   point.icon          = 'red.png'
          // };
          // console.log(point)
          point.onClick = function() {
                // console.log("Clicked!");
                point.show = !point.show;

                // console.log(point.title)
            };
          // console.log(point)     point.times > 50 && point.in_poly == 1
          // if (point.in_poly == 1 ) {
          //    // point.icon        = 'orange.png'
          //    markers.push(point)
          //    console.log( windingNumber(point,poly))
          //    order_times += point.times;
          //    if (point.in_poly == 1) {
          //        r_point.latitude    = point.rr_la;
          //        r_point.longitude   = point.rr_lo;
          //        r_point.id            = key * 100000
          //        r_point.show        = false;
          //        r_point.icon        = 'orange.png'
          //        markers.push(r_point)
          //    };
          // };


          markers.push(point)
          // console.log(markers)

        });





        $scope.cm_Markers = markers;
        console.log($scope.cm_Markers)
        $scope.re_markers = restaurant;
        // $scope.save_data();
        console.log(order_times);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
        // $scope.save_data = function() {
        //     $http.post('data/books.json', $scope.cm_Markers).success(function(){
        //                 $scope.msg = 'Data saved';
        //             }).error(function(data) {
        //                 alert("failure message:" + JSON.stringify({data:data}));
        //             });
        // };




    function windingNumber(p, poly) {
      var px = p.latitude,
          py = p.longitude,
          sum = 0

      for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
        var sx = poly[i].latitude,
            sy = poly[i].longitude,
            tx = poly[j].latitude,
            ty = poly[j].longitude

        // 点与多边形顶点重合或在多边形的边上
        if( (sx - px) * (px - tx) >= 0 &&
            (sy - py) * (py - ty) >= 0 &&
            (px - sx) * (ty - sy) === (py - sy) * (tx - sx)
          ) {
            return 'on'
        }

        // 点与相邻顶点连线的夹角
        var angle = Math.atan2(sy - py, sx - px) - Math.atan2(ty - py, tx - px)

        // 确保夹角不超出取值范围（-π 到 π）
        if(angle >= Math.PI) {
          angle = angle - Math.PI * 2
        } else if(angle <= -Math.PI) {
          angle = angle + Math.PI * 2
        }

        sum += angle
      }

      // 计算回转数并判断点和多边形的几何关系
      return Math.round(sum / Math.PI) === 0 ? 'out' : 'in'
    }




});
