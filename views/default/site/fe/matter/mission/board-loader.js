window.loading = {
    finish: function() {
        var eleLoading, eleStyle;
        eleLoading = document.querySelector('.loading');
        eleLoading.parentNode.removeChild(eleLoading);
    },
    load: function() {
        var timestamp, minutes;
        timestamp = new Date();
        minutes = timestamp.getMinutes();
        minutes = Math.floor(minutes / 5) * 5;
        timestamp.setMinutes(minutes);
        timestamp.setMilliseconds(0);
        timestamp.setSeconds(0);
        require.config({
            waitSeconds: 0,
            paths: {
                "domReady": '/static/js/domReady',
                "ui-tms": "/static/js/ui-tms",
                "matterService": "/views/default/pl/fe/_module/matter.service",
                "main": "/views/default/site/fe/matter/mission/board",
            },
            shim: {
                "angular": {
                    exports: "angular"
                },
            },
            urlArgs: function(id, url) {
                if (/domReady/.test(id)) {
                    return '';
                }
                return "?bust=" + (timestamp * 1);
            }
        });
        require(['ui-tms'], function() {
            require(['main'], function() {});
        });
    }
};
window.loading.load();