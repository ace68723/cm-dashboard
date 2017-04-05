'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */
angular.module('MetronicApp')
  .service('changename', function ($http,API_URL) {
    function getInitDriverList() {
      /* document
        input :
        week getWeekList()
        [{ showDate:"Sunday",
          date_id:"sunday",
          order:"3"
        }]

        input:
        response.data.ev_result:  0 ok | 1 fail
        response.data.ev_message: error message
        response.data.ea_drivers:
        [
          {
            driver_cell :"4162222222"
            driver_eid :"F022222"
            driver_id :"142"
            driver_id_real :"3"
            driver_name :"cccccc"
          }
        ]

        export:
        {
            driver_id :"139",
            name:"ccccc",
            area: "",
            cell:"4162222222"
            schedules:[]
        }
        {
            name :"NorthYork",
            area: true
        }

      */
      var initDriverList = [];
      var week = getWeekList();
      $http({
         method: 'GET',
         url: API_URL+'/MobMonitor/DriverList'
       })
       .then(function successCallback(response) {
           const data = response.data;
             if(data.ev_result == 0){
               var driverData = data.ea_drivers
               _.forEach(driverData, function(driver, id) {
                 var data = {};
                 data.driver_id = driver.driver_id;
                 data.name = driver.driver_name;
                 data.cell = driver.driver_cell;
                 data.area = '';
                 data.schedules = [];
                 _.forEach(week,function (date) {
                   data.schedules.push(date)
                 })
                 initDriverList.push(data);
               });
             }
           }, function errorCallback(response) {
        })
        return initDriverList
    }
    function getDriverList() {
      //test data
        var driverData = [{
            id : "0",
            driver_id :"139",
            name:"Marley",
            area: "Scarborough",
            schedules:[
            {
                date:"monday",
                hour:"12:00-17:01"
              },{
                date:"tuesday",
                hour:"12:00-17:02"
              },{
                date:"wednesday",
                hour:"12:00-17:03"
              },{
                date:"thursday",
                hour:"12:00-17:04"
              },{
                date:"friday",
                hour:"12:00-17:05"
              },{
                date:"saturday",
                hour:"12:00-17:06"
              },{
                date:"sunday",
                hour:"12:00-17:07"
              },
            ]
            },{
              id : "1",
              driver_id :"140",
              name:"Ryan",
              area: "north_york",
              schedules:[
                {
                  date:"sunday",
                  hour:"12:00-17:00"
                },{
                  date:"monday",
                  hour:"12:00-17:00"
                },{
                  date:"tuesday",
                  hour:"12:00-17:00"
                },{
                  date:"wednesday",
                  hour:"12:00-17:00"
                },{
                  date:"thursday",
                  hour:"12:00-17:00"
                },{
                  date:"friday",
                  hour:"12:00-17:00"
                },{
                  date:"saturday",
                  hour:"12:00-17:00"
                }
              ]
            },{
              id : "2",
              driver_id :"141",
              name:"WilsonFeng",
              area: "Scarborough",
              schedules:[
                {
                  date:"sunday",
                  hour:"12:00-17:00"
                },{
                  date:"monday",
                  hour:"12:00-17:00"
                },{
                  date:"tuesday",
                  hour:"12:00-17:00"
                },{
                  date:"wednesday",
                  hour:"12:00-17:00"
                },{
                  date:"thursday",
                  hour:"12:00-17:00"
                },{
                  date:"friday",
                  hour:"12:00-17:00"
                },{
                  date:"saturday",
                  hour:"12:00-17:00"
                }
              ]
            },{
              id : "3",
              driver_id :"142",
              name:"EasonLi",
              area: "Scarborough",
              schedules:[
                {
                  date:"sunday",
                  hour:"12:00-17:00"
                },{
                  date:"monday",
                  hour:"12:00-17:00"
                },{
                  date:"tuesday",
                  hour:"12:00-17:00"
                },{
                  date:"wednesday",
                  hour:"12:00-17:00"
                },{
                  date:"thursday",
                  hour:"12:00-17:00"
                },{
                  date:"friday",
                  hour:"12:00-17:00"
                },{
                  date:"saturday",
                  hour:"12:00-17:00"
                }
              ]
            },{
              id : "4",
              driver_id :"143",
              name:"Rex",
              area: "Scarborough",
              schedules:[
                {
                  date:"sunday",
                  hour:"12:00-17:00"
                },{
                  date:"monday",
                  hour:"12:00-17:00"
                },{
                  date:"tuesday",
                  hour:"12:00-17:00"
                },{
                  date:"wednesday",
                  hour:"12:00-17:00"
                },{
                  date:"thursday",
                  hour:"12:00-17:00"
                },{
                  date:"friday",
                  hour:"12:00-17:00"
                },{
                  date:"saturday",
                  hour:"12:00-17:00"
                }
              ]
            }
          ];
      // test data end

       var driverList = [];
       var week = getWeekList();
      _.forEach(driverData, function(driver, id) {
        //input      output
        // date      date_id
        var data = {};
        data.id = driver.id;
        data.driver_id = driver.driver_id;
        data.name = driver.name;
        data.cell = driver.driver_cell;
        data.area = driver.area;
        data.schedules = [];
        _.forEach(driver.schedules,function(schedule) {
            schedule.date_id = schedule.date;
            delete schedule["date"];
            const index = _.findIndex(week, { 'date_id':schedule.date_id});
            schedule.order = week[index].order;
            data.schedules.push(schedule);
        })
        data.schedules = _.sortBy(data.schedules, ['order']);
        driverList.push(data);
      });




      return driverList
    }
    function getAreaList(){
      var areaList = {
        defaultOption:'All',
        data: [
          {
            "name":"非North York区",
            "value":""
          },{
            "name":"NorthYork区",
            "value":""
          },{
            "name":"DownTown区",
            "value":""
          },{
            "name":"Mississauga区",
            "value":""
          }
        ]
      }
      return areaList
    }
    function getDriverOptions() {
      var driverOptions = {
        defaultOption:'Name',
        data:[
          {
            "optionName": "Driver ID",
            "value": "driver_id"
          },{
            "optionName": "Name",
            "value": "name"
          }
        ]
      };
      return driverOptions
    }
    function getAreaOptions() {
      var areaOptions = {
          defaultOption:'All',
          data:[
            {
              "optionName": "All",
              "value": ""
            },
            {
              "optionName": "North York",
              "value": "north_york"
            },{
              "optionName": "Scarborough",
              "value": "scarborough"
            },{
              "optionName": "Richmond Hill",
              "value": "richmond_hill"
            },{
              "optionName": "Downtown",
              "value": "downtown"
            }
          ]
      };
      return areaOptions
    }
    function getDateOptions() {
      var dateOptions = {
        defaultOption:"All",
        data:[
          {
            "optionName": "All",
            "value": ""
          },{
            "optionName": "Sunday",
            "value": "sunday"
          },
          {
            "optionName": "Monday",
            "value": "monday"
          },{
            "optionName": "Tuesday",
            "value": "tuesday"
          },{
            "optionName": "Wednesday",
            "value": "wednesday"
          },{
            "optionName": "Thursday",
            "value": "thursday"
          },{
            "optionName": "Friday",
            "value": "friday"
          },{
            "optionName": "Saturday",
            "value": "saturday"
          }
        ]
      }
      return dateOptions
    }
    function getWeekList() {
      var week = [
        { showDate:"Sunday",
          date_id:"sunday",
          order:"3"
        },
        { showDate:"Monday",
          date_id:"monday",
          order:"2"
        },
        { showDate:"Tuesday",
          date_id:"tuesday",
          order:"1"
        },
        { showDate:"Wednesday",
          date_id:"wednesday",
          order:"4"
        },
        { showDate:"Thursday",
          date_id:"thursday",
          order:"5"
        },
        { showDate:"Friday",
          date_id:"friday",
          order:"6"
        },
        { showDate:"Saturday",
          date_id:"saturday",
          order:"7"
        }
      ]
      week = _.sortBy(week, ['order']);
      return week
    }

    return ({
      getInitDriverList : getInitDriverList,
      getDriverList     : getDriverList,
      getAreaList       : getAreaList,
      getDriverOptions  : getDriverOptions,
      getAreaOptions    : getAreaOptions,
      getDateOptions    : getDateOptions,
      getWeekList       : getWeekList
    })

  });
