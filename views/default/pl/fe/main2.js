angular.module('app', ['ui.tms']).
controller('ctrlMain', ['$scope', 'http2', function($scope, http2) {
    var t = (new Date() * 1);
    $scope.create = function() {
        var url = '/rest/pl/fe/site/create?_=' + t;;
        http2.get(url, function(rsp) {
            location.href = '/rest/pl/fe/site/setting?site=' + rsp.data.id;
        });
    };
    $scope.list = function() {
        var url = '/rest/pl/fe/site/list?_=' + t;
        http2.get(url, function(rsp) {
            $scope.sites = rsp.data;
        });
    };
    $scope.listMission = function() {
        var url = '/rest/pl/fe/matter/mission/list?_=' + t;
        http2.get(url, function(rsp) {
            $scope.missions = rsp.data.missions;
        });
    };
    $scope.open = function(event, site) {
        event.preventDefault();
        event.stopPropagation();
        location.href = '/rest/pl/fe/site?site=' + site.id + '&_=' + t;
    };
    $scope.openMission = function(mission) {
        location.href = '/rest/pl/fe/matter/mission?id=' + mission.mission_id;
    };
    $scope.remove = function(event, site) {
        event.preventDefault();
        event.stopPropagation();
        var url = '/rest/pl/fe/site/remove';
        url += '?site=' + site.id + '&_=' + t;
        http2.get(url, function(rsp) {
            var i = $scope.sites.indexOf(site);
            $scope.sites.splice(i, 1);
        });
    };
    $scope.list();
    $scope.listMission();
}]);