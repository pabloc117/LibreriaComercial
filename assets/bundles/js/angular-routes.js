!function(e,r){"use strict";function t(e,r){if(u(e)){r=r||[];for(var t=0,n=e.length;t<n;t++)r[t]=e[t]}else if(s(e)){r=r||{};for(var a in e)"$"===a.charAt(0)&&"$"===a.charAt(1)||(r[a]=e[a])}return r||e}function n(){function e(e,t){return r.extend(Object.create(e),t)}function n(e,r){var t=r.caseInsensitiveMatch,n={originalPath:e,regexp:e},a=n.keys=[];return e=e.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)(\*\?|[?*])?/g,function(e,r,t,n){var i="?"===n||"*?"===n?"?":null,o="*"===n||"*?"===n?"*":null;return a.push({name:t,optional:!!i}),r=r||"",""+(i?"":r)+"(?:"+(i?r:"")+(o&&"(.+?)"||"([^/]+)")+(i||"")+")"+(i||"")}).replace(/([\/$*])/g,"\\$1"),n.regexp=new RegExp("^"+e+"$",t?"i":""),n}u=r.isArray,s=r.isObject,l=r.isDefined,f=r.noop;var a={};this.when=function(e,i){var o=t(i);if(r.isUndefined(o.reloadOnSearch)&&(o.reloadOnSearch=!0),r.isUndefined(o.caseInsensitiveMatch)&&(o.caseInsensitiveMatch=this.caseInsensitiveMatch),a[e]=r.extend(o,e&&n(e,o)),e){var c="/"===e[e.length-1]?e.substr(0,e.length-1):e+"/";a[c]=r.extend({redirectTo:e},n(c,o))}return this},this.caseInsensitiveMatch=!1,this.otherwise=function(e){return"string"==typeof e&&(e={redirectTo:e}),this.when(null,e),this},h=!0,this.eagerInstantiationEnabled=function(e){return l(e)?(h=e,this):h},this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce","$browser",function(t,n,i,o,c,u,s,l){function h(e,r){var t=r.keys,n={};if(!r.regexp)return null;var a=r.regexp.exec(e);if(!a)return null;for(var i=1,o=a.length;i<o;++i){var c=t[i-1],u=a[i];c&&u&&(n[c.name]=u)}return n}function d(e){var n=y.current;R=C(),x=R&&n&&R.$$route===n.$$route&&r.equals(R.pathParams,n.pathParams)&&!R.reloadOnSearch&&!S,x||!n&&!R||t.$broadcast("$routeChangeStart",R,n).defaultPrevented&&e&&e.preventDefault()}function p(){var e=y.current,n=R;if(x)e.params=n.params,r.copy(e.params,i),t.$broadcast("$routeUpdate",e);else if(n||e){S=!1,y.current=n;var a=o.resolve(n);l.$$incOutstandingRequestCount(),a.then(v).then(g).then(function(o){return o&&a.then(m).then(function(a){n===y.current&&(n&&(n.locals=a,r.copy(n.params,i)),t.$broadcast("$routeChangeSuccess",n,e))})}).catch(function(r){n===y.current&&t.$broadcast("$routeChangeError",n,e,r)}).finally(function(){l.$$completeOutstandingRequest(f)})}}function v(e){var t={route:e,hasRedirection:!1};if(e)if(e.redirectTo)if(r.isString(e.redirectTo))t.path=P(e.redirectTo,e.params),t.search=e.params,t.hasRedirection=!0;else{var a=n.path(),i=n.search(),u=e.redirectTo(e.pathParams,a,i);r.isDefined(u)&&(t.url=u,t.hasRedirection=!0)}else if(e.resolveRedirectTo)return o.resolve(c.invoke(e.resolveRedirectTo)).then(function(e){return r.isDefined(e)&&(t.url=e,t.hasRedirection=!0),t});return t}function g(e){var r=!0;if(e.route!==y.current)r=!1;else if(e.hasRedirection){var t=n.url(),a=e.url;a?n.url(a).replace():a=n.path(e.path).search(e.search).replace().url(),a!==t&&(r=!1)}return r}function m(e){if(e){var t=r.extend({},e.resolve);r.forEach(t,function(e,n){t[n]=r.isString(e)?c.get(e):c.invoke(e,null,null,n)});var n=w(e);return r.isDefined(n)&&(t.$template=n),o.all(t)}}function w(e){var t,n;return r.isDefined(t=e.template)?r.isFunction(t)&&(t=t(e.params)):r.isDefined(n=e.templateUrl)&&(r.isFunction(n)&&(n=n(e.params)),r.isDefined(n)&&(e.loadedTemplateUrl=s.valueOf(n),t=u(n))),t}function C(){var t,i;return r.forEach(a,function(a,o){!i&&(t=h(n.path(),a))&&(i=e(a,{params:r.extend({},n.search(),t),pathParams:t}),i.$$route=a)}),i||a[null]&&e(a[null],{params:{},pathParams:{}})}function P(e,t){var n=[];return r.forEach((e||"").split(":"),function(e,r){if(0===r)n.push(e);else{var a=e.match(/(\w+)(?:[?*])?(.*)/),i=a[1];n.push(t[i]),n.push(a[2]||""),delete t[i]}}),n.join("")}var R,x,S=!1,y={routes:a,reload:function(){S=!0;var e={defaultPrevented:!1,preventDefault:function(){this.defaultPrevented=!0,S=!1}};t.$evalAsync(function(){d(e),e.defaultPrevented||p()})},updateParams:function(e){if(!this.current||!this.current.$$route)throw $("norout","Tried updating route when with no current route");e=r.extend({},this.current.params,e),n.path(P(this.current.$$route.originalPath,e)),n.search(e)}};return t.$on("$locationChangeStart",d),t.$on("$locationChangeSuccess",p),y}]}function a(e){h&&e.get("$route")}function i(){this.$get=function(){return{}}}function o(e,t,n){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,i,o,c,u){function s(){d&&(n.cancel(d),d=null),f&&(f.$destroy(),f=null),h&&(d=n.leave(h),d.done(function(e){e!==!1&&(d=null)}),h=null)}function l(){var o=e.current&&e.current.locals,c=o&&o.$template;if(r.isDefined(c)){var l=a.$new(),d=e.current,v=u(l,function(e){n.enter(e,null,h||i).done(function(e){e===!1||!r.isDefined($)||$&&!a.$eval($)||t()}),s()});h=v,f=d.scope=l,f.$emit("$viewContentLoaded"),f.$eval(p)}else s()}var f,h,d,$=o.autoscroll,p=o.onload||"";a.$on("$routeChangeSuccess",l),l()}}}function c(e,r,t){return{restrict:"ECA",priority:-400,link:function(n,a){var i=t.current,o=i.locals;a.html(o.$template);var c=e(a.contents());if(i.controller){o.$scope=n;var u=r(i.controller,o);i.controllerAs&&(n[i.controllerAs]=u),a.data("$ngControllerController",u),a.children().data("$ngControllerController",u)}n[i.resolveAs||"$resolve"]=o,c(n)}}}var u,s,l,f,h,d=r.module("ngRoute",[]).info({angularVersion:"1.6.4"}).provider("$route",n).run(a),$=r.$$minErr("ngRoute");a.$inject=["$injector"],d.provider("$routeParams",i),d.directive("ngView",o),d.directive("ngView",c),o.$inject=["$route","$anchorScroll","$animate"],c.$inject=["$compile","$controller","$route"]}(window,window.angular);