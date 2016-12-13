/* Setup blank page controller */
angular.module('MetronicApp').controller('DriverScheduleController',
['$rootScope', '$scope', 'settings', 'DriverScheduleService',
function($rootScope, $scope, settings, DriverScheduleService) {
  var dsc = this;
  var dss = DriverScheduleService;

  // page init
    $scope.$on('$viewContentLoaded', function() {
      // initialize core components
      App.initAjax();
      // set default layout mode
      $rootScope.settings.layout.pageContentWhite = true;
      $rootScope.settings.layout.pageBodySolid = false;
      $rootScope.settings.layout.pageSidebarClosed = true;
  });
  // page init

  //get data from DriverScheduleService
    dsc.initDriverList    = dss.getInitDriverList();
    dsc.areaList          = dss.getAreaList().data;
    // !important for test getDriverList() getInitDriverList()
    dsc.drivers           = dss.getDriverList();//driver data
    dsc.week              = dss.getWeekList();
    dsc.areas             = dss.getAreaList(); // area config settings
    const driverOptions   = dss.getDriverOptions();
    const areaOptions     = dss.getAreaOptions();
    const dateOptions     = dss.getDateOptions();

    console.log(dsc.drivers);
  //get data from DriverScheduleService end

  // selecttions config settings

    const driverDefaultOption = driverOptions.defaultOption;
    dsc.driverOptions         = driverOptions.data;

    const areaDefaultOption = areaOptions.defaultOption;
    dsc.areaOptions         = areaOptions.data;

    const dateDefaultOption = dateOptions.defaultOption;
    dsc.dateOptions         = dateOptions.data;

    function setDefaultSelection () {
      driverDefaultSelecttionIndex = _.findIndex(dsc.driverOptions, { 'optionName' : driverDefaultOption})
      if(driverDefaultSelecttionIndex !== -1){
        dsc.driverSelection = dsc.driverOptions[driverDefaultSelecttionIndex].value;
      }

      areaDefaultSelectionIndex = _.findIndex(dsc.areaOptions, { 'optionName' : areaDefaultOption})
      if(areaDefaultSelectionIndex !== -1){
        dsc.areaSelection = dsc.areaOptions[areaDefaultSelectionIndex].value;
      }

      dateDefaultSelectionIndex = _.findIndex(dsc.dateOptions, { 'optionName':dateDefaultOption})
      if(dateDefaultSelectionIndex !== -1){
        dsc.dateSelection = dsc.dateOptions[dateDefaultSelectionIndex].value;
      }
    }

    setDefaultSelection()

    dsc.clearFilter = function () {
      setDefaultSelection()
      dsc.search = {};
    }
  // selecttions config settings end

  dsc.editSchedule = function(driver){
    if(!driver.isEditing){
      driver.isEditing = true;
      dsc.itemEditing = true;
      dsc.editingSchedules = [];
      _.forEach(driver.schedules,function(schedule) {
        var data = {};
        data.date_id = schedule.date_id;
        data.hour = schedule.hour;
        data.order = schedule.order;
        dsc.editingSchedules.push(data)
      })
    }
    // $scope.showitem=showitem;
  }
  dsc.cancelEditing = function(driver){
      driver.isEditing = false;
      dsc.itemEditing = false;
      // cleanEditingSchedules()
  }
  dsc.saveEditing = function(driver){
      driver.schedules = dsc.editingSchedules;
      dsc.editingSchedules = [];
      driver.isEditing = false;
      dsc.itemEditing = false;
      // cleanEditingSchedules()
  }
  function cleanEditingSchedules() {
      _.forEach(dsc.editingSchedules,function(schedule) {
        schedule.hour = null;
      })
  }


  dsc.addToArea = function (driver) {

    if(!dsc.areaList[0].driverList){
      // init driver list array
        dsc.areaList[0].driverList = [];
        const index = _.findIndex(dsc.areaList[0].driverList, { 'driver_id' : driver.driver_id});
        if(index == -1){
          dsc.areaList[0].driverList.push(driver)
        }

    }else{
      const index = _.findIndex(dsc.areaList[0].driverList, { 'driver_id' : driver.driver_id});
      if(index == -1){
        dsc.areaList[0].driverList.push(driver)
      }
    }
//


    if(!dsc.areaList[0].driverList){
      dsc.areaList[0].driverList = [];
    }

    const index = _.findIndex(dsc.areaList[0].driverList, { 'driver_id' : driver.driver_id});

    if(index == -1){
      dsc.areaList[0].driverList.push(driver)
    }





  }




}]);
