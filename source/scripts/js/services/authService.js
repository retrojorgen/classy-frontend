/**
 * Created by jorjacob on 08/02/17.
 */
angular.module(applicationName).factory('authService', ['$q', '$http', '$location', '$window', 'store', '$rootScope',
    '$timeout', 'jwtHelper', '$routeParams',
    function($q, $http, $location, $window, store, $rootScope, $timeout, jwtHelper, $routeParams) {


    var login = function (userId, password, loginType) {

        var loginPromise = $q.defer();
        $http({
            url: apiUrl + 'login',
            method: "GET",
            headers: {
                "Authorization": 'Basic ' + btoa(userId + ':' + password)
            }
        })
            .then(function (data) {
                store.set('jwt', 'Bearer ' + data.data.jwt);
                jwt = 'Bearer ' + data.data.jwt;
                store.set('loginType', loginType);
                getUser();
                loginPromise.resolve();
                emitLoggedIn();

            }, function () {
                loginPromise.reject();
            });

        return loginPromise.promise;
    };


    return {
        login: login
    }
}]);
