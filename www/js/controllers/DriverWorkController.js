
angular.module('MetronicApp').controller('driverWorkController',
['$rootScope', '$scope',  '$http','driverWorkService','$q','$modal','dashboardService',
function($rootScope, $scope, $http, driverWorkService,$q,$modal,dashboardService) {
  var dwc = this;
  var dws = driverWorkService;
  dwc.height = window.innerHeight*0.9;
//  dws.getQTest();
  dwc.search = {};
  dwc.SearchOptions = [{
      "optionName": "DriverID",
      "value": "driver_id"
    }, {
      "optionName": "Name",
      "value": "driver_name"
    }
  ];
  dwc.getDriverScheduleLists = function(){
     dws.getDriverLists()
     .then((result)=>{
       dwc.driverLists = result;
       console.log(dwc.driverLists)
     })
     .catch((error)=>{
       console.log(error)
     })
  }

  dwc.updateDriverSchedule = function(){
    setTimeout(function () {
      dws.getDriverSchedules()
       .then((result)=>{
       dwc.driverSchedules = result;
       })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }


  dwc.newDriverSchedule ={};

  dwc.roleCheck = function(){
    if($rootScope.role == "SETTLE"){
      dwc.updateDriverSchedule()

    }else{
        window.location="index.html#/dashboard.html"
    }
  }
  dwc.roleCheck();
  dwc.getDriverScheduleLists();
  dwc.updateDriverSchedule();
  dwc.itemEditing = false;
  dwc.singleSelect = dwc.SearchOptions[0].value;
  dwc.DeleteOnClick = function(driverSchdule){
    dws.deletedDriverSchedule(driverSchdule)
    .then((result)=>{
      console.log(result)
      dwc.updateDriverSchedule()
    })
    .catch((error)=>{
      console.log(error)
    })
    dwc.cancelEditing(driverSchdule);
  }
  dwc.updateOnClick = function(driverSchdule){
    setTimeout(function () {
      dws.updateDriverSchedule(driverSchdule)
       .then(dwc.updateDriverSchedule())
       .catch((error)=>{
         console.log(error)
       })
    }, 200);

    dwc.cancelEditing(driverSchdule);
  }
  dwc.addOnClick = function(){

    dws.addDriverSchedule(dwc.newDriverSchedule)
    .then(dwc.updateDriverSchedule())
    .catch(function(error){
      console.log(error)
    })
   }
  dwc.confrimAdd = function(){
    if(!dwc.newDriverSchedule.driver_id||!dwc.newDriverSchedule.valid_from||!dwc.newDriverSchedule.valid_to){

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
       dwc.convertDriverID();
       dwc.convertZone();
       dwc.addOnClick();
             dwc.convertBack();
          } else {
       swal("已取消!");
          }
    });

  }
  }
  dwc.confrimUpdate = function(driverSchdule){
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
      console.log(driverSchdule.zone)
      dwc.convertZone();
      dwc.changeZone(driverSchdule);
      dwc.updateOnClick(driverSchdule);
      dwc.updateDriverSchedule()

          } else {
       swal("已取消!");
          }
    });
  }
  dwc.confrimDelete = function(driverSchdule){
    swal({
      title: "确认更新?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "是的, 请删除!",
      cancelButtonText: "不, 请撤销!",
      closeOnConfirm: false,
      closeOnCancel: false
      },
     function(isConfirm) {
       if (isConfirm) {
       swal("已删除!", "success"
            );
       dwc.DeleteOnClick(driverSchdule);
       dwc.updateDriverSchedule()
          } else {
       swal("已撤销!");
          }
    });
  }
  dwc.cancelEditing = function(driverSchdule){
      driverSchdule.isEditing = false;
      dwc.itemEditing = false;
      // cleanEditingSchedules()
  }

  dwc.clearSearch = function() {
    dwc.search = null;
    dwc.search = {};
  }

  dwc.startEditing = function(driverSchdule){
    if(!driverSchdule.isEditing){
      driverSchdule.isEditing = true;
      dwc.itemEditing = true
    }
      // cleanEditingSchedules()
  }

  dwc.resetAddForm = function(){
    dwc.newDriverSchedule= {};
}
 dwc.convertDriverID = function(){
   dwc.newDriverSchedule.driver_id = parseInt(dwc.newDriverSchedule.driver_id, 10);
 }
 dwc.convertZone = function(){
   dwc.newDriverSchedule.zone = parseInt(dwc.newDriverSchedule.zone, 10);
   dwc.driver.zone = parseInt(dwc.driver.zone, 10);
 }
 dwc.convertBack = function(){
   dwc.newDriverSchedule.zone = dwc.newDriverSchedule.zone.toString();
   dwc.newDriverSchedule.driver_id =  dwc.newDriverSchedule.driver_id.toString();
 }
 dwc.areaOptions = [

   {
     name:"SC/MH",
     zone:1
   },{
     name:"NY/RH",
     zone:2
   },
   {
     name:"DT",
     zone:3
   },
   {
     name:"MI",
     zone:4
   }

 ]
 dwc.driver={};
 dwc.changeZone = function(driverSchdule){
   console.log(driverSchdule.zone)
   driverSchdule.zone = dwc.driver.zone;
 }
 
 dwc.openPopup = function (size,eo_data) {
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
