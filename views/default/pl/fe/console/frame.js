define(['require'], function(require) {
    'use strict';
    var ngApp = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ui.tms', 'tmplshop.ui.xxt', 'service.matter', 'page.ui.xxt', 'modal.ui.xxt']);
    ngApp.constant('cstApp', {
        matterNames: {
            doc: {
                'article': '单图文',
                'news': '多图文',
                'channel': '频道',
                'link': '链接',
                'contribute': '投稿',
                'text': '文本',
                'custom': '定制页',
            },
            docOrder: ['article', 'news', 'channel', 'link', 'text', 'contribute', 'custom'],
            app: {
                'enroll': '登记',
                'signin': '签到',
                'group': '分组',
                'lottery': '抽奖',
                'wall': '信息墙',
            },
            appOrder: ['enroll', 'signin', 'group', 'lottery', 'wall'],
            'site': '团队',
            'mission': '项目',
        },
        scenarioNames: {
            'common': '通用登记',
            'registration': '报名',
            'voting': '投票',
            'quiz': '测验',
            'group_week_report': '周报',
            'score_sheet': '记分表'
        }
    });
    ngApp.config(['$controllerProvider', '$provide', '$routeProvider', '$locationProvider', '$compileProvider', '$uibTooltipProvider', function($controllerProvider, $provide, $routeProvider, $locationProvider, $compileProvider, $uibTooltipProvider) {
        var RouteParam = function(name) {
            var baseURL = '/views/default/pl/fe/console/';
            this.templateUrl = baseURL + name + '.html?_=' + (new Date() * 1);
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
        ngApp.provider = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            service: $provide.service
        };
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/rest/pl/fe/friend', new RouteParam('friend'))
            .otherwise(new RouteParam('main'));
        $uibTooltipProvider.setTriggers({
            'show': 'hide'
        });
    }]);
    ngApp.factory('facListFilter', ['$timeout', function($timeout) {
        var oFacFilter;
        oFacFilter = {
            keyword: '',
            target: null,
            init: function(fnCallbck, oOutside) {
                this.fnCallbck = fnCallbck;
                this.oOutside = oOutside || {};
                return this;
            },
            show: function(event) {
                var eleKw;
                this.target = event.target;
                while (this.target.tagName !== 'TH') {
                    this.target = this.target.parentNode;
                }
                if (!this.target.dataset.filterBy) {
                    alert('没有指定过滤字段【data-filter-by】');
                    return;
                }
                this.keyword = this.oOutside.keyword || '';
                $(this.target).trigger('show');
                $timeout(function() {
                    var el = document.querySelector('input[ng-model="filter.keyword"]');
                    if (el && el.hasAttribute('autofocus')) {
                        el.focus();
                    }
                }, 200);
            },
            close: function() {
                if (this.keyword) {
                    this.target.classList.add('active');
                } else {
                    this.target.classList.remove('active');
                }
                $(this.target).trigger('hide');
            },
            cancel: function() {
                this.oOutside.keyword = this.keyword = '';
                this.oOutside.by = '';
                this.close();
                this.fnCallbck && this.fnCallbck(this.oOutside);
            },
            exec: function() {
                this.oOutside.keyword = this.keyword;
                this.oOutside.by = this.keyword ? this.target.dataset.filterBy : '';
                this.fnCallbck && this.fnCallbck(this.oOutside);
                this.close();
            }
        };
        return oFacFilter;
    }]);
    ngApp.controller('ctrlFrame', ['$scope', '$location', 'http2', 'srvUserNotice', '$uibModal', 'cstApp', function($scope, $location, http2, srvUserNotice, $uibModal, cstApp) {
        var frameState, lsearch;
        /* 恢复上一次访问的状态 */
        if (window.localStorage) {
            $scope.$watch('frameState', function(nv) {
                if (nv) {
                    window.localStorage.setItem("pl.fe.frameState", JSON.stringify(nv));
                }
            }, true);
            if (frameState = window.localStorage.getItem("pl.fe.frameState")) {
                frameState = JSON.parse(frameState);
            } else {
                frameState = {
                    sid: '',
                    view: '',
                    scope: ''
                };
            }
        } else {
            frameState = {
                sid: '',
                view: '',
                scope: ''
            };
        }
        /* 通过参数指定的状态 */
        lsearch = $location.search();
        if (lsearch.sid) {
            frameState.sid = lsearch.sid;
        }
        if (lsearch.view) {
            frameState.view = lsearch.view;
            if (lsearch.scope) {
                frameState.scope = lsearch.scope;
            }
        }
        $scope.opened = '';
        $scope.frameState = frameState;
        $scope.matterNames = cstApp.matterNames;
        $scope.$on('$locationChangeSuccess', function(event, currentRoute) {
            var subView = currentRoute.match(/[^\/]+$/)[0];
            subView.indexOf('?') !== -1 && (subView = subView.substr(0, subView.indexOf('?')));
            subView = subView === 'fe' ? 'main' : subView;
            if (subView !== frameState.view) {
                frameState.view = subView;
                if (frameState.view === 'main') {
                    frameState.scope = 'mission';
                } else if (frameState.view === 'friend') {
                    frameState.scope = 'subscribeSite';
                }
            }
            switch (frameState.scope) {
                case 'mission':
                case 'activity':
                case 'doc':
                case 'user':
                case 'recycle':
                    $scope.opened = 'main';
                    break;
                case 'subscribeSite':
                case 'contributeSite':
                case 'favorSite':
                    $scope.opened = 'friend';
                    break;
                default:
                    $scope.opened = '';
            }
        });
        var url = '/rest/pl/fe/user/get?_=' + (new Date * 1);
        http2.get(url, function(rsp) {
            $scope.loginUser = rsp.data;
        });
        $scope.getMatterTag = function() {
            http2.get('/rest/pl/fe/matter/tag/listTags?site=' + $scope.frameState.sid, function(rsp) {
                $scope.tagsMatter = rsp.data;
            });
        };
        $scope.closeNotice = function(log) {
            srvUserNotice.closeNotice(log).then(function(rsp) {
                $scope.notice.logs.splice($scope.notice.logs.indexOf(log), 1);
                $scope.notice.page.total--;
            });
        };
        srvUserNotice.uncloseList().then(function(result) {
            $scope.notice = result;
        });
        $scope.changeScope = function(scope) {
            frameState.scope = scope;
            if (location.search) {
                $location.url('/rest/pl/fe');
            }
        };
        $scope.openSite = function(id) {
            location.href = '/rest/pl/fe/site/setting?site=' + id;
        };
        $scope.createSite = function() {
            var url = '/rest/pl/fe/site/create?_=' + (new Date * 1);

            http2.get(url, function(rsp) {
                location.href = '/rest/pl/fe/site/setting?site=' + rsp.data.id;
            });
        };
        /*新建素材*/
        var _fns = {
            addLink: function(site) {
                http2.get('/rest/pl/fe/matter/link/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/link?site=' + site.id + '&id=' + rsp.data.id;
                });
            },
            addArticle: function(site) {
                http2.get('/rest/pl/fe/matter/article/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/article?site=' + site.id + '&id=' + rsp.data.id;
                });
            },
            addNews: function(site) {
                http2.get('/rest/pl/fe/matter/news/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/news?site=' + site.id + '&id=' + rsp.data.id;
                });
            },
            addChannel: function(site) {
                http2.get('/rest/pl/fe/matter/channel/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/channel?site=' + site.id + '&id=' + rsp.data.id;
                });
            },
            addEnroll: function(site, scenario) {
                location.href = '/rest/pl/fe/matter/enroll/shop?site=' + site.id + '&scenario=' + (scenario || '');
            },
            addSignin: function(site) {
                http2.get('/rest/pl/fe/matter/signin/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/signin?site=' + site.id + '&id=' + rsp.data.id;
                });
            },
            addGroup: function(site) {
                http2.get('/rest/pl/fe/matter/group/create?site=' + site.id + '&scenario=split', function(rsp) {
                    location.href = '/rest/pl/fe/matter/group/main?site=' + site.id + '&id=' + rsp.data.id;
                });
            },
            addLottery: function(site) {
                http2.get('/rest/pl/fe/matter/lottery/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/lottery?site=' + site.id + '&id=' + rsp.data;
                });
            },
            addContribute: function(site) {
                http2.get('/rest/pl/fe/matter/contribute/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/contribute?site=' + site.id + '&id=' + rsp.data.id;
                });
            },
            addCustom: function(site) {
                http2.get('/rest/pl/fe/matter/custom/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/custom?site=' + site.id + '&id=' + rsp.data;
                });
            },
            addMerchant: function(site) {
                http2.get('/rest/pl/fe/matter/merchant/shop/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/merchant/shop?site=' + site.id + '&id=' + rsp.data;
                });
            },
            addWall: function(site) {
                http2.get('/rest/pl/fe/matter/wall/create?site=' + site.id, function(rsp) {
                    location.href = '/rest/pl/fe/matter/wall?site=' + site.id + '&id=' + rsp.data;
                });
            },
            addText: function(site) {
                location.href = '/rest/pl/fe/matter/text?site=' + site.id;
            }
        };

        function addMatter(site, matterType, scenario) {
            $('body').click();
            var fnName = 'add' + matterType[0].toUpperCase() + matterType.substr(1);
            _fns[fnName].call(_fns, site, scenario);
        }
        $scope.addMatter = function(matterType, scenario) {
            if (matterType == 'site') {
                var url = '/rest/pl/fe/site/create?_=' + (new Date * 1);
                http2.get(url, function(rsp) {
                    location.href = '/rest/pl/fe/site/setting?site=' + rsp.data.id;
                });
            }
            if (frameState.sid != '') {
                var site = { id: frameState.sid };
                addMatter(site, matterType, scenario);
            } else {
                var url = '/rest/pl/fe/site/list?_=' + (new Date() * 1);
                http2.get(url, function(rsp) {
                    var sites = rsp.data;
                    if (sites.length === 1) {
                        addMatter(sites[0], matterType, scenario);
                    } else if (sites.length === 0) {
                        createSite().then(function(site) {
                            addMatter(site, matterType, scenario);
                        });
                    } else {
                        $uibModal.open({
                            templateUrl: 'addMatterSite.html',
                            dropback: 'static',
                            controller: ['$scope', '$uibModalInstance', function($scope2, $mi) {
                                var data;
                                $scope2.mySites = sites;
                                $scope2.data = data = {};
                                $scope2.ok = function() {
                                    if (data.index !== undefined) {
                                        $mi.close(sites[data.index]);
                                    } else {
                                        $mi.dismiss();
                                    }
                                };
                                $scope2.cancel = function() {
                                    $mi.dismiss();
                                };
                            }]
                        }).result.then(function(site) {
                            addMatter(site, matterType, scenario);
                        });
                    }
                });
            }
        };
        $scope.list = function() {
            $scope.siteType = 1;
            var url = '/rest/pl/fe/site/list';
            http2.get(url + '?_=' + (new Date() * 1), function(rsp) {
                if (rsp.data.length === 0) {
                    http2.get('/rest/pl/fe/site/create', function(rsp) {
                        http2.get(url + '?_=' + (new Date() * 1), function(rsp) {
                            $scope.sites = rsp.data;
                            frameState.sid = rsp.data[0].id;
                        });
                    });
                } else {
                    $scope.sites = rsp.data;
                }
            });
        };
        $scope.matterTagsFram = function(filter, filter2) {
            var oTags, tagsOfData;
            tagsOfData = filter2.byTags;
            oTags = $scope.tagsMatter;
            $uibModal.open({
                templateUrl: 'tagMatterData.html',
                controller: ['$scope', '$uibModalInstance', function($scope2, $mi) {
                    var model;
                    $scope2.apptags = oTags;
                    $scope2.model = model = {
                        selected: []
                    };
                    if (tagsOfData) {
                        tagsOfData.forEach(function(oTag) {
                            var index;
                            if (-1 !== (index = $scope2.apptags.indexOf(oTag))) {
                                model.selected[$scope2.apptags.indexOf(oTag)] = true;
                            }
                        });
                    }
                    $scope2.cancel = function() { $mi.dismiss(); };
                    $scope2.ok = function() {
                        var addMatterTag = [];
                        model.selected.forEach(function(selected, index) {
                            if (selected) {
                                addMatterTag.push($scope2.apptags[index]);
                            }
                        });
                        filter2.byTags = addMatterTag;
                        angular.extend(filter, filter2);
                        $mi.close();
                    };
                }],
                backdrop: 'static',
            });
        };
        $scope.list();
        var isNavCollapsed = false;
        if (document.body.clientWidth <= 768) {
            isNavCollapsed = true;
        }
        $scope.isNavCollapsed = { frame: isNavCollapsed, activity: isNavCollapsed };
    }]);
    /***/
    require(['domReady!'], function(document) {
        angular.bootstrap(document, ["app"]);
    });
    /***/
    return ngApp;
});