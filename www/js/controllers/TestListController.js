angular.module('MetronicApp').controller('testListController',
['$rootScope', '$scope',  '$http','testListService','$q',
function($rootScope, $scope, $http, testListService,$q) {

  var tlc = this;
  var tls = testListService;
  tlc.height = window.innerHeight*0.9;
//  tls.getQTest();
  tlc.search = {};
  tlc.SearchOptions = [{
      "optionName": "RID",
      "value": "rid"
    }, {
      "optionName": "Restaurant Name",
      "value": "name"
    }
  ];
  tlc.popUp =function(){
    var vis = document.getElementById("res-pop");
    vis.style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
    document.getElementById("close").style.visibility = "visible";
  }
  tlc.closePop =function()
    {
      var vis = document.getElementById("res-pop");
      vis.style.visibility = "hidden";
      document.getElementById("background").style.visibility = "hidden";
      document.getElementById("close").style.visibility = "hidden";
    }

  tlc.updateRestaurantList = function(){
    setTimeout(function () {
      tls.getRestaurantLists()
       .then((result)=>{
       tlc.restaurantLists = result;
       console.log(result)
       })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }

   tlc.getCloseInformation = function(closeRestaurant){
     tlc.pop = true;
     tlc.name = closeRestaurant.name;
     tlc.newCloseRestaurant.rid = closeRestaurant.rid;

     setTimeout(function(){
       tls.getCloseInfomaiton(closeRestaurant)
       .then((result)=>{
         tlc.closeInformation = result;
         console.log(result)
         tlc.popUp();
       })
       .catch((error)=>{
         console.log(error)
       })
     },200)
   }
  tlc.roleCheck = function(){
    if($rootScope.role == "SETTLE"){
      tlc.updateRestaurantList()

    }else{
        window.location="index.html#/dashboard.html"
    }
  }
  tlc.updateRestaurantList();

  tlc.restaurantEditing = false;
  tlc.itemEditing = false;
  tlc.singleSelect = tlc.SearchOptions[0].value;
  tlc.closeRestaurants = tls.closeRestaurants;
  tlc.postCloseRestaurant = tls.addCloseRestaurant;
  tlc.newCloseRestaurant ={};
  tlc.updateOnClick = function(closeInformation){
    tls.updateCloseRestaurant(closeInformation)
    .then(tlc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
    tlc.cancelEditing(closeInformation);
  }

  tlc.addOnClick = function(){
    tls.addCloseRestaurant(tlc.newCloseRestaurant)
    .then(tlc.updateRestaurantList())
    .catch(function(error){
      console.log(error)
    })
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
        tlc.addOnClick();
        tlc.resetAddForm();
        tlc.updateRestaurantList();
           } else {
        swal("已取消!");
           }
     });
     }
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
    tlc.newCloseRestaurant={};
  }
  tlc.openPopup = function (size,eo_data) {
    var modalInstance = $modal.open(
    {
        templateUrl: 'views/orderChange.html',
        controller: 'popUpCtrl as puc',
        size: size,
        resolve:
        {
            data: function()
            {
                return eo_data;
            }
        }
    });

    modalInstance.result.then(function()
    {
      // promise 成功完成后call get init 刷新数据
      dashboardService.get_init();
      // console.log("1");
    }, function()
    {
        $log.info('Modal dismissed at: ' + new Date());
    });
  }
}])
