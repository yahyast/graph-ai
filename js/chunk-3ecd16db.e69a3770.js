(window["t"]=window["t"]||[]).push([["chunk-3ecd16db"],{2532:function(t,e,n){"use strict";var i=n("23e7"),r=n("5a34"),a=n("1d80"),o=n("577e"),s=n("ab13");i({target:"String",i:!0,o:!s("includes")},{includes:function(t){return!!~o(a(this)).indexOf(o(r(t)),arguments.length>1?arguments[1]:void 0)}})},s:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.u,n=t.h.l||e;return n("form",{m:"form-general",v:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[t.g(0),n("div",{m:"form-general__body w-full"},[n("wysiwyg",{p:{value:t.p.k,O:function(e){t.j(t.p,"strength",e)},C:"model.strength"}})],1),n("div",{m:"form-general__footer"},[n("router-link",{B:{_:"/bdi/tokoh"}},[n("b-button",{B:{text:"Batalkan",type:"button"}})],1),n("b-button",{B:{text:"Simpan",kind:"primary",type:"submit"}})],1)])},r=[function(){var t=this,e=t.u,n=t.h.l||e;return n("div",{m:"form-general__header w-full"},[n("h2",{m:"text-2xl"},[t.D("Kekuatan")])])}],a=n("1da1"),o=n("5530"),s=(n("96cf"),n("b64b"),n("caad"),n("2532"),n("b0c0"),n("2f62")),c={T:["id"],data:function(){return{p:{k:""}}},A:{p:{k:{}}},R:Object(o["a"])({},Object(s["b"])("actor",["detail"])),watch:{id:function(){},detail:function(t){this.p.k=t.k?t.k:""}},K:{S:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];for(var e in Object.keys(this.p))!0===t&&(this.p[Object.keys(this.p)[e]]="")},reset:function(){var t=this;this.S(!0),this.F((function(){t.L.I()}))},getData:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.M=e.next){case 0:return e.next=2,t.reset(!0);case 2:Event.$emit("getDataActor");case 3:case"end":return e.stop()}}),e)})))()},submit:function(t){var e=this;if(t.preventDefault(),this.L.$(),this.L.p.q){for(var n in Object.keys(this.L.p)){var i=Object.keys(this.L.p)[n];if(i.includes("$"))return!1;if(this.L.p[i].G)break}window.scrollTo(0,0)}else{Event.$emit("showLoading",!0);this.p;this.J.H("actor/update",[this.id,this.p,"strength"]).then((function(t){"success"===t.result?e.P.N({icon:"success",title:"Data berhasil disimpan.",U:"Tetap dihalaman ini",V:"#5a80e7",W:!0,X:"Kembali ke BDI",Y:!1}).then((function(t){t.Z?e.getData():e.tt.push({path:"/bdi/tokoh"}),Event.$emit("success","Data berhasil diperbarui!")})):Event.$emit("error")}))}}},et:function(t,e,n){n((function(e){console.log(t.name),"strengthOfActorForm"===t.name&&e.getData()}))}},u=c,l=n("2877"),d=Object(l["a"])(u,i,r,!1,null,null,null);e["default"]=d.nt},it:function(t,e,n){var i=n("44e7");t.nt=function(t){if(i(t))throw TypeError("The method doesn't accept regular expressions");return t}},rt:function(t,e,n){var i=n("b622"),r=i("match");t.nt=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,"/./"[t](e)}catch(i){}}return!1}},at:function(t,e,n){"use strict";var i=n("23e7"),r=n("4d64").includes,a=n("44d2");i({target:"Array",i:!0},{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),a("includes")}}]);
//# sourceMappingURL=chunk-3ecd16db.e69a3770.js.map