define(['frame'], function(ngApp) {
    'use strict';
    ngApp.provider.controller('ctrlNotice', ['$scope', 'srvTmplmsgNotice', 'srvGroupNotice', 'tmsSchema', function($scope, srvTmplmsgNotice, srvGroupNotice, tmsSchema) {
        var oBatchPage, aBatches;
        $scope.tmsTableWrapReady = 'N';
        $scope.oBatchPage = oBatchPage = {};
        $scope.batches = aBatches = [];
        $scope.detail = function(batch) {
            $scope.choosed = {value: 'N'};
            srvGroupNotice.detail(batch).then(function(result) {
                var records, noticeStatus;
                $scope.logs = result.logs;
                if (result.records && result.records.length) {
                    records = result.records;
                    records.forEach(function(record) {
                        tmsSchema.forTable(record, $scope.app._schemasById);
                        if (noticeStatus = record.noticeStatus) {
                            record._noticeStatus = noticeStatus.split(':');
                            record._noticeStatus[0] = record._noticeStatus[0] === 'success' ? '成功' : '失败';
                        }
                    });
                    $scope.records = records;
                }
                $scope.activeBatch = batch;
            })
        };
        $scope.fail = function(isCheck) {
            if(isCheck == 'Y') {
                for(var i=$scope.records.length-1; i>=0; i--) {
                    if($scope.records[i].noticeStatus.indexOf('failed') == -1) {
                        $scope.records.splice(i,1);
                    }
                }
            }else {
                $scope.detail($scope.activeBatch);
            }
        }
        $scope.$watch('app', function(app) {
            var recordSchemas;
            if (!app) return;
            recordSchemas = [];
            app.data_schemas.forEach(function(schema) {
                if (schema.type !== 'html') {
                    recordSchemas.push(schema);
                }
            });
            srvTmplmsgNotice.init('group:' + app.id, oBatchPage, aBatches);
            srvTmplmsgNotice.list();
            $scope.tmsTableWrapReady = 'Y';
            $scope.recordSchemas = recordSchemas;
        });
    }]);
});
