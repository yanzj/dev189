define(['frame'], function(ngApp) {
    'use strict';
    ngApp.provider.controller('ctrlMain', ['$scope', 'mediagallery', function($scope, mediagallery) {
        $scope.setPic = function() {
            var options = {
                callback: function(url) {
                    $scope.app.pic = url + '?_=' + (new Date * 1);
                    $scope.update('pic');
                }
            };
            mediagallery.open($scope.app.siteid, options);
        };
        $scope.removePic = function() {
            $scope.app.pic = '';
            $scope.update('pic');
        };
    }]);
    ngApp.provider.controller('ctrlAccess', ['$scope', '$uibModal', 'http2', 'srvSite', 'srvPlanApp', function($scope, $uibModal, http2, srvSite, srvPlanApp) {
        function chooseGroupApp() {
            return $uibModal.open({
                templateUrl: 'chooseGroupApp.html',
                controller: ['$scope', '$uibModalInstance', function($scope2, $mi) {
                    $scope2.app = _oApp;
                    $scope2.data = {
                        app: null,
                        round: null
                    };
                    _oApp.mission && ($scope2.data.sameMission = 'Y');
                    $scope2.cancel = function() {
                        $mi.dismiss();
                    };
                    $scope2.ok = function() {
                        $mi.close($scope2.data);
                    };
                    var url = '/rest/pl/fe/matter/group/list?site=' + _oApp.siteid + '&size=999&cascaded=Y';
                    _oApp.mission && (url += '&mission=' + _oApp.mission.id);
                    http2.get(url, function(rsp) {
                        $scope2.apps = rsp.data.apps;
                    });
                }],
                backdrop: 'static'
            }).result;
        }

        function setGroupEntry(oResult) {
            if (oResult.app) {
                _oEntryRule.group = { id: oResult.app.id, title: oResult.app.title };
                if (oResult.round) {
                    _oEntryRule.group.round = { id: oResult.round.round_id, title: oResult.round.title };
                }
                return true;
            }
            return false;
        }

        var _oApp, _oEntryRule;
        $scope.rule = {};
        $scope.changeUserScope = function() {
            srvPlanApp.changeUserScope($scope.rule.scope, $scope.sns, $scope.memberSchemas);
        };

        $scope.chooseGroupApp = function() {
            chooseGroupApp().then(function(result) {
                if (setGroupEntry(result)) {
                    $scope.update('entry_rule');
                }
            });
        };
        $scope.removeGroupApp = function() {
            delete _oEntryRule.group;
            $scope.update('entry_rule');
        };
        $scope.chooseMschema = function() {
            srvSite.chooseMschema($scope.app).then(function(result) {
                if (!_oEntryRule.member[result.chosen.id]) {
                    _oEntryRule.member[result.chosen.id] = { entry: '' };
                    $scope.update('entry_rule');
                }
            });
        };
        $scope.editMschema = function(oMschema) {
            if (oMschema.matter_id) {
                if (oMschema.matter_type === 'mission') {
                    location.href = '/rest/pl/fe/matter/mission/mschema?id=' + oMschema.matter_id + '&site=' + $scope.app.siteid + '#' + oMschema.id;
                } else {
                    location.href = '/rest/pl/fe/site/mschema?site=' + $scope.app.siteid + '#' + oMschema.id;
                }
            } else {
                location.href = '/rest/pl/fe?view=main&scope=user&sid=' + $scope.app.siteid + '#' + oMschema.id;
            }
        };
        $scope.removeMschema = function(mschemaId) {
            var bSchemaChanged;
            if (_oEntryRule.member[mschemaId]) {
                delete _oEntryRule.member[mschemaId];
                $scope.update('entry_rule');
            }
        };
        srvPlanApp.get().then(function(oApp) {
            _oApp = oApp;
            $scope.rule.scope = oApp.entry_rule.scope || 'none';
            _oEntryRule = oApp.entry_rule;
        });
    }]);
});