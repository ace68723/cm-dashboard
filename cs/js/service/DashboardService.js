angular.module('MetronicApp')
.service('dashboardService',function  ($http,$interval,API_URL,json2csv) {
  var dashboardService = {};
  var lo_data  ={};
  var lo_fdata ={};
  var la_delivers;
  	// dashboardService.timeout = 0;
  	var stop;
	dashboardService.get_init = function  () {

		// lo_data.account = 0;
		if(stop){
			$interval.cancel(stop);
		}
		stop = $interval(function() {
			get_API();
		},30000)

    // get driver list from local csv file
    json2csv.ConvertToJSON()
    .then(function (result) {
      lo_fdata.delivers = result.data;
      _.remove(lo_fdata.delivers, function(n) {return !n.area});
       get_API();
    })
	}

	function get_API() {
		$http({
		  method: 'GET',
		  url: API_URL+'MobMonitor/OrderList',
		}).then(function successCallback(response) {
			lo_data.orders = response.data.ea_orders;
			lo_data.statas = response.data.ea_stats;
         setOrders();
		}, function errorCallback(response) {
		   // alertService.alert(response);
		});

		function setOrders() {
			lo_fdata.new_order = [];
			lo_fdata.change_addr_order = [];
			lo_fdata.new_user_order = [];
			lo_fdata.reject_order = [];
			lo_fdata.confirm_order = [];
			lo_fdata.delivering_order = [];
			lo_fdata.complete_order = [];

			_.forEach( lo_data.orders, function(order, key) {
				switch(order.status) {
				  case '0':
					  lo_fdata.new_order.push(order)
					  break;
				  case '60':
					   lo_fdata.change_addr_order.push(order)
					  break;
				  case '5':
					   lo_fdata.reject_order.push(order)
					  break;
				  case '90':
					   lo_fdata.reject_order.push(order)
					  break;
				  case '55':
					   lo_fdata.new_user_order.push(order)
					  break;
				  case '10':
					  lo_fdata.confirm_order.push(order)
					  break;
				  case '20':
					   lo_fdata.delivering_order.push(order)
					  break;
				  case '30':
					   lo_fdata.delivering_order.push(order)
					  break;
				  case '40':
					   lo_fdata.complete_order.push(order)
					  break;
				}
      });
      _.forEach(lo_fdata.delivers,function (deliver,key) {
        deliver.orders = [];
        deliver.alert = 0;
      })
      _.forEach(lo_fdata.delivering_order, function (order, key) {
        var deliver_index = _.findIndex(lo_fdata.delivers, function(deliver) {
          return deliver.driver_id == order.driver_id;
        });
        if(deliver_index == -1){
          // alert("Can't find deliver "+ order.deliver);
        }else{
          lo_fdata.delivers[deliver_index].orders.push(order)
          if(order.alert == 1){
            lo_fdata.delivers[deliver_index].alert += 1
          }
        }
      })
		};

	};




	dashboardService.get_orders = function  () {
			if (lo_data.statas !== null){
				// console.log("lo_data in service",lo_data)
				return lo_data;
			}
	}
	dashboardService.get_fomat = function  () {
		if (lo_fdata.statas !== null){
			return lo_fdata;
		}
	}
  dashboardService.find_order = function  (oid) {
    serach_order = _.find(lo_data.orders, function(order){
        return order.oid == oid;
    });
    return serach_order
	}
	var audio = new Audio('audio/pikapi.wav');
	function play_audio () {
		dashboardService.timeout = 30;
		var timeout = $interval(function() {
			if(dashboardService.timeout > 0){
				dashboardService.timeout  -= 1

			}else{
				$interval.cancel(timeout);
			}
			// console.log(dashboardService.timeout)
		},1000)
		audio.play();
		$interval(function() {
			if(lo_fdata.new_order.length + lo_fdata.change_addr_order.length + lo_fdata.new_user_order.length > 0 ){
					audio.play();
			}
		},30000)
	}
	play_audio();
  return dashboardService
})
