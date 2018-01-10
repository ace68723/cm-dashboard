angular.module('MetronicApp').controller('closeListController',
['$rootScope', '$scope',  '$http','closeListService','$q',
function($rootScope, $scope, $http, closeListService,$q) {
  ComponentsDateTimePickers.init();
// init status
  var clc = this;
  var cls = closeListService;
  clc.details = false;
  clc.add = false;
  clc.detailEditing = false;
  clc.finance = false;
  clc.financeEditing = false;
  clc.close = false;
  clc.lateNight = false;
  clc.lateNightEditing = false;
  clc.new = false;
  clc.newCloseRestaurant ={};
  clc.restaurantEditing = false;
  clc.itemEditing = false;
// init status end
  clc.height = window.innerHeight*0.9;
      $(document).ready(function() {
        $('#background').click(function() {
          $("#res-pop").css({'visibility': 'hidden'});
          $("#background").css({'visibility': 'hidden'});
          $("#dri-pop").css({
            'visibility': 'hidden'
          });
          clc.details = false;
          clc.detailEditing = false;
          clc.finance = false;
          clc.financeEditing = false;
          clc.close = false;
          clc.lateNight = false;
          clc.new = false;
          clc.add = false;
          clc.newLateNightInfo = [{
            rid : "",
            etime : "",
            stime : "",
            weekday : "",
          }];
        });
      });
      $(document).ready(function(){
        $("#dri-pop").css('top', ($(window).height() - $("#dri-pop").height()) / 2 + "px");
        $("#dri-pop").css('left', ($(window).width() - $("#dri-pop").width()) / 2 + "px");
        $("#res-pop").css('top', ($(window).height() - $("#res-pop").height())/2 + "px");
        $("#res-pop").css('left', ($(window).width() - $("#res-pop").width())/2 + "px");
         });

//夜宵
  clc.newLateNightInfo = [{
    rid : "",
    etime : "",
    stime : "",
    weekday : "",
  }];
  clc.getLateNight = function(closeRestaurant){
        clc.pop = true;
        clc.name = closeRestaurant.name;
        closeRestaurant.rid = parseInt(closeRestaurant.rid, 10);
        setTimeout(function(){
          cls.getLateNight(closeRestaurant.rid)
          .then((result)=>{
            clc.lateNightInformation = result.data.ea_data;
            console.log(clc.lateNightInformation);
          })
          .catch((error) => {
            console.log(error);
          });
        },200);
  };
  clc.addLateNight = function(lateNightinfo) {
    lateNightinfo.rid = parseInt(lateNightinfo.rid, 10);
    lateNightinfo.weekday = parseInt(lateNightinfo.weekday, 10);
    cls.addLateNight(lateNightinfo)
    .then(clc.getLateNight(lateNightinfo)
     )
    .catch((error)=>{
      console.log(error);
    });
    clc.newLateNightInfo = [{
      rid : "",
      etime : "",
      stime : "",
      weekday : "",
    }];
  }
  clc.editLateNight = function(lateNightinfo) {
    cls.editLateNight(lateNightinfo)
    .then(clc.getLateNight(lateNightinfo))
    .catch((error)=>{
      console.log(error);
    });

  }
//夜宵结束

//财务
clc.getResDetailFinance = function(closeRestaurant) {
     clc.pop = true;
     closeRestaurant.rid = parseInt(closeRestaurant.rid, 10);
     setTimeout(function(){
       cls.getResDetailFinance(closeRestaurant.rid)
       .then((result)=>{
         clc.restaurantDetailFinance = result.data.eo_data;
         console.log(clc.restaurantDetailFinance);
       })
       .catch((error)=>{
         console.log(error);
       });
     },200);
};
clc.editResDetailFinance = function(){
  clc.restaurantDetailFinance.rate = parseInt(clc.restaurantDetailFinance.rate,10);
  cls.editResDetailFinance(clc.restaurantDetailFinance)
  .then(clc.getResDetailFinance(clc.restaurantDetailFinance))
  .catch(function(error){
    console.log(error);
  });
};
//财务结束
//商家详细信息
clc.getResDetail = function(closeRestaurant){
    clc.pop = true;
    closeRestaurant.rid = parseInt(closeRestaurant.rid, 10);
    setTimeout(function(){
      cls.getResDetail(closeRestaurant.rid)
      .then((result)=>{
        console.log(result)
        clc.restaurantDetail = result.data.eo_data;
        _.forEach(clc.restaurantDetail, function() {
          if (clc.restaurantDetail.area == 1) {
            clc.restaurantDetail.zone = "SC";
          } else if (clc.restaurantDetail.area == 6) {
            clc.restaurantDetail.zone =  "DT";
          } else if (clc.restaurantDetail.area == 2) {
            clc.restaurantDetail.zone = "NY";
          } else if (clc.restaurantDetail.area == 10) {
            clc.restaurantDetail.zone = "MI";
          } else if (clc.restaurantDetail.area == 4) {
            clc.restaurantDetail.zone =  "MH";
          } else if (clc.restaurantDetail.area == 3) {
            clc.restaurantDetail.zone ="RH" ;
          }
        });
      })
      .catch((error)=>{
        console.log(error);
      });
    },200);

    console.log(clc.restaurantDetail)
  };
  clc.editResDetail = function(){
    if (clc.restaurantDetail.area == "SC") {
      clc.restaurantDetail.area = 1;
    } else if (clc.restaurantDetail.area == "DT") {
      clc.restaurantDetail.area = 6;
    } else if (clc.restaurantDetail.area == "NY") {
      clc.restaurantDetail.area = 2;
    } else if (clc.restaurantDetail.area == "MI") {
      clc.restaurantDetail.area = 10;
    } else if (clc.restaurantDetail.area == "MH") {
      clc.restaurantDetail.area = 4;
    } else if (clc.restaurantDetail.area == "RH") {
      clc.restaurantDetail.area = 3;
    }
    cls.editResDetail(clc.restaurantDetail)
    .then(clc.getResDetail(clc.restaurantDetail))
    .catch(function(error){
      console.log(error);
    });
    clc.detailEditing = false;
    clc.financeEditing = false;
  };
//商家详细信息结束
//init
  clc.updateRestaurantList = function(){
    setTimeout(function () {
      cls.getRestaurantLists()
       .then((result)=>{
       clc.restaurantLists = result;
      })
       .catch((error)=>{
         console.log(error);
       });
    }, 200);
  };
  clc.updateCloseInformation = function(){
    setTimeout(function () {
      cls.getCloseInfomaiton(clc.newCloseRestaurant.rid)
       .then((result)=>{
       clc.closeInformation = result;
       console.log(result);
       })
       .catch((error)=>{
         console.log(error);
       });
    }, 200);
  };
  clc.updateRestaurantList();
//init end
//get info
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






//get info end


// update function


  clc.updateOnClick = function(closeInformation){
    cls.updateCloseRestaurant(closeInformation)
    .then(clc.updateRestaurantList())
    .catch(function(error){
      console.log(error);
    });
    clc.cancelEditing(closeInformation);
  };
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
  };
// update function end
// add function
  clc.addOnClick = function(){
    cls.addCloseRestaurant(clc.newCloseRestaurant)
    .then(clc.updateRestaurantList())
    .catch(function(error){
      console.log(error);
    });
  };
   clc.updateSuccess = function(){
     clc.updateRestaurantList();
     swal("已提交!", "success"
          );
   };
   clc.confrimAdd1 = function() {
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
  };
  clc.addNewRestaurant = function(){
    if (clc.newRestaurant.area == "SC") {
      clc.newRestaurant.area = 1;
    } else if (clc.newRestaurant.area == "DT") {
      clc.newRestaurant.area = 3;
    } else if (clc.newRestaurant.area == "NY") {
      clc.newRestaurant.area = 2;
    } else if (clc.newRestaurant.area == "MI") {
      clc.newRestaurant.area = 4;
    } else if (clc.newRestaurant.area == "MH") {
      clc.newRestaurant.area = 5;
    } else if (clc.newRestaurant.area == "RH") {
      clc.newRestaurant.area = 6;
    }
   cls.addNewRestaurant(clc.newRestaurant)
   .then(clc.updateRestaurantList())
   .catch(function(error){
    console.log(error);
  });
  };

// add function end
// basic function
  clc.newRestaurant = {
      "name": "",
      "desc": "",
      "area": parseInt("", 10),
      "logo_id": parseInt("", 10),
      "postal": "",
      "tel1": "",
      "tel2": "",
      "province": "1",
      "prvn": "ON",
      "addr": "",
      "apt_no": "",
      "start_amount": 0,
      "mob_banner": "",
      "status": 0,
      "rate":parseInt("", 10),
      "fbid": parseInt("", 10),
      "bname":"",
      "owner":parseInt("", 10),
      "email":"",
      "bank_name":"",
      "bank_instit": "",
      "bank_account":"",
      "comment":"",
      "pay_method":"",
      "pay_cycle":""
  };
  clc.cancelEditing = function(closeInformation){
      closeInformation.isEditing = false;
      clc.itemEditing = false;
      clc.details = false;
      clc.detailEditing = false;
      clc.finance = false;
      clc.financeEditing = false;
      clc.close = false;
      clc.lateNight = false;
      clc.new = false;
      clc.add = false;
      // cleanEditingSchedules()
  };
  clc.clearSearch = function() {
    clc.search = null;
    clc.search = {};
  };
  clc.startEditing = function(closeInformation){
    if(!closeInformation.isEditing){
      closeInformation.isEditing = true;
      clc.itemEditing = true;

  }
      // cleanEditingSchedules()
  };
  clc.resetAddForm = function(){
    clc.newCloseRestaurant.rid = clc.newCloseRestaurant.rid;
    clc.newCloseRestaurant.start_time = '';
    clc.newCloseRestaurant.end_time = "";
  };
  clc.convertRid= function(){
    clc.newCloseRestaurant.rid = parseInt(clc.newCloseRestaurant.rid, 10);
  };
  clc.convertRid= function(){
    clc.newCloseRestaurant.rid = parseInt(clc.newCloseRestaurant.rid, 10);
  };
  clc.convertBack = function(){
    clc.newCloseRestaurant.rid = clc.newCloseRestaurant.rid.toString();
  };
  clc.popUp =function(){
    var vis = document.getElementById("res-pop");
    vis.style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
  };
  clc.closePop =function(){
      var vis = document.getElementById("res-pop");
      var vis2 = document.getElementById("dri-pop");
      vis.style.visibility = "hidden";
      vis2.style.visibility = "hidden";
      document.getElementById("background").style.visibility = "hidden";
      clc.resetAddForm();
      clc.details = false;
      clc.detailEditing = false;
      clc.finance = false;
      clc.financeEditing = false;
      clc.close = false;
      clc.latenight = false;
      clc.new = false;
   console.log(clc.details);
  };
  clc.popLarge = function() {
    var vis = document.getElementById("dri-pop");
    vis.style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
  };
  clc.search = {};
  clc.SearchOptions = [{
      "optionName": "RID",
      "value": "rid"
    }, {
      "optionName": "Restaurant Name",
      "value": "name"
    }
  ];
  clc.startEditing = function(lateNightinfo) {
   if (!lateNightinfo.isEditing) {
    lateNightinfo.isEditing = true;
     }
  };
  clc.cancelEditing = function(lateNightinfo) {
    lateNightinfo.isEditing = false;
  };
  clc.singleSelect = clc.SearchOptions[1].value;
  clc.areaOptions = [{
      name: "SC",
      zone: 1
    }, {
      name: "NY",
      zone: 2
    }, {
      name: "DT",
      zone: 3
    }, {
      name: "MI",
      zone: 4
    },
    {
      name: "MH",
      zone: 5
    },
    {
      name: "RH",
      zone: 6
    }
  ];
// basic function end
}]);
