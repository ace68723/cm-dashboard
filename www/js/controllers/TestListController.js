angular.module('MetronicApp').controller('testListController',
['$rootScope', '$scope',  '$http','testListService','$q',
function($rootScope, $scope, $http, testListService,$q) {
  ComponentsDateTimePickers.init();
  var tlc = this;
  var tls = testListService;
  tlc.height = window.innerHeight*0.9;
      $(document).ready(function() {
        $('#background').click(function() {
          $("#res-pop").css({'visibility': 'hidden'});
          $("#background").css({'visibility': 'hidden'});
        });
      });
//  role check
  tlc.roleCheck = function(){
    if($rootScope.role == "SETTLE"){
      tlc.updateRestaurantList()
        }else{
      window.location="index.html#/dashboard.html"
      }
    }
//  role check end
//init
  tlc.updateRestaurantList = function(){
    setTimeout(function () {
      tls.getRestaurantLists()
       .then((result)=>{
       tlc.restaurantLists = result;
      })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }
  tlc.updateCloseInformation = function(){
    setTimeout(function () {
      tls.getCloseInfomaiton(tlc.newCloseRestaurant.rid)
       .then((result)=>{
       tlc.closeInformation = result;
       console.log(result)
       })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }
  tlc.updateRestaurantList();
  tlc.roleCheck();
//init end

  tlc.getCloseInformation = function(closeRestaurant){
     tlc.pop = true;
     tlc.name = closeRestaurant.name;
     tlc.newCloseRestaurant.rid = closeRestaurant.rid;
     tlc.convertRid();
     setTimeout(function(){
       tls.getCloseInfomaiton(closeRestaurant.rid)
       .then((result)=>{
         tlc.closeInformation = result;
         tlc.popUp();
       })
       .catch((error)=>{
         console.log(error)
       })
     },200)
   }


// update function
  tlc.updateOnClick = function(closeInformation){
    tls.updateCloseRestaurant(closeInformation)
    .then(tlc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
    tlc.cancelEditing(closeInformation);
  }
  tlc.confrimUpdate = function(closeInformation){
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
       tlc.updateOnClick(closeInformation);
          } else {
       swal("已取消!");
          }
    });
  }
// update function end
// add function
  tlc.addOnClick = function(){
    tls.addCloseRestaurant(tlc.newCloseRestaurant)
    .then(tlc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
   }
   tlc.updateSuccess = function(){
     tlc.updateRestaurantList();
     swal("已提交!", "success"
          );
   }
   tlc.confrimAdd1 = function(){
      if(!tlc.newCloseRestaurant.rid||!tlc.newCloseRestaurant.start_time||!tlc.newCloseRestaurant.end_time){

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
           tls.addCloseRestaurant(tlc.newCloseRestaurant)
           .then(tlc.updateSuccess())
           .catch(function(error){
             console.log(error);
             swal("");
           })
         //
         //
         tlc.resetAddForm();
         tlc.updateCloseInformation();
            } else {
         swal("已取消!");
            }
      });
      }
   }
  tlc.confrimAdd = function(){
     if(!tlc.newCloseRestaurant.rid||!tlc.newCloseRestaurant.start_time||!tlc.newCloseRestaurant.end_time){

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
        tlc.convertRid();
        tlc.addOnClick();
        tlc.resetAddForm();
        tlc.updateCloseInformation();
           } else {
        swal("已取消!");
           }
     });
     }
  }
// add function end
// basic function
  tlc.cancelEditing = function(closeInformation){
      closeInformation.isEditing = false;
      tlc.itemEditing = false;
      // cleanEditingSchedules()
  }
  tlc.clearSearch = function() {
    tlc.search = null;
    tlc.search = {};
  }
  tlc.startEditing = function(closeInformation){
    if(!closeInformation.isEditing){
      closeInformation.isEditing = true;
      tlc.itemEditing = true

    }
      // cleanEditingSchedules()
  }
  tlc.resetAddForm = function(){
    tlc.newCloseRestaurant.rid = tlc.newCloseRestaurant.rid;
    tlc.newCloseRestaurant.start_time = '';
    tlc.newCloseRestaurant.end_time = "";
  }
  tlc.convertRid= function(){
    tlc.newCloseRestaurant.rid = parseInt(tlc.newCloseRestaurant.rid, 10);
  }
  tlc.convertBack = function(){
    tlc.newCloseRestaurant.rid = tlc.newCloseRestaurant.rid.toString();
  }
  tlc.popUp =function(){
    var vis = document.getElementById("res-pop");
    vis.style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
  }
  tlc.closePop =function(){
      var vis = document.getElementById("res-pop");
      vis.style.visibility = "hidden";
      document.getElementById("background").style.visibility = "hidden";
   tlc.resetAddForm();
  }
  tlc.search = {};
  tlc.SearchOptions = [{
      "optionName": "RID",
      "value": "rid"
    }, {
      "optionName": "Restaurant Name",
      "value": "name"
    }
  ];
  tlc.singleSelect = tlc.SearchOptions[1].value;
  tlc.newCloseRestaurant ={};
  tlc.restaurantEditing = false;
  tlc.itemEditing = false;
// basic function end
}])
