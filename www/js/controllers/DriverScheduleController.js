angular.module('MetronicApp').controller('driverScheduleController',
['$rootScope', '$scope',  '$http','driverScheduleService','$q',
function($rootScope, $scope, $http, driverScheduleService,$q) {
  ComponentsDateTimePickers.init();
  var dsc = this;
  var dss = driverScheduleService;
  dsc.height = window.innerHeight*0.9;
  dsc.height2 = window.innerHeight*0.6;
  $(document).ready(function() {
    $('#background').click(function() {
      $("#pop-dri-new").css({'visibility': 'hidden'});
      $("#dri-pop").css({'visibility': 'hidden'});
      $("#background").css({'visibility': 'hidden'});
    });
  });
  $(document).ready(function(){
       $("#dri-pop").css('top', ($(window).height() - $("#dri-pop").height())/2 + "px");
       $("#dri-pop").css('left', ($(window).width() - $("#dri-pop").width())/2 + "px");
       $("#pop-dri-new").css('top', ($(window).height() - $("#pop-dri-new").height())/2 + "px");
       $("#pop-dri-new").css('left', ($(window).width() - $("#pop-dri-new").width())/2 + "px");
     });

//init
  dsc.updateDriverSchedule = function(){
    setTimeout(function () {
      dss.getDriverSchedules()
       .then((result)=>{
       dsc.driverSchedules = result;
      })
       .catch((error)=>{
         console.log(error)
       })
    }, 200);
  }
  dsc.getDriverLists = function(){
      dsc.pop = true;
      setTimeout(function(){
        dss.getDriverLists()
        .then((result)=>{
          dsc.driverLists = result;
          console.log(result)
        })
        .catch((error)=>{
          console.log(error)
        })
      },200)
  }
  dsc.updateDriverSchedule();
  dsc.getThisWeekSchedule = function(driver){
    dsc.newThisWeekSchdule.driver_id =driver.driver_id;
    dss.getThisWeekSchedule(driver)
    .then((result)=>{
      dsc.thisWeekSchedules = result;
      console.log(result)
      dsc.length = dsc.thisWeekSchedules.length;
    })
    .catch((error)=>{
      console.log(error)

    })
  }
  dsc.getNextWeekSchedule = function(driver){
    dsc.name = driver.driver_name;
    dsc.driver_id =driver.driver_id;
    dss.getNextWeekSchedule(driver)
    .then((result)=>{
      dsc.nextWeekSchedules = result;
      console.log(result)
      dsc.length2 = dsc.nextWeekSchedules.length;
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  dsc.getThisWeek = function(){
    dss.getThisWeek()
    .then((result)=>{
      dsc.thisWeek = result;
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  dsc.getNextWeek = function(){
    dss.getNextWeek()
    .then((result)=>{
      dsc.nextWeek = result;
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  dsc.getThisWeek();
  dsc.getNextWeek();
  dsc.print =function(driver){
    console.log(driver.zone)
    dsc.selected = driver.zone;
  }
//init end

// update function
  dsc.updateOnClick = function(driver){
    dss.updateDriverSchedule(driver)
    .then(dsc.updateDriverSchedule())
    .catch(function(error){
      console.log(error)
    })
    dsc.cancelEditing(driver);
  }
  dsc.confrimUpdate = function(driver){
    driver.zone = parseInt(driver.zone, 10);
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
       dsc.updateOnClick(driver);
          } else {
       swal("已取消!");
          }
    });
  }
// update function end

// add function
  dsc.addOnClickThisWeek = function(){
    for(i=dsc.length; i<dsc.thisWeekSchedules.length; i++){
     dsc.thisWeekSchedules[i].zone = parseInt(dsc.thisWeekSchedules[i].zone, 10);
      dss.addDriverSchedule(dsc.thisWeekSchedules[i])
      .then()
      .catch(function(error){
        console.log(error)
      })
    }
    dsc.updateDriverSchedule();
   }
  dsc.addOnClickNextWeek = function(){
     for(i=dsc.length2; i<dsc.nextWeekSchedules.length; i++){
      dsc.nextWeekSchedules[i].zone = parseInt(dsc.nextWeekSchedules[i].zone, 10);
       dss.addDriverSchedule(dsc.nextWeekSchedules[i])
       .then()
       .catch(function(error){
         console.log(error)
       })
     }
     dsc.updateDriverSchedule();
    }
   dsc.updateSuccess = function(){
     dsc.updateRestaurantList();
     swal("已提交!", "success"
          );
   }
   dsc.confrimAdd1 = function(){
      if(!dsc.newCloseRestaurant.rid||!dsc.newCloseRestaurant.start_time||!dsc.newCloseRestaurant.end_time){

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
           dss.addCloseRestaurant(dsc.newCloseRestaurant)
           .then(dsc.updateSuccess())
           .catch(function(error){
             console.log(error);
             swal("");
           })
         //
         //
         dsc.resetAddForm();
         dsc.updateCloseInformation();
            } else {
         swal("已取消!");
            }
      });
      }
   }
  dsc.confrimAdd = function(){
     if(!dsc.newCloseRestaurant.rid||!dsc.newCloseRestaurant.start_time||!dsc.newCloseRestaurant.end_time){

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
        dsc.convertRid();
        dsc.addOnClick();
        dsc.resetAddForm();
        dsc.updateCloseInformation();
           } else {
        swal("已取消!");
           }
     });
     }
  }
// add function end

// delete function
  dsc.deleteSchedule = function(driver){
    dss.deletedDriverSchedule(driver)
    .then(dsc.updateDriverSchedule())
    .catch(function(error){
      console.log(error)
    })
  }
//delete function

// basic function
  dsc.createThisWeekSchedule = function(){
    dsc.thisWeekSchedules.push(dsc.newThisWeekSchdule);
    dsc.newThisWeekSchdule.driver_id = dsc.driver_id ;
    dsc.newThisWeekSchdule = {
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      zone: ""
    };
  }
  dsc.createNextWeekSchedule = function(){
    dsc.nextWeekSchedules.push(dsc.newNextWeekSchedule);
    dsc.newNextWeekSchedule.driver_id = dsc.driver_id ;
    dsc.newNextWeekSchedule = {
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      zone: ""
    };
  }
  dsc.cancelEditing = function(driver){
      driver.isEditing = false;
      dsc.itemEditing = false;
      // cleanEditingSchedules()
  }
  dsc.clearSearch = function() {
    dsc.search = null;
    dsc.search = {};
  }
  dsc.startEditing = function(driver){
    if(!driver.isEditing){
      driver.isEditing = true;
      dsc.itemEditing = true

    }
      // cleanEditingSchedules()
  }
  dsc.popDriTable = function(driver){
    var vis = document.getElementById("pop-dri-new");
    vis.style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
  }
  dsc.popDriver = function(driver){
    var vis = document.getElementById("dri-pop");
    vis.style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
  }
  dsc.closePop = function(){
    var vis = document.getElementById("pop-dri-new");
    var vis2 = document.getElementById("dri-pop");
    vis.style.visibility = "hidden";
    vis2.style.visibility = "hidden";
    document.getElementById("background").style.visibility = "hidden";
  }
  dsc.search = {};
  dsc.newThisWeekSchdule ={
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    zone: ""
  }
  dsc.newNextWeekSchedule ={
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    zone: ""
  }
  dsc.areaOptions = [
    {
      name:"SC/MH",
      zone:1
    },{
      name:"NY/RH",
      zone:2
    },{
      name:"DT",
      zone:3
    },{
      name:"MI",
      zone:4
    }
  ]
  dsc.SearchOptions = [
    {
      "optionName": "Name",
      "value": "driver_name"
    }
  ];
  dsc.singleSelect = dsc.SearchOptions[0].value;
  dsc.newCloseRestaurant ={};
  dsc.restaurantEditing = false;
  dsc.itemEditing = false;
// basic function end
}])
