(window["t"]=window["t"]||[]).push([["chunk-776718c3"],{i:function(t,a,i){"use strict";var e=function(){var t=this,a=t.s,i=t.l.o||a;return"loading"===t.u?i("header",{g:"header-page header-page--bdi"},[i("div",{g:"m-7 p-7 relative text-center w-full h-full"},[i("b-loading",{h:{text:"Memuat data"}})],1)]):i("header",{g:"header-page header-page--bdi"},[i("div",{g:"header-page--bdi__cover"},[i("img",{h:{src:t.detail.photo?t.detail.photo:"",alt:"alt"},m:{error:t.p}})]),i("div",{g:"header-page--bdi__info"},[i("h1",{g:"heading"},[t.v(t.C(t.detail.name&&t.detail.name.length>0?t.detail.name:"-"))])])])},n=[],s=i("5530"),o=i("2f62"),l={name:"OrganizationHeader",data:function(){return{}},_:Object(s["a"])({},Object(o["b"])("organization",["status_detail","detail"])),watch:{detail:function(t){console.log(t)}},k:{}},r=l,d=i("2877"),c=Object(d["a"])(r,e,n,!1,null,null,null);a["a"]=c.O},B:function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.s,i=t.l.o||a;return i("div",{g:"content-bdi"},[i("div",{g:"content-bdi__header"},[i("HeadOrganization")],1),i("div",{g:"content-bdi__body"},[i("h2",{g:"text-xl"},[t.v("Riwayat Suntingan Profil Ringkas")]),t.j.length>0?i("ul",{g:"box-history mt-8"},t.A(t.j,(function(a){return i("li",[i("router-link",{g:"link date-time",h:{I:"/organisasi/"+t.id+"/detail/profil/log/detail/"+t.L(a)}},[t.v(t.C(a.M?t.H(a.M):"-"))]),i("span",{g:"block px-2"},[t.v("•")]),i("router-link",{g:"link",h:{I:"/organisasi/"+t.id+"/detail/profil/log/detail/"+t.L(a)}},[t.v(t.C(a.T?a.T:"-"))])],1)})),0):t.W(),t.j.length>0||"loading"===t.P.status?i("div",{g:"block text-center mt-10 mb-10"},["loading"===t.P.status?i("div",{g:"relative"},[i("b-loading",{h:{text:"Memuat data",kind:""}})],1):[t.D.R&&t.D.R.N&&!0===t.D.R.N?i("b-button",{h:{text:"Lainnya...",kind:"tertiary"},S:{click:function(a){return t.q()}}}):t.W()]],2):i("div",{g:"block text-center mt-10"},[i("span",[t.v("Data tidak ditemukan.")])])])])},n=[],s=i("5530"),o=(i("b0c0"),i("2f62")),l=i("110a"),r=(i("c1df"),{name:"ProfileOfOrganizationLog",F:{G:l["a"]},J:["id"],data:function(){return{history:[{dateTime:"10 November 2021 10:00 WIB",K:"Admin",url:"/organisasi/name/profil/log/detail"},{dateTime:"10 Agustus 2021 10:00 WIB",K:"Admin",url:"/organisasi/name/profil/log/detail"},{dateTime:"10 Mei 2021 10:00 WIB",K:"Admin",url:"/organisasi/name/profil/log/detail"},{dateTime:"10 Mei 2021 10:00 WIB",K:"Admin",url:"/organisasi/name/profil/log/detail"}],j:[],U:10,page:1}},_:Object(s["a"])({},Object(o["b"])("organization",["status_list_log_history","list_log_history"])),watch:{D:function(t){if(t.V&&t.V.length>0)for(var a=0;a<t.V.length;a++)this.j.push(t.V[a])}},k:{getData:function(){this.Y.X("organization/getListLogHIstory",[this.U,this.page,this.id])},q:function(){this.page+=1,this.getData()}},Z:function(t,a,i){i((function(a){"ProfileLogOfOrganization"===t.name&&a.getData()}))}}),d=r,c=i("2877"),u=Object(c["a"])(d,e,n,!1,null,null,null);a["default"]=u.O}}]);
//# sourceMappingURL=chunk-776718c3.144c877b.js.map