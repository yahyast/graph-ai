(window["t"]=window["t"]||[]).push([["chunk-98da2888"],{i:function(t,i,s){"use strict";s.r(i);var a=function(){var t=this,i=t.s,s=t.o.l||i;return s("section",{u:"bdi-section-issues"},[s("HeaderPage",{p:{title:t.g}}),s("div",{u:"flex items-center justify-between mb-5 gap-4"},[s("div",{u:"flex items-center gap-x-4"},[s("div",{u:"block w-64"},[s("div",{u:"field field--icon-right w-full"},["loading"===t.h.status?s("div",{u:"field-style field-style--loading"},[s("b-loading",{p:{kind:"circular"}})],1):s("div",{u:"relative"},[s("select",{v:[{name:"model",m:"v-model",value:t.C,k:"gatra"}],u:"field-style",_:{I:[function(i){var s=Array.prototype.filter.call(i.target.options,(function(t){return t.selected})).map((function(t){var i="_value"in t?t.O:t.value;return i}));t.C=i.target.multiple?s:s[0]},function(i){return t.getData(!0)}]}},[s("option",{p:{value:""}},[t.j("- Semua Gatra -")]),t.S(t.L,(function(i){return s("option",{P:{value:i.id}},[t.j(t.B(i.label))])}))],2),s("span",{u:"icon-field"},[s("b-icon",{p:{name:"chevron-down"}})],1)])])]),s("div",{u:"block w-64"},[s("div",{u:"field field--icon-left w-full"},[s("input",{v:[{name:"model",m:"v-model",value:t.D,k:"keyword"}],u:"field-style",p:{placeholder:"Cari Isu"},P:{value:t.D},_:{T:t.U,input:function(i){i.target.G||(t.D=i.target.value)}}}),s("span",{u:"icon-field"},[s("b-icon",{p:{name:"search"}})],1)])])]),s("routerLink",{p:{H:"/isu/create/form/profil"}},[s("b-button",{p:{text:"Isu baru",K:"plus",kind:"primary"}})],1)],1),t.M.length>0?s("div",{u:"grid grid-cols-3 gap-3"},t.S(t.M,(function(t){return s("div",{u:"block"},[s("CardInfo",{u:"w-full",p:{title:t.title?t.title:"-",url:"/isu/"+t.id+"/detail/profil",photo:t.N?"http"===t.N.substr(0,4)?t.N:"http://"+t.N:null}})],1)})),0):t.A(),t.M.length>0||"loading"===t.R.status?s("div",{u:"grid grid-cols-1 gap-0"},[s("div",{u:"block text-center mt-10 mb-10"},["loading"===t.R.status?s("div",{u:"relative"},[s("b-loading",{p:{text:"Memuat data isu",kind:""}})],1):[t.list.W&&t.list.q&&t.list.W<t.list.q?s("b-button",{p:{text:"Klik untuk menampilkan isu lainnya",kind:"tertiary"},F:{click:function(i){return t.J()}}}):t.A()]],2)]):s("div",{u:"grid grid-cols-1 gap-0"},[t.V(0)])],1)},e=[function(){var t=this,i=t.s,s=t.o.l||i;return s("div",{u:"block text-center mt-10"},[s("span",[t.j("Isu tidak ditemukan.")])])}],r=s("5530"),n=(s("b0c0"),s("2f62")),l=s("d7d8"),o=s("d283"),c={name:"BdiListOfIssues",X:{Y:l["a"],Z:o["a"]},data:function(){return{g:"Isu",$:[{title:"Omnibus Law",url:"/isu/profil",photo:"https://graph-ntxdemo.vercel.app/icon/omlaw.png"},{title:"uu cipta kerja",url:"/isu/profil",photo:"https://graph-ntxdemo.vercel.app/icon/omlaw.png"},{title:"UU ITE",url:"/isu/profil",photo:"https://graph-ntxdemo.vercel.app/icon/omlaw.png"}],M:[],tt:45,page:1,C:"",D:"",timeout:null}},it:Object(r["a"])(Object(r["a"])({},Object(n["b"])("issue",["status_list","list"])),Object(n["b"])("graph",["status_list_gatra","list_gatra"])),watch:{list:function(t){if(t.data&&t.data.length>0)for(var i=0;i<t.data.length;i++)this.M.push(t.data[i])}},st:{getData:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t&&(this.M=[],this.page=1),!0===i&&this.et.at("graph/getListGatra"),this.et.at("issue/getList",[this.tt,this.page,this.D,this.C])},J:function(){this.page+=1,this.getData()},U:function(){clearTimeout(this.timeout);var t=this;this.timeout=setTimeout((function(){t.getData(!0)}),650)}},rt:function(){console.log("mounted list issue")},nt:function(t,i,s){s((function(i){i.et.lt("issue/setList",{}),"BDI_ListOfIssues"===t.name&&i.getData(!0,!0)}))}},u=c,d=s("2877"),f=Object(d["a"])(u,a,e,!1,null,null,null);i["default"]=f.ot},ct:function(t,i,s){"use strict";var a=function(){var t=this,i=t.s,s=t.o.l||i;return s("header",{u:"header-page"},[s("div",{u:"header-page__title"},[s("h1",[t.j(t.B(t.title))])]),s("div",{u:"header-page__cta"},[s("ul",{u:"breadcrumbs"},[t.V(0),s("li",[s("b-icon",{p:{name:"chevron-right"}})],1),t.V(1)])])])},e=[function(){var t=this,i=t.s,s=t.o.l||i;return s("li",[s("span",[t.j("BDI")])])},function(){var t=this,i=t.s,s=t.o.l||i;return s("li",[s("span",[t.j("Organisasi")])])}],r={name:"headerPage",ut:{title:String}},n=r,l=s("2877"),o=Object(l["a"])(n,a,e,!1,null,null,null);i["a"]=o.ot},dt:function(t,i,s){"use strict";var a=function(){var t=this,i=t.s,s=t.o.l||i;return s("article",{u:"card"},[s("figure",{u:"card__cover"},[s("router-link",{p:{H:t.url,target:t.ft?t.ft:""}},[s("img",{u:"rounded w-full h-full object-cover",p:{src:t.photo?t.photo:t.pt(void 0!==t.type&&"tokoh"===t.type?"profile":"default")},_:{error:function(i){return t.gt(i,void 0!==t.type&&"tokoh"===t.type?"profile":"default")}}})])],1),s("div",{u:"card__info"},[s("div",{u:"card-info"},[s("router-link",{u:"link",p:{H:t.url,target:t.ft?t.ft:""}},[t.j(t.B(t.title))]),"tokoh"===t.type?[s("p",{u:"mt-2"},[t.j(t.B(t.ht))])]:void 0],2),s("router-link",{u:"cta",p:{H:t.url,target:t.ft?t.ft:""}},[t.j(t.B(t.vt?t.vt:"Lihat profil"))])],1)])},e=[],r={name:"cardInfoBdi",ut:{title:String,type:String,photo:String,url:String,ht:String,Ct:String,vt:String,ft:String},data:function(){return{}},st:{}},n=r,l=s("2877"),o=Object(l["a"])(n,a,e,!1,null,null,null);i["a"]=o.ot}}]);
//# sourceMappingURL=chunk-98da2888.f7aeccd2.js.map