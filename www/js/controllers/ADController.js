angular.module('MetronicApp').controller('ADController',
['$rootScope', '$scope',  '$http','ADService','$q',
function($rootScope, $scope, $http, ADService,$q) {
  ComponentsDateTimePickers.init();
  var adc = this;
  var ads = ADService;
  adc.height = window.innerHeight*0.9;
      $(document).ready(function() {
        $('#background').click(function() {
          $("#res-pop").css({'visibility': 'hidden'});
          $("#background").css({'visibility': 'hidden'});
        });
      });
      $(document).ready(function(){
           $("#res-pop").css('top', ($(window).height() - $("#res-pop").height())/2 + "px");
           $("#res-pop").css('left', ($(window).width() - $("#res-pop").width())/2 + "px");
         });


//init
adc.getADLists = function(){
  ads.getADList()
  .then((result)=>{
    adc.allLists = result[0];
    adc.scLists = result[1];
    adc.nyLists = result[2];
    adc.rhLists = result[3];
    adc.mkLists = result[4];
    adc.dtLists = result[5];
    adc.miLists = result[6];
 })
  .catch((error)=>{
    console.log(error)
  })
}
adc.getADLists();
  adc.updateRestaurantList = function(){
    setTimeout(function () {
      ads.getRestaurantLists()
       .then((result)=>{
       adc.restaurantLists = result;
      })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }
  adc.updateCloseInformation = function(){
    setTimeout(function () {
      ads.getCloseInfomaiton(adc.newCloseRestaurant.rid)
       .then((result)=>{
       adc.closeInformation = result;
       console.log(result)
       })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }
  adc.updateRestaurantList();
//init end

  adc.getCloseInformation = function(closeRestaurant){
     adc.pop = true;
     adc.name = closeRestaurant.name;
     adc.newCloseRestaurant.rid = closeRestaurant.rid;
     adc.convertRid();
     setTimeout(function(){
       ads.getCloseInfomaiton(closeRestaurant.rid)
       .then((result)=>{
         adc.closeInformation = result;
         adc.popUp();
       })
       .catch((error)=>{
         console.log(error)
       })
     },200)
   }


// update function
  adc.updateOnClick = function(closeInformation){
    ads.updateCloseRestaurant(closeInformation)
    .then(adc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
    adc.cancelEditing(closeInformation);
  }
  adc.confrimUpdate = function(closeInformation){
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
       adc.updateOnClick(closeInformation);
          } else {
       swal("已取消!");
          }
    });
  }
// update function end
// add function
  adc.addOnClick = function(){
    ads.addCloseRestaurant(adc.newCloseRestaurant)
    .then(adc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
   }
   adc.updateSuccess = function(){
     adc.updateRestaurantList();
     swal("已提交!", "success"
          );
   }
   adc.confrimAdd1 = function(){
      if(!adc.newCloseRestaurant.rid||!adc.newCloseRestaurant.start_time||!adc.newCloseRestaurant.end_time){

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
           ads.addCloseRestaurant(adc.newCloseRestaurant)
           .then(adc.updateSuccess())
           .catch(function(error){
             console.log(error);
             swal("");
           })
         //
         //
         adc.resetAddForm();
         adc.updateCloseInformation();
            } else {
         swal("已取消!");
            }
      });
      }
   }
  adc.confrimAdd = function(){
     if(!adc.newCloseRestaurant.rid||!adc.newCloseRestaurant.start_time||!adc.newCloseRestaurant.end_time){

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
        adc.convertRid();
        adc.addOnClick();
        adc.resetAddForm();
        adc.updateCloseInformation();
           } else {
        swal("已取消!");
           }
     });
     }
  }
// add function end
// basic function
  adc.cancelEditing = function(closeInformation){
      closeInformation.isEditing = false;
      adc.itemEditing = false;
      // cleanEditingSchedules()
  }
  adc.clearSearch = function() {
    adc.search = null;
    adc.search = {};
  }
  adc.startEditing = function(closeInformation){
    if(!closeInformation.isEditing){
      closeInformation.isEditing = true;
      adc.itemEditing = true

    }
      // cleanEditingSchedules()
  }
  adc.resetAddForm = function(){
    adc.newCloseRestaurant.rid = adc.newCloseRestaurant.rid;
    adc.newCloseRestaurant.start_time = '';
    adc.newCloseRestaurant.end_time = "";
  }
  adc.convertRid= function(){
    adc.newCloseRestaurant.rid = parseInt(adc.newCloseRestaurant.rid, 10);
  }
  adc.convertBack = function(){
    adc.newCloseRestaurant.rid = adc.newCloseRestaurant.rid.toString();
  }
  adc.search = {};
  adc.SearchOptions = [{
      "optionName": "RID",
      "value": "rid"
    }, {
      "optionName": "Restaurant Name",
      "value": "name"
    }
  ];
  adc.singleSelect = adc.SearchOptions[1].value;
  adc.newCloseRestaurant ={};
  adc.restaurantEditing = false;
  adc.top = true;
  adc.home = false;
  adc.launch = false;
  adc.changetoTop =function(){
    adc.top =true;
    adc.home = false;
    adc.launch = false;
  }
  adc.changetoHome =function(){
    adc.top =false;
    adc.home = true;
    adc.launch = false;
  }
  adc.changetoLaunch =function(){
    adc.top =false;
    adc.home = false;
    adc.launch = true;
  }

// basic function end
}])
