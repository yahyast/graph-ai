(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d225f0e"],{e717:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bdi-layouts bdi-layouts--form"},[s("aside",{staticClass:"bdi-layouts__sidebar bdi-layouts--form__sidebar"},[s("router-link",{staticClass:"bdi-sidebar__logo logo-ai",attrs:{to:"/"}}),s("div",{staticClass:"bdi-sidebar__menu"},[s("div",{staticClass:"back-bdi flex mb-4"},[s("b-icon",{staticClass:"mr-2",attrs:{name:"chevron-left"}}),s("router-link",{staticClass:"block",attrs:{to:"/bdi/isu"}},[t._v("Isu")])],1),(t.id,s("div",{staticClass:"detail-sidebar"},[s("router-link",{staticClass:"block",attrs:{to:"/isu/"+t.id+"/form/profil"}},[t._v("Informasi Umum")])],1))])],1),s("div",{staticClass:"bdi-layouts__content bdi-layouts--form__content"},[s("div",{staticClass:"content-bdi"},[s("div",{staticClass:"content-bdi__header"},[s("header",{staticClass:"form-general"},[s("h1",{staticClass:"text-2xl font-bold"},[t._v(t._s("create"===t.id?"Isu Baru":t.detail.title?"Ubah Isu - "+t.detail.title:"-"))])])]),s("div",{staticClass:"content-bdi__body"},[s("router-view",{attrs:{id:t.id}})],1)])])])},a=[],n=s("1da1"),r=s("5530"),o=(s("96cf"),s("2f62")),c={name:"BdiIssueForm",computed:Object(r["a"])({id:function(){return this.$route.params.id}},Object(o["b"])("issue",["detail"])),watch:{id:function(){}},methods:{getData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("create"===t.id){e.next=6;break}return Event.$emit("showLoading",!0),e.next=4,t.$store.dispatch("issue/getDetail",t.id).then((function(t){"success"===t?Event.$emit("showLoading",!1):Event.$emit("error")}));case 4:e.next=8;break;case 6:return e.next=8,t.$store.commit("issue/setDetail",{});case 8:case"end":return e.stop()}}),e)})))()}},created:function(){var t=this;console.log("created form issue global ",this.id),Event.$on("getDataIssue",(function(){t.getData()}))},beforeDestroy:function(){Event.$off("getDataIssue")}},d=c,l=s("2877"),u=Object(l["a"])(d,i,a,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d225f0e.7c5a45c5.js.map