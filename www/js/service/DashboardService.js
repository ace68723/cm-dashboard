angular.module('MetronicApp')
.service('dashboardService',function  ($http,$interval,API_URL,API2_URL,json2csv,$q) {
  var dashboardService = {};
  var lo_data  ={};
  var lo_fdata ={};
  var la_delivers;
  lo_fdata.delivers= [];
  	// dashboardService.timeout = 0;
  	var stop;
    // json2csv.ConvertToJSON()
    //  .then(function (result) {
    //    lo_fdata.delivers = result.data;
    //    _.remove(lo_fdata.delivers, function(n) {return !n.area});
    //
    //  })
	dashboardService.get_init = function  () {
		if(stop){
			$interval.cancel(stop);
		}
		stop = $interval(function() {
			// getDrivers();
      get_API();
		},30000)
    // get driver list from local csv file
    get_API();
    // getDrivers();
	}
  getDrivers();

  function getDrivers() {
    $http({
      method: 'GET',
      url: API_URL+'MobMonitor/DriverSchedule',
    }).then(function successCallback(response) {
      lo_fdata.delivers = response.data.eo_schedule;
      lo_fdata.delivers.current = response.data.ev_current;
      lo_fdata.delivers.current = parseInt(lo_fdata.delivers.current, 10);
      for(i=0; i<lo_fdata.delivers.length; i++){
        lo_fdata.delivers[i].valid_from = parseInt(lo_fdata.delivers[i].valid_from, 10);
        lo_fdata.delivers[i].valid_to = parseInt(lo_fdata.delivers[i].valid_to, 10);
        if (lo_fdata.delivers[i].valid_from < lo_fdata.delivers.current &&lo_fdata.delivers.current< lo_fdata.delivers[i].valid_to){
          lo_fdata.delivers[i].off = 1;
        }else if(lo_fdata.delivers[i].valid_to < lo_fdata.delivers.current||lo_fdata.delivers.current < lo_fdata.delivers[i].valid_from){
          lo_fdata.delivers[i].off = 2;
        }
      };
      console.log(lo_fdata)
      get_API();
    }, function errorCallback(response) {
       // alertService.alert(response);
    });
    setTimeout(function () {
      getDrivers();
    }, 900000);

  }
	function get_API() {
		$http({
		  method: 'GET',
		  url: API_URL+'MobMonitor/OrderList',
		}).then(function successCallback(response) {
      if(!lo_fdata.delivers){
        get_API()
      }else{
        lo_data.orders = response.data.ea_orders;
        lo_data.statas = response.data.ea_stats;
        setOrders();
      }


		}, function errorCallback(response) {

		});


	};
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
           if(order.p_channel != '0') {
             if(order.p_status == '20') {
              lo_fdata.new_order.push(order);
             } else {
              lo_fdata.new_user_order.push(order);
             } 
           } else {
            lo_fdata.new_order.push(order);
           }
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
    _.forEach(lo_data.orders,function (order,key) {
      if(!order.p_status && order.p_channel == '0') {
        order.p_status = '非在线支付';
      } else if (order.p_status == '20') {
        order.p_status = '支付成功';
      } else if (order.p_status == '30') {
        order.p_status = '已退款';
      } else if(order.p_channel != '0' && !order.p_status){
        order.p_status = '未完成支付'
      }
      order.dlexp = parseInt(order.dlexp / 1.13, 10);
    })
    _.forEach(lo_data.orders,function (order,key) {
      if(order.p_channel == '0') {
        order.p_channel = '到付';
      } else if (order.p_channel == '10') {
        order.p_channel = '支付宝';
      } else if (order.p_channel == '1') {
        order.p_channel = 'Debit/Credit';
      } else if (order.p_channel == '30') {
        order.p_channel = 'Apple Pay';
      } else if (order.p_channel == '20') {
        order.p_channel = '微信支付';
      }
      if(order.settle_type == '1') {
        order.settle_type = '需要垫付';
      } else if (order.settle_type == '2') {
        order.settle_type = '无需垫付';
      }
    })
    _.forEach(lo_fdata.delivers,function (deliver,key) {
      deliver.orders = [];
      deliver.alert = 0;
    })
    lo_fdata.confirm_order.sort(function(a, b) {
      return (b.rraction - a.rraction);
    });
    _.forEach(lo_fdata.confirm_order,function (order,key) {
      if(order.pptime == '< 10') {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 600;  
      } else if (order.pptime == '20') {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 1200;
      } else if (order.pptime == '30') {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 1800;
      } else if (order.pptime == '> 40') {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 2700;
      } else {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 1500;
      }
      var rr_action = parseFloat(order.rraction)
      function timeConverter(rr_action){
        var a = new Date(rr_action * 1000);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
        var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        var time =  hour + ':' + min + ':' + sec ;
        return time;
      }
      order.rraction = timeConverter(rr_action);
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
      if(order.pptime == '< 10') {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 600;  
      } else if (order.pptime == '20') {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 1200;
      } else if (order.pptime == '30') {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 1800;
      } else if (order.pptime == '> 40') {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 2400;
      } else {
        order.rraction = parseInt(order.rraction, 10);
        order.rraction = order.rraction + 2100;
      }
      var rr_action = parseFloat(order.rraction)
      function timeConverter(rr_action){
        var a = new Date(rr_action * 1000);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
        var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        var time =  hour + ':' + min + ':' + sec ;
        return time;
      }
      order.rraction = timeConverter(rr_action);
    })
  };

  dashboardService.getRole=function(){
    var deferred = $q.defer();

     var successCallback = function(response){
       const data = response.data;
       console.log(data);
        if(data.ev_role == 3){
          var role = "SETTLE"
       deferred.resolve(role)
        }else if (data.ev_role == 4){
          var role = "XIAOMING"
          deferred.resolve(role)
       deferred.reject(role)
        } else {
          var role = "OTHER"
       deferred.reject(role)
        }
     }
     var errorCallback = function(response){
    deferred.reject(response)
       }
     $http({
            method: 'GET',
            url: API2_URL+"rr_role"
          }).then(successCallback,errorCallback)
   return deferred.promise
  }


	dashboardService.get_orders = function  () {
			if (lo_data.statas !== null){
				// console.log("lo_data in service",lo_data)
				return lo_data;
			}
	}
	dashboardService.get_fomat = function  () {
		if (lo_fdata.statas !== null){
      console.log(lo_fdata)

			return lo_fdata;
		}
	}
  dashboardService.find_order = function  (oid) {
    var deferred = $q.defer();
      $http({
      method: 'POST',
      url: API_URL+'MobMonitor/OrderDetailInt',
      data:{oid:oid}
    }).then(function successCallback(response) {
      console.log(response)
      console.log(response.data.eo_order)
      if(!response.data.eo_order){
        deferred.reject(response)
      }else{
        console.log(response.data.eo_order)
        const oid = response.data.eo_order.oid;
        const order = response.data.eo_order.order;
        const delivery = response.data.eo_order.delivery;
        const rr = response.data.eo_order.rr;
        const user =  response.data.eo_order.user;

        const serach_order = {
          "oid": oid,
          "status": order.status,
          "dltype": "送餐",
          "channel": order.channel,
          "status_txt": order.status_txt,
          "charge_total": order.charge_total,
          "settle_type": order.settle_type,
          "payment_channel":order.payment_channel,
          "payment_status":order.payment_status,
          "dlexp": order.dlexp,
          "total": order.total,
          "charge_total": order.charge_total,
          "created": order.created,
          "cell": user.tel,
          "c_addr": user.addr,
          "c_postal": user.postal,
          "c_lat": user.lat,
          "c_lng": user.lng,
          "r_cell": user.tel,
          "rrname": rr.name,
          "r_addr": rr.addr,
          "r_postal": rr.postal,
          "r_lat": rr.lat,
          "r_lng": rr.lng,
          "r_call": rr.tel,
          "driver_name":delivery.driver_name,
          "driver_cell": delivery.cell,
        }
        deferred.resolve(serach_order)
      }


    }).catch(function errorCallback(error) {
      deferred.reject(response)
    })

    return deferred.promise
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
  autoCalling = false;
  dashboardService.autoCall = function (oid) {
    if(!autoCalling){
      autoCalling = true;
      var ro_data = {};
      ro_data.oid = oid;
      $http({
        method: 'POST',
        url: API_URL+'MobMonitor/CallRr',
        data:ro_data
      }).then(function successCallback(response) {
        console.log(response)
        swal("Success!",
             "Automatic call sent to restaurant. oid: "+ oid ,
             "success");
        autoCalling = false;
        get_API();
      })
    }

  }
  return dashboardService
})
