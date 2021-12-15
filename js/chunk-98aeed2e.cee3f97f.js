(window["t"]=window["t"]||[]).push([["chunk-98aeed2e"],{i:function(t,a,i){"use strict";var e=function(){var t=this,a=t.o,i=t.l.s||a;return i("header",{u:"header-page"},[i("div",{u:"header-page__title"},[i("h1",[t.p(t.h(t.title))])]),i("div",{u:"header-page__cta"},[i("ul",{u:"breadcrumbs"},[t.g(0),i("li",[i("b-icon",{m:{name:"chevron-right"}})],1),t.g(1)])])])},o=[function(){var t=this,a=t.o,i=t.l.s||a;return i("li",[i("span",[t.p("BDI")])])},function(){var t=this,a=t.o,i=t.l.s||a;return i("li",[i("span",[t.p("Organisasi")])])}],r={name:"headerPage",k:{title:String}},n=r,s=i("2877"),l=Object(s["a"])(n,e,o,!1,null,null,null);a["a"]=l.v},C:function(t,a,i){"use strict";var e=function(){var t=this,a=t.o,i=t.l.s||a;return i("article",{u:"card"},[i("figure",{u:"card__cover"},[i("router-link",{m:{S:t.url,target:t.P?t.P:""}},[i("img",{u:"rounded w-full h-full object-cover",m:{src:t.photo?t.photo:t.I(void 0!==t.type&&"tokoh"===t.type?"profile":"default")},K:{error:function(a){return t._(a,void 0!==t.type&&"tokoh"===t.type?"profile":"default")}}})])],1),i("div",{u:"card__info"},[i("div",{u:"card-info"},[i("router-link",{u:"link",m:{S:t.url,target:t.P?t.P:""}},[t.p(t.h(t.title))]),"tokoh"===t.type?[i("p",{u:"mt-2"},[t.p(t.h(t.j))])]:void 0],2),i("router-link",{u:"cta",m:{S:t.url,target:t.P?t.P:""}},[t.p(t.h(t.A?t.A:"Lihat profil"))])],1)])},o=[],r={name:"cardInfoBdi",k:{title:String,type:String,photo:String,url:String,j:String,O:String,A:String,P:String},data:function(){return{}},T:{}},n=r,s=i("2877"),l=Object(s["a"])(n,e,o,!1,null,null,null);a["a"]=l.v},L:function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.o,i=t.l.s||a;return i("section",{u:"bdi-section-actors"},[i("HeaderPage",{m:{title:t.B}}),i("div",{u:"flex items-center justify-between mb-5 gap-4"},[i("div",{u:"flex items-center gap-x-4"},[i("div",{u:"block w-64"},[i("div",{u:"field field--icon-left w-full"},[i("input",{M:[{name:"model",R:"v-model",value:t.D,H:"keyword"}],u:"field-style",m:{placeholder:"Cari Tokoh"},N:{value:t.D},K:{J:t.U,input:function(a){a.target.W||(t.D=a.target.value)}}}),i("span",{u:"icon-field"},[i("b-icon",{m:{name:"search"}})],1)])])]),i("routerLink",{m:{S:"/tokoh/create/form/profile"}},[i("b-button",{m:{text:"Tokoh baru",q:"plus",kind:"primary"}})],1)],1),t.G.length>0?i("div",{u:"grid grid-cols-3 gap-3"},t.Y(t.G,(function(t){return i("div",{u:"block"},[i("CardInfo",{u:"w-full",m:{title:t.name?t.name:"-",url:"/tokoh/"+t.id+"/detail/profil",photo:t.photo,type:"tokoh",j:t.position&&t.position.data&&t.position.data.length>0?t.position.data.map((function(t){return t.position+" - "+t.name})).join(" | "):"-",F:"profile"}})],1)})),0):t.V(),t.G.length>0||"loading"===t.X.status?i("div",{u:"grid grid-cols-1 gap-0"},[i("div",{u:"block text-center mt-10 mb-10"},["loading"===t.X.status?i("div",{u:"relative"},[i("b-loading",{m:{text:"Memuat data tokoh",kind:""}})],1):[t.$.Z&&t.$.Z.tt&&!0===t.$.Z.tt?i("b-button",{m:{text:"Klik untuk menampilkan tokoh lainnya",kind:"tertiary"},at:{click:function(a){return t.it()}}}):i("span",[t.p("Semua tokoh sudah ditampilkan")])]],2)]):i("div",{u:"grid grid-cols-1 gap-0"},[t.g(0)])],1)},o=[function(){var t=this,a=t.o,i=t.l.s||a;return i("div",{u:"block text-center mt-10"},[i("span",[t.p("Tokoh tidak ditemukan.")])])}],r=i("5530"),n=(i("b0c0"),i("2f62")),s=i("d7d8"),l=i("d283"),c={name:"BdiListOfIssues",et:{ot:s["a"],rt:l["a"]},data:function(){return{B:"Tokoh",nt:[{title:"Yorrys T.H Raweyai",url:"/tokoh/name/profil",photo:"https://graph-ntxdemo.vercel.app/icon/yorrys.png",j:"Ketua Umum Konfederasi Serikat Pekerja Seluruh Indonesia (KSPSI)"},{title:"Nining Elitos",url:"/tokoh/name/profil",photo:"https://graph-ntxdemo.vercel.app/icon/nining.png",j:"Ketua Umum Kongres Aliansi Serikat Buruh Indonesia (KASBI)"},{title:"Said Iqbal",url:"/tokoh/name/profil",photo:"https://graph-ntxdemo.vercel.app/icon/said.png",j:"Presiden Konfederasi Serikat Pekerja Indonesia (KSPI)"},{title:"Andi Gani Nena Wea",url:"/tokoh/name/profil",photo:"https://graph-ntxdemo.vercel.app/icon/andi.png",j:"Presiden Konfederasi Serikat Pekerja Seluruh Indonesia (KSPSI)"},{title:"Merah Johansyah",url:"/tokoh/name/profil",photo:"https://graph-ntxdemo.vercel.app/icon/merah.png",j:"Koordinator Nasional Jaringan Advokasi Tambang (JATAM)"},{title:"Airlangga Hartarto",url:"/tokoh/name/profil",photo:"https://graph-ntxdemo.vercel.app/icon/airlangga.png",j:"Menteri Kementerian Koordinator Perekonomian (2019-2024)"},{title:"Puan Maharani",url:"/tokoh/name/profil",photo:"https://graph-ntxdemo.vercel.app/icon/puan.png",j:"Ketua DPR RI"},{title:"Rosan Perkasa",url:"/tokoh/name/profil",photo:"https://graph-ntxdemo.vercel.app/icon/rosan.png",j:"Ketua Satuan Tugas Omnibus Law"},{title:"Pandu Patria Sjahrir",url:"/tokoh/name/profil",photo:"https://graph-ntxdemo.vercel.app/icon/pandu.png",j:"Anggota Satuan Tugas Omnibus Law"}],G:[],st:45,page:1,lt:"",D:"",timeout:null}},ct:Object(r["a"])({},Object(n["b"])("actor",["status_list_actor","list_actor"])),watch:{$:function(t){if(t.dt&&t.dt.length>0)for(var a=0;a<t.dt.length;a++)this.G.push(t.dt[a])}},T:{getData:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t&&(this.G=[],this.page=1),this.pt.ut("actor/getListActor",[this.st,this.page,this.D,this.lt])},it:function(){this.page+=1,this.getData()},U:function(){clearTimeout(this.timeout);var t=this;this.timeout=setTimeout((function(){t.getData(!0)}),650)}},ht:function(){if(console.log("mounted list actor"),void 0!==this.ft.gt.D){var t=this.ft.gt.D;this.kt.push({path:"/bdi/tokoh"}),this.D=t,this.getData()}},vt:function(t,a,i){i((function(a){a.pt.bt("actor/setListActor",{}),"BDI_ListOfActor"===t.name&&a.getData()}))}},d=c,u=i("2877"),p=Object(u["a"])(d,e,o,!1,null,null,null);a["default"]=p.v}}]);
//# sourceMappingURL=chunk-98aeed2e.cee3f97f.js.map