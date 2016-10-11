angular.module("MetronicApp")
.directive('cmForm', function(dashboardService,$timeout,$modal,$log) {
	return {
      	restrict: 'A',
      	scope:{
      		orders: '='
        },
        link: function($scope, element, attrs) {
          		$timeout(function() {
                    var search = element.find("div.input-group");
                    var input = element.find("input");
                    search.click(function () {
                        element.addClass("open");
                        input.focus();
                    });
    	      		element.bind("keydown ", function (event) {
	  		            if(event.which === 13) {
												var searchText = input[0].value;
												var serach_order =  dashboardService.find_order(searchText);
	                        if (serach_order){
	                            serach_order.type = "od"
	                            open(serach_order)
	                        }else{
	                            alert("未找到当日订单");
	                        }

	  		            }
      		       	});
                  input.bind("blur",function  () {
                      var searchText = input[0].value;
                      if(!searchText){
                          element.removeClass("open");
                      }
    	  					});
          		}, 2000);
    	}


	}

  function open (serach_order) {
        var modalInstance = $modal.open(
        {
            templateUrl: 'views/searchOrder.html',
            controller: 'popUpCtrl as puc',
            resolve:
            {
                data: function()
                {
                    return serach_order;
                }
            }
        });

        modalInstance.result.then(function()
        {

        }, function()
        {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
});
