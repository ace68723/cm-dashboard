angular.module('MetronicApp').controller('driverScheduleController', ['$rootScope', '$scope', '$http', 'driverScheduleService', '$q',
  function($rootScope, $scope, $http, driverScheduleService, $q) {
    ComponentsDateTimePickers.init();
    var dsc = this;
    var dss = driverScheduleService;
    dsc.height = window.innerHeight * 0.9;
    dsc.height2 = window.innerHeight * 0.6;
    $(document).ready(function() {
      $('#background').click(function() {
        $("#pop-dri-new").css({
          'visibility': 'hidden'
        });
        $("#dri-pop").css({
          'visibility': 'hidden'
        });
        $("#background").css({
          'visibility': 'hidden'
        });
      });
    });
    $(document).ready(function() {
      $("#dri-pop").css('top', ($(window).height() - $("#dri-pop").height()) / 2 + "px");
      $("#dri-pop").css('left', ($(window).width() - $("#dri-pop").width()) / 2 + "px");
      $("#pop-dri-new").css('top', ($(window).height() - $("#pop-dri-new").height()) / 2 + "px");
      $("#pop-dri-new").css('left', ($(window).width() - $("#pop-dri-new").width()) / 2 + "px");
    });
    //init
    dsc.updateDriverSchedule = function() {
      setTimeout(function() {
        dss.getDriverSchedules()
          .then((result) => {
            dsc.driverSchedules = result;
          })
          .catch((error) => {
            console.log(error)
          })
      }, 200);
    }
    dsc.getDriverLists = function() {
      dsc.pop = true;
      setTimeout(function() {
        dss.getDriverLists()
          .then((result) => {
            dsc.driverLists = result;
            console.log(result)
          })
          .catch((error) => {
            console.log(error)
          })
      }, 200)
    }
    dsc.updateDriverSchedule();
    dsc.getThisWeekSchedule = function(driver) {
      dsc.thisDriver = driver;
      dsc.newThisWeekSchdule.driver_id = driver.driver_id;
      dss.getThisWeekSchedule(driver)
        .then((result) => {
          dsc.thisWeekSchedules = result;
          console.log(result)
          dsc.length = dsc.thisWeekSchedules.length;
        })
        .catch((error) => {
          console.log(error)

        })
    }
    dsc.getNextWeekSchedule = function(driver) {
      dsc.name = driver.driver_name;
      dsc.driver_id = driver.driver_id;
      dss.getNextWeekSchedule(driver)
        .then((result) => {
          dsc.nextWeekSchedules = result;
          console.log(result)
          dsc.length2 = dsc.nextWeekSchedules.length;
        })
        .catch((error) => {
          console.log(error)
        })
    }
    dsc.getThisWeek = function() {
      dss.getThisWeek()
        .then((result) => {
          dsc.thisWeek = result;
        })
        .catch((error) => {
          console.log(error)
        })
    }
    dsc.getNextWeek = function() {
      dss.getNextWeek()
        .then((result) => {
          dsc.nextWeek = result;
        })
        .catch((error) => {
          console.log(error)
        })
    }
    dsc.getThisWeek();
    dsc.getNextWeek();
    //init end

    // update function
    dsc.updateOnClick = function(driver) {
      dss.updateDriverSchedule(driver)
        .then(dsc.updateDriverSchedule())
        .catch(function(error) {
          console.log(error)
        })
      dsc.cancelEditing(driver);
    }
    dsc.confirmUpdate = function(driver) {
      dsc.convertZone(driver)
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
            swal("已更新!", "success");
            dsc.updateOnClick(driver);
          } else {
            swal("已取消!");
          }
        });
    }
    // update function end

    // add function
    dsc.addOnClickThisWeek = function() {
      for (i = dsc.length; i < dsc.thisWeekSchedules.length; i++) {
        if (dsc.thisWeekSchedules[i].zone == "SC") {
          dsc.thisWeekSchedules[i].zone = 1;
        } else if (dsc.thisWeekSchedules[i].zone == "DT") {
          dsc.thisWeekSchedules[i].zone = 3;
        } else if (dsc.thisWeekSchedules[i].zone == "NY") {
          dsc.thisWeekSchedules[i].zone = 2;
        } else if (dsc.thisWeekSchedules[i].zone == "MI") {
          dsc.thisWeekSchedules[i].zone = 4;
        } else if (dsc.thisWeekSchedules[i].zone == "MH") {
          dsc.thisWeekSchedules[i].zone = 5;
        } else if (dsc.thisWeekSchedules[i].zone == "RH") {
          dsc.thisWeekSchedules[i].zone = 6;
        }
        dss.addDriverSchedule(dsc.thisWeekSchedules[i])
          .then(dsc.length = dsc.thisWeekSchedules.length)
          .catch(function(error) {
            console.log(error)
          })
      }
      dsc.updateDriverSchedule();
    }
    dsc.addOnClickNextWeek = function() {
      for (i = dsc.length2; i < dsc.nextWeekSchedules.length; i++) {
        if (dsc.nextWeekSchedules[i].zone == "SC/MH") {
          dsc.nextWeekSchedules[i].zone = 1;
        } else if (dsc.nextWeekSchedules[i].zone == "DT") {
          dsc.nextWeekSchedules[i].zone = 3;
        } else if (dsc.nextWeekSchedules[i].zone == "NY/RH") {
          dsc.nextWeekSchedules[i].zone = 2;
        } else if (dsc.nextWeekSchedules[i].zone == "MI") {
          dsc.nextWeekSchedules[i].zone = 4;
        } else if (dsc.nextWeekSchedules[i].zone == "MH") {
          dsc.nextWeekSchedules[i].zone = 5;
        } else if (dsc.nextWeekSchedules[i].zone == "RH") {
          dsc.nextWeekSchedules[i].zone = 6;
        }
        dss.addDriverSchedule(dsc.nextWeekSchedules[i])
          .then(dsc.length2 = dsc.nextWeekSchedules.length)
          .catch(function(error) {
            console.log(error)
          })
      }
      dsc.updateDriverSchedule();
    }
    dsc.confrimAddThis = function() {
      if (!dsc.thisWeekSchedules) {} else {
        swal({
            title: "确认添加本周班表?",
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
              swal("已提交!", "success");
              dsc.addOnClickThisWeek();
              dsc.getThisWeekSchedule(dsc.thisDriver);
            } else {
              swal("已取消!");
            }
          });
      }
    };
    dsc.confrimAddNext = function() {
      if (!dsc.nextWeekSchedules) {

      } else {
        swal({
            title: "确认添加下周班表?",
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
              swal("已提交!", "success");
              dsc.addOnClickNextWeek();
              dsc.getNextWeekSchedule(dsc.thisDriver);
            } else {
              swal("已取消!");
            }
          });
      }
    };
    // add function end

    // delete function
    dsc.deleteSchedule = function(driver) {
      dss.deletedDriverSchedule(driver)
        .then(dsc.updateDriverSchedule())
        .catch(function(error) {
          console.log(error);
        });
    };
    //delete function

    // basic function
    dsc.createThisWeekSchedule = function() {
      dsc.thisWeekSchedules.push(dsc.newThisWeekSchdule);
      dsc.newThisWeekSchdule.driver_id = dsc.driver_id;
      dsc.newThisWeekSchdule = {
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        zone: ""
      };
    };
    dsc.createNextWeekSchedule = function() {
      dsc.nextWeekSchedules.push(dsc.newNextWeekSchedule);
      dsc.newNextWeekSchedule.driver_id = dsc.driver_id;
      dsc.newNextWeekSchedule = {
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        zone: ""
      };
    };
    dsc.cancelEditing = function(driver) {
      driver.isEditing = false;
      dsc.itemEditing = false;
      // cleanEditingSchedules()
    };
    dsc.clearSearch = function() {
      dsc.search = null;
      dsc.search = {};
    };
    dsc.startEditing = function(driver) {
      if (!driver.isEditing) {
        driver.isEditing = true;
        dsc.itemEditing = true;

      }
      // cleanEditingSchedules()
    };
    dsc.popDriTable = function(driver) {
      var vis = document.getElementById("pop-dri-new");
      vis.style.visibility = "visible";
      document.getElementById("background").style.visibility = "visible";
    };
    dsc.popDriver = function(driver) {
      var vis = document.getElementById("dri-pop");
      vis.style.visibility = "visible";
      document.getElementById("background").style.visibility = "visible";
    };
    dsc.closePop = function() {
      var vis = document.getElementById("pop-dri-new");
      var vis2 = document.getElementById("dri-pop");
      vis.style.visibility = "hidden";
      vis2.style.visibility = "hidden";
      document.getElementById("background").style.visibility = "hidden";
    };
    dsc.search = {};
    dsc.newThisWeekSchdule = {
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      zone: "NY"
    };
    dsc.newNextWeekSchedule = {
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      zone: ""
    };
    dsc.areaOptions = [{
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
    dsc.convertZone = function(driver) {
      if (driver.zone == "SC") {
        driver.zone = 1;
      } else if (driver.zone == "DT") {
        driver.zone = 3;
      } else if (driver.zone == "NY") {
        driver.zone = 2;
      } else if (driver.zone == "MI") {
        driver.zone = 4;
      } else if (driver.zone == "MH") {
        driver.zone = 5;
      } else if (driver.zone == "RH") {
        driver.zone = 6;
      }
    };
    dsc.SearchOptions = [{
      "optionName": "Name",
      "value": "driver_name"
    }];
    dsc.singleSelect = dsc.SearchOptions[0].value;
    dsc.newCloseRestaurant = {};
    dsc.restaurantEditing = false;
    dsc.itemEditing = false;
    // basic function end
  }
]);
