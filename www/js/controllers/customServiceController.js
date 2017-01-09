
angular.module('MetronicApp').controller('customServiceController',
['$rootScope', '$scope',  '$http','customServiceService','$q',
function($rootScope, $scope, $http, customServiceService,$q) {
  var csc = this;
  var css = customServiceService;
  csc.height = window.innerHeight*0.9;
//  css.getQTest();
  csc.search = {};
  csc.SearchOptions = [{
      "optionName": "UID",
      "value": "uid"
    }, {
      "optionName": "Name",
      "value": "username"
    }
  ];
  csc.getCustomServiceLists = function(){
     css.getCustomServiceLists()
     .then((result)=>{
       csc.customServiceLists = result;
       console.log(result)
     })
     .catch((error)=>{
       console.log(error)
     })
  }

  csc.updateCustomServiceSchedule = function(){
    setTimeout(function () {
      css.getCustomServiceSchedules()
       .then((result)=>{
       csc.customServiceSchedules = result;
       })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
   }


  csc.newCustomServiceSchdule ={};

  csc.roleCheck = function(){
    if($rootScope.role == "SETTLE"){
      csc.updateCustomServiceSchedule()

    }else{
        window.location="index.html#/dashboard.html"
    }
  }
  csc.getCustomServiceLists();
  csc.updateCustomServiceSchedule();
  csc.itemEditing = false;
  csc.singleSelect = csc.SearchOptions[1].value;
  csc.DeleteOnClick = function(customServiceSchedule){
    css.deleteCustomServiceSchedule(customServiceSchedule)
    .then((result)=>{
      console.log(result)
      csc.updateCustomServiceSchedule()
    })
    .catch((error)=>{
      console.log(error)
    })
    csc.cancelEditing(customServiceSchedule);
  }
  csc.updateOnClick = function(customServiceSchedule){
    setTimeout(function () {
      css.updateCustomServiceSchedule(customServiceSchedule)
       .then(csc.updateCustomServiceSchedule())
       .catch((error)=>{
         console.log(error)
       })
    }, 200);

    csc.cancelEditing(customServiceSchedule);
  }
  csc.addOnClick = function(){

    css.addCustomServiceSchedule(csc.newCustomServiceSchdule)
    .then(csc.updateCustomServiceSchedule())
    .catch(function(error){
      console.log(error)
    })
   }
  csc.confrimAdd = function(){
    if(!csc.newCustomServiceSchdule.uid||!csc.newCustomServiceSchdule.valid_from||!csc.newCustomServiceSchdule.valid_to||!csc.newCustomServiceSchdule.zone){

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
       csc.convertUID();
       csc.addOnClick();
       csc.convertBack();
          } else {
       swal("已取消!");
          }
    });

  }
  }
  csc.confrimUpdate = function(customServiceSchedule){
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
       csc.updateOnClick(customServiceSchedule);
          } else {
       swal("已取消!");
          }
    });
  }
  csc.confrimDelete = function(customServiceSchedule){
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
       csc.DeleteOnClick(customServiceSchedule);
          } else {
       swal("已撤销!");
          }
    });
  }
  csc.cancelEditing = function(customServiceSchedule){
      customServiceSchedule.isEditing = false;
      csc.itemEditing = false;
      // cleanEditingSchedules()
  }

  csc.clearSearch = function() {
    csc.search = null;
    csc.search = {};
  }

  csc.startEditing = function(customServiceSchedule){
    if(!customServiceSchedule.isEditing){
      customServiceSchedule.isEditing = true;
      csc.itemEditing = true
    }
      // cleanEditingSchedules()
  }

  csc.resetAddForm = function(){
    csc.newCustomServiceSchdule={};
  }
 csc.convertUID= function(){
   csc.newCustomServiceSchdule.uid = parseInt(csc.newCustomServiceSchdule.uid, 10);
 }
 csc.convertBack = function(){
   csc.newCustomServiceSchdule.uid = csc.newCustomServiceSchdule.uid.toString();
 }





}])
