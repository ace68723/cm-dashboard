var myApp = angular.module('myApp', []);

myApp.factory('Drivers', function() {
  var DriverList = {};
  DriverList.item = [{
    id : "0",
    driver_id :"139",
    name:"Marley",
    area: "Scarborough",
    sunday:"",
    monday:"",
    tuesday :"",
    wednesday :"",
    thursday :"",
    friday:"",
    saturday :""
  },{
      id : "1",
    driver_id :"140",
    name:"Ryan",
    area: "North York",
    sunday:"",
    monday:"",
    tuesday :"",
    wednesday :"",
    thursday :"",
    friday:"",
    saturday :""
  },{
      id : "2",
    driver_id :"141",
    name:"WilsonFeng",
    area: "Scarborough",
    sunday:"",
    monday:"",
    tuesday :"",
    wednesday :"",
    thursday :"",
    friday:"",
    saturday :""
  },{
      id : "3",
    driver_id :"142",
    name:"EasonLi",
    area: "Scarborough",
    sunday:"",
    monday:"",
    tuesday :"",
    wednesday :"",
    thursday :"",
    friday:"",
    saturday :""
  },{
      id : "4",
    driver_id :"143",
    name:"Rex",
    area: "Scarborough",
    sunday:"",
    monday:"",
    tuesday :"",
    wednesday :"",
    thursday :"",
    friday:"",
    saturday :""
  }
  ];
  return DriverList;
  console.log(DriverList)
  //return DriverList.item;
})

function DriverCtrl($scope, Drivers) {
    $scope.drivers = [];
    for (i = 0; i < Drivers.item.length; i++) {
      var data = {};
      data.id = Drivers.item[i].id;
      data.driver_id = Drivers.item[i].driver_id;
      data.name = Drivers.item[i].name;
      data.sunday = Drivers.item[i].sunday;
      data.monday = Drivers.item[i].monday;
      data.wednesday = Drivers.item[i].wednesday;
      data.tuesday = Drivers.item[i].tuesday;
      data.thursday = Drivers.item[i].thursday;
      data.friday = Drivers.item[i].friday;
      data.saturday = Drivers.item[i].saturday;
      data.area = Drivers.item[i].area;
      $scope.drivers.push(data)
    }
    var showitem =[];
    var reset = [];
    $scope.GetItem=function(driver){
      showitem.id = driver.id;
      reset.driver_id= driver.driver_id;
      reset.name= driver.name;
      reset.sunday= driver.sunday;
      reset.monday= driver.monday;
      reset.tuesday= driver.tuesday;
      reset.wednesdays= driver.wednesdays;
      reset.thursday = driver.thursday;
      reset.friday = driver.friday;
      reset.saturday = driver.saturday;
      $scope.isEditing = true;
      $scope.showitem=showitem;
    }

    $scope.isEditing= false;
    $scope.resetEditing = function(driver){
      driver.driver_id= reset.driver_id;
      driver.name= reset.name;
      driver.sunday= reset.sunday;
      driver.monday= reset.monday;
      driver.tuesday= reset.tuesday;
      driver.wednesdays= reset.wednesdays;
      driver.thursday = reset.thursday;
      driver.friday = reset.friday;
      driver.saturday = reset.saturday;
    }

    $scope.cancelEditing = function(driver){
      showitem.id = null;
      $scope.isEditing =false;
      driver.driver_id= reset.driver_id;
      driver.name= reset.name;
      driver.sunday= reset.sunday;
      driver.monday= reset.monday;
      driver.tuesday= reset.tuesday;
      driver.wednesdays= reset.wednesdays;
      driver.thursday = reset.thursday;
      driver.friday = reset.friday;
      driver.saturday = reset.saturday;
    }

   $scope.SaveEdit = function(driver){
     for (i = 0; i < Drivers.item.length; i++) {
      if ($scope.drivers[i].name == $scope.drivers[i].name) {
       $scope.drivers[i].driver_id  = $scope.drivers[i].driver_id;
       $scope.drivers[i].name  =$scope.drivers[i].name;
       $scope.drivers[i].sunday =$scope.drivers[i].sunday;
       $scope.drivers[i].monday=$scope.drivers[i].monday;
       $scope.drivers[i].tuesday=$scope.drivers[i].tuesday;
       $scope.drivers[i].wednesday=$scope.drivers[i].wednesday;
       $scope.drivers[i].thursday =$scope.drivers[i].thursday;
       $scope.drivers[i].saturday= $scope.drivers[i].saturday;
       $scope.drivers[i].friday = $scope.drivers[i].friday;
      }
     }
     $scope.isEditing =false;
    }
   $scope.isCreating =false;
   $scope.shouldShowCreating = function(){
     return $scope.isCreating;
   }

   $scope.startCreating = function(){
     $scope.isCreating = true;
   }

   $scope.cancelCreating = function(){
     $scope.resetAddForm();
     $scope.isCreating = false;
   }

   $scope.addDriver = function(driver){
     driver.id = $scope.drivers.length;
     $scope.drivers.push(driver);
     $scope.resetAddForm();
   }
   $scope.resetAddForm = function(){
     $scope.newDriver ={
       id:"",
       driver_id : '',
       name : '',
       sunday :'',
      monday : '',
       uesday : '',
       wednesday : '',
       thursday: '',
       friday : '',
       saturday: ''
     }
   }

   $scope.deleteDriver=function(driver){
     _.remove($scope.drivers, function(b){
       return b.id == driver.id;
     });
   }
}
