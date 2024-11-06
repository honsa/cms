/*! For license information please see sites.js.LICENSE.txt */
!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";e=function(){return n};var r,n={},o=Object.prototype,i=o.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},s="function"==typeof Symbol?Symbol:{},c=s.iterator||"@@iterator",l=s.asyncIterator||"@@asyncIterator",u=s.toStringTag||"@@toStringTag";function d(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{d({},"")}catch(r){d=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof b?e:b,i=Object.create(o.prototype),s=new _(n||[]);return a(i,"_invoke",{value:E(t,r,s)}),i}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}n.wrap=f;var h="suspendedStart",v="suspendedYield",m="executing",y="completed",g={};function b(){}function w(){}function C(){}var S={};d(S,c,(function(){return this}));var x=Object.getPrototypeOf,L=x&&x(x(j([])));L&&L!==o&&i.call(L,c)&&(S=L);var T=C.prototype=b.prototype=Object.create(S);function $(t){["next","throw","return"].forEach((function(e){d(t,e,(function(t){return this._invoke(e,t)}))}))}function G(e,r){function n(o,a,s,c){var l=p(e[o],e,a);if("throw"!==l.type){var u=l.arg,d=u.value;return d&&"object"==t(d)&&i.call(d,"__await")?r.resolve(d.__await).then((function(t){n("next",t,s,c)}),(function(t){n("throw",t,s,c)})):r.resolve(d).then((function(t){u.value=t,s(u)}),(function(t){return n("throw",t,s,c)}))}c(l.arg)}var o;a(this,"_invoke",{value:function(t,e){function i(){return new r((function(r,o){n(t,e,r,o)}))}return o=o?o.then(i,i):i()}})}function E(t,e,n){var o=h;return function(i,a){if(o===m)throw new Error("Generator is already running");if(o===y){if("throw"===i)throw a;return{value:r,done:!0}}for(n.method=i,n.arg=a;;){var s=n.delegate;if(s){var c=D(s,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=m;var l=p(t,e,n);if("normal"===l.type){if(o=n.done?y:v,l.arg===g)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=y,n.method="throw",n.arg=l.arg)}}}function D(t,e){var n=e.method,o=t.iterator[n];if(o===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=r,D(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=p(o,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,g;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function A(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function j(e){if(e||""===e){var n=e[c];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function t(){for(;++o<e.length;)if(i.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=r,t.done=!0,t};return a.next=a}}throw new TypeError(t(e)+" is not iterable")}return w.prototype=C,a(T,"constructor",{value:C,configurable:!0}),a(C,"constructor",{value:w,configurable:!0}),w.displayName=d(C,u,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,C):(t.__proto__=C,d(t,u,"GeneratorFunction")),t.prototype=Object.create(T),t},n.awrap=function(t){return{__await:t}},$(G.prototype),d(G.prototype,l,(function(){return this})),n.AsyncIterator=G,n.async=function(t,e,r,o,i){void 0===i&&(i=Promise);var a=new G(f(t,e,r,o),i);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},$(T),d(T,u,"Generator"),d(T,c,(function(){return this})),d(T,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=j,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return s.type="throw",s.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=i.call(a,"catchLoc"),l=i.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:j(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}},n}function r(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}var n;n=jQuery,Craft.SitesAdmin=Garnish.Base.extend({$groups:null,$selectedGroup:null,init:function(){var t=this;this.$groups=n("#groups"),this.$selectedGroup=this.$groups.find("a.sel:first"),this.addListener(n("#newgroupbtn"),"activate","addNewGroup");var e=n("#groupsettingsbtn");e.length&&(e.data("menubtn").settings.onOptionSelect=function(e){var r=n(e);if(!r.hasClass("disabled"))switch(r.data("action")){case"rename":t.renameSelectedGroup();break;case"delete":t.deleteSelectedGroup()}})},addNewGroup:function(){this.promptForGroupName("").then((function(t){if(t){var e={name:t};Craft.sendActionRequest("POST","sites/save-group",{data:e}).then((function(t){location.href=Craft.getUrl("settings/sites",{groupId:t.data.group.id})})).catch((function(t){var e;null!=t&&null!==(e=t.response)&&void 0!==e&&null!==(e=e.data)&&void 0!==e&&e.errors?Craft.cp.displayError(Craft.t("app","Could not create the group:")+"\n\n"+t.response.data.errors.join("\n")):Craft.cp.displayError()}))}})).catch((function(){}))},renameSelectedGroup:function(){var t=this;this.promptForGroupName(this.$selectedGroup.data("raw-name")).then((function(e){var r={id:t.$selectedGroup.data("id"),name:e};Craft.sendActionRequest("POST","sites/save-group",{data:r}).then((function(r){t.$selectedGroup.text(r.data.group.name),t.$selectedGroup.data("raw-name",e),Craft.cp.displaySuccess(Craft.t("app","Group renamed."))})).catch((function(t){var e;null!=t&&null!==(e=t.response)&&void 0!==e&&null!==(e=e.data)&&void 0!==e&&e.errors?Craft.cp.displayError(Craft.t("app","Could not rename the group:")+"\n\n"+t.response.data.errors.join("\n")):Craft.cp.displayError()}))})).catch((function(){}))},promptForGroupName:function(t){return new Promise((function(o,i){Craft.sendActionRequest("POST","sites/rename-group-field",{data:{name:t}}).then(function(){var a,s=(a=e().mark((function r(a){var s,c,l,u,d,f;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=n("<form/>",{class:"modal prompt"}).appendTo(Garnish.$bod),c=n("<div/>",{class:"body"}).append(a.data.html).appendTo(s),l=n("<div/>",{class:"buttons right"}).appendTo(c),u=n("<button/>",{type:"button",class:"btn",text:Craft.t("app","Cancel")}).appendTo(l),n("<button/>",{type:"submit",class:"btn submit",text:Craft.t("app","Save")}).appendTo(l),e.next=7,Craft.appendBodyHtml(a.data.js);case 7:d=!1,f=new Garnish.Modal(s,{onShow:function(){setTimeout((function(){Craft.setFocusWithin(c)}),100)},onHide:function(){d||i()}}),s.on("submit",(function(e){e.preventDefault();var r=n(".text",c).val();r&&r!==t&&(o(r),d=!0),f.hide()})),u.on("click",(function(){f.hide()}));case 11:case"end":return e.stop()}}),r)})),function(){var t=this,e=arguments;return new Promise((function(n,o){var i=a.apply(t,e);function s(t){r(i,n,o,s,c,"next",t)}function c(t){r(i,n,o,s,c,"throw",t)}s(void 0)}))});return function(t){return s.apply(this,arguments)}}())}))},deleteSelectedGroup:function(){if(confirm(Craft.t("app","Are you sure you want to delete this group?"))){var t={id:this.$selectedGroup.data("id")};Craft.sendActionRequest("POST","sites/delete-group",{data:t}).then((function(){location.href=Craft.getUrl("settings/sites")})).catch((function(){Craft.cp.displayError()}))}},flattenErrors:function(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&(e=e.concat(t[r]));return e}}),Craft.SiteAdminTable=Craft.AdminTable.extend({confirmDeleteModal:null,$rowToDelete:null,$deleteActionRadios:null,$deleteSubmitBtn:null,_deleting:!1,confirmDeleteItem:function(t){var e=this;return this.confirmDeleteModal&&(this.confirmDeleteModal.destroy(),delete this.confirmDeleteModal),this._createConfirmDeleteModal(t),Garnish.isMobileBrowser(!0)||setTimeout((function(){e.$deleteActionRadios.first().focus()}),100),!1},validateDeleteInputs:function(){var t=this.$deleteActionRadios.eq(0).prop("checked")||this.$deleteActionRadios.eq(1).prop("checked");return t?this.$deleteSubmitBtn.removeClass("disabled"):this.$deleteSubmitBtn.addClass("disabled"),t},submitDeleteSite:function(t){var e=this;if(t.preventDefault(),!this._deleting&&this.validateDeleteInputs()){this.$deleteSubmitBtn.addClass("loading"),this.disable(),this._deleting=!0;var r={id:this.getItemId(this.$rowToDelete)};this.$deleteActionRadios.eq(0).prop("checked")&&(r.transferContentTo=this.$transferSelect.val()),this.$deleteSubmitBtn.removeClass("loading"),Craft.sendActionRequest("POST",this.settings.deleteAction,{data:r}).then((function(t){e._deleting=!1,e.enable(),e.confirmDeleteModal.hide(),e.handleDeleteItemSuccess(t.data,e.$rowToDelete)}))}},_createConfirmDeleteModal:function(t){this.$rowToDelete=t;var e=this.getItemId(t),r=this.getItemName(t),o=n('<form id="confirmdeletemodal" class="modal fitted" method="post" accept-charset="UTF-8"/>').appendTo(Garnish.$bod),i=n('<div class="body"><p>'+Craft.t("app","What do you want to do with any content that is only available in {language}?",{language:r})+'</p><div class="options"><label><input type="radio" name="contentAction" value="transfer"/> '+Craft.t("app","Transfer it to:")+'</label> <div id="transferselect" class="select"><select/></div></div><div><label><input type="radio" name="contentAction" value="delete"/> '+Craft.t("app","Delete it")+"</label></div></div>").appendTo(o),a=n('<div class="buttons right"/>').appendTo(i),s=n("<button/>",{type:"button",class:"btn",text:Craft.t("app","Cancel")}).appendTo(a);this.$deleteActionRadios=i.find("input[type=radio]"),this.$transferSelect=n("#transferselect").find("> select"),this.$deleteSubmitBtn=Craft.ui.createSubmitButton({class:"disabled",label:Craft.t("app","Delete {site}",{site:r}),spinner:!0}).appendTo(a);for(var c=0;c<Craft.sites.length;c++)Craft.sites[c].id!=e&&this.$transferSelect.append('<option value="'+Craft.sites[c].id+'">'+Craft.escapeHtml(Craft.sites[c].name)+"</option>");this.confirmDeleteModal=new Garnish.Modal(o),this.addListener(s,"click",(function(){this.confirmDeleteModal.hide()})),this.addListener(this.$deleteActionRadios,"change","validateDeleteInputs"),this.addListener(o,"submit","submitDeleteSite")}})}();
//# sourceMappingURL=sites.js.map