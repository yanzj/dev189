'use strict';
define(['require'], function(require) {
    var ngApp = angular.module('app', ['ngRoute', 'ui.tms', 'ui.xxt']);
    ngApp.config(['$locationProvider', '$controllerProvider', '$routeProvider', function($lp, $cp, $rp) {
        var RouteParam = function(name) {
            var baseURL = '/views/default/pl/be/sns/wx/';
            this.templateUrl = baseURL + name + '.html?=2';
            this.controller = 'ctrl' + name[0].toUpperCase() + name.substr(1);
            this.resolve = {
                load: function($q) {
                    var defer = $q.defer();
                    require([baseURL + name + '.js'], function() {
                        defer.resolve();
                    });
                    return defer.promise;
                }
            };
        };
        $lp.html5Mode(true);
        ngApp.provider = {
            controller: $cp.register
        };
        $rp.when('/rest/pl/be/sns/wx/setting', new RouteParam('setting'))
            .when('/rest/pl/be/sns/wx/text', new RouteParam('text'))
            .when('/rest/pl/be/sns/wx/menu', new RouteParam('menu'))
            .when('/rest/pl/be/sns/wx/qrcode', new RouteParam('qrcode'))
            .when('/rest/pl/be/sns/wx/other', new RouteParam('other'))
            .when('/rest/pl/be/sns/wx/relay', new RouteParam('relay'))
            .when('/rest/pl/be/sns/wx/tmplmsg', new RouteParam('tmplmsg'))
            .when('/rest/pl/be/sns/wx/page', new RouteParam('page'))
            .otherwise({
                redirectTo: '/rest/pl/be/sns/wx/setting'
            });
    }]);
    ngApp.controller('ctrlWx', ['$scope', 'http2', function($scope, http2) {
        $scope.subView = '';
        $scope.$on('$locationChangeSuccess', function(event, currentRoute) {
            var subView = currentRoute.match(/([^\/]+?)$/);
            $scope.subView = subView ? subView[1] : '';
        });
        http2.get('/rest/pl/be/sns/wx/get', function(rsp) {
            $scope.wx = rsp.data;
        });
    }]);
    /***/
    require(['domReady!'], function(document) {
        angular.bootstrap(document, ["app"]);
    });
    /***/
    return ngApp;
});