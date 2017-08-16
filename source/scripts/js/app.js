var applicationName = "Classy";
var Classy = angular.module(applicationName, ['ngRoute', 'angular-storage', 'underscore', 'ngSanitize', 'ui.bootstrap', 'angular-jwt','angulartics', 'angulartics.google.analytics']);

angular.module(applicationName).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

	//$locationProvider.html5Mode(true).hashPrefix('!');

	$routeProvider
		.when('/logg-inn', {
			template: '<login></login>'
		})
		.when('/logg-ut', {
			template: '<logout></logout>'
		})
		.when('/user/', {
			template: '<user></user>'
		})
        .when('/impersonate-view', {
            template: '<impersonate-view></impersonate-view>'
        })
        .when('/forhandler/leveranse/feil-i-avisleveranse', {
            template: '<newspaper-delivery-complaint></newspaper-delivery-complaint>'
        })
        .when('/forhandler/leveranse/feil-i-magasinleveranse', {
            template: '<magazine-delivery-complaint></magazine-delivery-complaint>'
        })
		.when('/info', {
			template: '<info></info>'
		})
		.when('/info/:section', {
			template: '<info></info>'
		})
		.when('/info/:section/:subPage', {
			template: '<info></info>'
		})
        .when('/forhandler/leveranse/midlertidig-stopp', {
            template: '<temporary-stop></temporary-stop>'
        })
        .when('/forhandler/pakke-arkiv/avis', {
            template: '<package-archive-newspaper></package-archive-newspaper>'
        })
        .when('/forhandler/pakke-arkiv/avis/:packageNumber', {
            template: '<package-archive-newspaper></package-archive-newspaper>'
        })
        .when('/forhandler/pakke-arkiv/magasin', {
            template: '<package-archive-magazine></package-archive-magazine>'
        })
        .when('/forhandler/pakke-arkiv/magasin/:packageNumber', {
            template: '<package-archive-magazine></package-archive-magazine>'
        })
        .when('/forhandler/retur/retur-ikke-plukket-opp', {
            template: '<return-not-picked-up></return-not-picked-up>'
        })
        .when('/forhandler/retur/avis/enkeltpakke', {
            template: '<single-package-return></single-package-return>'
        })
		.when('/forhandler/retur/avis/flere-pakker', {
			template: '<multiple-packages-return></multiple-packages-return>'
		})
        .when('/forhandler/retur/avis/endre-pakker', {
            template: '<package-archive-newspaper></package-archive-newspaper>'
        })
        .when('/forhandler/retur/avis/endre-pakker/:packageNumber', {
            template: '<package-archive-newspaper></package-archive-newspaper>'
        })
        .when('/forhandler/retur/magasin', {
            template: '<magazine-return></magazine-return>'
        })
        .when('/forhandler/retur/magasin/endre-pakker', {
            template: '<package-archive-magazine></package-archive-magazine>'
        })
        .when('/forhandler/retur/magasin/endre-pakker/:packageNumber', {
            template: '<package-archive-magazine></package-archive-magazine>'
        })
        .when('/forhandler/kuponger', {
            template: '<coupon></coupon>'
        })
		.when('/forhandler/rapporter/retur-per-uke', {
			template: '<weekly-return-report></weekly-return-report>'
		})
        .when('/forhandler/rapporter/retur-per-maned', {
            template: '<monthly-return-report></monthly-return-report>'
        })
		.when('/forhandler/beskjeder', {
			template: '<messages></messages>'
		})
		.when('/', {
			template: '<route-handler></route-handler>'
		})
		.otherwise('/');
}]);


angular.module(applicationName).run(['$rootScope', 'dialogService', '$q', 'authService', '$window', '$timeout', function($rootScope, dialogService, $q, authService, $window, $timeout) {

	$rootScope.showInfoBar = false;
	$rootScope.manualInfoBarToggle = false;

	$rootScope.tipsToggle = false;

	$rootScope.productNews = [];



	$rootScope.$on('user updated', function () {
		if($rootScope.user && $rootScope.user.retailer && !$rootScope.manualInfoBarToggle && $window.innerWidth >= 1337) {
            $rootScope.showInfoBar = true;
		} else {
            $rootScope.showInfoBar = false;
		}
	});



	$rootScope.$on('user logged out', function () {
		$rootScope.showInfoBar = false;
	});

	$rootScope.$on('$routeChangeStart', function(next, current){
		document.getElementById("main-view").style.minHeight = (window.innerHeight - 200 - 50) + 'px';
	});

	$rootScope.toggleInfoBar = function () {
        $rootScope.showInfoBar = !$rootScope.showInfoBar;
        $rootScope.manualInfoBarToggle = true;
	};

    $rootScope.toggleTips = function () {
        $rootScope.tipsToggle = !$rootScope.tipsToggle;
    };

    $rootScope.$on('toggle tips', function () {
        $rootScope.toggleTips();
	});

	if($window.innerWidth < 1337) {
        $rootScope.showInfoBar = false;
	}


	var toggleElement = undefined;

	var setHeaderScroll = function () {
        var timeout = $timeout(function () {
            toggleElement = $('.scrollfix');
            if(toggleElement.length) {
                var offsetTop = toggleElement.offset().top;

                $(".main-rows").scroll(function () {

                    if($(".main-rows").scrollTop() >= offsetTop) {
                        if(!toggleElement.hasClass("fixed"))
                            toggleElement.addClass("fixed");
                    } else {
                        if(toggleElement.hasClass("fixed"))
                            toggleElement.removeClass("fixed");
                    }
                });
            }
        }, 1000);
	}

    $rootScope.$on('$routeChangeStart', function(next, current) {
        setHeaderScroll();
    });

}]);






angular.module(applicationName).factory('sessionFailed', ['$q', '$location', 'store', function($q, $window, store) {
    var sessionRecoverer = {
        responseError: function(response) {
            // Session has expired
            if (response.status == 401 || response.status == 503){
            	store.remove('jwt');
                $window.location.reload();
            }

            return $q.reject(response);
        }
    };
    return sessionRecoverer;
}]);
angular.module(applicationName).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionFailed');
}]);


angular.module("uib/template/datepickerPopup/popup.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("uib/template/datepickerPopup/popup.html",
        "<ul role=\"presentation\" class=\"uib-datepicker-popup dropdown-menu uib-position-measure\" dropdown-nested ng-if=\"isOpen\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
        "  <li ng-transclude></li>\n" +
        "</ul>\n" +
        "");
}]);






