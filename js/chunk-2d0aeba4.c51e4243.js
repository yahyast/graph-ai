(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aeba4"],{"0afc":function(e,t,a){"use strict";a.r(t);var n,i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bdi-layouts"},[a("aside",{staticClass:"bdi-layouts__sidebar"},[a("router-link",{staticClass:"bdi-sidebar__logo logo-ai",attrs:{to:"/"}}),a("div",{staticClass:"bdi-sidebar__menu"},["BDI_SearchResult"==e.route_name?a("router-link",{staticClass:"menu-bdi",attrs:{to:"/bdi/search"}},[a("div",{staticClass:"box-icon"},[a("b-icon",{attrs:{name:"search"}})],1),a("span",[e._v("Cari BDI")])]):e._e(),a("router-link",{staticClass:"menu-bdi",attrs:{to:"/bdi/organisasi"}},[a("div",{staticClass:"box-icon"},[a("b-icon",{attrs:{name:"award"}})],1),a("span",[e._v("Organisasi")])]),a("router-link",{staticClass:"menu-bdi",attrs:{to:"/bdi/tokoh"}},[a("div",{staticClass:"box-icon"},[a("b-icon",{attrs:{name:"users"}})],1),a("span",[e._v("Tokoh")])]),a("router-link",{staticClass:"menu-bdi",attrs:{to:"/bdi/isu"}},[a("div",{staticClass:"box-icon"},[a("b-icon",{attrs:{name:"file-text"}})],1),a("span",[e._v("Isu")])]),a("router-link",{staticClass:"menu-bdi",attrs:{to:"/bdi/foto"}},[a("div",{staticClass:"box-icon"},[a("b-icon",{attrs:{name:"user-plus"}})],1),a("span",[e._v("Foto")])])],1),a("div",{staticClass:"bdi-sidebar__more"},[a("div",{directives:[{name:"closable-menu-sidebar-general-bdi",rawName:"v-closable-menu-sidebar-general-bdi",value:{exclude:["menuSidebarGeneralActiveBdi"],handler:"closeMenuGeneralSidebar"},expression:"{exclude: ['menuSidebarGeneralActiveBdi'], handler: 'closeMenuGeneralSidebar'}"}],staticClass:"floating-more",on:{click:function(t){return e.toggleMore()}}},[a("b-button",{attrs:{text:"Menu Lainnya",text_icon_left:"more-horizontal",kind:"tertiary"}})],1)])],1),a("div",{staticClass:"bdi-layouts__content"},[a("router-view")],1),a("div",{ref:"menuSidebarGeneralActiveBdi",staticClass:"card-menu-popup card-menu-popup--more",class:{"card-menu-popup--show":e.openMore}},[a("MenuSidebarGeneral")],1)])},s=[],o=(a("159b"),a("b0c0"),a("de5b")),r={name:"BdiPage",components:{MenuSidebarGeneral:o["a"]},directives:{"closable-menu-sidebar-general-bdi":{bind:function(e,t,a){n=function(n){n.stopPropagation();var i=t.value,s=i.handler,o=i.exclude,r=!1;o.forEach((function(e){if(!r){var t=a.context.$refs[e];t&&(r=t.contains(n.target))}})),e.contains(n.target)||r||a.context[s]()},document.addEventListener("click",n),document.addEventListener("touchstart",n)},unbind:function(){document.removeEventListener("click",n),document.removeEventListener("touchstart",n)}}},data:function(){return{openMore:!1}},computed:{route_name:function(){return this.$route.name}},methods:{toggleMore:function(){this.openMore=!this.openMore},closeMenuGeneralSidebar:function(){this.openMore=!1}}},c=r,d=a("2877"),u=Object(d["a"])(c,i,s,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0aeba4.c51e4243.js.map