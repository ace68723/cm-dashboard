angular.module('MetronicApp').controller('customServiceScheduleController',
['$rootScope', '$scope',  '$http','customerServiceSchduleService','$q',
function($rootScope, $scope, $http, customerServiceSchduleService,$q) {
  ComponentsDateTimePickers.init();
  var cssc = this;
  var csss = customerServiceSchduleService;
  cssc.height = window.innerHeight*0.9;
  cssc.height2 = window.innerHeight*0.6;
    // cssc.height2 = window.innerHeight*0.6;
  $(document).ready(function() {
    $('#background').click(function() {
      $("#pop-ser-new").css({'visibility': 'hidden'});
      $("#ser-pop").css({'visibility': 'hidden'});
      $("#background").css({'visibility': 'hidden'});
    });
  });
  $(document).ready(function(){
       $("#ser-pop").css('top', ($(window).height() - $("#ser-pop").height())/2 + "px");
       $("#ser-pop").css('left', ($(window).width() - $("#ser-pop").width())/2 + "px");
       $("#pop-ser-new").css('top', ($(window).height() - $("#pop-ser-new").height())/2 + "px");
       $("#pop-ser-new").css('left', ($(window).width() - $("#pop-ser-new").width())/2 + "px");
     });

//init
  cssc.updateCsSchedule = function(){
    setTimeout(function () {
      csss.getcsSchedules()
       .then((result)=>{
       cssc.csSchedules = result;
       console.log(result)
      })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
  }
  cssc.getCsLists = function(){
      cssc.pop = true;
      setTimeout(function(){
        csss.getCustomServiceLists()
        .then((result)=>{
          cssc.csLists = result;
          console.log(result)
        })
        .catch((error)=>{
          console.log(error)
        })
      },200)
  }
  cssc.updateCsSchedule();
  cssc.getThisWeekSchedule = function(cs){
    cssc.newThisWeekSchdule.uid =cs.uid;
    csss.getThisWeekSchedule(cs)
    .then((result)=>{
      cssc.thisWeekSchedules = result;
      cssc.length = cssc.thisWeekSchedules.length;
      console.log(result)
    })
    .catch((error)=>{
      console.log(error)

    })
  }
  cssc.getNextWeekSchedule = function(cs){
    cssc.name = cs.username;
    cssc.uid =cs.uid;
    csss.getNextWeekSchedule(cs)
    .then((result)=>{
      cssc.nextWeekSchedules = result;
      cssc.length2 = cssc.nextWeekSchedules.length
      console.log(result)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  cssc.getThisWeek = function(){
    csss.getThisWeek()
    .then((result)=>{
      cssc.thisWeek = result;
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  cssc.getNextWeek = function(){
    csss.getNextWeek()
    .then((result)=>{
      cssc.nextWeek = result;
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  cssc.getThisWeek();
  cssc.getNextWeek();

//init end

// update function
  cssc.updateOnClick = function(cs){
    csss.updateCsSchedule(cs)
    .then(cssc.updateCsSchedule())
    .catch(function(error){
      console.log(error)
    })
    cssc.cancelEditing(cs);
  }
  cssc.confrimUpdate = function(cs){
    cs.zone = parseInt(cs.zone, 10);
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
       cssc.updateOnClick(cs);
          } else {
       swal("已取消!");
          }
    });
  }
// update function end

// add function
  cssc.addOnClickThisWeek = function(){
    for(i=cssc.length; i<cssc.thisWeekSchedules.length; i++){
     cssc.thisWeekSchedules[i].zone = parseInt(cssc.thisWeekSchedules[i].zone, 10);
      csss.addCsSchedule(cssc.thisWeekSchedules[i])
      .then()
      .catch(function(error){
        console.log(error)
      })
    }
    cssc.updateCsSchedule();
   }
  cssc.addOnClickNextWeek = function(){
     for(i=cssc.length2; i<cssc.nextWeekSchedules.length; i++){
      cssc.nextWeekSchedules[i].zone = parseInt(cssc.nextWeekSchedules[i].zone, 10);
       csss.addCsSchedule(cssc.nextWeekSchedules[i])
       .then()
       .catch(function(error){
         console.log(error)
       })
     }
     cssc.updateCsSchedule();
    }
   cssc.updateSuccess = function(){
     cssc.updateRestaurantList();
     swal("已提交!", "success"
          );
   }
   cssc.confrimAdd1 = function(){
      if(!cssc.newCloseRestaurant.rid||!cssc.newCloseRestaurant.start_time||!cssc.newCloseRestaurant.end_time){

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
           csss.addCloseRestaurant(cssc.newCloseRestaurant)
           .then(cssc.updateSuccess())
           .catch(function(error){
             console.log(error);
             swal("");
           })
         //
         //
         cssc.resetAddForm();
         cssc.updateCloseInformation();
            } else {
         swal("已取消!");
            }
      });
      }
   }
   cssc.confrimAdd = function(){
     if(!cssc.newCloseRestaurant.rid||!cssc.newCloseRestaurant.start_time||!cssc.newCloseRestaurant.end_time){

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
        cssc.convertRid();
        cssc.addOnClick();
        cssc.resetAddForm();
        cssc.updateCloseInformation();
           } else {
        swal("已取消!");
           }
     });
     }
  }
// add function end

// delete function
  cssc.deleteSchedule = function(cs){
    csss.deletedCsSchedule(cs)
    .then(cssc.updateCsSchedule())
    .catch(function(error){
      console.log(error)
    })
  }

// basic function
  cssc.createThisWeekSchedule = function(){
    cssc.thisWeekSchedules.push(cssc.newThisWeekSchdule);
    cssc.newThisWeekSchdule.uid = cssc.uid;
    cssc.newThisWeekSchdule = {
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      zone: ""
    };
  }
  cssc.createNextWeekSchedule = function(){
    cssc.nextWeekSchedules.push(cssc.newNextWeekSchedule);
    cssc.newNextWeekSchedule.uid = cssc.uid;
    cssc.newNextWeekSchedule = {
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      zone: ""
    };
  }
  cssc.cancelEditing = function(cs){
      cs.isEditing = false;
      cssc.itemEditing = false;
      // cleanEditingSchedules()
  }
  cssc.clearSearch = function() {
    cssc.search = null;
    cssc.search = {};
  }
  cssc.startEditing = function(cs){
    if(!cs.isEditing){
      cs.isEditing = true;
      cssc.itemEditing = true

    }
      // cleanEditingSchedules()
  }
  cssc.popSerTable = function(cs){
    var vis = document.getElementById("pop-ser-new");
    vis.style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
  }
  cssc.popServicer = function(cs){
    var vis = document.getElementById("ser-pop");
    vis.style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
  }
  cssc.closePop = function(){
    var vis = document.getElementById("pop-ser-new");
    var vis2 = document.getElementById("ser-pop");
    vis.style.visibility = "hidden";
    vis2.style.visibility = "hidden";
    document.getElementById("background").style.visibility = "hidden";
  }
  cssc.search = {};
  cssc.newThisWeekSchdule ={
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    zone: ""
  }
  cssc.newNextWeekSchedule ={
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    zone: ""
  }
  cssc.areaOptions = [
    {
      name:"SC/RH",
      zone:1
    },{
      name:"DT/MS",
      zone:2
    }
  ]
  cssc.SearchOptions = [
    {
      "optionName": "Name",
      "value": "username"
    }
  ];
  cssc.singleSelect = cssc.SearchOptions[0].value;
  cssc.newCloseRestaurant ={};
  cssc.restaurantEditing = false;
  cssc.itemEditing = false;
// basic function end
}])
