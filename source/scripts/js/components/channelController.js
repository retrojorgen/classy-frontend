angular.module(applicationName).component('user', {
	templateUrl: '/assets/scripts/views/user.html',
	controller: 'userController as usr'
});


angular.module(applicationName).controller('userController',
	['$scope', '$http', '$routeParams', '$window', '$location', 'authService', '$q', '$rootScope', '$location',
        function ($scope, $http, $routeParams, $window, $location, authService, $q, $rootScope, $location) {
            var usr = this;

            usr.user = $rootScope.user;
            usr.returnType = 0;

            $scope.$on('user updated', function (event, user) {
                usr.user = user;
            });

            authService.getRetailer()
                .then(function (data) {
                    if(data && data.returnType)

                        usr.returnType = data.returnType;
                    if(data && data.businessType && data.businessType == 4) {
                        $location.path("/forhandler/retur/avis/enkeltpakke");
                    }
                });

            // Right now front-page redirects to package return
            authService.isAuth()
                .then(function () {
                }, function () {
                });


        }
    ]
);