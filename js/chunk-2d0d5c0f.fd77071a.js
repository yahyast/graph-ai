(window["t"]=window["t"]||[]).push([["chunk-2d0d5c0f"],{7044:function(t,e,a){"use strict";a.r(e);var i,r=function(){var t=this,e=t.i,a=t.s.o||e;return a("div",{l:"bdi-layouts"},[a("aside",{l:"bdi-layouts__sidebar"},[a("router-link",{l:"bdi-sidebar__logo logo-ai",u:{k:"/"}}),a("div",{l:"bdi-sidebar__menu"},[a("div",{l:"back-bdi flex mb-4"},[a("b-icon",{l:"mr-2",u:{name:"chevron-left"}}),a("router-link",{l:"block",u:{k:"/bdi/tokoh"}},[t.m("Kumpulan BDI")])],1),a("div",{l:"detail-sidebar"},[a("router-link",{l:"block",u:{k:"/tokoh/"+t.id+"/detail/profil"}},[t.m("Profil")]),a("router-link",{l:"block",u:{k:"/tokoh/"+t.id+"/detail/karakter"}},[t.m("Karakter")]),a("router-link",{l:"block",u:{k:"/tokoh/"+t.id+"/detail/ambisi"}},[t.m("Ambisi")]),a("router-link",{l:"block",u:{k:"/tokoh/"+t.id+"/detail/opini"}},[t.m("Opini")]),a("router-link",{l:"block",u:{k:"/tokoh/"+t.id+"/detail/kekuatan"}},[t.m("Kekuatan")]),a("router-link",{l:"block",u:{k:"/tokoh/"+t.id+"/detail/keluarga"}},[t.m("Keluarga")]),a("router-link",{l:"block",u:{k:"/tokoh/"+t.id+"/detail/aktivitas"}},[t.m("Aktivitas")]),a("router-link",{l:"block",u:{k:"/tokoh/"+t.id+"/detail/motif-agenda"}},[t.m("Motif & Agenda")])],1)]),a("div",{l:"bdi-sidebar__more"},[a("div",{h:[{name:"closable-menu-sidebar-general-bdi-actor",v:"v-closable-menu-sidebar-general-bdi-actor",value:{C:["menuSidebarGeneralActiveBdiActor"],g:"closeMenuGeneralSidebar"},p:"{exclude: ['menuSidebarGeneralActiveBdiActor'], handler: 'closeMenuGeneralSidebar'}"}],l:"floating-more",_:{click:function(e){return t.A()}}},[a("b-button",{u:{text:"Menu Lainnya",M:"more-horizontal",kind:"tertiary"}})],1)])],1),a("div",{l:"bdi-layouts__content"},[a("router-view",{u:{id:t.id}})],1),a("div",{G:"menuSidebarGeneralActiveBdiActor",l:"card-menu-popup card-menu-popup--more",S:{B:t.O}},[a("MenuSidebarGeneral")],1)])},o=[],n=a("1da1"),s=a("5530"),c=(a("96cf"),a("159b"),a("b0c0"),a("2f62")),l=a("de5b"),u={name:"BdiActorPage",j:{K:l["a"]},h:{D:{bind:function(t,e,a){i=function(i){i.stopPropagation();var r=e.value,o=r.g,n=r.C,s=!1;n.forEach((function(t){if(!s){var e=a.context.P[t];e&&(s=e.contains(i.target))}})),t.contains(i.target)||s||a.context[o]()},document.addEventListener("click",i),document.addEventListener("touchstart",i)},R:function(){document.removeEventListener("click",i),document.removeEventListener("touchstart",i)}}},data:function(){return{O:!1}},I:Object(s["a"])({id:function(){return this.N.L.id}},Object(c["b"])("actor",["detail"])),watch:{id:function(){}},q:{A:function(){this.O=!this.O},F:function(){this.O=!1},getData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.H=e.next){case 0:return e.next=2,t.T.J("actor/getDetail",t.id).then((function(t){"success"===t||Event.$emit("error")}));case 2:case"end":return e.stop()}}),e)})))()}},U:function(t,e,a){a((function(e){t.V&&t.V[0]&&"ActorPage"===t.V[0].name&&e.getData()}))}},d=u,b=a("2877"),k=Object(b["a"])(d,r,o,!1,null,null,null);e["default"]=k.W}}]);
//# sourceMappingURL=chunk-2d0d5c0f.fd77071a.js.map