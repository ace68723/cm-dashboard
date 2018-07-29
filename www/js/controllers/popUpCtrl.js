
angular.module('MetronicApp').controller('popUpCtrl', function($scope,$sce,$modal, $modalInstance, data,dashboardService) {
    var popUpCtrl = this;

    popUpCtrl.lv_c_addr = data.c_addr;
    popUpCtrl.oid    = data.oid;
    popUpCtrl.c_lat  = data.c_lat;
    popUpCtrl.c_lng  = data.c_lng;
    popUpCtrl.r_lat  = data.r_lat;
    popUpCtrl.r_lng  = data.r_lng;
    popUpCtrl.c_addr = data.c_addr;
    switch (data.type) {
       case "order":
           order(data)
           break;
       case "maps":
           maps(data)
           break;
       case "od":
           search_orderDetial(data)
           break;
        case "showod":
            orderDetial(data)
            break;
    }
    function order (data) {
        var oid = data.oid
        var port = data.port
        popUpCtrl.oid = oid
        console.log("https://www.chanmao.ca/monitor/#/" + port + "/"+ oid +"/e")
        popUpCtrl.url= $sce.trustAsResourceUrl("https://www.chanmao.ca/monitor/#/" + port + "/"+ oid +"/e");
    }
    function maps (data) {
        var lv_c_lat  = data.c_lat;
        var lv_c_lng  = data.c_lng;
        var lv_r_lat  = data.r_lat;
        var lv_r_lng  = data.r_lng;
        popUpCtrl.lv_r_addr = data.r_addr;
        var oid = data.oid;
        popUpCtrl.oid = oid;
        console.log("data:",data);

        popUpCtrl.url= $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/"+
            "directions?"+"&key=AIzaSyByXgKTkpmXMPmodZjyeHJbHe6R0JdcdeY" +
            "&origin="+ lv_r_lat + ',+' + lv_r_lng +
            "&destination=" + lv_c_lat + ',+' + lv_c_lng +
            "&mode=driving"+
            "&avoid=tolls"

        );
    }

    function orderDetial (argument) {
        var oid = data.oid
        var port = data.port
        popUpCtrl.oid = oid
          console.log("https://www.chanmao.ca/monitor/#/" + port + "/"+ oid)
        popUpCtrl.url= $sce.trustAsResourceUrl("https://www.chanmao.ca/monitor/#/" + port + "/"+ oid);
    }
    function search_orderDetial (argument) {
      console.log(data)
      if(data.payment_channel == "0") {
        data.payment_channel = '到付';
      } else if (data.payment_channel == '10') {
        data.payment_channel = '支付宝';
      } else if (data.payment_channel == '1') {
        data.payment_channel = 'Debit/Credit';
      } else if (data.payment_channel == '30') {
        data.payment_channel = 'Apple Pay';
      } else if (data.payment_channel == '20') {
        data.payment_channel = '微信支付';
      }
      if(!data.payment_status && data.p_channel == '0') {
        data.payment_status = '非在线支付';
      } else if (data.payment_status == '20') {
        data.payment_status = '支付成功';
      } else if (data.payment_status == '30') {
        data.payment_status = '已退款';
      } else if(data.p_channel != '0' && !data.payment_status){
        data.payment_status = '未完成支付'
      }
        popUpCtrl.oid     = data.oid;
        popUpCtrl.cell    = data.cell;
        popUpCtrl.r_call  = data.r_call;
        popUpCtrl.dltype  = data.dltype;
        popUpCtrl.rrname  = data.rrname;
        popUpCtrl.total   = data.total;
        popUpCtrl.dlexp   = data.dlexp;
        popUpCtrl.status_txt  = data.status_txt;
        popUpCtrl.channel = data.channel;
        popUpCtrl.created = data.created;
        popUpCtrl.deliver = data.driver_name;
        popUpCtrl.driver_cell = data.driver_cell;
        popUpCtrl.payment_channel = data.payment_channel;
        popUpCtrl.payment_status = data.payment_status;
    }
    $scope.ok = function()
    {
        // $modalInstance.close($scope.selected.item);
        $modalInstance.close();
    };
    $scope.cancel = function()
    {
        $modalInstance.dismiss('cancel');
        // window.location.reload();
    };




    // for search bar

    popUpCtrl.openOrderChange = function (oid,port,c_addr) {
      var size = 'lg'
      var eo_data = {};
      eo_data.oid = oid;
      eo_data.c_addr = c_addr;
      eo_data.type = "order"
      if (port == 1) {
        eo_data.port = "csnew";
      };
      if (port == 2) {
        eo_data.port = "csdlexp";
      };
      if (port == 3) {
        eo_data.port = "csorderchange";
      };
      if (port == 4) {
        eo_data.port = "detail";
        eo_data.type = "showod";
      };

      popUpCtrl.openPopup(size,eo_data);


    };
    popUpCtrl.openMap = function (oid,c_lat,c_lng,r_lat,r_lng,c_addr) {
        // r_addr,c_addr
      var size = 'lg'
      var eo_data = {};
      eo_data.c_lat = c_lat;
      eo_data.c_lng = c_lng;
      eo_data.r_lat = r_lat;
      eo_data.r_lng = r_lng;
      eo_data.oid   = oid;
      eo_data.c_addr = c_addr;
      // eo_data.r_addr= r_addr;
      // eo_data.c_addr=c_addr;
      eo_data.type = "maps";
      popUpCtrl.openPopup(size,eo_data);
    };
    popUpCtrl.openPopup = function (size,eo_data) {
      var modalInstance = $modal.open(
      {
          templateUrl: 'views/orderChange.html',
          controller: 'popUpCtrl as puc',
          size: size,
          resolve:
          {
              data: function()
              {
                  return eo_data;
              }
          }
      });

      modalInstance.result.then(function()
      {
        // promise 成功完成后call get init 刷新数据
        dashboardService.get_init();
        // console.log("1");
      }, function()
      {
          $log.info('Modal dismissed at: ' + new Date());
      });
    }

});
