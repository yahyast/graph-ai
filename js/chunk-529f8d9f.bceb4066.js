(window["t"]=window["t"]||[]).push([["chunk-529f8d9f"],{s:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.i,s=t.o.l||a;return s("div",{u:"content-bdi"},[s("div",{u:"content-bdi__header"},[s("HeadActor")],1),s("div",{u:"content-bdi__body"},[s("div",{u:"heading-submenu"},[s("h2",{u:"subheading"},[t.p("Opini")]),s("routerLink",{v:[{name:"tooltip",C:"v-tooltip",value:"Sunting",h:"'Sunting'"}],m:{g:"/tokoh/"+t.id+"/form/opinion"}},[s("b-button",{m:{kind:"tertiary",_:"edit-2"}})],1)],1),"loading"===t.K?s("div",{u:"relative text-center m-5 p-5 w-full"},[s("b-loading",{m:{text:"Memuat data"}})],1):s("p",{u:"text-paragraph",O:{innerHTML:t.j(t.detail.S&&t.detail.S.length>0?t.detail.S:"-")}})])])},l=[],n=s("5530"),c=s("2f62"),o=s("7853"),e={name:"OpinionOfActor",k:{A:o["a"]},M:["id"],N:Object(n["a"])({},Object(c["b"])("actor",["status_detail","detail"]))},d=e,r=s("2877"),u=Object(r["a"])(d,i,l,!1,null,null,null);a["default"]=u.P},5457:function(t,a,s){"use strict";s("da38")},7853:function(t,a,s){"use strict";var i=function(){var t=this,a=t.i,s=t.o.l||a;return"loading"===t.K?s("header",{u:"content-header"},[s("div",{u:"m-20 p-20 relative text-center w-full h-full"},[s("b-loading",{m:{text:"Memuat data"}})],1)]):s("header",{u:"content-header"},[s("div",{u:"content-header__photo"},[s("img",{m:{src:t.detail.photo?t.detail.photo:"",alt:"alt"},T:{error:function(a){t.H(a,"profile")}}})]),s("div",{u:"content-header__info"},[s("h1",[t.p(t.j(t.detail.name&&t.detail.name.length>0?t.detail.name:"-"))]),s("div",{u:"grid grid-cols-5 gap-6"},[s("div",{u:"call-out"},[s("span",[t.p("No. KTP")]),s("p",[t.p(t.j(t.detail.L&&t.detail.L.length>0?t.detail.L:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Provinsi")]),s("p",[t.p(t.j(t.detail.D&&t.detail.D.length>0?t.detail.D:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Alamat")]),s("p",[t.p(t.j(t.detail.I&&t.detail.I.length>0?t.detail.I:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Kota")]),s("p",[t.p(t.j(t.detail.R&&t.detail.R.length>0?t.detail.R:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Kecamatan")]),s("p",[t.p(t.j(t.detail.G&&t.detail.G.length>0?t.detail.G:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Kelurahan")]),s("p",[t.p(t.j(t.detail.J&&t.detail.J.length>0?t.detail.J:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("RT/RW")]),s("p",[t.p(t.j(t.detail.W&&t.detail.W.length>0?t.detail.W:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Kode Pos")]),s("p",[t.p(t.j(t.detail.q&&t.detail.q.length>0?t.detail.q:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Tanggal Lahir")]),s("p",[t.p(t.j(t.detail.B&&t.detail.B.length>0?t.detail.B:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Tempat Lahir")]),s("p",[t.p(t.j(t.detail.F&&t.detail.F.length>0?t.detail.F:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Agama")]),s("p",[t.p(t.j(t.detail.U&&t.detail.U.length>0?t.detail.U:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Pekerjaan")]),s("p",[t.p(t.j(t.detail.V&&t.detail.V.length>0?t.detail.V:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Status Menikah")]),s("p",[t.p(t.j(t.detail.X&&t.detail.X.length>0?t.detail.X:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Jenis Kelamin")]),s("p",[t.p(t.j(t.detail.Y&&t.detail.Y.length>0?t.detail.Y:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Gol. Darah")]),s("p",[t.p(t.j(t.detail.Z&&t.detail.Z.length>0?t.detail.Z:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("Nomor KK")]),s("p",[t.p(t.j(t.detail.$&&t.detail.$.length>0?t.detail.$:"-"))])]),s("div",{u:"call-out"},[s("span",[t.p("SIM")]),t.detail.tt&&t.detail.tt.length>0?t.at(t.detail.tt,(function(a){return s("p",[t.p(t.j(a.st)+" - "+t.j(a.it))])})):s("p",[t.p("-")])],2),s("div",{u:"call-out"},[s("span",[t.p("STNK")]),t.detail.lt&&t.detail.lt.length>0?t.at(t.detail.lt,(function(a){return s("p",[t.p(t.j(a.type)+" : "+t.j(a.nt))])})):s("p",[t.p("-")])],2),s("div",{u:"call-out"},[s("span",[t.p("Nomor Polisi")]),t.detail.lt&&t.detail.lt.length>0?t.at(t.detail.lt,(function(a){return s("p",[t.p(t.j(a.type)+" : "+t.j(a.ct))])})):s("p",[t.p("-")])],2),s("div",{u:"call-out"},[s("span",[t.p("MSISDN")]),s("p",[t.p(t.j(t.detail.ot&&t.detail.ot.length>0?t.detail.ot:"-"))])])])])])},l=[],n=s("5530"),c=s("2f62"),o={name:"ActorHeader",data:function(){return{}},N:Object(n["a"])({},Object(c["b"])("actor",["status_detail","detail"])),watch:{detail:function(t){console.log(t)}}},e=o,d=(s("5457"),s("2877")),r=Object(d["a"])(e,i,l,!1,null,null,null);a["a"]=r.P},et:function(t,a,s){}}]);
//# sourceMappingURL=chunk-529f8d9f.bceb4066.js.map