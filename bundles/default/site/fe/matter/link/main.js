!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=163)}({0:function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=o(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([r]).join("\n")}return[n].join("\n")}function o(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=n(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<e.length;i++){var s=e[i];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},1:function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],i=h[o.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](o.parts[r]);for(;r<o.parts.length;r++)i.parts.push(d(o.parts[r],t))}else{for(var s=[],r=0;r<o.parts.length;r++)s.push(d(o.parts[r],t));h[o.id]={id:o.id,refs:1,parts:s}}}}function i(e,t){for(var n=[],o={},i=0;i<e.length;i++){var r=e[i],s=t.base?r[0]+t.base:r[0],a=r[1],l=r[2],c=r[3],d={css:a,media:l,sourceMap:c};o[s]?o[s].parts.push(d):n.push(o[s]={id:s,parts:[d]})}return n}function r(e,t){var n=g(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=x[x.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function s(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function a(e){var t=document.createElement("style");return e.attrs.type="text/css",c(t,e.attrs),r(e,t),t}function l(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",c(t,e.attrs),r(e,t),t}function c(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function d(e,t){var n,o,i,r;if(t.transform&&e.css){if(!(r=t.transform(e.css)))return function(){};e.css=r}if(t.singleton){var c=y++;n=v||(v=a(t)),o=u.bind(null,n,c,!1),i=u.bind(null,n,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),o=p.bind(null,n,t),i=function(){s(n),n.href&&URL.revokeObjectURL(n.href)}):(n=a(t),o=f.bind(null,n),i=function(){s(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else i()}}function u(e,t,n,o){var i=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=k(t,i);else{var r=document.createTextNode(i),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function f(e,t){var n=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function p(e,t,n){var o=n.css,i=n.sourceMap,r=void 0===t.convertToAbsoluteUrls&&i;(t.convertToAbsoluteUrls||r)&&(o=b(o)),i&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var s=new Blob([o],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}var h={},m=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),g=function(e){var t={};return function(n){return void 0===t[n]&&(t[n]=e.call(this,n)),t[n]}}(function(e){return document.querySelector(e)}),v=null,y=0,x=[],b=n(3);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},t.attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=m()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=i(e,t);return o(n,t),function(e){for(var r=[],s=0;s<n.length;s++){var a=n[s],l=h[a.id];l.refs--,r.push(l)}if(e){o(i(e,t),t)}for(var s=0;s<r.length;s++){var l=r[s];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete h[l.id]}}}};var k=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},163:function(e,t,n){e.exports=n(86)},23:function(e,t,n){"use strict";angular.module("modal.ui.xxt",[]).service("tmsModal",["$rootScope","$compile","$q","$controller",function(e,t,n,o){this.open=function(i){var r,s=n.defer(),a=n.defer(),l={result:s.promise,closed:a.promise,close:function(e){document.body.removeChild(f[0]),s.resolve(e)},dismiss:function(e){document.body.removeChild(f[0]),a.resolve(e)}};r=e.$new(!0),i.controller&&o(i.controller,{$scope:r,$tmsModalInstance:l});var c,d,u,f;return c=angular.element("<div></div>"),c.attr({class:"modal-content","ng-style":"{'z-index':1060}"}).append(i.template),d=angular.element("<div></div>"),d.attr({class:"modal-dialog"}).append(c),u=angular.element("<div></div>"),u.attr({class:"modal-backdrop","ng-style":"{'z-index':1040}"}),f=angular.element("<div></div>"),f.attr({class:"modal","ng-style":"{'z-index':1050}",tabindex:-1}).append(d).append(u),t(f)(r),document.body.appendChild(f[0]),l}}])},24:function(e,t,n){var o=n(30);"string"==typeof o&&(o=[[e.i,o,""]]);var i={};i.transform=void 0;n(1)(o,i);o.locals&&(e.exports=o.locals)},29:function(e,t,n){"use strict";n(24),n(4),n(23),angular.module("favor.ui.xxt",["page.ui.xxt","modal.ui.xxt"]).service("tmsFavor",["$rootScope","$http","$q","tmsDynaPage","tmsModal",function(e,t,n,o,i){function r(e){var o,i;return i=n.defer(),o="/rest/site/fe/user/favor/byUser",o+="?site="+e.siteid,o+="&id="+e.id,o+="&type="+e.type,t.get(o).success(function(e){i.resolve(e.data)}),i.promise}function s(e){var o,i;return i=n.defer(),o="/rest/site/fe/user/favor/add",o+="?site="+e.siteid,o+="&id="+e.id,o+="&type="+e.type,t.get(o).success(function(e){i.resolve(e.data)}),i.promise}function a(e){var o,i;return i=n.defer(),o="/rest/site/fe/user/favor/remove",o+="?site="+e.siteid,o+="&id="+e.id,o+="&type="+e.type,t.get(o).success(function(e){i.resolve(e.data)}),i.promise}function l(e){var o,i;return i=n.defer(),o="/rest/pl/fe/site/favor/sitesByUser?site="+e.siteid+"&id="+e.id+"&type="+e.type+"&_="+1*new Date,t.get(o).success(function(e){0==e.err_code&&i.resolve(e.data)}),i.promise}function c(e,o){var i,r;return r=n.defer(),i="/rest/pl/fe/site/favor/add?id="+e.id+"&type="+e.type,t.post(i,o).success(function(e){r.resolve(e.data)}),r.promise}function d(e,o){var i,r;return r=n.defer(),i="/rest/pl/fe/site/favor/remove?id="+e.id+"&type="+e.type,t.post(i,o).success(function(e){r.resolve(e.data)}),r.promise}this.open=function(e){var n;n='<div class="modal-header"><span class="modal-title">指定收藏位置</span></div>',n+='<div class="modal-body">',n+='<div class="checkbox">',n+="<label>",n+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='person._selected'>",n+="<span>个人账户</span>",n+="<span ng-if=\"person._favored==='Y'\">（已收藏）</span>",n+="</label>",n+="</div>",n+='<div class="checkbox" ng-repeat="site in mySites">',n+="<label>",n+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='site._selected'>",n+="<span>{{site.name}}</span>",n+="<span ng-if=\"site._favored==='Y'\">（已收藏）</span>",n+="</label>",n+="</div>",n+='<div ng-if="mySites.length===0"><a href="" ng-click="createSite()">创建</a>团队进行收藏，方便团队内共享信息</div>',n+="</div>",n+='<div class="modal-footer"><button class="btn btn-default" ng-click="cancel()">关闭</button><button class="btn btn-success" ng-click="ok()">确定</button></div>',i.open({template:n,controller:["$scope","$tmsModalInstance",function(n,o){r(e).then(function(e){n.person={_favored:e?"Y":"N"},n.person._selected=n.person._favored}),l(e).then(function(e){var t=e;t.forEach(function(e){e._selected=e._favored}),n.mySites=t}),n.createSite=function(){t.get("/rest/pl/fe/site/create").success(function(e){var t=e.data;t._favored=t._selected="N",n.mySites=[t]})},n.ok=function(){var e;e={person:n.person,mySites:n.mySites},o.close(e)},n.cancel=function(){o.dismiss()}}]}).result.then(function(t){var n,o;if(n=t.person,n&&n._selected!==n._favored&&("Y"===n._selected?s(e):a(e)),o=t.mySites){var i=[],r=[];o.forEach(function(e){e._selected!==e._favored&&("Y"===e._selected?i.push(e.id):r.push(e.id))}),i.length&&c(e,i),r.length&&d(e,r)}})},this.showSwitch=function(t,n){var i,r=this;i=document.createElement("div"),i.classList.add("tms-switch","tms-switch-favor"),i.addEventListener("click",function(i){i.preventDefault(),i.stopPropagation(),e.$apply(function(){t.loginExpire?r.open(n):o.openPlugin(location.protocol+"//"+location.host+"/rest/site/fe/user/access?site=platform#login").then(function(e){t.loginExpire=e.loginExpire,r.open(n)})})},!0),document.body.appendChild(i)}}])},3:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,o=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return e;var r;return r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")"})}},30:function(e,t,n){t=e.exports=n(0)(void 0),t.push([e.i,".modal{display:block;overflow:hidden;outline:0;overflow-x:hidden;overflow-y:auto;opacity:1}.modal,.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0}.modal-backdrop{background-color:#000;opacity:.5}.modal-dialog{z-index:1055;margin:0;position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;outline:0;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}button.close{-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0}.close{float:right;font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}}",""])},4:function(module,exports,__webpack_require__){"use strict";var ngMod=angular.module("page.ui.xxt",[]);ngMod.directive("dynamicHtml",["$compile",function(e){return{restrict:"EA",replace:!0,link:function(t,n,o){t.$watch(o.dynamicHtml,function(o){o&&o.length&&(n.html(o),e(n.contents())(t))})}}}]),ngMod.service("tmsDynaPage",["$q",function($q){this.loadCss=function(e){var t,n;t=document.createElement("style"),t.innerHTML=e,n=document.querySelector("head"),n.appendChild(t)},this.loadExtCss=function(e){var t,n;t=document.createElement("link"),t.href=e,t.rel="stylesheet",n=document.querySelector("head"),n.appendChild(t)},this.loadJs=function(ngApp,js){!function(ngApp){eval(js)}(ngApp)},this.loadScript=function(e){var t,n,o=$q.defer();return n=function(){var i;i=document.createElement("script"),i.src=e[t],i.onload=function(){t++,t<e.length?n():o.resolve()},document.body.appendChild(i)},e&&(angular.isString(e)&&(e=[e]),e.length&&(t=0,n())),o.promise},this.loadExtJs=function(e,t){var n,o=this,i=$q.defer(),r=t.ext_js.length;return n=function(n){var s;s=document.createElement("script"),s.src=n.url,s.onload=function(){0===--r&&(t.js&&t.js.length&&o.loadJs(e,t.js),i.resolve())},document.body.appendChild(s)},t.ext_js&&t.ext_js.length&&t.ext_js.forEach(n),i.promise},this.loadCode=function(e,t){var n=this,o=$q.defer();return t.ext_css&&t.ext_css.length&&t.ext_css.forEach(function(e){n.loadExtCss(e.url)}),t.css&&t.css.length&&this.loadCss(t.css),t.ext_js&&t.ext_js.length?n.loadExtJs(e,t).then(function(){o.resolve()}):(t.js&&t.js.length&&n.loadJs(e,t.js),o.resolve()),o.promise},this.openPlugin=function(e){var t,n,o,i,r,s;return s=$q.defer(),e||(console.log("参数为空"),s.reject()),document.documentElement.clientWidth>768?document.documentElement.scrollTop=0:document.body.scrollTop=0,r=document.getElementsByTagName("body")[0],i=document.getElementsByTagName("html")[0],i.style.cssText="height:100%;",r.style.cssText="height:100%;overflow-y:hidden",t=document.createDocumentFragment(),n=document.createElement("div"),n.setAttribute("id","frmPlugin"),o=document.createElement("iframe"),n.appendChild(o),n.onclick=function(){n.parentNode.removeChild(n),r.style.cssText="overflow-y:auto"},t.appendChild(n),document.body.appendChild(t),0===e.indexOf("http")?(window.onClosePlugin=function(e){n.parentNode.removeChild(n),r.style.cssText="overflow-y:auto",s.resolve(e)},o.setAttribute("src",e)):o.contentDocument&&o.contentDocument.body&&(o.contentDocument.body.innerHTML=e),s.promise}}])},5:function(module,exports,__webpack_require__){"use strict";var ngMod=angular.module("snsshare.ui.xxt",[]);ngMod.service("tmsSnsShare",["$http",function($http){function setWxShare(e,t,n,o,i){window.wx.onMenuShareTimeline({title:i.descAsTitle?n:e,link:t,imgUrl:o,success:function(){try{i.logger&&i.logger("T")}catch(e){alert("share failed:"+e.message)}},cancel:function(){},fail:function(){alert("shareT: fail")}}),window.wx.onMenuShareAppMessage({title:e,desc:n,link:t,imgUrl:o,success:function(){try{i.logger&&i.logger("F")}catch(e){alert("share failed:"+e.message)}},cancel:function(){},fail:function(){alert("shareF: fail")}})}var _isReady=!1;this.config=function(e){this.options=e},this.set=function(title,link,desc,img,fnOther){var _this=this;if(img&&-1===img.indexOf(location.protocol)&&(img=location.protocol+"//"+location.host+img),_isReady)/MicroMessenger/i.test(navigator.userAgent)?setWxShare(title,link,desc,img,_this.options):fnOther&&"function"==typeof fnOther&&fnOther(title,link,desc,img);else if(/MicroMessenger/i.test(navigator.userAgent)){var script;script=document.createElement("script"),script.src=location.protocol+"//res.wx.qq.com/open/js/jweixin-1.0.0.js",script.onload=function(){var xhr,url;xhr=new XMLHttpRequest,url="/rest/site/fe/wxjssdksignpackage?site="+_this.options.siteId+"&url="+encodeURIComponent(location.href.split("#")[0]),xhr.open("GET",url,!0),xhr.onreadystatechange=function(){if(4==xhr.readyState)if(xhr.status>=200&&xhr.status<400){var signPackage;try{eval("("+xhr.responseText+")"),signPackage&&(signPackage.debug=!1,signPackage.jsApiList=_this.options.jsApiList,wx.config(signPackage),wx.ready(function(){setWxShare(title,link,desc,img,_this.options),_isReady=!0}),wx.error(function(e){alert(JSON.stringify(e))}))}catch(e){alert("local error:"+e.toString())}}else alert("http error:"+xhr.statusText)},xhr.send()},document.body.appendChild(script)}else fnOther&&"function"==typeof fnOther&&(fnOther(title,link,desc,img),_isReady=!0)}}])},86:function(e,t,n){"use strict";n(29),n(5),angular.module("app",["ui.bootstrap","page.ui.xxt","favor.ui.xxt","snsshare.ui.xxt"]).config(["$locationProvider",function(e){e.html5Mode(!0)}]).controller("ctrl",["$scope","$location","$http","tmsFavor","tmsDynaPage","tmsSnsShare",function(e,t,n,o,i,r){var s,a,l,c;s=t.search().site,a=t.search().id,l=t.search().inviteToken,c=t.search().shareby?t.search().shareby:"",e.isSmallLayout=!1,e.isFull=!1,e.elSiteCard=angular.element(document.querySelector("#site-card")),window.screen&&window.screen.width<992&&(e.isSmallLayout=!0);var d=function(){var t,o;t=e.user.uid+"_"+1*new Date,r.config({siteId:s,logger:function(o){var i="/rest/site/fe/matter/logShare";i+="?shareid="+t,i+="&site="+s,i+="&id="+a,i+="&type=link",i+="&title="+e.link.title,i+="&shareto="+o,i+="&shareby="+c,n.get(i)},jsApiList:["hideOptionMenu","onMenuShareTimeline","onMenuShareAppMessage"]}),e.link.invite?o=location.protocol+"//"+location.host+"/i/"+e.link.invite.code:(o=location.href,/shareby=/.test(o)?o=o.replace(/shareby=[^&]*/,"shareby="+t):o+="&shareby="+t),r.set(e.link.title,o,e.link.summary,e.link.pic)};e.siteCardToggled=function(e){var t;e&&(t=document.querySelector("#site-card>.dropdown-menu"))&&(t.style.left="auto",t.style.right=0)},e.favor=function(e,t){e.loginExpire?o.open(t):i.openPlugin(location.protocol+"//"+location.host+"/rest/site/fe/user/access?site=platform#login").then(function(n){e.loginExpire=n.loginExpire,o.open(t)})},e.invite=function(e,t){e.loginExpire?location.href="/rest/site/fe/invite?matter=link,"+t.id+"&inviteToken="+l:i.openPlugin(location.protocol+"//"+location.host+"/rest/site/fe/user/access?site=platform#login").then(function(n){e.loginExpire=n.loginExpire,location.href="/rest/site/fe/invite?matter=link,"+t.id+"&inviteToken="+l})},e.siteUser=function(e){var t=location.protocol+"//"+location.host;t+="/rest/site/fe/user",t+="?site="+e,location.href=t},e.gotoNavApp=function(t){switch(t.type){case"enroll":location.href="/rest/site/fe/matter/enroll?site="+e.link.siteid+"&app="+t.id;break;case"article":case"channel":location.href="/rest/site/fe/matter?site="+e.link.siteid+"&id="+t.id+"&type="+t.type;break;case"link":location.href="/rest/site/fe/matter/link?site="+e.link.siteid+"&id="+t.id+"&type="+t.type;break;default:alert("不支持此类型")}},n.get("/rest/site/home/get?site="+s).success(function(t){e.siteInfo=t.data,n.get("/rest/site/fe/matter/link/get?site="+s+"&id="+a).success(function(t){function o(){var e=event.touches[0];u=!0,p.x=e.clientX,p.y=e.clientY,g=f.offsetLeft,v=f.offsetTop}function i(){if(u){var e=event.touches[0];h=e.clientX-p.x,m=e.clientY-p.y,y=g+h,x=v+m,Math.abs(h)&&event.preventDefault(),y=y<=0?0:y>=f.parentNode.offsetWidth-f.offsetWidth?f.parentNode.offsetWidth-f.offsetWidth:y,x=x<=0?0:x>=f.parentNode.offsetHeight-f.offsetHeight?f.parentNode.offsetHeight-f.offsetHeight:x,f.style.left=y+"px",f.style.top=x+"px"}}function r(){u=!1}if(t.data){if(e.link=t.data.link,e.user=t.data.user,e.qrcode="/rest/site/fe/matter/link/qrcode?site="+s+"&url="+encodeURIComponent(location.href),-1!==Object.keys(e.link).indexOf("invite")){var c=e.link.fullUrl.length;"?"!==e.link.fullUrl.charAt(c-1)?e.link.fullUrl=e.link.fullUrl+"&inviteToken="+l:e.link.fullUrl=e.link.fullUrl+"inviteToken="+l}if(/MicroMessenge/i.test(navigator.userAgent)&&d(),document.querySelector("#link>iframe").setAttribute("src",e.link.fullUrl),n.post("/rest/site/fe/matter/logAccess?site="+s,{search:location.search.replace("?",""),referer:document.referrer,id:a,type:"link",title:e.link.title}),"number"==typeof window.screenX&&!0===e.isSmallLayout){var u,f,p,h,m,g,v,y,x;u=!1,f=document.getElementById("btnFS"),p={x:0,y:0},f.addEventListener("touchstart",function(){o()},!1),f.addEventListener("touchmove",function(){i()},!1),f.addEventListener("touchend",function(){r()},!1),f.addEventListener("click",function(t){e.isFull?(document.querySelector(".col-md-3").style.display="block",document.querySelector(".invite").style.display="block",document.querySelector("#matters").classList="visible-xs visibile-sm",this.innerText="开始体验",e.isFull=!1):(document.querySelector(".col-md-3").style.display="none",document.querySelector(".invite").style.display="none",document.querySelector("#matters").classList="hidden",this.innerText="退出体验",e.isFull=!0)})}}}).error(function(e,t){})})}])}});