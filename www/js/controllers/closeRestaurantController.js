
angular.module('MetronicApp').controller('closeRestaurantController',
['$rootScope', '$scope',  '$http','closeRestaurantService','$q',
function($rootScope, $scope, $http, closeRestaurantService,$q) {
  var crc = this;
  var crs = closeRestaurantService;
  crc.height = window.innerHeight*0.9;
//  crs.getQTest();
  crc.search = {};
  crc.SearchOptions = [{
      "optionName": "RID",
      "value": "rid"
    }, {
      "optionName": "Restaurant Name",
      "value": "name"
    }
  ];
  crc.updateRestaurantList = function(){
    setTimeout(function () {
      crs.getCloseRestaurants()
       .then((result)=>{
       crc.closeRestaurants = result;
       })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }
  crc.roleCheck = function(){
    if($rootScope.role == "SETTLE"){
      crc.updateRestaurantList()

    }else{
        window.location="index.html#/dashboard.html"
    }
  }
  crc.roleCheck();
  crc.restaurantEditing = false;
  crc.itemEditing = false;
  crc.singleSelect = crc.SearchOptions[0].value;
  crc.closeRestaurants = crs.closeRestaurants;
  crc.postCloseRestaurant = crs.addCloseRestaurant;
  crc.newCloseRestaurant ={};
  crc.updateOnClick = function(closeRestaurant){
    crs.updateCloseRestaurant(closeRestaurant)
    .then(crc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
    crc.cancelEditing(closeRestaurant);
  }

  crc.addOnClick = function(){
    crs.addCloseRestaurant(crc.newCloseRestaurant)
    .then(crc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
   }
   crc.confrimAdd = function(){
     if(!crc.newCloseRestaurant.rid||!crc.newCloseRestaurant.start_time||!crc.newCloseRestaurant.end_time){

     }else{
     swal({
       title: "确认添加?",
       type: "warning",
       showCancelButton: true,
       confirmButtonClass: "btn-danger",
       confirmButtonText: "是的, 请添加!",
       cancelButtonText: "不, 请删除!",
       closeOnConfirm: false,
       closeOnCancel: false
       },
      function(isConfirm) {
        if (isConfirm) {
        swal("已提交!", "success"
             );
        crc.addOnClick();
        crc.resetAddForm();
        crc.updateRestaurantList();
           } else {
        swal("已取消!");
           }
     });
     }
   }
  crc.confrimUpdate = function(closeRestaurant){
    swal({
      title: "确认更新?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "是的, 请更新!",
      cancelButtonText: "不, 请删除!",
      closeOnConfirm: false,
      closeOnCancel: false
      },
     function(isConfirm) {
       if (isConfirm) {
       swal("已更新!", "success"
            );
       crc.updateOnClick(closeRestaurant);
          } else {
       swal("已取消!");
          }
    });
  }
  crc.cancelEditing = function(closeRestaurant){
      closeRestaurant.isEditing = false;
      crc.itemEditing = false;
      // cleanEditingSchedules()
  }

  crc.clearSearch = function() {
    crc.search = null;
    crc.search = {};
  }

  crc.startEditing = function(closeRestaurant){
    if(!closeRestaurant.isEditing){
      closeRestaurant.isEditing = true;
      crc.itemEditing = true
    }
      // cleanEditingSchedules()
  }

  crc.resetAddForm = function(){
    crc.newCloseRestaurant={};
  }


  function addCloseRestaurant(){
    if(!crc.newCloseRestaurant.rid || !crc.newCloseRestaurant.start_time ||!crc.newCloseRestaurant.end_time ){

    }else{
      crc.closeRestaurants.push(crc.newCloseRestaurant);
      crc.resetAddForm();
      crc.postCloseRestaurant();
    }
  }









}])
