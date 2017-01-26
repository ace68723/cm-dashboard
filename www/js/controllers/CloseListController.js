angular.module('MetronicApp').controller('closeListController',
['$rootScope', '$scope',  '$http','closeListService','$q',
function($rootScope, $scope, $http, closeListService,$q) {
  ComponentsDateTimePickers.init();
  var clc = this;
  var cls = closeListService;
  clc.height = window.innerHeight*0.9;
      $(document).ready(function() {
        $('#background').click(function() {
          $("#res-pop").css({'visibility': 'hidden'});
          $("#background").css({'visibility': 'hidden'});
        });
      });

//init
  clc.updateRestaurantList = function(){
    setTimeout(function () {
      cls.getRestaurantLists()
       .then((result)=>{
       clc.restaurantLists = result;
      })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }
  clc.updateCloseInformation = function(){
    setTimeout(function () {
      cls.getCloseInfomaiton(clc.newCloseRestaurant.rid)
       .then((result)=>{
       clc.closeInformation = result;
       console.log(result)
       })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }
  clc.updateRestaurantList();
//init end

  clc.getCloseInformation = function(closeRestaurant){
     clc.pop = true;
     clc.name = closeRestaurant.name;
     clc.newCloseRestaurant.rid = closeRestaurant.rid;
     clc.convertRid();
     setTimeout(function(){
       cls.getCloseInfomaiton(closeRestaurant.rid)
       .then((result)=>{
         clc.closeInformation = result;
         clc.popUp();
       })
       .catch((error)=>{
         console.log(error)
       })
     },200)
   }


// update function
  clc.updateOnClick = function(closeInformation){
    cls.updateCloseRestaurant(closeInformation)
    .then(clc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
    clc.cancelEditing(closeInformation);
  }
  clc.confrimUpdate = function(closeInformation){
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
       clc.updateOnClick(closeInformation);
          } else {
       swal("已取消!");
          }
    });
  }
// update function end
// add function
  clc.addOnClick = function(){
    cls.addCloseRestaurant(clc.newCloseRestaurant)
    .then(clc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
   }
   clc.updateSuccess = function(){
     clc.updateRestaurantList();
     swal("已提交!", "success"
          );
   }
   clc.confrimAdd1 = function(){
      if(!clc.newCloseRestaurant.rid||!clc.newCloseRestaurant.start_time||!clc.newCloseRestaurant.end_time){

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
           cls.addCloseRestaurant(clc.newCloseRestaurant)
           .then(clc.updateSuccess())
           .catch(function(error){
             console.log(error);
             swal("");
           })
         //
         //
         clc.resetAddForm();
         clc.updateCloseInformation();
            } else {
         swal("已取消!");
            }
      });
      }
   }
  clc.confrimAdd = function(){
     if(!clc.newCloseRestaurant.rid||!clc.newCloseRestaurant.start_time||!clc.newCloseRestaurant.end_time){

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
        clc.convertRid();
        clc.addOnClick();
        clc.resetAddForm();
        clc.updateCloseInformation();
           } else {
        swal("已取消!");
           }
     });
     }
  }
// add function end
// basic function
  clc.cancelEditing = function(closeInformation){
      closeInformation.isEditing = false;
      clc.itemEditing = false;
      // cleanEditingSchedules()
  }
  clc.clearSearch = function() {
    clc.search = null;
    clc.search = {};
  }
  clc.startEditing = function(closeInformation){
    if(!closeInformation.isEditing){
      closeInformation.isEditing = true;
      clc.itemEditing = true

    }
      // cleanEditingSchedules()
  }
  clc.resetAddForm = function(){
    clc.newCloseRestaurant.rid = clc.newCloseRestaurant.rid;
    clc.newCloseRestaurant.start_time = '';
    clc.newCloseRestaurant.end_time = "";
  }
  clc.convertRid= function(){
    clc.newCloseRestaurant.rid = parseInt(clc.newCloseRestaurant.rid, 10);
  }
  clc.convertBack = function(){
    clc.newCloseRestaurant.rid = clc.newCloseRestaurant.rid.toString();
  }
  clc.popUp =function(){
    var vis = document.getElementById("res-pop");
    vis.style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
  }
  clc.closePop =function(){
      var vis = document.getElementById("res-pop");
      vis.style.visibility = "hidden";
      document.getElementById("background").style.visibility = "hidden";
   clc.resetAddForm();
  }
  clc.search = {};
  clc.SearchOptions = [{
      "optionName": "RID",
      "value": "rid"
    }, {
      "optionName": "Restaurant Name",
      "value": "name"
    }
  ];
  clc.singleSelect = clc.SearchOptions[1].value;
  clc.newCloseRestaurant ={};
  clc.restaurantEditing = false;
  clc.itemEditing = false;
// basic function end
}])
