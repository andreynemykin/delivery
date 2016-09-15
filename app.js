function materialTheme($mdThemingProvider) {
  var primaryPalette = $mdThemingProvider.extendPalette('light-blue', {
    '500': '0095c6',
    '900': '0c698d',
    'contrastDefaultColor': 'light'
  });

  var backgroundPalette = $mdThemingProvider.extendPalette('grey', {
    '300': 'fff9c4',
    'contrastDefaultColor': 'dark'
  });

  $mdThemingProvider.definePalette('primaryPalette', primaryPalette);
  $mdThemingProvider.definePalette('backgroundPalette', backgroundPalette);

  $mdThemingProvider.theme('default')
    .primaryPalette('primaryPalette')
    .accentPalette('yellow')
    .backgroundPalette('backgroundPalette');
}

io.sails.autoConnect = false;
io.sails.path = window.location.pathname + 'socket.io';
io.sails.useCORSRouteToGetCookie = false;

var app = angular.module('Set', [
  'ngRoute',
  'ngResource',
  'ngMaterial',
  'ngMessages',
  'ngCookies',
  'md.data.table',
  'n3-line-chart',
  'ngImgCrop',
  'ngclipboard'
]).config(['$mdThemingProvider', materialTheme]);

var commonPaths = [
  '/buyTickets',
  '/user/recoverPassword',
  '/tenant/signup',
  '/paymentFail',
  '/tenant/confirm',
  '/paymentSuccessful'
];

app.config(['$compileProvider',
  function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob|data):/);
  }
]);

app.config(['$routeProvider', '$httpProvider', '$mdDateLocaleProvider', 'ROLE', function ($routeProvider, $httpProvider, $mdDateLocaleProvider, ROLE) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/Main.html',
      controller: 'MainController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage(null);
        }]
      }
    })
    .when('/user/recoverPassword/:token?', {
      templateUrl: 'templates/userRecoverPassword.html',
      controller: 'UserRecoverPasswordController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('RECOVER_PASSWORD');
        }]
      }
    })
    .when('/tenant/confirm', {
      templateUrl: 'templates/index.html',
      controller: 'TenantConfirmController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage(null);
        }]
      }
    })
    .when('/user/:id?', {
      templateUrl: 'templates/user.html',
      controller: 'UserController',
      requiredRoles: [ROLE.admin, ROLE.support],
      resolve: {
        menuIndex: ['$route', 'Menu', function ($route, Menu) {
          return Menu.setCurrentPage('USERS');
        }]
      }
    })
    .when('/profile', {
      templateUrl: 'templates/user.html',
      controller: 'UserController',
      resolve: {
        menuIndex: ['$route', 'Menu', function ($route, Menu) {
          return Menu.setCurrentPage('EDIT_PROFILE');
        }]
      }
    })
    .when('/statistics/site/:id?', {
      templateUrl : 'templates/siteStatistics.html',
      requiredRoles: [ROLE.admin, ROLE.support, ROLE.siteOwner],
      controller: 'SiteStatisticsController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('SITES_STATISTICS');
        }]
      }
    })
    .when('/site/:id?', {
      templateUrl : 'templates/site.html',
      controller: 'SiteController',
      requiredRoles: [ROLE.admin, ROLE.support, ROLE.siteOwner],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('SITES');
        }]
      }
    })
    .when('/pointofsale/:id/sellrange', {
      templateUrl: 'templates/sellRangeOfTickets.html',
      controller: 'SellRangeOfTicketsController',
      requiredRoles: [ROLE.admin, ROLE.support],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('POINTS_OF_SALE');
        }]
      }
    })
    .when('/pointofsale/:id/sellone', {
      templateUrl: 'templates/sellOneTicket.html',
      controller: 'SellOneTicketController',
      requiredRoles: [ROLE.admin, ROLE.support, ROLE.retailer],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('POINTS_OF_SALE');
        }]
      }
    })
    .when('/pointofsale/:id/transactions', {
      templateUrl: 'templates/transactions.html',
      controller: 'PointOfSaleTransactionsController',
      requiredRoles: [ROLE.admin, ROLE.support, ROLE.retailer],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('POINTS_OF_SALE');
        }]
      }
    })
    .when('/pointofsale/:id/widgets', {
      templateUrl: 'templates/widgets.html',
      controller: 'PointOfSaleWidgetsController',
      requiredRoles: [ROLE.admin, ROLE.support],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('WIDGETS');
        }]
      }
    })
    .when('/statistics/pointofsale/:id?', {
      templateUrl: 'templates/pointOfSaleStatistics.html',
      requiredRoles: [ROLE.admin, ROLE.retailer, ROLE.support],
      controller: 'PointOfSaleStatisticsController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('POINTS_OF_SALE_STATISTICS');
        }]
      }
    })
    .when('/pointofsale/:id?', {
      templateUrl: 'templates/pointOfSale.html',
      controller: 'PointOfSaleController',
      requiredRoles: [ROLE.admin, ROLE.support, ROLE.retailer],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('POINTS_OF_SALE');
        }]
      }
    })
    .when('/device', {
      templateUrl : 'templates/device.html',
      controller: 'DeviceController',
      requiredRoles: [ROLE.admin, ROLE.support],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('DEVICES');
        }]
      }
    })
    .when('/ticket/search/:ticketNumber?', {
      templateUrl: 'templates/searchTicket.html',
      controller: 'SearchTicketController',
      requiredRoles: [ROLE.admin, ROLE.support, ROLE.retailer],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('SEARCH_TICKET');
        }]
      }
    })
    .when('/ticket/validate', {
      templateUrl: 'templates/validateTicket.html',
      controller: 'ValidateTicketController',
      requiredRoles: [ROLE.admin, ROLE.support],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('VALIDATE_TICKETS');
        }]
      }
    })
    .when('/ticketType/:id?', {
      templateUrl: 'templates/ticketType.html',
      controller: 'TicketTypeController',
      requiredRoles: [ROLE.admin, ROLE.support],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('TICKET_TYPES');
        }]
      }
    })
    .when('/rate/:id?', {
      templateUrl: 'templates/rate.html',
      controller: 'RateController',
      requiredRoles: [ROLE.support],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('RATES');
        }]
      }
    })
    .when('/reservedNumber/:id?', {
      templateUrl: 'templates/reservedNumber.html',
      controller: 'ReservedNumberController',
      requiredRoles: [ROLE.admin, ROLE.support],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('RESERVED_NUMBERS');
        }]
      }
    })
    .when('/tenant/signup', {
      templateUrl: 'templates/signupTenant.html',
      controller: 'SignupTenantController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('REGISTRATION');
        }]
      }
    })
    .when('/tenant/:id?', {
      templateUrl : 'templates/tenant.html',
      controller: 'TenantController',
      requiredRoles: [ROLE.support],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('TENANTS');
        }]
      }
    })
    .when('/buyTickets/:promoCode?', {
      templateUrl: 'templates/buyTickets.html',
      controller: 'BuyTicketsController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('BUY_TICKETS');
        }]
      }
    })
    .when('/package/:id?', {
      templateUrl: 'templates/tenantPackage.html',
      controller: 'TenantPackageController',
      requiredRoles: [ROLE.admin, ROLE.support],
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('PACKAGE');
        }]
      }
    })
    .when('/paymentFail', {
      templateUrl: 'templates/paymentFail.html',
      controller: 'PaymentFailController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('BUY_TICKETS');
        }]
      }
    })
    .when('/paymentSuccessful', {
      templateUrl: 'templates/paymentSuccessful.html',
      controller: 'PaymentSuccessfulController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('BUY_TICKETS');
        }]
      }
    })
    .when('/statistics', {
      templateUrl : 'templates/subMenuAggregator.html',
      requiredRoles: [ROLE.admin, ROLE.support, ROLE.retailer, ROLE.siteOwner],
      controller: 'SubMenuAggregatorController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('STATISTICS', true);
        }]
      }
    })
    .when('/tickets', {
      templateUrl : 'templates/subMenuAggregator.html',
      requiredRoles: [ROLE.admin, ROLE.support, ROLE.retailer],
      controller: 'SubMenuAggregatorController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('TICKETS', true);
        }]
      }
    })
    .when('/polygraphy', {
      templateUrl : 'templates/subMenuAggregator.html',
      requiredRoles: [ROLE.admin, ROLE.support],
      controller: 'SubMenuAggregatorController',
      resolve: {
        menuIndex: ['Menu', function (Menu) {
          return Menu.setCurrentPage('POLYGRAPHY', true);
        }]
      }
    })
    .otherwise({redirectTo: '/'});
  $httpProvider.interceptors.push('AuthInterceptor', 'ConnectionInterceptor');

  $mdDateLocaleProvider.parseDate = function (dateString) {
    var date = moment(dateString, ['DD.MM.YYYY', 'DD.MM.YY'], true);
    return date.isValid() ? date.toDate() : new Date();
  };
  $mdDateLocaleProvider.formatDate = function (date) {
    return date ? date.toLocaleDateString('ru-ru') : null;
  };
}]);

app.run(['$rootScope', '$location', 'AuthToken', 'User', 'ROLE', '$route', '$mdDialog', '$cookies',
  function ($rootScope, $location, AuthToken, User, ROLE, $route, $mdDialog, $cookies) {
    var isAuthNecessary = function () {
      return !commonPaths.some(function (path) {
        return $location.$$path.indexOf(path) === 0;
      });
    };

    var locationChange = function () {
      $mdDialog.hide();
      if (isAuthNecessary() && !$rootScope.currentUser) {
        $location.path('/');
      }
    };

    var routeChange = function (event, currRoute) {
      if (currRoute && '$$route' in currRoute) {
        var requiredRoles = currRoute.$$route.requiredRoles;
        if (requiredRoles && (!$rootScope.currentUser || requiredRoles.indexOf($rootScope.currentUser.role) === -1)) {
          $location.path('/');
        }
      }
    };

    $rootScope.online = true;
    var token = AuthToken.getToken();
    $rootScope.$on('$locationChangeStart', locationChange);
    $rootScope.$on('$routeChangeStart', routeChange);
    if (token) {
      $rootScope.currentUser = $cookies.getObject('user');
      User.getCurrent().then(function () {
        locationChange();
        routeChange(undefined, $route.current);
      });
    } else if (isAuthNecessary()) {
      $location.path('/');
    }
  }]);
