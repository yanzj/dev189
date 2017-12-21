'use strict';
require('../../../../../../asset/js/xxt.ui.favor.js');

if (/MicroMessenger/.test(navigator.userAgent)) {
    //signPackage.debug = true;
    signPackage.jsApiList = ['hideOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage'];
    wx.config(signPackage);
}
angular.module('app', ['ui.bootstrap', 'page.ui.xxt', 'favor.ui.xxt']).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]).controller('ctrl', ['$scope', '$location', '$http', 'tmsFavor', 'tmsDynaPage', function($scope, $location, $http, tmsFavor, tmsDynaPage) {
    var siteId, linkId;
    siteId = $location.search().site;
    linkId = $location.search().id;
    $scope.elSiteCard = angular.element(document.querySelector('#site-card'));
    $scope.siteCardToggled = function(open) {
        var elDropdownMenu;
        if (open) {
            if (elDropdownMenu = document.querySelector('#site-card>.dropdown-menu')) {
                elDropdownMenu.style.left = 'auto';
                elDropdownMenu.style.right = 0;
            }
        }
    };
    $scope.favor = function(user, link) {
        if (!user.loginExpire) {
            tmsDynaPage.openPlugin('http://' + location.host + '/rest/site/fe/user/access?site=platform#login').then(function(data) {
                user.loginExpire = data.loginExpire;
                tmsFavor.open(link);
            });
        } else {
            tmsFavor.open(link);
        }
    };
    $scope.invite = function(user, link) {
        if (!user.loginExpire) {
            tmsDynaPage.openPlugin('http://' + location.host + '/rest/site/fe/user/access?site=platform#login').then(function(data) {
                user.loginExpire = data.loginExpire;
                location.href = "/rest/site/fe/invite?matter=link," + link.id;
            });
        } else {
            location.href = "/rest/site/fe/invite?matter=link," + link.id;
        }
    };
    $scope.siteUser = function(id) {
        var url = 'http://' + location.host;
        url += '/rest/site/fe/user';
        url += "?site=" + siteId;
        location.href = url;
    };
    $http.get('/rest/site/home/get?site=' + siteId).success(function(rsp) {
        $scope.siteInfo = rsp.data;
        $http.get('/rest/site/fe/matter/link/get?site=' + siteId + '&id=' + linkId).success(function(rsp) {
            $scope.link = rsp.data.link;
            $scope.user = rsp.data.user;
            $scope.qrcode = '/rest/site/fe/matter/link/qrcode?site=' + siteId + '&url=' + encodeURIComponent(location.href);
            document.querySelector('#link>iframe').setAttribute('src', $scope.link.fullUrl);
            $http.post('/rest/site/fe/matter/logAccess?site=' + siteId + '&id=' + linkId + '&type=link&title=' + $scope.link.title, {
                search: location.search.replace('?', ''),
                referer: document.referrer
            });
        }).error(function(content, httpCode) {});
    });
}]);