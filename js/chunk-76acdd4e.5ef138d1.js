(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76acdd4e"],{bcaa:function(e,t,a){},c564:function(e,t,a){"use strict";a("bcaa")},d283:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("header",{staticClass:"header-page"},[a("div",{staticClass:"header-page__title"},[a("h1",[e._v(e._s(e.title))])]),a("div",{staticClass:"header-page__cta"},[a("ul",{staticClass:"breadcrumbs"},[e._m(0),a("li",[a("b-icon",{attrs:{name:"chevron-right"}})],1),e._m(1)])])])},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("span",[e._v("BDI")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("span",[e._v("Organisasi")])])}],i={name:"headerPage",props:{title:String}},l=i,o=a("2877"),n=Object(o["a"])(l,s,r,!1,null,null,null);t["a"]=n.exports},d61f:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bdi-layouts"},[a("GeneralSidebar"),a("div",{staticClass:"bdi-layouts__content"},[a("HeaderPage",{attrs:{title:"Profile"}}),a("div",{staticClass:"layout-general"},[a("div",{staticClass:"mb-12"},[a("form",{staticClass:"form-general card-bg-theme p-6 rounded shadow",on:{submit:function(t){return e.submit(t)}}},[a("div",{staticClass:"form-general__body"},[a("div",{staticClass:"grid grid-cols-11 gap-8 mb-16"},[e._m(0),a("div",{staticClass:"col-span-7"},[a("div",{staticClass:"field"},[e._m(1),a("input",{directives:[{name:"model",rawName:"v-model",value:e.model.name,expression:"model.name"}],staticClass:"field-style",attrs:{placeholder:"Name",type:"text"},domProps:{value:e.model.name},on:{input:function(t){t.target.composing||e.$set(e.model,"name",t.target.value)}}}),e.$v.model.name.$error?a("span",{staticClass:"field-message text-red-500"},[e._v("This name is required & max length is 255 char.")]):e._e(),""!==e.error_name?a("span",{staticClass:"field-message text-red-500"},[e._v(e._s(e.error_name))]):e._e()]),a("div",{staticClass:"field"},[a("label",{staticClass:"field-label"},[e._v("Username")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.model.username,expression:"model.username"}],staticClass:"field-style field-disabled",attrs:{placeholder:"Username",type:"text",readonly:""},domProps:{value:e.model.username},on:{input:function(t){t.target.composing||e.$set(e.model,"username",t.target.value)}}}),e.$v.model.username.$error?a("span",{staticClass:"field-message text-red-500"},[e._v("This username is required & max length is 255 char.")]):e._e(),""!==e.error_username?a("span",{staticClass:"field-message text-red-500"},[e._v(e._s(e.error_username))]):e._e()]),a("div",{staticClass:"field"},[a("label",{staticClass:"field-label"},[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.model.email,expression:"model.email"}],staticClass:"field-style field-disabled",attrs:{placeholder:"Email",type:"email",readonly:""},domProps:{value:e.model.email},on:{input:function(t){t.target.composing||e.$set(e.model,"email",t.target.value)}}}),e.$v.model.email.$error?a("span",{staticClass:"field-message text-red-500"},[e._v("This email is required & max length is 255 char.")]):e._e(),""!==e.error_email?a("span",{staticClass:"field-message text-red-500"},[e._v(e._s(e.error_email))]):e._e()]),a("div",{staticClass:"field"},[a("label",{staticClass:"field-label"},[e._v("Role")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.model.role_id,expression:"model.role_id"}],staticClass:"field-style field-disabled",attrs:{placeholder:"Role",type:"text",readonly:""},domProps:{value:e.model.role_id},on:{input:function(t){t.target.composing||e.$set(e.model,"role_id",t.target.value)}}})])])]),a("div",{staticClass:"grid grid-cols-11 gap-8 mb-16"},[e._m(2),a("div",{staticClass:"col-span-7"},[a("div",{staticClass:"field"},[a("label",{staticClass:"field-label"},[e._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.model.password,expression:"model.password"}],staticClass:"field-style",attrs:{placeholder:"Password",type:"password"},domProps:{value:e.model.password},on:{input:function(t){t.target.composing||e.$set(e.model,"password",t.target.value)}}}),e.$v.model.password.$error?a("span",{staticClass:"field-message text-red-500"},[e._v("This password minimum 6 characters & max length is 255 char.")]):e._e(),""!==e.error_password?a("span",{staticClass:"field-message text-red-500"},[e._v(e._s(e.error_password))]):e._e()]),a("div",{staticClass:"field"},[a("label",{staticClass:"field-label"},[e._v("Repeat Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.model.repeat_password,expression:"model.repeat_password"}],staticClass:"field-style",attrs:{placeholder:"Repeat Password",type:"password"},domProps:{value:e.model.repeat_password},on:{input:function(t){t.target.composing||e.$set(e.model,"repeat_password",t.target.value)}}}),e.$v.model.repeat_password.$error?a("span",{staticClass:"field-message text-red-500"},[e._v("This repeat password must be same as password.")]):e._e(),""!==e.error_repeat_password?a("span",{staticClass:"field-message text-red-500"},[e._v(e._s(e.error_repeat_password))]):e._e()])])])]),a("div",{staticClass:"form-general__footer"},[a("b-button",{attrs:{text:"Reset",type:"button"},nativeOn:{click:function(t){return e.reset()}}}),a("b-button",{attrs:{text:"Save",kind:"primary",type:"submit"}})],1)])])])],1)],1)},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-span-4 pr-12"},[a("h2",{staticClass:"text-xl font-bold mb-2"},[e._v("Informasi Akun")]),a("p",{staticClass:"text-gray-400"},[e._v("Pastikan Informasi akun diisi sesuai dengan informasi yang terbaru.")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"field-label"},[e._v("Name "),a("sup",[e._v("*")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-span-4 pr-12"},[a("h2",{staticClass:"text-xl font-bold mb-2"},[e._v("Kata Sandi")]),a("p",{staticClass:"text-gray-400"},[e._v("Silakan perbaharui kata sandi bila perlu. "),a("br"),e._v(" Lupa kata sandi saat ini? Silakan hubungi admin untuk melakukan perubahan.")])])}],i=a("1da1"),l=a("5530"),o=(a("96cf"),a("b0c0"),a("b64b"),a("caad"),a("2532"),a("d81d"),a("4de4"),a("f8f8")),n=a("d283"),d=a("2f62"),m=a("b5ae"),c={name:"Generalprofile",components:{GeneralSidebar:o["a"],HeaderPage:n["a"]},data:function(){return{model:{name:"",username:"",email:"",role_id:"",password:"",repeat_password:""},error_name:"",error_username:"",error_email:"",error_role_id:"",error_password:"",error_repeat_password:""}},validations:{model:{name:{required:m["required"],maxLength:Object(m["maxLength"])(255)},username:{},email:{},role_id:{},password:{minLength:Object(m["minLength"])(6),maxLength:Object(m["maxLength"])(255)},repeat_password:{required:Object(m["requiredIf"])((function(){return this.model.password.length>0})),minLength:Object(m["minLength"])(6),maxLength:Object(m["maxLength"])(255),sameAsPassword:Object(m["sameAs"])("password")}}},computed:Object(l["a"])({},Object(d["b"])("auth",["profile"])),watch:{profile:function(e){this.model.name=e.name?e.name:"",this.model.username=e.user_name?e.user_name:"",this.model.email=e.email?e.email:"",this.model.role_id=e.role&&e.role.name?e.role.name:""}},methods:{setEmptyModel:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];for(var t in Object.keys(this.model))!0===e&&(this.model[Object.keys(this.model)[t]]="")},setErrors:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;!0===e?(this.error_name="",this.error_username="",this.error_email="",this.error_role_id="",this.error_password="",this.error_repeat_password=""):!0!==e&&null!==t&&(this.error_name=t.name?t.name:"",this.error_username=t.username?t.username:"",this.error_email=t.email?t.email:"",this.error_role_id=t.role_id?t.role_id:"",this.error_password=t.password?t.password:"")},getData:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.reset(!0),t||Event.$emit("showLoading",!0),this.$store.dispatch("auth/getProfile").then((function(a){"success"===a?t?e.$swal.fire({icon:"success",title:"Data successfully updated!",timer:3e3}):Event.$emit("showLoading",!1):Event.$emit("error")}))},reset:function(){var e=arguments,t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:s=e.length>0&&void 0!==e[0]&&e[0],!0===s?(t.setEmptyModel(!0),t.$nextTick((function(){t.$v.$reset()})),t.setErrors(!0),window.scroll({top:0,left:0,behavior:"smooth"})):t.$swal.fire({icon:"warning",title:"Are you sure you want to reset form?",confirmButtonText:"Yes!",confirmButtonColor:"#DD6B55",showCancelButton:!0,allowOutsideClick:!1}).then((function(e){e.isConfirmed&&t.getData()}));case 2:case"end":return a.stop()}}),a)})))()},scrollToTop:function(){window.scroll({top:0,left:0,behavior:"smooth"})},submit:function(e){var t=this;if(e.preventDefault(),this.$v.$touch(),this.$v.model.$invalid){for(var a in Object.keys(this.$v.model)){var s=Object.keys(this.$v.model)[a];if(s.includes("$"))return!1;if(this.$v.model[s].$error)break}window.scroll({top:0,left:0,behavior:"smooth"})}else{Event.$emit("showLoading",!0);var r=Object.keys(this.model).filter((function(e){return"username"!==e&&"email"!==e&&"role_id"!==e})).map((function(e){return t.model[e]}));this.$store.dispatch("auth/updateProfile",r).then((function(e){"success"===e.result?t.getData(!0):e.data.message&&e.data.message.errors?(t.setErrors(!1,e.data.message.errors),Event.$emit("showLoading",!1)):Event.$emit("error")}))}}},beforeRouteEnter:function(e,t,a){a((function(e){e.getData()}))},beforeRouteLeave:function(e,t,a){a()},mounted:function(){}},u=c,p=a("2877"),_=Object(p["a"])(u,s,r,!1,null,null,null);t["default"]=_.exports},f8f8:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("aside",{staticClass:"bdi-layouts__sidebar"},[a("router-link",{staticClass:"bdi-sidebar__logo logo-ai",attrs:{to:"/"}}),a("div",{staticClass:"bdi-sidebar__menu general-menu"},[a("div",{staticClass:"back-bdi flex mb-4"},[a("b-icon",{staticClass:"mr-2",attrs:{name:"chevron-left"}}),a("router-link",{staticClass:"block",attrs:{to:"/bdi/isu"}},[e._v("Kumpulan BDI")])],1),a("div",{staticClass:"block mb-8"},[a("router-link",{staticClass:"block mb-2",attrs:{to:"/profile"}},[a("b-button",{attrs:{text:"Profil",text_icon_left:"user"}})],1),a("router-link",{staticClass:"block mb-2",class:"GeneralCasesIndex"===e.route_name||"GeneralCasesCreate"===e.route_name||"GeneralCasesEdit"===e.route_name?"router-link-exact-active":"",attrs:{to:"/cases"}},[a("b-button",{attrs:{text:"Kasus",text_icon_left:"tag"}})],1)],1),a("div",{staticClass:"block"},[a("p",{staticClass:"text-xs mb-3 ml-4 text-gray-400"},[e._v("Pengaturan Umum")]),a("router-link",{staticClass:"block mb-2",class:"GeneralRolesIndex"===e.route_name||"GeneralRolesCreate"===e.route_name||"GeneralRolesEdit"===e.route_name?"router-link-exact-active":"",attrs:{to:"/roles"}},[a("b-button",{attrs:{text:"Roles",text_icon_left:"layers"}})],1),a("router-link",{staticClass:"block mb-2",class:"GeneralUsersIndex"===e.route_name||"GeneralUsersCreate"===e.route_name||"GeneralUsersEdit"===e.route_name?"router-link-exact-active":"",attrs:{to:"/users"}},[a("b-button",{attrs:{text:"Users",text_icon_left:"user-check"}})],1),a("router-link",{staticClass:"block mb-2",class:"GeneralFeaturesIndex"===e.route_name||"GeneralFeaturesCreate"===e.route_name||"GeneralFeaturesEdit"===e.route_name?"router-link-exact-active":"",attrs:{to:"/features"}},[a("b-button",{attrs:{text:"Fitur",text_icon_left:"shuffle"}})],1)],1)])],1)},r=[],i=(a("b0c0"),{name:"sidebargeneral",data:function(){return{layer:'<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Layers</title><path d="M256 256c-13.47 0-26.94-2.39-37.44-7.17l-148-67.49C63.79 178.26 48 169.25 48 152.24s15.79-26 22.58-29.12l149.28-68.07c20.57-9.4 51.61-9.4 72.19 0l149.37 68.07c6.79 3.09 22.58 12.1 22.58 29.12s-15.79 26-22.58 29.11l-148 67.48C282.94 253.61 269.47 256 256 256zm176.76-100.86z"/><path d="M441.36 226.81L426.27 220l-38.77 17.74-94 43c-10.5 4.8-24 7.19-37.44 7.19s-26.93-2.39-37.42-7.19l-94.07-43L85.79 220l-15.22 6.84C63.79 229.93 48 239 48 256s15.79 26.08 22.56 29.17l148 67.63C229 357.6 242.49 360 256 360s26.94-2.4 37.44-7.19l147.87-67.61c6.81-3.09 22.69-12.11 22.69-29.2s-15.77-26.07-22.64-29.19z"/><path d="M441.36 330.8l-15.09-6.8-38.77 17.73-94 42.95c-10.5 4.78-24 7.18-37.44 7.18s-26.93-2.39-37.42-7.18l-94.07-43L85.79 324l-15.22 6.84C63.79 333.93 48 343 48 360s15.79 26.07 22.56 29.15l148 67.59C229 461.52 242.54 464 256 464s26.88-2.48 37.38-7.27l147.92-67.57c6.82-3.08 22.7-12.1 22.7-29.16s-15.77-26.07-22.64-29.2z"/></svg>'}},computed:{route_name:function(){return this.$route.name}},watch:{route_name:function(){}},methods:{},mounted:function(){console.log(this.route_name)}}),l=i,o=(a("c564"),a("2877")),n=Object(o["a"])(l,s,r,!1,null,null,null);t["a"]=n.exports}}]);
//# sourceMappingURL=chunk-76acdd4e.5ef138d1.js.map