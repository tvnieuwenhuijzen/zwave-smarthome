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
myAppController.controller('TestController', function ($scope, $interval, dataFactory, ioc, cfg) {
    var self = this;
    self.setLocations = function (locations) {
        ioc.locations.set(locations);
    };
     ioc.locations.set();


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

    console.log(ioc.locations.all)
    var refresh = function () {
        $scope.loadData();
    };
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

