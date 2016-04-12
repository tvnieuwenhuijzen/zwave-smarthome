/**
 * Application controllers
 * @author Martin Vach
 */

/**
 * Not found controller
 */
myAppController.controller('404Controller', function ($scope, cfg) {
    angular.extend(cfg.route.fatalError, {
        message: $scope._t('error_404'),
        hide: true
    });

});

/**
 * Test controller
 */
/**
 * Caching the river...
 */
myAppFactory.factory('ioc', function (dataFactory) {
    var ioc = {
        locations: {}
    };
    ioc.locations.all = [];
    ioc.locations.set = function () {
        dataFactory.getApi('locations').then(function (response) {
            ioc.locations.all.push(response.data.data);

        }, function (error) {
        });
        //ioc.locations.all.push(locations);
    };
    return ioc;
});


myAppController.controller('DragController', function ($scope, $interval, ioc, cfg) {
  $scope.names = [{val:'bob'},{val:'lucy'},{val:'john'},{val:'luke'},{val:'han'}];
			$scope.tempplayer = '';
			$scope.updateNames = function (){
				if($scope.tempplayer === "") return
				$scope.names.push({val: $scope.tempplayer});
				$scope.tempplayer = "";
			};
			$scope.checkForNameDelete = function($index){
				if($scope.names[$index].val === ''){
					$scope.names.splice($index, 1);
				}
			};
			
			$scope.$on('ngrr-dragstart', function(){
				console.log('Drag Start');
			});
			
			$scope.$on('ngrr-dragend', function(){
				console.log('Drag End');
			});
			
			$scope.$on('ngrr-reordered', function(){
				console.log('Reordered');
			});


});
myAppController.controller('TestController', function ($scope,  $location,$window, dataFactory, ioc, cfg) {
    $scope.input = {
        name: '',
        email: ''
    };
    
//    $scope.$on('$locationChangeStart', function (event) {
//        event.preventDefault();
//        console.log($scope.form_profile.$dirty);
//        return;
//      var path = $location.path();
//      if ($rootScope.formDirty) {
//        SweetAlert.swal({
//          title: 'Still Editing',
//          text: 'You have unsaved changes. Are you sure you want to leave?',
//          type: 'warning',
//          showCancelButton: true,
//          confirmButtonColor: '#F8BB86',
//          confirmButtonText: 'Yes'
//        }, function (isConfirm) {
////          if (isConfirm) {
////            $rootScope.formDirty = false;
////            $location.path(path);
////          }
//        });
//        event.preventDefault();
//      }
//    });



//    $scope.$on('$stateChangeStart', function () {
//       alertify.confirm('Are you sure you want to leave this page without to saving form data?', function () {
//            
//        });
//       
//    });

//    $scope.$on('$locationChangeStart', function (event, next, current) {
//        console.log(next)
//        event.preventDefault();
//         alertify.confirm('Are you sure you want to leave this page without to saving form data?')
//                                .set('onok', function (closeEvent) {//after clicking OK
//                                    //window.location.href = next;
//                                     //$location.path(next);
//                                      window.location = next;
//        $window.location.reload();
//                                })
//                                .set('oncancel', function (closeEvent) {//after clicking Cancel
//                                     event.preventDefault();
//                                });
//       
//         //alertify.confirm('Are you sure you want to leave this page without to saving form data?', function () {
//            
//       // });
//        //if (check(next + current)) {
////            var answer = confirm('Are you sure you want to navigate away from this page');
////            if (!answer) {
////                event.preventDefault();
////            }
//       // }
//    });

//    $scope.submitForm = function () {
//        console.log($scope.input)
//    };
//    var self = this;
//    self.setLocations = function (locations) {
//        ioc.locations.set(locations);
//    };
//    ioc.locations.set();


    /**
     * Load data into collection
     */
//    $scope.loadData = function () {
//        dataFactory.getApi('locations').then(function (response) {
//            self.setLocations(response.data.data);
//        }, function (error) {
//        });
//    };
//    $scope.loadData();

    //console.log(ioc.locations.all)
//    var refresh = function () {
//        $scope.loadData();
//    };
    //var apiDataInterval = $interval(refresh, 1000);



});

myAppController.controller('Test2Controller', function ($scope, $interval, ioc, cfg) {
    var self = this;
    $scope.locations = ioc.locations.all;
    console.log($scope.locations)
//    var refresh = function () {
//           console.log($scope.messages)
//        };
    //var apiDataInterval = $interval(refresh, 1000);


});

