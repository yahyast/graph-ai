(window["t"]=window["t"]||[]).push([["chunk-392bcfdf"],{8021:function(t,a,i){},i:function(t,a,i){"use strict";i("8021")},s:function(t,a,i){"use strict";i.r(a);var s=function(){var t=this,a=t.o,i=t.u.l||a;return i("div",{m:"box-photo w-full"},[i("div",{m:"main-menu"},[i("div",{m:"flex items-center gap-x-4"},[i("ul",{m:"menu"},[i("li",[i("routerLink",{h:{v:"/bdi/foto"}},[t.p("Semua Foto")])],1),i("li",[i("routerLink",{h:{v:"/bdi/foto/album"}},[t.p("Album")])],1)])]),i("routerLink",{h:{v:"/bdi/foto/form/create"}},[i("b-button",{h:{text:"Foto baru",k:"plus",kind:"primary"}})],1)],1),i("div",{m:"block w-full"},[t.C.length>0?i("div",{m:"card-bg-theme p-6 rounded shadow w-full"},[i("table",{m:"main-table"},[t.g(0),i("tbody",t.L(t.C,(function(a){return i("tr",[i("td",[i("div",{m:"flex items-center"},[i("div",{m:"mr-4"},[i("div",{m:"h-24 w-24 grid grid-cols-2 gap-1 grid-rows-2"},[a.A.length>0?t.L(a.A.slice(0,4),(function(a){return i("img",{m:"w-full h-full object-cover",h:{src:a._,alt:"alt"},B:{error:t.D}})})):t.O()],2)]),i("div",{m:"block-area"},[i("routerLink",{m:"link",h:{v:"/bdi/foto/form/"+a.id}},[t.p(t.j(a.title&&a.title.length>0?a.title:"-"))]),i("p",[t.p(t.j(a.description&&a.description.length>0?a.description:"-"))])],1)])]),i("td",[i("span",{m:"block mb-1"},[t.p(t.j(a.T&&a.T.length>0?a.T:"-"))]),i("p",{m:"text-xs"},[t.p(t.j(a.F&&a.F.length>0?a.F:"-"))])]),i("td",[i("div",{m:"flex items-center justify-end"},[i("b-button",{h:{K:"trash",kind:"danger"},M:{click:function(i){return t.deleteData(a.id,a.title)}}})],1)])])})),0)])]):t.O(),t.C.length>0||"loading"===t.P.status?i("div",{m:"text-center mt-10 mb-10"},["loading"===t.P.status?i("div",{m:"relative"},[i("b-loading",{h:{text:"Memuat data",kind:""}})],1):[t.I.H&&t.I.R&&t.I.H<t.I.R?i("b-button",{h:{text:"Lainnya...",kind:"tertiary"},M:{click:function(a){return t.S()}}}):t.O()]],2):i("div",{m:"text-center mt-10 mb-10"},[i("span",[t.p("Data tidak ditemukan.")])])])])},n=[function(){var t=this,a=t.o,i=t.u.l||a;return i("thead",[i("tr",[i("th",[t.p("Album")]),i("th",[t.p("diperbarui")]),i("th")])])}],e=i("5530"),o=(i("b0c0"),i("2f62")),l=(i("c1df"),{name:"BdiListOfPhotoAlbum",Y:{},data:function(){return{C:[],q:20,page:1,G:"",timeout:null}},J:Object(e["a"])({},Object(o["b"])("photo",["status_list_album","list_album"])),watch:{I:function(t){if(t.N&&t.N.length>0)for(var a=0;a<t.N.length;a++)this.C.push(t.N[a])}},U:{getData:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t&&(this.C=[],this.page=1),this.W.V("photo/getListAlbum",[this.q,this.page,this.G])},S:function(){this.page+=1,this.getData()},X:function(){clearTimeout(this.timeout);var t=this;this.timeout=setTimeout((function(){t.getData(!0)}),650)},deleteData:function(t,a){var i=this;this.$.Z({icon:"warning",title:"Konfirmasi Hapus Album",text:"Apakah anda yakin akan menghapus album "+a+"? Dengan menghapus album, semua foto didalam album akan terhapus.",tt:"Ya, hapus album",at:"#DD6B55",it:"Batalkan",st:!0,nt:!1}).then((function(a){a.et&&(Event.$emit("showLoading",!0),i.W.V("photo/deleteAlbum",t).then((function(t){"success"===t?(i.page=0,i.getData(!0),i.$.Z({icon:"success",title:"Data berhasil dihapus!",ot:3e3})):t.data&&t.data.message?Event.$emit("error",t.data.message):Event.$emit("error")})))}))}},lt:function(){},rt:function(t,a,i){i((function(a){a.W.ut("photo/setListAlbum",{}),"BDI_ListOfPhotoAlbum"===t.name&&a.getData()}))}}),r=l,u=(i("a413"),i("2877")),c=Object(u["a"])(r,s,n,!1,null,null,null);a["default"]=c.ct}}]);
//# sourceMappingURL=chunk-392bcfdf.bc2fbb03.js.map