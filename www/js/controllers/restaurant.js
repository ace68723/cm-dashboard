

/* Setup blank page controller */
angular.module('MetronicApp')
	.controller('RestaurantListController', ['$rootScope','$scope', 'settings','restaurantService','$timeout',function($rootScope, $scope, settings,restaurantService,$timeout) {
	    var RestaurantListCtrl = this;
      $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = true;

      });
          RestaurantListCtrl.SearchOptions = [{
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
          }, ];
          
            // console.log("in there",RestaurantListCtrl.SearchOptions);
          // function RestaurantsCtrl(RestaurantListCtrl, Restaurants) {
            //
            RestaurantListCtrl.search = {};
            
            // $timeout(function() {
            //   // console.log("get data from dashboard service",dashboardService.get_orders())
            //   RestaurantListCtrl.rr_data = restaurantService.lo_data;
            //   console.log("Restaurant 43",RestaurantListCtrl.order_data);
              
            //   // console.log("test fomat", DashCtrl.f_data.reject_order);
            // }, 1000);
            RestaurantListCtrl.change = function(selected) {
              //do if's in case you use null or empty values
              console.log(selected);
              if (selected == Select) {}
              if (selected = SearchOption.optionName) {
                return selected;
              }
            }
            

            RestaurantListCtrl.savePdf = function () {
              // console.log("save as pdf");
              html2canvas(document.getElementById('exportthis'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500,
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
                }
            });
            }


            RestaurantListCtrl.clearSearch = function() {
              console.log("clearSearch",RestaurantListCtrl.search);
              RestaurantListCtrl.search = null;
              RestaurantListCtrl.search = {};
              
            }

           RestaurantListCtrl.GetItem=function(restaurant){
            console.log("GetItem",restaurant);
            // var showitem ='123';
            RestaurantListCtrl.showitem={};
            RestaurantListCtrl.showitem.rd= restaurant.rid;
            // console.log(restaurant.rid);
            RestaurantListCtrl.showitem.name= restaurant.name;
            RestaurantListCtrl.showitem.address= restaurant.address;
            RestaurantListCtrl.showitem.tel= restaurant.tel;
            RestaurantListCtrl.showitem.openhour= restaurant.hour;
            RestaurantListCtrl.showitem.area= restaurant.area;
            // RestaurantListCtrl.showitem=showitem;
           }
            // console.log("get data from dashboard service",dashboardService.get_orders())
            // Restaurants = restaurantService.get_orders();
            
            // console.log(restaurantService)
            restaurantService.get_rrlist()
            .then(function (result) {
              RestaurantListCtrl.restaurants = result;
              console.log("100",RestaurantListCtrl.restaurants)
            })
            .catch(function (error) {
              console.log(error)
            })

            // console.log("test get",Restaurants);
            // RestaurantListCtrl.restaurants = [];
            // for (i = 0; i < Restaurants.item.length; i++) {
            //   var data = {}
            //   data.rd = Restaurants.item[i].rd;
            //   data.name = Restaurants.item[i].name;
            //   data.address = Restaurants.item[i].address;
            //   data.tel = Restaurants.item[i].tel;
            //   data.openhour = Restaurants.item[i].openhour;
            //   data.area = Restaurants.item[i].area;
            //   RestaurantListCtrl.restaurants.push(data)

            // }
            var isClicked;
            var Highlightarea;
            RestaurantListCtrl.addBackGroundColor = function(area) {
              console.log(RestaurantListCtrl.showitem)
              if (!isClicked) {
                isClicked = true;
                Highlightarea = area;
                for (i = 0; i < RestaurantListCtrl.restaurants.length; i++) {
                  if (RestaurantListCtrl.restaurants[i].area == area) {
                    RestaurantListCtrl.restaurants[i].style = {
                      "background-color": "#ff0000",
                      "color": "#ffffff",
                    }
                  }
                }
              } else {
                isClicked = false;
                for (i = 0; i < RestaurantListCtrl.restaurants.length; i++) {
                  if (RestaurantListCtrl.restaurants[i].area == Highlightarea) {
                    RestaurantListCtrl.restaurants[i].style = {}
                  }

                }
                if (Highlightarea != area)
                  for (i = 0; i < RestaurantListCtrl.restaurants.length; i++) {
                    RestaurantListCtrl.addBackGroundColor(area)
                  }
              }
            }

            // DashCtrl.f_data = dashboardService.get_fomat();
            // console.log("test fomat", DashCtrl.f_data.reject_order);


           
          // }
}])
// .factory('Restaurants','restaurantService', function() {
//   var RestaurantList = {};
//   RestaurantList.item = restaurantService.getAPI();
//   // RestaurantList.item = [{
//   //   rd: "139",
//   //   name: "糖记甜品North York",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "140",
//   //   name: "糖记甜品Markham",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "Markham"
//   // }, {
//   //   rd: "141",
//   //   name: "糖记甜品DT",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "Downtown"
//   // }, {
//   //   rd: "142",
//   //   name: "轻松饮",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "Downtown"
//   // }, {
//   //   rd: "143",
//   //   name: "喜来宝海鲜酒家",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "Downtown"
//   // }, {
//   //   rd: "144",
//   //   name: "中华经典包子铺",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "145",
//   //   name: "香满园",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "146",
//   //   name: "舌尖上的嘿小面",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "Downtown"
//   // }, {
//   //   rd: "147",
//   //   name: "麻辣吃货",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "148",
//   //   name: "龙叙轩海鲜酒家",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "149",
//   //   name: "寻味云南",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "150",
//   //   name: "味多多麻辣烫饺子馆",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "151",
//   //   name: "状元烤吧",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "152",
//   //   name: "食来食往DT",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "Downtown"
//   // }, {
//   //   rd: "153",
//   //   name: "将军府",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "154",
//   //   name: "椰子湾k",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "155",
//   //   name: "聚春园",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "156",
//   //   name: "98度春",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "North York"
//   // }, {
//   //   rd: "157",
//   //   name: "阿香米线RH",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "Richmond Hill"
//   // }, {
//   //   rd: "158",
//   //   name: "精武鸭脖DT",
//   //   address: " 1 Main Street, North York, 1A1 1A1",
//   //   tel: "641-111-1111",
//   //   openhour: "10am - 10pm",
//   //   area: "Downtown"
//   // }, ];
//   return RestaurantList;
//   //return RestaurantList.item;
// })




