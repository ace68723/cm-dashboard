var myApp = angular.module('myApp', []);

myApp.factory('Restaurants', function() {
  var RestaurantList = {};
  RestaurantList.item = [{
    rd: "139",
    name: "糖记甜品North York",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "140",
    name: "糖记甜品Markham",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "Markham"
  }, {
    rd: "141",
    name: "糖记甜品DT",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "Downtown"
  }, {
    rd: "142",
    name: "轻松饮",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "Downtown"
  }, {
    rd: "143",
    name: "喜来宝海鲜酒家",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "Downtown"
  }, {
    rd: "144",
    name: "中华经典包子铺",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "145",
    name: "香满园",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "146",
    name: "舌尖上的嘿小面",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "Downtown"
  }, {
    rd: "147",
    name: "麻辣吃货",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "148",
    name: "龙叙轩海鲜酒家",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "149",
    name: "寻味云南",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "150",
    name: "味多多麻辣烫饺子馆",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "151",
    name: "状元烤吧",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "152",
    name: "食来食往DT",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "Downtown"
  }, {
    rd: "153",
    name: "将军府",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "154",
    name: "椰子湾k",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "155",
    name: "聚春园",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "156",
    name: "98度春",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "North York"
  }, {
    rd: "157",
    name: "阿香米线RH",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "Richmond Hill"
  }, {
    rd: "158",
    name: "精武鸭脖DT",
    address: " 1 Main Street, North York, 1A1 1A1",
    tel: "641-111-1111",
    openhour: "10am - 10pm",
    area: "Downtown"
  }, ];
  return RestaurantList;
  //return RestaurantList.item;
})

  function RestaurantsCtrl($scope, Restaurants) {
  //
    $scope.search = {};

    $scope.SearchOptions = [{
      "optionName": "RID",
      "value": "rd"
    }, {
      "optionName": "Restaurant Name",
      "value": "name"
    }, {
      "optionName": "Restaurant Address",
      "value": "address"
    }, {
      "optionName": "Telephone",
      "value": "tel"
    }, {
      "optionName": "Open Hour",
      "value": "openhour"
    }, {
      "optionName": "Area",
      "value": "area"
    },
    ];
    $scope.singleSelect = $scope.SearchOptions[1].value;
    $scope.change = function(selected) {
      //do if's in case you use null or empty values
      console.log(selected)
      if (selected == Select) {}
      if (selected = SearchOption.optionName) {
        return selected;
      }
    }

    $scope.clearSearch = function() {
      $scope.search = null;
      $scope.search = {};
    }
    var showitem ={};
    var reset= {};
    $scope.GetItem=function(restaurant){
      console.log(showitem.rd)
      showitem.rd= restaurant.rd;
      showitem.name= restaurant.name;
      showitem.address= restaurant.address;
      showitem.tel= restaurant.tel;
      showitem.openhour= restaurant.openhour;
      showitem.area= restaurant.area;
      reset.rd= restaurant.rd;
      reset.name= restaurant.name;
      reset.address= restaurant.address;
      reset.tel= restaurant.tel;
      reset.openhour= restaurant.openhour;
      reset.area= restaurant.area;
      $scope.showitem=showitem;
      $scope.reset = reset;
      console.log(showitem.rd)

   }
     $scope.ResetItem = function(restaurant){
       showitem.rd=reset.rd;
       showitem.name= reset.name;
       showitem.address=reset.address;
       showitem.tel= reset.tel;
       showitem.openhour=reset.openhour;
       showitem.area= reset.area;
     }

      $scope.restaurants = [];
      for (i = 0; i < Restaurants.item.length; i++) {
        var data = {}
        data.rd = Restaurants.item[i].rd;
        data.name = Restaurants.item[i].name;
        data.address = Restaurants.item[i].address;
        data.tel = Restaurants.item[i].tel;
        data.openhour = Restaurants.item[i].openhour;
        data.area = Restaurants.item[i].area;
        $scope.restaurants.push(data)

      }
      $scope.selectArea = function(area){
        for (i=0; i< $scope.restaurants.length; i++){
          if ($scope.restaurants[i].area !=area){
            $scope.restaurants[i]=[];
          }
        }
      }

      var isClicked;
      var Highlightarea;
      $scope.addBackgroudColor = function(area) {
      console.log($scope.showitem)
      if (!isClicked) {
        isClicked = true;
        Highlightarea = area;
        for (i = 0; i < $scope.restaurants.length; i++) {
          if ($scope.restaurants[i].area== area) {
            $scope.restaurants[i].style= {
              "background-color": "#ff0000",
              "color": "#ffffff",
            }
          }
        }
      } else {
        isClicked = false;
        for (i = 0; i < $scope.restaurants.length; i++) {
          if ($scope.restaurants[i].area == Highlightarea) {
            $scope.restaurants[i].style={}
          }

        }
        if (Highlightarea != area)
          for (i = 0; i < $scope.restaurants.length; i++) {
            $scope.addBackgroudColor(area)
          }
        }
      }
}
