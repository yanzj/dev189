!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=61)}({0:function(e,t){function n(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var r=i(o);return[n].concat(o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"})).concat([r]).join("\n")}return[n].join("\n")}function i(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var i=n(t,e);return t[2]?"@media "+t[2]+"{"+i+"}":i}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(i[r]=!0)}for(o=0;o<e.length;o++){var s=e[o];"number"==typeof s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},1:function(e,t,n){function i(e,t){for(var n=0;n<e.length;n++){var i=e[n],o=h[i.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](i.parts[r]);for(;r<i.parts.length;r++)o.parts.push(d(i.parts[r],t))}else{for(var s=[],r=0;r<i.parts.length;r++)s.push(d(i.parts[r],t));h[i.id]={id:i.id,refs:1,parts:s}}}}function o(e,t){for(var n=[],i={},o=0;o<e.length;o++){var r=e[o],s=t.base?r[0]+t.base:r[0],a=r[1],c=r[2],l=r[3],d={css:a,media:c,sourceMap:l};i[s]?i[s].parts.push(d):n.push(i[s]={id:s,parts:[d]})}return n}function r(e,t){var n=g(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=x[x.length-1];if("top"===e.insertAt)i?i.nextSibling?n.insertBefore(t,i.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function s(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function a(e){var t=document.createElement("style");return e.attrs.type="text/css",l(t,e.attrs),r(e,t),t}function c(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",l(t,e.attrs),r(e,t),t}function l(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function d(e,t){var n,i,o,r;if(t.transform&&e.css){if(!(r=t.transform(e.css)))return function(){};e.css=r}if(t.singleton){var l=b++;n=v||(v=a(t)),i=u.bind(null,n,l,!1),o=u.bind(null,n,l,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(t),i=f.bind(null,n,t),o=function(){s(n),n.href&&URL.revokeObjectURL(n.href)}):(n=a(t),i=p.bind(null,n),o=function(){s(n)});return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}function u(e,t,n,i){var o=n?"":i.css;if(e.styleSheet)e.styleSheet.cssText=w(t,o);else{var r=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function p(e,t){var n=t.css,i=t.media;if(i&&e.setAttribute("media",i),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function f(e,t,n){var i=n.css,o=n.sourceMap,r=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||r)&&(i=y(i)),o&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([i],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}var h={},m=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),g=function(e){var t={};return function(n){return void 0===t[n]&&(t[n]=e.call(this,n)),t[n]}}(function(e){return document.querySelector(e)}),v=null,b=0,x=[],y=n(3);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},t.attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=m()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=o(e,t);return i(n,t),function(e){for(var r=[],s=0;s<n.length;s++){var a=n[s],c=h[a.id];c.refs--,r.push(c)}if(e){i(o(e,t),t)}for(var s=0;s<r.length;s++){var c=r[s];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete h[c.id]}}}};var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},10:function(e,t,n){"use strict";function i(e,t){var n,i,o;n=document.createDocumentFragment(),i=document.createElement("div"),i.setAttribute("id","frmPlugin"),o=document.createElement("iframe"),i.appendChild(o),i.onclick=function(){i.parentNode.removeChild(i)},n.appendChild(i),document.body.appendChild(n),0===e.indexOf("http")?(window.onClosePlugin=function(){i.parentNode.removeChild(i),t&&t()},o.setAttribute("src",e)):o.contentDocument&&o.contentDocument.body&&(o.contentDocument.body.innerHTML=e)}angular.module("siteuser.ui.xxt",[]).service("tmsSiteUser",function(){this.showSwitch=function(e,t){var n;n=document.createElement("div"),n.classList.add("tms-switch","tms-switch-siteuser"),n.addEventListener("click",function(n){n.preventDefault(),n.stopPropagation();var o="http://"+location.host;o+="/rest/site/fe/user",o+="?site="+e,t?location.href=o:i(o)},!0),document.body.appendChild(n)}})},18:function(e,t,n){"use strict";n(5),n(2),n(4),angular.module("forward.ui.xxt",["page.ui.xxt","modal.ui.xxt"]).service("tmsForward",["$rootScope","$http","$q","tmsDynaPage","tmsModal",function(e,t,n,i,o){function r(e){var i,o;return o=n.defer(),i="/rest/pl/fe/site/forward/sitesByUser?site="+e.siteid+"&id="+e.id+"&type="+e.type+"&_="+1*new Date,t.get(i).success(function(e){0==e.err_code&&o.resolve(e.data)}),o.promise}this.open=function(e){var t;t='<div class="modal-header"><span class="modal-title">转发到哪个团队和频道</span></div>',t+='<div class="modal-body">',t+='<div ng-repeat="site in mySites">',t+="<span>{{site.name}}</span>",t+='<div class="checkbox" ng-repeat="chn in site.homeChannels">',t+="<label>",t+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='chn._selected' ng-change=\"choose(site,chn)\">",t+="<span>{{chn.title}}</span>",t+="</label>",t+="</div>",t+='<div ng-if="site.homeChannels.length===0"><a href="" ng-click="createChannel(site)">创建</a>团队主页频道，转发内容到团队主页</div>',t+="</div>",t+='<div ng-if="mySites.length===0"><a href="" ng-click="createSite()">创建</a>团队，转发内容到团队主页</div>',t+="</div>",t+='<div class="modal-footer"><button class="btn btn-default" ng-click="cancel()">关闭</button><button class="btn btn-success" ng-click="ok()">确定</button></div>',o.open({template:t,controller:["$http","$scope","$tmsModalInstance",function(t,n,i){var o=[];r(e).then(function(e){var t=e;t.forEach(function(e){e._selected=e._recommended}),n.mySites=t}),n.createChannel=function(e){t.post("/rest/pl/fe/matter/channel/create?site="+e.id,{}).success(function(n){var i=n.data;t.post("/rest/pl/fe/site/setting/page/addHomeChannel?site="+e.id,i).success(function(t){e.homeChannels.push(t.data)})})},n.createSite=function(){t.get("/rest/pl/fe/site/create").success(function(e){var t=e.data;t._selected="N",t.homeChannels=[],n.mySites=[t]})},n.choose=function(e,t){"Y"===t._selected?(t.siteid=e.id,o.push(t)):o.splice(o.indexOf(t),1)},n.ok=function(){var n=[];o.length&&(o.forEach(function(e){n.push({siteid:e.siteid,channelId:e.channel_id})}),t.post("/rest/pl/fe/site/forward/push?id="+e.id+"&type="+e.type,n).success(function(){i.close()}))},n.cancel=function(){i.dismiss()}}]})},this.showSwitch=function(t,n){var o,r=this;o=document.createElement("div"),o.classList.add("tms-switch","tms-switch-forward"),o.addEventListener("click",function(o){o.preventDefault(),o.stopPropagation(),e.$apply(function(){t.loginExpire?r.open(n):i.openPlugin("http://"+location.host+"/rest/site/fe/user/login?site="+n.siteid).then(function(e){t.loginExpire=e.loginExpire,r.open(n)})})},!0),document.body.appendChild(o)}}])},19:function(e,t,n){"use strict";n(5),n(4),angular.module("subscribe.ui.xxt",["modal.ui.xxt"]).service("tmsSubscribe",["$http","tmsModal",function(e,t){this.open=function(n,i){var o;o='<div class="modal-header"><span class="modal-title">关注团队，接收该团队发布的内容</span></div>',o+='<div class="modal-body">',o+='<div class="checkbox">',o+="<label>",o+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='atSite._selected'>",o+="<span>个人账户</span>",o+="<span ng-if=\"atSite._subscribed==='Y'\">（已关注）</span>",o+="</label>",o+="</div>",o+='<div class="checkbox" ng-repeat="site in mySites">',o+="<label>",o+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='site._selected'>",o+="<span>{{site.name}}</span>",o+="<span ng-if=\"site._subscribed==='Y'\">（已关注）</span>",o+="</label>",o+="</div>",o+='<div ng-if="mySites.length===0"><a href="" ng-click="createSite()">创建</a>团队进行关注，方便团队内共享信息</div>',o+="</div>",o+='<div class="modal-footer"><button class="btn btn-default" ng-click="cancel()">关闭</button><button class="btn btn-success" ng-click="ok()">确定</button></div>',t.open({template:o,controller:["$scope","$tmsModalInstance",function(t,n){e.get("/rest/site/home/get?site="+i.id+"&_="+1*new Date).success(function(e){var n=e.data;n._selected=n._subscribed,t.atSite=n}),e.get("/rest/pl/fe/site/subscribe/sitesByUser?site="+i.id+"&_="+1*new Date).success(function(e){if(0==e.err_code){var n=e.data;n.forEach(function(e){e._selected=e._subscribed}),t.mySites=n}}),t.createSite=function(){e.get("/rest/pl/fe/site/create").success(function(e){var n=e.data;n._subscribed=n._selected="N",t.mySites=[n]})},t.ok=function(){var e;e={atSite:t.atSite,mySites:t.mySites},n.close(e)},t.cancel=function(){n.dismiss()}}]}).result.then(function(t){var n,o,r;if(o=t.atSite,o&&o._selected!==o._subscribed&&(n="Y"===o._selected?"/rest/site/fe/user/site/subscribe?site="+i.id+"&target="+o.id:"/rest/site/fe/user/site/unsubscribe?site="+i.id+"&target="+o.id,e.get(n)),r=t.mySites){var s=[],a=[];if(r.forEach(function(e){e._selected!==e._subscribed&&("Y"===e._selected?s.push(e.id):a.push(e.id))}),s.length){var n="/rest/pl/fe/site/subscribe/do?site="+i.id;n+="&subscriber="+s.join(","),e.get(n)}}})}}])},2:function(module,exports,__webpack_require__){"use strict";var ngMod=angular.module("page.ui.xxt",[]);ngMod.directive("dynamicHtml",["$compile",function(e){return{restrict:"EA",replace:!0,link:function(t,n,i){t.$watch(i.dynamicHtml,function(i){i&&i.length&&(n.html(i),e(n.contents())(t))})}}}]),ngMod.service("tmsDynaPage",["$q",function($q){this.loadCss=function(e){var t,n;t=document.createElement("style"),t.innerHTML=e,n=document.querySelector("head"),n.appendChild(t)},this.loadExtCss=function(e){var t,n;t=document.createElement("link"),t.href=e,t.rel="stylesheet",n=document.querySelector("head"),n.appendChild(t)},this.loadJs=function(ngApp,js){!function(ngApp){eval(js)}(ngApp)},this.loadScript=function(e){var t,n,i=$q.defer();return n=function(){var o;o=document.createElement("script"),o.src=e[t],o.onload=function(){t++,t<e.length?n():i.resolve()},document.body.appendChild(o)},e&&(angular.isString(e)&&(e=[e]),e.length&&(t=0,n())),i.promise},this.loadExtJs=function(e,t){var n,i=this,o=$q.defer(),r=t.ext_js.length;return n=function(n){var s;s=document.createElement("script"),s.src=n.url,s.onload=function(){0===--r&&(t.js&&t.js.length&&i.loadJs(e,t.js),o.resolve())},document.body.appendChild(s)},t.ext_js&&t.ext_js.length&&t.ext_js.forEach(n),o.promise},this.loadCode=function(e,t){var n=this,i=$q.defer();return t.ext_css&&t.ext_css.length&&t.ext_css.forEach(function(e){n.loadExtCss(e.url)}),t.css&&t.css.length&&this.loadCss(t.css),t.ext_js&&t.ext_js.length?n.loadExtJs(e,t).then(function(){i.resolve()}):(t.js&&t.js.length&&n.loadJs(e,t.js),i.resolve()),i.promise},this.openPlugin=function(e){var t,n,i,o=$q.defer();return t=document.createDocumentFragment(),n=document.createElement("div"),n.setAttribute("id","frmPlugin"),i=document.createElement("iframe"),n.appendChild(i),n.onclick=function(){n.parentNode.removeChild(n)},t.appendChild(n),document.body.appendChild(t),0===e.indexOf("http")?(window.onClosePlugin=function(e){n.parentNode.removeChild(n),o.resolve(e)},i.setAttribute("src",e)):i.contentDocument&&i.contentDocument.body&&(i.contentDocument.body.innerHTML=e),o.promise}}])},25:function(e,t,n){"use strict";n(2),n(10),n(19),n(7),n(18),n(9),n(6);var i=angular.module("app",["page.ui.xxt","snsshare.ui.xxt","siteuser.ui.xxt","subscribe.ui.xxt","favor.ui.xxt","forward.ui.xxt","coinpay.ui.xxt"]);i.config(["$controllerProvider",function(e){i.provider={controller:e.register}}]),i.directive("tmsScroll",[function(){function e(e,t){var n=e.target,i=n.scrollTop;0===i?t.$parent.uppermost&&t.$parent.uppermost(n):i===n.scrollHeight-n.clientHeight?t.$parent.downmost&&t.$parent.downmost(n):void 0===n.__lastScrollTop||i>n.__lastScrollTop?t.$parent.upward&&t.$parent.upward(n):t.$parent.downward&&t.$parent.downward(n),n.__lastScrollTop=i}function t(e,t){for(var n=t.length-1;n>=0;n--)t[n].scrollHeight===t[n].clientHeight&&e.downmost&&angular.isString(e.downmost)&&e.$parent.downmost&&e.$parent.downmost(t[n])}return{restrict:"EA",scope:{upward:"@",downward:"@",uppermost:"@",downmost:"@",ready:"="},link:function(n,i,o){o.ready?n.$watch("ready",function(e){"Y"===e&&t(n,i)}):window.addEventListener("load",function(){t(n,i)});for(var r=i.length-1;r>=0;r--)i[r].onscroll=function(t){var i=t.target;i.__timer&&clearTimeout(i.__timer),i.__timer=setTimeout(function(){e(t,n)},35)}}}}]),i.filter("filesize",function(){return function(e){var t;return e/1024<1?t="B":(e/=1024,e/1024<1?t="K":(e/=1024,t="M")),(e=new Number(e).toFixed(2))+t}}),i.controller("ctrlMain",["$scope","$http","$timeout","$q","tmsDynaPage","tmsSubscribe","tmsSnsShare","tmsCoinPay","tmsFavor","tmsForward","tmsSiteUser",function(e,t,n,o,r,s,a,c,l,d,u){function p(){var e;e=document.querySelector(".loading"),e.parentNode.removeChild(e)}function f(){if(p(),n(function(){var e;e=document.querySelectorAll("audio"),e.length>0&&e[0].play()}),e.code="/rest/site/fe/matter/article/qrcode?site="+v+"&url="+encodeURIComponent(location.href),window.sessionStorage){var t;(t=window.sessionStorage.getItem("xxt.site.fe.matter.article.auth.pending"))&&(window.sessionStorage.removeItem("xxt.site.fe.matter.article.auth.pending"),e.user.loginExpire&&(t=JSON.parse(t),e[t.name].apply(e,t.args||[])))}}function h(){var n=o.defer();return t.get("/rest/site/fe/matter/article/get?site="+v+"&id="+b).success(function(o){var s=o.data.site,p=o.data.mission,f=o.data.article,h=f.channels;if("Y"===f.use_site_header&&s&&s.header_page&&r.loadCode(i,s.header_page),"Y"===f.use_mission_header&&p&&p.header_page&&r.loadCode(i,p.header_page),"Y"===f.use_mission_footer&&p&&p.footer_page&&r.loadCode(i,p.footer_page),"Y"===f.use_site_footer&&s&&s.footer_page&&r.loadCode(i,s.footer_page),h&&h.length)for(var m,g=0,x=h.length;g<x;g++)m=h[g],m.style_page&&r.loadCode(i,m.style_page);if(e.site=s,e.mission=p,e.article=f,e.user=o.data.user,/MicroMessenger|Yixin/i.test(navigator.userAgent)){var y,w,_;_=location.search.match(/shareby=([^&]*)/)?location.search.match(/shareby=([^&]*)/)[1]:"",y=e.user.uid+"_"+1*new Date,w="http://"+location.hostname+"/rest/site/fe/matter",w+="?site="+v,w+="&type=article",w+="&id="+b,w+="&shareby="+y,a.config({siteId:v,logger:function(e){var n="/rest/site/fe/matter/logShare";n+="?shareid="+y,n+="&site="+v,n+="&id="+b,n+="&type=article",n+="&title="+f.title,n+="&shareto="+e,n+="&shareby="+_,t.get(n)},jsApiList:["hideOptionMenu","onMenuShareTimeline","onMenuShareAppMessage"]}),a.set(f.title,w,f.summary,f.pic)}"Y"===f.can_picviewer&&r.loadScript(["/static/js/hammer.min.js","/asset/js/xxt.ui.picviewer.js"]),document.querySelector(".tms-switch-favor")?e.favor=function(e,t){event.preventDefault(),event.stopPropagation(),e.loginExpire?l.open(t):r.openPlugin("http://"+location.host+"/rest/site/fe/user/login?site="+t.siteid).then(function(n){e.loginExpire=n.loginExpire,l.open(t)})}:l.showSwitch(e.user,f),document.querySelector(".tms-switch-forward")?e.forward=function(e,t){event.preventDefault(),event.stopPropagation(),e.loginExpire?d.open(t):r.openPlugin("http://"+location.host+"/rest/site/fe/user/login?site="+t.siteid).then(function(n){e.loginExpire=n.loginExpire,d.open(t)})}:d.showSwitch(e.user,f),"Y"===f.can_coinpay&&(document.querySelector(".tms-switch-coinpay")||c.showSwitch(f.siteid,"article,"+f.id)),"Y"===f.can_siteuser&&(document.querySelector(".tms-switch-siteuser")?e.siteUser=function(e){event.preventDefault(),event.stopPropagation();var t="http://"+location.host;t+="/rest/site/fe/user",t+="?site="+v,location.href=t}:u.showSwitch(f.siteid,!0)),t.post("/rest/site/fe/matter/logAccess?site="+v+"&id="+b+"&type=article&title="+f.title+"&shareby="+_,{search:location.search.replace("?",""),referer:document.referrer}),e.dataReady="Y",n.resolve()}).error(function(e,t){401===t?r.openPlugin(e).then(function(){h().then(f)}):alert(e)}),n.promise}var m=document.body.clientWidth;e.width=m;var g,v,b;g=location.search,v=g.match(/[\?&]site=([^&]*)/)[1],b=g.match(/(\?|&)id=([^&]*)/)[2],e.openChannel=function(e){location.href="/rest/site/fe/matter?site="+v+"&type=channel&id="+e.id},e.searchByTag=function(e){location.href="/rest/site/fe/matter/article?site="+v+"&tagid="+e.id},e.openMatter=function(e,t,n){e.preventDefault(),e.stopPropagation(),/article|custom|news|channel|link/.test(n)?location.href="/rest/site/fe/matter?site="+v+"&id="+t+"&type="+n:location.href="/rest/site/fe/matter/"+n+"?site="+v+"&app="+t},e.subscribeSite=function(){if(e.user.loginExpire)s.open(e.user,e.site);else{if(window.sessionStorage){var t=JSON.stringify({name:"subscribeSite"});window.sessionStorage.setItem("xxt.site.fe.matter.article.auth.pending",t)}location.href="/rest/site/fe/user/login?site="+v}},document.querySelector("#gototop").addEventListener("click",function(){document.querySelector(".article").scrollTop=0}),h().then(f)}])},3:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,i=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o))return e;var r;return r=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:i+o.replace(/^\.\//,""),"url("+JSON.stringify(r)+")"})}},4:function(e,t,n){"use strict";angular.module("modal.ui.xxt",[]).service("tmsModal",["$rootScope","$compile","$q","$controller",function(e,t,n,i){this.open=function(o){var r,s=n.defer(),a=n.defer(),c={result:s.promise,closed:a.promise,close:function(e){document.body.removeChild(p[0]),s.resolve(e)},dismiss:function(e){document.body.removeChild(p[0]),a.resolve(e)}};r=e.$new(!0),o.controller&&i(o.controller,{$scope:r,$tmsModalInstance:c});var l,d,u,p;return l=angular.element("<div></div>"),l.attr({class:"modal-content","ng-style":"{'z-index':1060}"}).append(o.template),d=angular.element("<div></div>"),d.attr({class:"modal-dialog"}).append(l),u=angular.element("<div></div>"),u.attr({class:"modal-backdrop","ng-style":"{'z-index':1040}"}),p=angular.element("<div></div>"),p.attr({class:"modal","ng-style":"{'z-index':1050}",tabindex:-1}).append(d).append(u),t(p)(r),document.body.appendChild(p[0]),c}}])},5:function(e,t,n){var i=n(8);"string"==typeof i&&(i=[[e.i,i,""]]);var o={};o.transform=void 0;n(1)(i,o);i.locals&&(e.exports=i.locals)},6:function(module,exports,__webpack_require__){"use strict";var ngMod=angular.module("snsshare.ui.xxt",[]);ngMod.service("tmsSnsShare",["$http",function($http){function setWxShare(e,t,n,i,o){window.wx.onMenuShareTimeline({title:o.descAsTitle?n:e,link:t,imgUrl:i,success:function(){try{o.logger&&o.logger("T")}catch(e){alert("share failed:"+e.message)}},cancel:function(){}}),window.wx.onMenuShareAppMessage({title:e,desc:n,link:t,imgUrl:i,success:function(){try{o.logger&&o.logger("F")}catch(e){alert("share failed:"+e.message)}},cancel:function(){}})}function setYxShare(e,t,n,i,o){var r={img_url:i,link:t,title:e,desc:n};window.YixinJSBridge.on("menu:share:appmessage",function(e){try{o.logger&&o.logger("F")}catch(e){alert("share failed:"+e.message)}window.YixinJSBridge.invoke("sendAppMessage",r,function(e){})}),window.YixinJSBridge.on("menu:share:timeline",function(e){try{o.logger&&o.logger("T")}catch(e){alert("share failed:"+e.message)}window.YixinJSBridge.invoke("shareTimeline",r,function(e){})})}this.config=function(e){this.options=e},this.set=function(title,link,desc,img,fnOther){var _this=this;if(img&&-1===img.indexOf("http")&&(img="http://"+location.host+img),/MicroMessenger/i.test(navigator.userAgent)){var script;script=document.createElement("script"),script.src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js",script.onload=function(){var xhr,url;xhr=new XMLHttpRequest,url="/rest/site/fe/wxjssdksignpackage?site="+_this.options.siteId+"&url="+encodeURIComponent(location.href.split("#")[0]),xhr.open("GET",url,!0),xhr.onreadystatechange=function(){if(4==xhr.readyState)if(xhr.status>=200&&xhr.status<400){var signPackage;try{eval("("+xhr.responseText+")"),signPackage&&(signPackage.debug=!1,signPackage.jsApiList=_this.options.jsApiList,wx.config(signPackage),setWxShare(title,link,desc,img,_this.options))}catch(e){alert("local error:"+e.toString())}}else alert("http error:"+xhr.statusText)},xhr.send()},document.body.appendChild(script)}else/Yixin/i.test(navigator.userAgent)?void 0===window.YixinJSBridge?document.addEventListener("YixinJSBridgeReady",function(){setYxShare(title,link,desc,img,_this.options)},!1):setYxShare(title,link,desc,img,_this.options):fnOther&&"function"==typeof fnOther&&fnOther(title,link,desc,img)}}])},61:function(e,t,n){e.exports=n(25)},7:function(e,t,n){"use strict";n(5),n(2),n(4),angular.module("favor.ui.xxt",["page.ui.xxt","modal.ui.xxt"]).service("tmsFavor",["$rootScope","$http","$q","tmsDynaPage","tmsModal",function(e,t,n,i,o){function r(e){var i,o;return o=n.defer(),i="/rest/site/fe/user/favor/byUser",i+="?site="+e.siteid,i+="&id="+e.id,i+="&type="+e.type,t.get(i).success(function(e){o.resolve(e.data)}),o.promise}function s(e){var i,o;return o=n.defer(),i="/rest/site/fe/user/favor/add",i+="?site="+e.siteid,i+="&id="+e.id,i+="&type="+e.type,t.get(i).success(function(e){o.resolve(e.data)}),o.promise}function a(e){var i,o;return o=n.defer(),i="/rest/site/fe/user/favor/remove",i+="?site="+e.siteid,i+="&id="+e.id,i+="&type="+e.type,t.get(i).success(function(e){o.resolve(e.data)}),o.promise}function c(e){var i,o;return o=n.defer(),i="/rest/pl/fe/site/favor/sitesByUser?site="+e.siteid+"&id="+e.id+"&type="+e.type+"&_="+1*new Date,t.get(i).success(function(e){0==e.err_code&&o.resolve(e.data)}),o.promise}function l(e,i){var o,r;return r=n.defer(),o="/rest/pl/fe/site/favor/add?id="+e.id+"&type="+e.type,t.post(o,i).success(function(e){r.resolve(e.data)}),r.promise}function d(e,i){var o,r;return r=n.defer(),o="/rest/pl/fe/site/favor/remove?id="+e.id+"&type="+e.type,t.post(o,i).success(function(e){r.resolve(e.data)}),r.promise}this.open=function(e){var n;n='<div class="modal-header"><span class="modal-title">指定收藏位置</span></div>',n+='<div class="modal-body">',n+='<div class="checkbox">',n+="<label>",n+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='person._selected'>",n+="<span>个人账户</span>",n+="<span ng-if=\"person._favored==='Y'\">（已收藏）</span>",n+="</label>",n+="</div>",n+='<div class="checkbox" ng-repeat="site in mySites">',n+="<label>",n+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='site._selected'>",n+="<span>{{site.name}}</span>",n+="<span ng-if=\"site._favored==='Y'\">（已收藏）</span>",n+="</label>",n+="</div>",n+='<div ng-if="mySites.length===0"><a href="" ng-click="createSite()">创建</a>团队进行收藏，方便团队内共享信息</div>',n+="</div>",n+='<div class="modal-footer"><button class="btn btn-default" ng-click="cancel()">关闭</button><button class="btn btn-success" ng-click="ok()">确定</button></div>',o.open({template:n,controller:["$scope","$tmsModalInstance",function(n,i){r(e).then(function(e){n.person={_favored:e?"Y":"N"},n.person._selected=n.person._favored}),c(e).then(function(e){var t=e;t.forEach(function(e){e._selected=e._favored}),n.mySites=t}),n.createSite=function(){t.get("/rest/pl/fe/site/create").success(function(e){var t=e.data;t._favored=t._selected="N",n.mySites=[t]})},n.ok=function(){var e;e={person:n.person,mySites:n.mySites},i.close(e)},n.cancel=function(){i.dismiss()}}]}).result.then(function(t){var n,i;if(n=t.person,n&&n._selected!==n._favored&&("Y"===n._selected?s(e):a(e)),i=t.mySites){var o=[],r=[];i.forEach(function(e){e._selected!==e._favored&&("Y"===e._selected?o.push(e.id):r.push(e.id))}),o.length&&l(e,o),r.length&&d(e,r)}})},this.showSwitch=function(t,n){var o,r=this;o=document.createElement("div"),o.classList.add("tms-switch","tms-switch-favor"),o.addEventListener("click",function(o){o.preventDefault(),o.stopPropagation(),e.$apply(function(){t.loginExpire?r.open(n):i.openPlugin("http://"+location.host+"/rest/site/fe/user/login?site="+n.siteid).then(function(e){t.loginExpire=e.loginExpire,r.open(n)})})},!0),document.body.appendChild(o)}}])},8:function(e,t,n){t=e.exports=n(0)(void 0),t.push([e.i,".modal{display:block;overflow:hidden;outline:0;overflow-x:hidden;overflow-y:auto;opacity:1}.modal,.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0}.modal-backdrop{background-color:#000;opacity:.5}.modal-dialog{z-index:1055;margin:0;position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;outline:0;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}button.close{-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0}.close{float:right;font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}}",""])},9:function(e,t,n){"use strict";function i(e,t){var n,i,o;n=document.createDocumentFragment(),i=document.createElement("div"),i.setAttribute("id","frmPlugin"),o=document.createElement("iframe"),i.appendChild(o),i.onclick=function(){i.parentNode.removeChild(i)},n.appendChild(i),document.body.appendChild(n),0===e.indexOf("http")?(window.onClosePlugin=function(){i.parentNode.removeChild(i),t&&t()},o.setAttribute("src",e)):o.contentDocument&&o.contentDocument.body&&(o.contentDocument.body.innerHTML=e)}angular.module("coinpay.ui.xxt",[]).service("tmsCoinPay",function(){this.showSwitch=function(e,t){var n;n=document.createElement("div"),n.classList.add("tms-switch","tms-switch-coinpay"),n.addEventListener("click",function(n){n.preventDefault(),n.stopPropagation();var o="http://"+location.host;o+="/rest/site/fe/coin/pay",o+="?site="+e,o+="&matter="+t,i(o)},!0),document.body.appendChild(n)}})}});