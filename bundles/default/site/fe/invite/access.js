!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=131)}({10:function(module,exports,__webpack_require__){"use strict";var ngMod=angular.module("snsshare.ui.xxt",[]);ngMod.service("tmsSnsShare",["$http",function($http){function setWxShare(e,t,n,i,r){window.wx.onMenuShareTimeline({title:r.descAsTitle?n:e,link:t,imgUrl:i,success:function(){try{r.logger&&r.logger("T")}catch(e){alert("share failed:"+e.message)}},cancel:function(){},fail:function(){alert("shareT: fail")}}),window.wx.onMenuShareAppMessage({title:e,desc:n,link:t,imgUrl:i,success:function(){try{r.logger&&r.logger("F")}catch(e){alert("share failed:"+e.message)}},cancel:function(){},fail:function(){alert("shareF: fail")}})}function setYxShare(e,t,n,i,r){var s={img_url:i,link:t,title:e,desc:n};window.YixinJSBridge.on("menu:share:appmessage",function(e){try{r.logger&&r.logger("F")}catch(e){alert("share failed:"+e.message)}window.YixinJSBridge.invoke("sendAppMessage",s,function(e){})}),window.YixinJSBridge.on("menu:share:timeline",function(e){try{r.logger&&r.logger("T")}catch(e){alert("share failed:"+e.message)}window.YixinJSBridge.invoke("shareTimeline",s,function(e){})})}var _isReady=!1;this.config=function(e){this.options=e},this.set=function(title,link,desc,img,fnOther){var _this=this;if(img&&-1===img.indexOf(location.protocol)&&(img=location.protocol+"//"+location.host+img),_isReady)/MicroMessenger/i.test(navigator.userAgent)?setWxShare(title,link,desc,img,_this.options):/Yixin/i.test(navigator.userAgent)?setYxShare(title,link,desc,img,_this.options):fnOther&&"function"==typeof fnOther&&fnOther(title,link,desc,img);else if(/MicroMessenger/i.test(navigator.userAgent)){var script;script=document.createElement("script"),script.src=location.protocol+"//res.wx.qq.com/open/js/jweixin-1.0.0.js",script.onload=function(){var xhr,url;xhr=new XMLHttpRequest,url="/rest/site/fe/wxjssdksignpackage?site="+_this.options.siteId+"&url="+encodeURIComponent(location.href.split("#")[0]),xhr.open("GET",url,!0),xhr.onreadystatechange=function(){if(4==xhr.readyState)if(xhr.status>=200&&xhr.status<400){var signPackage;try{eval("("+xhr.responseText+")"),signPackage&&(signPackage.debug=!1,signPackage.jsApiList=_this.options.jsApiList,wx.config(signPackage),wx.ready(function(){setWxShare(title,link,desc,img,_this.options),_isReady=!0}),wx.error(function(e){alert(JSON.stringify(e))}))}catch(e){alert("local error:"+e.toString())}}else alert("http error:"+xhr.statusText)},xhr.send()},document.body.appendChild(script)}else/Yixin/i.test(navigator.userAgent)?void 0===window.YixinJSBridge?document.addEventListener("YixinJSBridgeReady",function(){setYxShare(title,link,desc,img,_this.options),_isReady=!0},!1):(setYxShare(title,link,desc,img,_this.options),_isReady=!0):fnOther&&"function"==typeof fnOther&&(fnOther(title,link,desc,img),_isReady=!0)}}])},131:function(e,t,n){e.exports=n(65)},3:function(e,t,n){"use strict";var i=angular.module("http.ui.xxt",[]);i.provider("tmsLocation",function(){var e;this.config=function(t){e=t||location.pathname},this.$get=["$location",function(t){return e||(e=location.pathname),{s:function(){return t.search()},j:function(n){var i=e,r=[];n&&n.length&&(i+="/"+n);for(var s=1,a=arguments.length;s<a;s++)r.push(arguments[s]+"="+(t.search()[arguments[s]]||""));return r.length&&(i+="?"+r.join("&")),i}}}]}),i.service("http2",["$rootScope","$http","$timeout","$q","$sce","$compile",function(e,t,n,i,r,s){function a(t,n,i){var a;return r.trustAsHtml(t),a=angular.element("<div></div>"),a.attr({class:"tms-notice-box alert alert-"+(n||"info"),"ng-style":"{'z-index':1099}"}).html(t),i||a[0].addEventListener("click",function(){document.body.removeChild(a[0])},!0),s(a)(e),document.body.appendChild(a[0]),a[0]}function o(e){e&&document.body.removeChild(e)}function l(e){return!(!e.page||!angular.isObject(e.page))&&(void 0===e.page.at&&(e.page.at=1),void 0===e.page.size&&(e.page.size=12),void 0!==e.page.j&&angular.isFunction(e.page.j)||(e.page.j=function(){return"page="+this.at+"&size="+this.size}),!0)}function c(e,t,n){if(e){if(angular.isArray(e)){e.length>t.length&&e.splice(t.length-1,e.length-t.length);for(var i=0,r=t.length;i<r;i++)i<e.length?c(e[i],t[i]):e.push(t[i])}else if(angular.isObject(e)){for(var s in e)n&&-1!==n.indexOf(s)||(void 0===t[s]?delete e[s]:angular.isObject(t[s])&&angular.isObject(e[s])?c(e[s],t[s]):e[s]=t[s]);for(var s in t)n&&-1!==n.indexOf(s)||void 0===e[s]&&(e[s]=t[s])}}else e=t;return!0}this.get=function(e,r){var s,c,u=i.defer();return r=angular.extend({headers:{accept:"application/json"},parseResponse:!0,autoBreak:!0,autoNotice:!0,showProgress:!0,showProgressDelay:500,showProgressText:"正在获取数据..."},r),!0===r.showProgress&&(c=n(function(){c=null,s=a(r.showProgressText,"info")},r.showProgressDelay)),l(r)&&(e+=(-1===e.indexOf("?")?"?":"&")+r.page.j()),t.get(e,r).success(function(e){if(r.page&&void 0!==e.data.total&&(r.page.total=e.data.total),!0===r.showProgress&&(c&&n.cancel(c),s&&(o(s),s=null)),r.parseResponse)if(angular.isString(e)){if(r.autoNotice&&a(e,"warning"),r.autoBreak)return;u.reject(e)}else if(0!=e.err_code){if(r.autoNotice){var t;t=angular.isString(e.err_msg)?e.err_msg:angular.isArray(e.err_msg)?e.err_msg.join("<br>"):JSON.stringify(e.err_msg),a(t,"warning")}if(r.autoBreak)return;u.reject(e)}else u.resolve(e);else u.resolve(e)}).error(function(e,t){!0===r.showProgress&&(c&&n.cancel(c),s&&(o(s),s=null)),a(null===e?"网络不可用":e,"danger")}),u.promise},this.post=function(e,r,s){var c,u,g=i.defer();return s=angular.extend({headers:{accept:"application/json"},parseResponse:!0,autoBreak:!0,autoNotice:!0,showProgress:!0,showProgressDelay:500,showProgressText:"正在获取数据..."},s),!0===s.showProgress&&(u=n(function(){u=null,c=a(s.showProgressText,"info")},s.showProgressDelay)),l(s)&&(e+=(-1===e.indexOf("?")?"?":"&")+s.page.j()),t.post(e,r,s).success(function(e){if(s.page&&void 0!==e.data.total&&(s.page.total=e.data.total),!0===s.showProgress&&(u&&n.cancel(u),c&&(o(c),c=null)),s.parseResponse)if(angular.isString(e)){if(s.autoNotice&&(a(e,"warning"),c=null),s.autoBreak)return;g.reject(e)}else if(0!=e.err_code){if(s.autoNotice){var t;t=angular.isString(e.err_msg)?e.err_msg:angular.isArray(e.err_msg)?e.err_msg.join("<br>"):JSON.stringify(e.err_msg),a(t,"warning")}if(s.autoBreak)return;g.reject(e)}else g.resolve(e);else g.resolve(e)}).error(function(e,t){!0===s.showProgress&&(u&&n.cancel(u),c&&(o(c),c=null)),a(null===e?"网络不可用":e,"danger")}),g.promise},this.merge=function(e,t,n){return!angular.equals(e,t)&&c(e,t,n)}}])},65:function(e,t,n){"use strict";n(3),n(10),angular.module("app",["ui.bootstrap","ui.tms","http.ui.xxt","snsshare.ui.xxt"]).controller("ctrlMain",["$scope","http2","tmsSnsShare",function(e,t,n){e.requireLogin=!1,e.data={},e.submit=function(){t.post("/rest/i/matterUrl?invite="+e.invite.id,e.data).then(function(e){location.href=e.data})},t.get("/rest/site/fe/user/get").then(function(i){var r,s,a;e.loginUser=r=i.data,a=location.search.match(/inviteCode=([^&]*)/)[1],r.unionid&&r.uname&&(/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/.test(r.uname)?s="mobile":/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(r.uname)&&(s="email")),t.get("/rest/site/fe/invite/get?inviteCode="+a).then(function(t){var i=t.data;if(e.invite=i,/MicroMessenger|Yixin/i.test(navigator.userAgent)){var a,o;location.search.match(/shareby=([^&]*)/)&&location.search.match(/shareby=([^&]*)/)[1],a=e.loginUser.uid+"_"+1*new Date,o=location.href+"&shareby="+a,n.config({siteId:i.matter_siteid,jsApiList:["hideOptionMenu","onMenuShareTimeline","onMenuShareAppMessage"]}),n.set(i.matter_title,o,i.matter_summary,i.matter_pic)}i.entryRule&&(e.entryRule=i.entryRule,"member"===i.entryRule.scope&&i.entryRule.mschemas&&i.entryRule.mschemas.length&&(e.mschema=i.entryRule.mschemas[0],e.data.member={schema_id:e.mschema.id},"mobile"===s&&e.mschema.attrs.mobile?e.data.member.mobile=r.uname:"email"===s&&e.mschema.attrs.email&&(e.data.member.email=r.uname),e.requireLogin=!0))})})}])}});