(window["t"]=window["t"]||[]).push([["chunk-4eb6e2e9"],{2532:function(t,e,a){"use strict";var i=a("23e7"),s=a("5a34"),n=a("1d80"),l=a("577e"),r=a("ab13");i({target:"String",i:!0,s:!r("includes")},{includes:function(t){return!!~l(n(this)).indexOf(l(s(t)),arguments.length>1?arguments[1]:void 0)}})},l:function(t,e,a){var i=a("44e7");t.o=function(t){if(i(t))throw TypeError("The method doesn't accept regular expressions");return t}},u:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"form-general"},[t.g?a("form",{C:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[t.k(1),a("div",{h:"form-general__body w-full"},[a("div",{h:"grid grid-cols-11 gap-8 mb-16"},[t.k(2),a("div",{h:"col-span-7"},[a("div",{h:"field"},[t.k(3),a("input",{_:[{name:"model",T:"v-model",value:t.P.name,j:"model.name"}],h:"field-style",S:{placeholder:"contoh: Yorrys T.H Raweyai"},M:{value:t.P.name},C:{input:function(e){e.target.N||t.I(t.P,"name",e.target.value)}}}),t.D.P.name.K?a("span",{h:"field-message text-red-500"},[t.O("This name is required & max length is 255 char.")]):t.B()]),a("div",{h:"field"},[a("div",{h:"box-photo"},[a("div",{h:"box-photo__cover"},[a("figure",{h:"photo-square"},[a("img",{S:{src:t.url?t.url:t.A("profile")},C:{error:function(e){return t.Y(e,"profile")}}})])]),a("div",{h:"box-photo__info"},[a("label",{h:"field-label"},[t.O("Foto tokoh")]),a("div",{h:"cta-upload mb-2"},[a("input",{H:"photoInput",S:{type:"file",accept:"image/png, image/jpeg"},C:{L:t.W}}),a("span",[t.O("Ganti Foto")])]),t.k(4)])])])])]),a("div",{h:"grid grid-cols-11 gap-8 mb-16"},[t.k(5),a("div",{h:"col-span-7"},[a("div",{h:"field"},[a("label",{h:"field-label"},[t.O("Nomor Kartu Keluarga")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.R,j:"model.kk_number"}],h:"field-style",S:{type:"number",placeholder:"contoh '78978978978979'"},M:{value:t.P.R},C:{input:function(e){e.target.N||t.I(t.P,"kk_number",e.target.value)}}}),t.D.P.R.K?a("span",{h:"field-message text-red-500"},[t.O("This KK max length is 255 char.")]):t.B()]),a("div",{h:"field"},[a("label",{h:"field-label"},[t.O("Nomor KTP")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.F,j:"model.ktp_number"}],h:"field-style",S:{type:"number",placeholder:"contoh '30293850293409' "},M:{value:t.P.F},C:{input:function(e){e.target.N||t.I(t.P,"ktp_number",e.target.value)}}}),t.D.P.F.K?a("span",{h:"field-message text-red-500"},[t.O("This KTP max length is 255 char.")]):t.B()]),a("div",{h:"field"},[a("label",{h:"field-label"},[t.O("Tempat & Tanggal lahir")]),a("div",{h:"grid grid-cols-2 gap-4"},[a("div",[a("input",{_:[{name:"model",T:"v-model",value:t.P.J,j:"model.birth_place"}],h:"field-style",S:{placeholder:"Tulis kota kelahiran ",type:"text"},M:{value:t.P.J},C:{input:function(e){e.target.N||t.I(t.P,"birth_place",e.target.value)}}}),t.D.P.J.K?a("span",{h:"field-message text-red-500"},[t.O("This birth place max length is 255 char.")]):t.B()]),a("div",{h:"box-calendar box-calendar--born"},[a("b-icon",{S:{name:"calendar"}}),t.U.q&&t.U.V?a("date-range-picker",{H:"picker",S:{G:{$:1,format:"dd mmmm yyyy"},X:t.Z,tt:"right",et:"up",at:!1,it:!0,st:!0,nt:!0},C:{update:function(e){return t.lt(e)}},rt:t.ot([{key:"input",dt:function(e){return[t.O(t.ct(t.ut("date")(e.q)))]}}],null,!1,2269057085),P:{value:t.U,pt:function(e){t.U=e},j:"dateRange"}}):t.B()],1)])]),a("div",{h:"field"},[t.k(6),a("div",{h:"grid grid-cols-2 gap-4"},[a("div",{h:"ui-radio"},[a("input",{_:[{name:"model",T:"v-model",value:t.P.ft,j:"model.gender"}],S:{type:"radio",name:"gender",value:"Laki-laki"},M:{checked:t.vt(t.P.ft,"Laki-laki")},C:{L:function(e){return t.I(t.P,"gender","Laki-laki")}}}),t.k(7)]),a("div",{h:"ui-radio"},[a("input",{_:[{name:"model",T:"v-model",value:t.P.ft,j:"model.gender"}],S:{type:"radio",name:"gender",value:"Perempuan"},M:{checked:t.vt(t.P.ft,"Perempuan")},C:{L:function(e){return t.I(t.P,"gender","Perempuan")}}}),t.k(8)])]),t.D.P.ft.K?a("span",{h:"field-message text-red-500"},[t.O("This gender is required.")]):t.B()]),a("div",{h:"field"},[a("label",{h:"field-label"},[t.O("Status Perkawinan")]),a("div",{h:"grid grid-cols-2 gap-4"},[a("div",{h:"ui-radio"},[a("input",{_:[{name:"model",T:"v-model",value:t.P.ht,j:"model.marital_status"}],S:{type:"radio",name:"marital_status",value:"Lajang"},M:{checked:t.vt(t.P.ht,"Lajang")},C:{L:function(e){return t.I(t.P,"marital_status","Lajang")}}}),t.k(9)]),a("div",{h:"ui-radio"},[a("input",{_:[{name:"model",T:"v-model",value:t.P.ht,j:"model.marital_status"}],S:{type:"radio",name:"marital_status",value:"Menikah"},M:{checked:t.vt(t.P.ht,"Menikah")},C:{L:function(e){return t.I(t.P,"marital_status","Menikah")}}}),t.k(10)])])]),a("div",{h:"field field--icon-right w-full"},[a("label",{h:"field-label"},[t.O("Agama")]),a("select",{_:[{name:"model",T:"v-model",value:t.P.bt,j:"model.religion"}],h:"field-style",C:{L:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t.gt:t.value;return e}));t.I(t.P,"religion",e.target.multiple?a:a[0])}}},[a("option",{S:{value:""}},[t.O("- Pilih Agama -")]),t.Ct(t.yt,(function(e){return a("option",{M:{value:e.value}},[t.O(t.ct(e.label))])}))],2),a("span",{h:"icon-field"},[a("b-icon",{S:{name:"chevron-down"}})],1)]),a("div",{h:"field"},[a("label",{h:"field-label"},[t.O("Pekerjaan")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.wt,j:"model.profession"}],h:"field-style",S:{type:"text",placeholder:"Tulis pekerjaan aktor disini..."},M:{value:t.P.wt},C:{input:function(e){e.target.N||t.I(t.P,"profession",e.target.value)}}})]),a("div",{h:"field"},[a("label",{h:"field-label"},[t.O("Golongan darah")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.kt,j:"model.blood_type"}],h:"field-style",S:{type:"text",placeholder:"Tulis golongan darah aktor disini..."},M:{value:t.P.kt},C:{input:function(e){e.target.N||t.I(t.P,"blood_type",e.target.value)}}})])])]),a("div",{h:"grid grid-cols-11 gap-8 mb-16"},[t.k(11),a("div",{h:"col-span-7"},[a("div",{h:"field"},[a("label",{h:"field-label"},[t.O("Alamat")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.xt,j:"model.address"}],h:"field-style",S:{type:"text",placeholder:"Tulis Alamat"},M:{value:t.P.xt},C:{input:function(e){e.target.N||t.I(t.P,"address",e.target.value)}}}),t.D.P.xt.K?a("span",{h:"field-message text-red-500"},[t.O("This address max length is 255 char.")]):t.B()]),a("div",{h:"grid grid-cols-2 gap-x-4"},[a("div",{h:"field field--icon-right w-full"},[a("label",{h:"field-label"},[t.O("Provinsi")]),a("input",{_:[{name:"model",T:"v-model",value:t.P._t,j:"model.province"}],h:"field-style",S:{type:"text",placeholder:"Tulis provinsi"},M:{value:t.P._t},C:{input:function(e){e.target.N||t.I(t.P,"province",e.target.value)}}})]),a("div",{h:"field field--icon-right w-full"},[a("label",{h:"field-label"},[t.O("Kota")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.Tt,j:"model.city"}],h:"field-style",S:{type:"text",placeholder:"Tulis kota"},M:{value:t.P.Tt},C:{input:function(e){e.target.N||t.I(t.P,"city",e.target.value)}}})]),a("div",{h:"field field--icon-right w-full"},[a("label",{h:"field-label"},[t.O("Kecamatan")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.Pt,j:"model.district"}],h:"field-style",S:{type:"text",placeholder:"Tulis kecamatan"},M:{value:t.P.Pt},C:{input:function(e){e.target.N||t.I(t.P,"district",e.target.value)}}})]),a("div",{h:"field field--icon-right w-full"},[a("label",{h:"field-label"},[t.O("Kelurahan")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.jt,j:"model.village"}],h:"field-style",S:{type:"text",placeholder:"Tulis kelurahan"},M:{value:t.P.jt},C:{input:function(e){e.target.N||t.I(t.P,"village",e.target.value)}}})]),a("div",{h:"field"},[a("label",{h:"field-label"},[t.O("RT/RW")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.St,j:"model.rt_rw"}],h:"field-style",S:{type:"text",placeholder:"Contoh: 008/003"},M:{value:t.P.St},C:{input:function(e){e.target.N||t.I(t.P,"rt_rw",e.target.value)}}})]),a("div",{h:"field"},[a("label",{h:"field-label"},[t.O("Kode Pos")]),a("input",{_:[{name:"model",T:"v-model",value:t.P.Mt,j:"model.postal_code"}],h:"field-style",S:{type:"number",placeholder:"Tulis kode pos"},M:{value:t.P.Mt},C:{input:function(e){e.target.N||t.I(t.P,"postal_code",e.target.value)}}})])])])]),a("div",{h:"grid grid-cols-11 gap-8 mb-16"},[t.k(12),a("div",{h:"col-span-7"},[a("strong",{h:"mb-4 block"},[t.O("Tambah SIM")]),a("div",{h:"flex items-center gap-4"},[a("div",{h:"flex-grow grid grid-cols-2 gap-4"},[a("div",{h:"field field--icon-right w-full"},[a("label",{h:"field-label"},[t.O("Jenis SIM")]),a("select",{_:[{name:"model",T:"v-model",value:t.Nt,j:"dl_type"}],h:"field-style",C:{L:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t.gt:t.value;return e}));t.Nt=e.target.multiple?a:a[0]}}},[a("option",{S:{value:""}},[t.O("- Pilih Jenis SIM -")]),t.Ct(t.It,(function(e){return a("option",{M:{value:e.value}},[t.O(t.ct(e.label))])}))],2),a("span",{h:"icon-field"},[a("b-icon",{S:{name:"chevron-down"}})],1)]),a("div",{h:"field w-full"},[a("label",{h:"field-label"},[t.O("Nomor SIM")]),a("input",{_:[{name:"model",T:"v-model",value:t.Kt,j:"dl_number"}],h:"field-style",S:{type:"number",placeholder:"Tulis Nomor SIM disini..."},M:{value:t.Kt},C:{Dt:function(e){if(!e.type.indexOf("key")&&t.Ot(e.keyCode,"enter",13,e.key,"Enter"))return null;e.preventDefault()},Bt:function(e){return!e.type.indexOf("key")&&t.Ot(e.keyCode,"enter",13,e.key,"Enter")?null:t.At()},input:function(e){e.target.N||(t.Kt=e.target.value)}}})])]),a("div",{h:"field"},[a("label",{h:"field-label opacity-0"},[t.O("Action")]),a("b-button",{S:{Et:"plus",kind:"tertiary",type:"button"},Yt:{click:function(e){return t.At()}}})],1)]),t.P.Ht.length>0?a("div",{h:"w-full"},[a("strong",{h:"mb-4 block"},[t.O("SIM tersimpan")]),t.Ct(t.P.Ht,(function(e,i){return a("div",{h:"saved-item"},[a("div",{h:"flex-grow grid grid-cols-2 gap-4"},[a("div",{h:"field field--editable field--no-margin field--icon-right w-full"},[a("select",{_:[{name:"model",T:"v-model",value:t.P.Ht[i].Lt,j:"model.driving_license[index].license_type"}],h:"field-style",C:{L:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t.gt:t.value;return e}));t.I(t.P.Ht[i],"license_type",e.target.multiple?a:a[0])}}},t.Ct(t.It,(function(e){return a("option",{M:{value:e.value}},[t.O(t.ct(e.label))])})),0),a("span",{h:"icon-field"},[a("b-icon",{S:{name:"chevron-down"}})],1)]),a("div",{h:"field field--editable field--no-margin w-full"},[a("input",{_:[{name:"model",T:"v-model",value:t.P.Ht[i].Wt,j:"model.driving_license[index].license_number"}],h:"field-style",S:{type:"number",placeholder:"Tulis Nomor SIM disini..."},M:{value:t.P.Ht[i].Wt},C:{input:function(e){e.target.N||t.I(t.P.Ht[i],"license_number",e.target.value)}}})])]),a("div",{h:"pr-2"},[a("b-button",{S:{Et:"trash",kind:"danger",size:"small",type:"button"},Yt:{click:function(e){return t.Rt(i)}}})],1)])}))],2):t.B()])]),a("div",{h:"grid grid-cols-11 gap-8 mb-16"},[t.k(13),a("div",{h:"col-span-7"},[a("strong",{h:"mb-4 block"},[t.O("Tambah Kendaraan")]),a("div",{h:"flex items-center gap-4"},[a("div",{h:"flex-grow grid grid-cols-3 gap-4"},[a("div",{h:"field field--icon-right w-full"},[a("label",{h:"field-label"},[t.O("Jenis Kendaraan")]),a("select",{_:[{name:"model",T:"v-model",value:t.Ft,j:"vehicle_type"}],h:"field-style",C:{L:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t.gt:t.value;return e}));t.Ft=e.target.multiple?a:a[0]}}},[a("option",{S:{value:""}},[t.O("Pilih Kendaraan")]),t.Ct(t.Jt,(function(e){return a("option",{M:{value:e.value}},[t.O(t.ct(e.label))])}))],2),a("span",{h:"icon-field"},[a("b-icon",{S:{name:"chevron-down"}})],1)]),a("div",{h:"field w-full"},[a("label",{h:"field-label"},[t.O("Nomor STNK")]),a("input",{_:[{name:"model",T:"v-model",value:t.qt,j:"vehicle_stnk_number"}],h:"field-style",S:{type:"number",placeholder:"Tulis Nomor STNK disini..."},M:{value:t.qt},C:{Dt:function(e){if(!e.type.indexOf("key")&&t.Ot(e.keyCode,"enter",13,e.key,"Enter"))return null;e.preventDefault()},Bt:function(e){return!e.type.indexOf("key")&&t.Ot(e.keyCode,"enter",13,e.key,"Enter")?null:t.zt()},input:function(e){e.target.N||(t.qt=e.target.value)}}})]),a("div",{h:"field w-full"},[a("label",{h:"field-label"},[t.O("Nomor Polisi")]),a("input",{_:[{name:"model",T:"v-model",value:t.Ut,j:"vehicle_police_reg_number"}],h:"field-style",S:{type:"number",placeholder:"Tulis No. Polisi disini..."},M:{value:t.Ut},C:{Dt:function(e){if(!e.type.indexOf("key")&&t.Ot(e.keyCode,"enter",13,e.key,"Enter"))return null;e.preventDefault()},Bt:function(e){return!e.type.indexOf("key")&&t.Ot(e.keyCode,"enter",13,e.key,"Enter")?null:t.zt()},input:function(e){e.target.N||(t.Ut=e.target.value)}}})])]),a("div",{h:"field"},[a("label",{h:"field-label opacity-0"},[t.O("Action")]),a("b-button",{S:{Et:"plus",kind:"tertiary",type:"button"},Yt:{click:function(e){return t.zt()}}})],1)]),t.P.Vt.length>0?a("div",{h:"w-full"},[a("strong",{h:"mb-4 block"},[t.O("SIM tersimpan")]),t.Ct(t.P.Vt,(function(e,i){return a("div",{h:"saved-item"},[a("div",{h:"flex-grow grid grid-cols-3 gap-4"},[a("div",{h:"field field--editable field--no-margin field--icon-right w-full"},[a("select",{_:[{name:"model",T:"v-model",value:t.P.Vt[i].type,j:"model.vehicle_reg[index].type"}],h:"field-style",C:{L:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t.gt:t.value;return e}));t.I(t.P.Vt[i],"type",e.target.multiple?a:a[0])}}},t.Ct(t.Jt,(function(e){return a("option",{M:{value:e.value}},[t.O(t.ct(e.label))])})),0),a("span",{h:"icon-field"},[a("b-icon",{S:{name:"chevron-down"}})],1)]),a("div",{h:"field field--editable field--no-margin w-full"},[a("input",{_:[{name:"model",T:"v-model",value:t.P.Vt[i].Gt,j:"model.vehicle_reg[index].stnk_number"}],h:"field-style",S:{type:"number",placeholder:"Tulis Nomor SIM disini..."},M:{value:t.P.Vt[i].Gt},C:{input:function(e){e.target.N||t.I(t.P.Vt[i],"stnk_number",e.target.value)}}})]),a("div",{h:"field field--editable field--no-margin w-full"},[a("input",{_:[{name:"model",T:"v-model",value:t.P.Vt[i].$t,j:"model.vehicle_reg[index].police_reg_number"}],h:"field-style",S:{type:"number",placeholder:"Tulis Nomor SIM disini..."},M:{value:t.P.Vt[i].$t},C:{input:function(e){e.target.N||t.I(t.P.Vt[i],"police_reg_number",e.target.value)}}})])]),a("div",{h:"pr-2"},[a("b-button",{S:{Et:"trash",kind:"danger",size:"small",type:"button"},Yt:{click:function(e){return t.Qt(i)}}})],1)])}))],2):t.B()])]),a("div",{h:"grid grid-cols-11 gap-8 mb-16"},[t.k(14),a("div",{h:"col-span-7"},[a("strong",{h:"mb-4 block"},[t.O("Sosail Media Populer")]),a("div",{h:"block"},[a("div",{h:"flex-grow grid grid-cols-3 gap-4"},[t.k(15),a("div",{h:"field field--icon-right w-full col-span-2"},[a("label",{h:"field-label"},[t.O("Tautan")]),a("input",{_:[{name:"model",T:"v-model",value:t.Zt.Xt,j:"default_social_media.facebook"}],h:"field-style",S:{type:"text",placeholder:"Tulis tautan Facebook disini..."},M:{value:t.Zt.Xt},C:{input:function(e){e.target.N||t.I(t.Zt,"facebook",e.target.value)}}})])]),a("div",{h:"flex-grow grid grid-cols-3 gap-4"},[t.k(16),a("div",{h:"field field--icon-right w-full col-span-2"},[a("input",{_:[{name:"model",T:"v-model",value:t.Zt.te,j:"default_social_media.twitter"}],h:"field-style",S:{type:"text",placeholder:"Tulis tautan Twitter disini..."},M:{value:t.Zt.te},C:{input:function(e){e.target.N||t.I(t.Zt,"twitter",e.target.value)}}})])]),a("div",{h:"flex-grow grid grid-cols-3 gap-4"},[t.k(17),a("div",{h:"field field--icon-right w-full col-span-2"},[a("input",{_:[{name:"model",T:"v-model",value:t.Zt.ee,j:"default_social_media.instagram"}],h:"field-style",S:{type:"text",placeholder:"Tulis tautan Instagram disini..."},M:{value:t.Zt.ee},C:{input:function(e){e.target.N||t.I(t.Zt,"instagram",e.target.value)}}})])]),a("div",{h:"flex-grow grid grid-cols-3 gap-4"},[t.k(18),a("div",{h:"field field--icon-right w-full col-span-2"},[a("input",{_:[{name:"model",T:"v-model",value:t.Zt.ae,j:"default_social_media.youtube"}],h:"field-style",S:{type:"text",placeholder:"Tulis tautan YouTube disini..."},M:{value:t.Zt.ae},C:{input:function(e){e.target.N||t.I(t.Zt,"youtube",e.target.value)}}})])])]),t.ie.length>0?t.Ct(t.ie,(function(e,i){return a("div",{h:"flex items-center gap-4"},[a("div",{h:"flex-grow grid grid-cols-3 gap-4"},[a("div",{h:"field field--icon-right w-full"},[a("input",{h:"field-style",S:{type:"text",disabled:""},M:{value:t.se(e.ne)}})]),a("div",{h:"flex items-center gap-4 flex-grow col-span-2"},[a("div",{h:"field field--icon-right w-full flex-grow"},[a("input",{_:[{name:"model",T:"v-model",value:t.ie[i].username,j:"data_social_media[index].username"}],h:"field-style",S:{type:"text",placeholder:"Tulis tautan sosial media disini"},M:{value:t.ie[i].username},C:{L:function(e){return t.le()},input:function(e){e.target.N||t.I(t.ie[i],"username",e.target.value)}}})]),a("div",{h:"field"},[a("b-button",{S:{Et:"trash",kind:"danger",type:"button"},Yt:{click:function(e){return t.re(i)}}})],1)])])])})):t.B(),a("div",{h:"block"},[a("div",{h:"flex-grow grid grid-cols-3 gap-4"},[a("div",{h:"field field--icon-right w-full"},[a("label",{h:"field-label"},[t.O("Sosial Media Lainnya")]),a("select",{_:[{name:"model",T:"v-model",value:t.oe,j:"socmed_type"}],h:"field-style",C:{L:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t.gt:t.value;return e}));t.oe=e.target.multiple?a:a[0]}}},[a("option",{S:{value:""}},[t.O("Pilih Sosial Media")]),a("option",{h:"cursor-not-allowed",S:{disabled:""}},[t.O("Facebook")]),a("option",{h:"cursor-not-allowed",S:{disabled:""}},[t.O("Twitter")]),a("option",{h:"cursor-not-allowed",S:{disabled:""}},[t.O("Instagram")]),a("option",{h:"cursor-not-allowed",S:{disabled:""}},[t.O("YouTube")]),a("option",{S:{value:"tiktok"}},[t.O("TikTok")]),a("option",{S:{value:"vine"}},[t.O("Vine")]),a("option",{S:{value:"bigo"}},[t.O("Bigo")]),a("option",{S:{value:"vimeo"}},[t.O("Vimeo")])]),a("span",{h:"icon-field"},[a("b-icon",{S:{name:"chevron-down"}})],1)]),a("div",{h:"flex items-center gap-4 flex-grow col-span-2"},[a("div",{h:"field field--icon-right w-full flex-grow"},[a("label",{h:"field-label"},[t.O("Tautan")]),a("input",{_:[{name:"model",T:"v-model",value:t.de,j:"socmed_username"}],h:"field-style",S:{type:"text",placeholder:"Tulis tautan sosial media disini"},M:{value:t.de},C:{Dt:function(e){if(!e.type.indexOf("key")&&t.Ot(e.keyCode,"enter",13,e.key,"Enter"))return null;e.preventDefault()},Bt:function(e){return!e.type.indexOf("key")&&t.Ot(e.keyCode,"enter",13,e.key,"Enter")?null:t.ce()},input:function(e){e.target.N||(t.de=e.target.value)}}})]),a("div",{h:"field"},[a("label",{h:"field-label opacity-0"},[t.O("Action")]),a("b-button",{S:{Et:"plus",kind:"tertiary",type:"button"},Yt:{click:function(e){return t.ce()}}})],1)])])])],2)])]),a("div",{h:"form-general__footer"},[a("router-link",{S:{ue:"/bdi/tokoh"}},[a("b-button",{S:{text:"Batalkan",type:"button"}})],1),a("b-button",{S:{text:"Simpan",kind:"primary",type:"submit"}})],1)]):[a("div",{h:"box-create-actor"},[a("div",{h:"box-create-actor-container"},[a("h2",{h:"text-xl font-bold mb-2"},[t.O("Pilih Tokoh")]),t.k(0),a("input",{h:"field-style",S:{placeholder:"Cari nama tokoh",type:"text"},C:{focus:function(e){t.me=!t.me}}})])])],a("div",{h:"modal",pe:{fe:t.me}},[a("div",{h:"modal-overlay"}),a("div",{h:"modal-container"},[a("div",{h:"modal-container__header"},[a("h2",[t.O("Cari Tokoh")]),a("b-button",{S:{Et:"x"},Yt:{click:function(e){t.me=!t.me}}})],1),a("div",{h:"modal-container__body"},[t.k(19),a("div",{h:"boxed boxed-actor relative"},[t.ve?[t.he?[a("b-loading",{S:{text:"Mencari tokoh 'Agil'"}})]:[t.be?[a("div",{h:"pt-4"},t.Ct(t.ge,(function(e){return a("button",{h:"list-of-actor"},[a("figure",{h:"mr-2"},[a("img",{h:"w-10 h-10 rounded",S:{src:e.photo,alt:"alt"}})]),a("span",[t.O(t.ct(e.name))])])})),0)]:[a("div",{h:"flex items-center justify-center h-full"},[a("div",{h:"text-center w-80 text-red-500"},[a("b-icon",{h:"mb-4",S:{name:"info",size:"2x"}}),a("p",[t.O("Maaf, Tokoh {nama} tidak ditemukan")])],1)])]]]:[a("div",{h:"flex items-center justify-center h-full"},[a("div",{h:"text-center w-80"},[a("b-icon",{h:"text-gray-500 mb-4",S:{name:"users",size:"2x"}}),a("p",[t.O("Silakan ketik minimal 3 karakter untuk mencari tokoh.")])],1)])]],2)])])])],2)},s=[function(){var t=this,e=t.m,a=t.v.p||e;return a("p",{h:"text-gray-400 mb-4"},[t.O("Tokoh hanya bisa diambil dari database. "),a("br"),t.O(" Hubungi admin jika tokoh tidak ditemukan.")])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"form-general__header w-full"},[a("h2",{h:"text-2xl"},[t.O("Profil")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"col-span-4 pr-12"},[a("h2",{h:"text-xl font-bold mb-2"},[t.O("Tokoh")]),a("p",{h:"text-gray-400"},[t.O("Tokoh hanya bisa diambil dari database. "),a("br"),t.O(" Hubungi admin jika tokoh tidak ditemukan.")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("label",{h:"field-label"},[t.O("Tokoh terpilih "),a("sup",[t.O("*")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("p",{h:"text-gray-400"},[t.O("Silakan gunakan foto ukuran 1:1 dengan format png atau jpg. "),a("br"),t.O(" Pastikan gambar dibawah ukuran 2MB.")])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"col-span-4 pr-12"},[a("h2",{h:"text-xl font-bold mb-2"},[t.O("Identitas Aktor")]),a("p",{h:"text-gray-400"},[t.O("Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("label",{h:"field-label"},[t.O("Jenis Kelamin "),a("sup",[t.O("*")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"ui-radio-style"},[a("div",{h:"box-radio box-radio--default"},[a("span")]),a("label",[t.O("Laki-laki")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"ui-radio-style"},[a("div",{h:"box-radio box-radio--default"},[a("span")]),a("label",[t.O("Perempuan")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"ui-radio-style"},[a("div",{h:"box-radio box-radio--default"},[a("span")]),a("label",[t.O("Lajang")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"ui-radio-style"},[a("div",{h:"box-radio box-radio--default"},[a("span")]),a("label",[t.O("Menikah")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"col-span-4 pr-12"},[a("h2",{h:"text-xl font-bold mb-2"},[t.O("Alamat Aktor")]),a("p",{h:"text-gray-400"},[t.O("Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"col-span-4 pr-12"},[a("h2",{h:"text-xl font-bold mb-2"},[t.O("Surat Izin Mengemudi")]),a("p",{h:"text-gray-400"},[t.O("Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"col-span-4 pr-12"},[a("h2",{h:"text-xl font-bold mb-2"},[t.O("Kendaraan")]),a("p",{h:"text-gray-400"},[t.O("Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"col-span-4 pr-12"},[a("h2",{h:"text-xl font-bold mb-2"},[t.O("Sosial Media")]),a("p",{h:"text-gray-400"},[t.O("Simpan Sosial media aktor, utamakan simpan sosial media yang populer seperti Facebook, Twitter, Instagram dan YouTube.")])])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"field field--icon-right w-full"},[a("label",{h:"field-label"},[t.O("Sosial Media")]),a("input",{h:"field-style",S:{type:"text",value:"Facebook",disabled:""}})])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"field field--icon-right w-full"},[a("input",{h:"field-style",S:{type:"text",value:"Twitter",disabled:""}})])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"field field--icon-right w-full"},[a("input",{h:"field-style",S:{type:"text",value:"Instagram",disabled:""}})])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"field field--icon-right w-full"},[a("input",{h:"field-style",S:{type:"text",value:"Youtube",disabled:""}})])},function(){var t=this,e=t.m,a=t.v.p||e;return a("div",{h:"p-4 pb-0"},[a("input",{h:"field-style field-style--small",S:{placeholder:"Cari Nama Tokoh"}})])}],n=a("1da1"),l=a("5530"),r=(a("96cf"),a("b0c0"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("a434"),a("ac1f"),a("1276"),a("fb6a"),a("a15b"),a("4de4"),a("99af"),a("b64b"),a("caad"),a("2532"),a("2f62")),o=a("bbf5"),d=a.n(o),c=(a("53b4"),a("c1df")),u=a.n(c),m=a("b5ae"),p={Ce:{ye:d.a},data:function(){return{g:!0,me:!1,ve:!1,he:!1,be:!1,we:[{ke:"Ketua Umum",ge:"Wawan Setiawan",photo:"https://randomuser.me/api/portraits/men/82.jpg"},{ke:"Wakil Ketua Umum",ge:"Hari Panca",photo:"https://randomuser.me/api/portraits/men/12.jpg"},{ke:"Departemen Propaganda & Terbitan",ge:"Tessa Kurnawati",photo:"https://randomuser.me/api/portraits/women/22.jpg"},{ke:"Departemen Hubungan Internasional",ge:"Wulandari",photo:"https://randomuser.me/api/portraits/women/32.jpg"}],ge:[{name:"Wawan Setiawan",photo:"https://randomuser.me/api/portraits/men/82.jpg"},{name:"Hari Panca",photo:"https://randomuser.me/api/portraits/men/12.jpg"},{name:"Tessa Kurnawati",photo:"https://randomuser.me/api/portraits/women/22.jpg"},{name:"Wulandari",photo:"https://randomuser.me/api/portraits/women/32.jpg"},{name:"Wawan Setiawan",photo:"https://randomuser.me/api/portraits/men/82.jpg"},{name:"Hari Panca",photo:"https://randomuser.me/api/portraits/men/12.jpg"},{name:"Tessa Kurnawati",photo:"https://randomuser.me/api/portraits/women/22.jpg"},{name:"Wulandari",photo:"https://randomuser.me/api/portraits/women/32.jpg"},{name:"Wawan Setiawan",photo:"https://randomuser.me/api/portraits/men/82.jpg"},{name:"Hari Panca",photo:"https://randomuser.me/api/portraits/men/12.jpg"},{name:"Tessa Kurnawati",photo:"https://randomuser.me/api/portraits/women/22.jpg"},{name:"Wulandari",photo:"https://randomuser.me/api/portraits/women/32.jpg"},{name:"Wawan Setiawan",photo:"https://randomuser.me/api/portraits/men/82.jpg"},{name:"Hari Panca",photo:"https://randomuser.me/api/portraits/men/12.jpg"},{name:"Tessa Kurnawati",photo:"https://randomuser.me/api/portraits/women/22.jpg"},{name:"Wulandari",photo:"https://randomuser.me/api/portraits/women/32.jpg"},{name:"Wawan Setiawan",photo:"https://randomuser.me/api/portraits/men/82.jpg"},{name:"Hari Panca",photo:"https://randomuser.me/api/portraits/men/12.jpg"},{name:"Tessa Kurnawati",photo:"https://randomuser.me/api/portraits/women/22.jpg"},{name:"Wulandari",photo:"https://randomuser.me/api/portraits/women/32.jpg"},{name:"Hari Panca",photo:"https://randomuser.me/api/portraits/men/12.jpg"},{name:"Tessa Kurnawati",photo:"https://randomuser.me/api/portraits/women/22.jpg"},{name:"Wulandari",photo:"https://randomuser.me/api/portraits/women/32.jpg"},{name:"Wawan Setiawan",photo:"https://randomuser.me/api/portraits/men/82.jpg"},{name:"Hari Panca",photo:"https://randomuser.me/api/portraits/men/12.jpg"},{name:"Tessa Kurnawati",photo:"https://randomuser.me/api/portraits/women/22.jpg"},{name:"Wulandari",photo:"https://randomuser.me/api/portraits/women/32.jpg"}],url:null,photo:null,yt:[{value:"Islam",label:"Islam"},{value:"Kristen",label:"Kristen"},{value:"Katolik",label:"Katolik"},{value:"Hindu",label:"Hindu"},{value:"Buddha",label:"Buddha"},{value:"Konghucu",label:"Konghucu"}],U:{q:u()().xe(),V:u()().xe()},_e:{Te:[u()().xe(),u()().xe()],Pe:[u()().je(1,"days").xe(),u()().je(1,"days").xe()]},It:[{value:"SIM A",label:"SIM A"},{value:"SIM B",label:"SIM C"},{value:"SIM C",label:"SIM C"},{value:"SIM C1",label:"SIM C1"},{value:"SIM C2",label:"SIM C2"},{value:"SIM D",label:"SIM D"},{value:"SIM D2",label:"SIM D2"}],Nt:"",Kt:"",Jt:[{value:"Motor",label:"Motor"},{value:"Mobil",label:"Mobil"}],Ft:"",qt:"",Ut:"",Zt:{Xt:"",te:"",ee:"",ae:""},ie:[],oe:"",de:"",P:{name:"",R:"",F:"",J:"",Se:"",ft:"",ht:"",bt:"",wt:"",kt:"",xt:"",_t:"",Tt:"",Pt:"",jt:"",St:"",Mt:"",Ht:[],Vt:[],Me:[]}}},Ne:{P:{name:{required:m["required"],maxLength:Object(m["maxLength"])(255)},R:{maxLength:Object(m["maxLength"])(255)},F:{maxLength:Object(m["maxLength"])(255)},J:{maxLength:Object(m["maxLength"])(255)},Se:{},ft:{required:m["required"]},ht:{},bt:{},wt:{maxLength:Object(m["maxLength"])(255)},kt:{maxLength:Object(m["maxLength"])(255)},xt:{maxLength:Object(m["maxLength"])(255)},_t:{},Tt:{},Pt:{},jt:{},St:{},Mt:{},Ht:{},Vt:{},Me:{}}},Ie:["id"],Ke:Object(l["a"])(Object(l["a"])({},Object(r["b"])("actor",["detail"])),{},{De:function(){return this.Be.Oe}}),watch:{id:function(){},Ae:function(t){},Ee:function(t){},detail:function(t){var e=this.De.name;for(var a in void 0!==e&&"create"==this.id?this.P.name=e:this.P.name=t.name?t.name:"",this.P.R=t.R?t.R:"",this.P.F=t.F?t.F:"",this.P.J=t.J?t.J:"",t.Se&&(this.P.Se=t.Se,this.U.q=u()(t.Se,"YYYY-MM-DD"),this.U.V=u()(t.Se,"YYYY-MM-DD")),this.P.ft=t.ft?t.ft:"",this.P.ht=t.ht?t.ht:"",this.P.bt=t.bt?t.bt:"",this.P.wt=t.wt?t.wt:"",this.P.kt=t.kt?t.kt:"",this.P.xt=t.xt?t.xt:"",this.P._t=t._t?t._t:"",this.P.Tt=t.Tt?t.Tt:"",this.P.Pt=t.Pt?t.Pt:"",this.P.jt=t.jt?t.jt:"",this.P.St=t.St?t.St:"",this.P.Mt=t.Mt?t.Mt:"",this.P.Ht=t.Ht?t.Ht:[],this.P.Vt=t.Vt?t.Vt:[],this.url=t.photo?t.photo:"",this.Zt)this.Zt[a]="";if(this.ie=[],t.Me&&t.Me.length>0){for(var i=0;i<t.Me.length;i++)t.Me[i],i<=3?this.Zt[t.Me[i].ne]=t.Me[i].username:this.ie.push(t.Me[i]);this.P.Me=t.Me}},Ye:function(t){this.le()},He:function(t){this.le()},Le:function(t){this.le()},We:function(t){this.le()},ie:function(t){this.le()}},Re:{W:function(t){var e=t.target.files||t.dataTransfer.files;if(e.length){var a=e[0],i=Math.round(a.size/1024);i>2048?Event.$emit("error","Ukuran file lebih dari 2 Mb!"):(this.url=URL.createObjectURL(a),this.photo=a)}},lt:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.Fe=t.next){case 0:e.P.Se=u()(e.U.q).format("YYYY-MM-DD");case 1:case"end":return t.stop()}}),t)})))()},At:function(){""!==this.Nt&&""!==this.Kt?(this.P.Ht.push({Lt:this.Nt,Wt:this.Kt}),this.Nt="",this.Kt=""):Event.$emit("error","Jenis SIM & nomor SIM wajib diisi!")},Rt:function(t){var e=this;this.qe.Je({icon:"warning",title:"Hapus surat izin mengemudi?",text:this.P.Ht[t].Lt+" - "+this.P.Ht[t].Wt,ze:"Ya",Ue:"#DD6B55",Ve:!0,Ge:"Tidak",$e:!1}).then((function(a){a.Qe&&e.P.Ht.splice(t,1)}))},zt:function(){""!==this.Ft&&""!==this.qt&&""!==this.Ut?(this.P.Vt.push({type:this.Ft,Gt:this.qt,$t:this.Ut}),this.Ft="",this.qt="",this.Ut=""):Event.$emit("error","Jenis kendaraan, nomor STNK,  nomor polisi wajib diisi!")},Qt:function(t){var e=this;this.qe.Je({icon:"warning",title:"Hapus kendaraan?",text:this.P.Vt[t].type+" - STNK ("+this.P.Vt[t].Gt+") - No. Polisi ("+this.P.Vt[t].$t+")",ze:"Ya",Ue:"#DD6B55",Ve:!0,Ge:"Tidak",$e:!1}).then((function(a){a.Qe&&e.P.Vt.splice(t,1)}))},se:function(t){for(var e=t.toLowerCase().split(" "),a=0;a<e.length;a++)e[a]=e[a][0].toUpperCase()+e[a].slice(1);return e.join(" ")},ce:function(){if(""!==this.oe&&""!==this.de){var t={ne:this.oe,username:this.de};if(0===this.ie.length)this.ie.push(t);else{var e=this.ie.filter((function(e){return e.ne===t.ne}));if(e.length>0)return void Event.$emit("warning","Sosial media "+t.ne+" telah terdaftar!");this.ie.push(t)}this.oe="",this.de="",this.le()}else Event.$emit("error","Jenis sosial media dan tautan wajib diisi!")},re:function(t){var e=this;this.qe.Je({icon:"warning",title:"Hapus sosial media "+this.ie[t].ne+"?",ze:"Ya",Ue:"#DD6B55",Ve:!0,Ge:"Tidak",$e:!1}).then((function(a){a.Qe&&(e.ie.splice(t,1),e.le())}))},le:function(){var t=[];for(var e in this.Zt)t.push({ne:e,username:this.Zt[e]});this.P.Me=[].concat(t,this.ie)},Xe:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];for(var e in Object.keys(this.P))!0===t&&(this.P[Object.keys(this.P)[e]]="");this.P.ft="",this.P.ht="",this.Kt="",this.Nt="",this.Ft="",this.qt="",this.Ut=""},reset:function(){var t=this;this.Xe(!0),this.Ze((function(){t.D.ta()}))},submit:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,s,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.Fe=a.next){case 0:if(t.preventDefault(),e.D.ea(),!e.D.P.aa){a.next=15;break}a.ia=regeneratorRuntime.keys(Object.keys(e.D.P));case 4:if((a.sa=a.ia()).done){a.next=13;break}if(i=a.sa.value,s=Object.keys(e.D.P)[i],!s.includes("$")){a.next=9;break}return a.na("return",!1);case 9:if(!e.D.P[s].K){a.next=11;break}return a.na("break",13);case 11:a.next=4;break;case 13:return window.scrollTo(0,0),a.na("return");case 15:Event.$emit("showLoading",!0),n=e.P,n.photo=e.photo,n.Ht=JSON.stringify(n.Ht),n.Vt=JSON.stringify(n.Vt),n.Me=JSON.stringify(n.Me),"create"===e.id?e.ra.la("actor/create",n).then((function(t){"success"===t.result?e.qe.Je({icon:"success",title:"Data berhasil disimpan.",ze:"Tetap dihalaman ini",Ue:"#5a80e7",Ve:!0,Ge:"Kembali ke BDI",$e:!1}).then((function(a){a.Qe?(e.oa.push({path:"/tokoh/"+t.data.id+"/form/profile"}),e.getData()):e.oa.push({path:"/bdi/tokoh"}),Event.$emit("success","Data berhasil dibuat!")})):Event.$emit("error")})):e.ra.la("actor/update",[e.id,n,"information"]).then((function(t){"success"===t.result?e.qe.Je({icon:"success",title:"Data berhasil disimpan.",ze:"Tetap dihalaman ini",Ue:"#5a80e7",Ve:!0,Ge:"Kembali ke BDI",$e:!1}).then((function(t){t.Qe?e.getData():e.oa.push({path:"/bdi/tokoh"}),Event.$emit("success","Data berhasil diperbarui!")})):Event.$emit("error")}));case 22:case"end":return a.stop()}}),a)})))()},getData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.Fe=e.next){case 0:return e.next=2,t.reset(!0);case 2:Event.$emit("getDataActor");case 3:case"end":return e.stop()}}),e)})))()}},da:function(){var t=this.De.name;void 0!==t&&"create"==this.id&&(this.P.name=t)},ca:function(t,e,a){a((function(e){console.log(t.name),"ProfileOfActorForm"===t.name&&(e.getData(),"create"===e.id&&(e.P.Se=u()(e.U.q).format("YYYY-MM-DD")))}))}},f=p,v=(a("bd72"),a("2877")),h=Object(v["a"])(f,i,s,!1,null,null,null);e["default"]=h.o},ua:function(t,e,a){"use strict";var i=a("23e7"),s=a("d039"),n=a("e8b5"),l=a("861d"),r=a("7b0b"),o=a("50c4"),d=a("8418"),c=a("65f0"),u=a("1dde"),m=a("b622"),p=a("2d00"),f=m("isConcatSpreadable"),v=9007199254740991,h="Maximum allowed index exceeded",b=p>=51||!s((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),g=u("concat"),C=function(t){if(!l(t))return!1;var e=t[f];return void 0!==e?!!e:n(t)},y=!b||!g;i({target:"Array",i:!0,s:y},{concat:function(t){var e,a,i,s,n,l=r(this),u=c(l,0),m=0;for(e=-1,i=arguments.length;e<i;e++)if(n=-1===e?l:arguments[e],C(n)){if(s=o(n.length),m+s>v)throw TypeError(h);for(a=0;a<s;a++,m++)a in n&&d(u,m,n[a])}else{if(m>=v)throw TypeError(h);d(u,m++,n)}return u.length=m,u}})},ma:function(t,e,a){"use strict";var i=a("23e7"),s=a("23cb"),n=a("a691"),l=a("50c4"),r=a("7b0b"),o=a("65f0"),d=a("8418"),c=a("1dde"),u=c("splice"),m=Math.max,p=Math.min,f=9007199254740991,v="Maximum allowed length exceeded";i({target:"Array",i:!0,s:!u},{splice:function(t,e){var a,i,c,u,h,b,g=r(this),C=l(g.length),y=s(t,C),w=arguments.length;if(0===w?a=i=0:1===w?(a=0,i=C-y):(a=w-2,i=p(m(n(e),0),C-y)),C+a-i>f)throw TypeError(v);for(c=o(g,i),u=0;u<i;u++)h=y+u,h in g&&d(c,u,g[h]);if(c.length=i,a<i){for(u=y;u<C-i;u++)h=u+i,b=u+a,h in g?g[b]=g[h]:delete g[b];for(u=C;u>C-i+a;u--)delete g[u-1]}else if(a>i)for(u=C-i;u>y;u--)h=u+i-1,b=u+a-1,h in g?g[b]=g[h]:delete g[b];for(u=0;u<a;u++)g[u+y]=arguments[u+2];return g.length=C-i+a,c}})},pa:function(t,e,a){var i=a("b622"),s=i("match");t.o=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[s]=!1,"/./"[t](e)}catch(i){}}return!1}},fa:function(t,e,a){"use strict";a("f874")},va:function(t,e,a){"use strict";var i=a("23e7"),s=a("4d64").includes,n=a("44d2");i({target:"Array",i:!0},{includes:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),n("includes")},ha:function(t,e,a){}}]);
//# sourceMappingURL=chunk-4eb6e2e9.a3236a51.js.map