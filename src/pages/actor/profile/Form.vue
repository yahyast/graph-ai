<template lang="pug">
    .form-general
        template(v-if="!actorSelected")
            .box-create-actor
                .box-create-actor-container
                    h2.text-xl.font-bold.mb-2 Pilih Tokoh
                    p.text-gray-400.mb-4 Tokoh hanya bisa diambil dari database. <br> Hubungi admin jika tokoh tidak ditemukan.
                    input.field-style(  placeholder="Cari nama tokoh" type="text" @focus="openModalActorOfStructure = !openModalActorOfStructure")

        form(v-else @submit.prevent="submit($event)")
            .form-general__header.w-full
                h2.text-2xl Profil
            .form-general__body.w-full
                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Tokoh
                            p.text-gray-400 Tokoh hanya bisa diambil dari database. <br> Hubungi admin jika tokoh tidak ditemukan.
                        .col-span-7
                            .field
                                label.field-label Tokoh terpilih  <sup>*</sup>
                                //- input.field-style( value="Yorrys T.H Raweyai" type="text" @focus="openModalActorOfStructure = !openModalActorOfStructure")
                                input.field-style(placeholder="contoh: Yorrys T.H Raweyai" v-model="model.name")
                                span.field-message.text-red-500(v-if="$v.model.name.$error") This name is required &amp; max length is 255 char.

                            .field
                                .box-photo
                                    .box-photo__cover
                                        figure.photo-square
                                            //- img(v-if="url" :src="url")
                                            img(:src="url ? url : getDefaultImage('profile')" @error="getErrorImage($event,'profile')")
                                    .box-photo__info
                                        label.field-label Foto tokoh
                                        .cta-upload.mb-2
                                            input(ref="photoInput" type="file" @change="onFileChange" accept="image/png, image/jpeg")
                                            span Ganti Foto
                                        p.text-gray-400 Silakan gunakan foto ukuran 1:1 dengan format png atau jpg. <br> Pastikan gambar dibawah ukuran 2MB.

                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Identitas Aktor
                            p.text-gray-400 Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.
                        .col-span-7
                            .field
                                label.field-label Nomor Kartu Keluarga
                                input.field-style(type="number" placeholder="contoh '78978978978979'" v-model="model.kk_number")
                                span.field-message.text-red-500(v-if="$v.model.kk_number.$error") This KK max length is 255 char.

                            .field
                                label.field-label Nomor KTP
                                input.field-style(type="number" placeholder="contoh '30293850293409' " v-model="model.ktp_number")
                                span.field-message.text-red-500(v-if="$v.model.ktp_number.$error") This KTP max length is 255 char.

                            .field
                                label.field-label Tempat &amp; Tanggal lahir
                                .grid.grid-cols-2.gap-4
                                    div
                                        input.field-style( placeholder="Tulis kota kelahiran " type="text" v-model="model.birth_place")

                                        span.field-message.text-red-500(v-if="$v.model.birth_place.$error") This birth place max length is 255 char.

                                    //- input.field-style(type="date" value="1951-01-28")
                                    .box-calendar.box-calendar--born
                                        b-icon(name="calendar")
                                        date-range-picker(
                                            v-if="dateRange.startDate && dateRange.endDate"
                                            ref="picker"
                                            v-model="dateRange"
                                            @update="pickerUpdate($event)"
                                            :locale-data="{ firstDay: 1, format: 'dd mmmm yyyy' }"
                                            :date-format="dateFormatPicker"
                                            opens="right"
                                            drops="up"
                                            :ranges="false"
                                            :autoApply="true"
                                            :singleDatePicker="true"
                                            :showDropdowns="true"
                                        )
                                            //- template(slot="input" slot-scope="picker" style="min-width: 350px;") {{ picker.startDate | date }} - {{ picker.endDate | date }}
                                            template(slot="input" slot-scope="picker" style="min-width: 350px;") {{ picker.startDate | date }}

                                        //- span.field-message.text-red-500(v-if="$v.model.birth_date.$error") This birth date max length is 255 char.

                            .field
                                label.field-label Jenis Kelamin <sup>*</sup>
                                //- .grid.grid-cols-2.gap-4
                                    b-radio(label="Laki-laki" name="gender" value="male" @change="rating=$event" v-model="model.gender" :checked="model.gender !== '' && model.gender === 'male'")
                                    b-radio(label="Perempuan" name="gender" value="female" v-model="model.gender" :checked="model.gender !== '' && model.gender === 'male'")

                                .grid.grid-cols-2.gap-4
                                    .ui-radio
                                        input(type="radio" name="gender" value="Laki-laki" v-model="model.gender")
                                        .ui-radio-style
                                            .box-radio.box-radio--default
                                                span
                                            label Laki-laki
                                    .ui-radio
                                        input(type="radio" name="gender" value="Perempuan" v-model="model.gender")
                                        .ui-radio-style
                                            .box-radio.box-radio--default
                                                span
                                            label Perempuan

                                span.field-message.text-red-500(v-if="$v.model.gender.$error") This gender is required.

                            .field
                                label.field-label Status Perkawinan
                                //- .grid.grid-cols-2.gap-4
                                    b-radio(label="Belum kawin" name="marital_status" value="single" v-model="model.marital_status")
                                    b-radio(label="Kawin" name="marital_status" value="married" v-model="model.marital_status")

                                .grid.grid-cols-2.gap-4
                                    .ui-radio
                                        input(type="radio" name="marital_status" value="Lajang" v-model="model.marital_status")
                                        .ui-radio-style
                                            .box-radio.box-radio--default
                                                span
                                            label Lajang
                                    .ui-radio
                                        input(type="radio" name="marital_status" value="Menikah" v-model="model.marital_status")
                                        .ui-radio-style
                                            .box-radio.box-radio--default
                                                span
                                            label Menikah

                                //- span.field-message.text-red-500(v-if="$v.model.marital_status.$error") This marital_status is required.

                            .field.field--icon-right.w-full
                                label.field-label Agama
                                select.field-style(v-model="model.religion")
                                    option(value="") - Pilih Agama -
                                    option(v-for="item in opsiReligion" :value="item.value") {{ item.label }}

                                span.icon-field
                                    b-icon(name="chevron-down")

                                //- span.field-message.text-red-500(v-if="$v.model.religion.$error") This religion is required.

                            .field
                                label.field-label Pekerjaan
                                input.field-style(type="text" placeholder="Tulis pekerjaan aktor disini..." v-model="model.profession")

                                //- span.field-message.text-red-500(v-if="$v.model.profession.$error") This profession max length is 255 char.

                            .field
                                label.field-label Golongan darah
                                input.field-style(type="text" placeholder="Tulis golongan darah aktor disini..." v-model="model.blood_type")

                                //- span.field-message.text-red-500(v-if="$v.model.blood_type.$error") This blood_type max length is 255 char.

                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Alamat Aktor
                            p.text-gray-400 Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.
                        .col-span-7
                            .field
                                label.field-label Alamat
                                input.field-style(type="text" placeholder="Tulis Alamat" v-model="model.address")

                                span.field-message.text-red-500(v-if="$v.model.address.$error") This address max length is 255 char.

                            .grid.grid-cols-2.gap-x-4
                                .field.field--icon-right.w-full
                                    label.field-label Provinsi
                                    //- select.field-style(v-model="model.province")
                                    //-     option(value="") - Pilih Provinsi -
                                    //-     option(value="dki jakarta") DKI Jakarta
                                    //-     option(value="di yogyakarta") DI Yogyakarta
                                    //-     option(value="jawa tengah") Jawa Tengah
                                    //- span.icon-field
                                        b-icon(name="chevron-down")

                                    input.field-style(type="text" placeholder="Tulis provinsi" v-model="model.province")

                                    //- span.field-message.text-red-500(v-if="$v.model.province.$error") This province is required.


                                .field.field--icon-right.w-full
                                    label.field-label Kota
                                    //- select.field-style(v-model="model.city")
                                    //-     option(value="") - Pilih Kota -
                                    //-     option(value="jakarta barat") Jakarta Barat
                                    //-     option(value="kota yogyakarta") Kota Yogyakarta
                                    //-     option(value="bantul") Bantul
                                    //-     option(value="sleman") Sleman
                                    //- span.icon-field
                                        b-icon(name="chevron-down")

                                    input.field-style(type="text" placeholder="Tulis kota" v-model="model.city")

                                    //- span.field-message.text-red-500(v-if="$v.model.city.$error") This city is required.

                                .field.field--icon-right.w-full
                                    label.field-label Kecamatan
                                    //- select.field-style(v-model="model.district")
                                    //-     option(value="") - Pilih Kecamatan -
                                    //-     option(value="umbulharjo") Umbulharjo
                                    //-     option(value="yogyakarta") Yogyakarta
                                    //-     option(value="bantul") Bantul
                                    //-     option(value="sleman") Sleman
                                    //- span.icon-field
                                        b-icon(name="chevron-down")

                                    input.field-style(type="text" placeholder="Tulis kecamatan" v-model="model.district")

                                    //- span.field-message.text-red-500(v-if="$v.model.district.$error") This district is required.

                                .field.field--icon-right.w-full
                                    label.field-label Kelurahan
                                    //- select.field-style(v-model="model.village")
                                    //-     option(value="") - Pilih Kelurahan -
                                    //-     option(value="nitikan") Nitikan
                                    //-     option(value="bambang lipuro") Bambang Lipuro
                                    //-     option(value="kretek") Kretek
                                    //- span.icon-field
                                        b-icon(name="chevron-down")

                                    input.field-style(type="text" placeholder="Tulis kelurahan" v-model="model.village")

                                    //- span.field-message.text-red-500(v-if="$v.model.village.$error") This village is required.

                                .field
                                    label.field-label RT/RW
                                    input.field-style(type="text" placeholder="Contoh: 008/003" v-model="model.rt_rw")

                                    //- span.field-message.text-red-500(v-if="$v.model.rt_rw.$error") This rt_rw is required.

                                .field
                                    label.field-label Kode Pos
                                    input.field-style(type="number" placeholder="Tulis kode pos" v-model="model.postal_code")

                                    //- span.field-message.text-red-500(v-if="$v.model.postal_code.$error") This postal_code is required.


                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Surat Izin Mengemudi
                            p.text-gray-400 Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.
                        .col-span-7
                                strong.mb-4.block Tambah SIM
                                .flex.items-center.gap-4
                                    .flex-grow.grid.grid-cols-2.gap-4
                                        .field.field--icon-right.w-full
                                            label.field-label Jenis SIM
                                            select.field-style(v-model="dl_type")
                                                option(value="") - Pilih Jenis SIM -
                                                option(v-for="item in dl_opsi" :value="item.value") {{ item.label }}
                                            span.icon-field
                                                b-icon(name="chevron-down")
                                        .field.w-full
                                            label.field-label Nomor SIM
                                            input.field-style(type="number" placeholder="Tulis Nomor SIM disini..." v-model="dl_number" @keydown.enter.prevent @keyup.enter="addDl()")
                                    .field
                                        label.field-label.opacity-0 Action
                                        b-button(icon_only="plus" kind="tertiary" type="button" @click.native="addDl()")

                                //- .field.field--icon-right.w-full
                                .w-full(v-if="model.driving_license.length > 0")
                                    strong.mb-4.block SIM tersimpan

                                    .saved-item(v-for="(item,index) in model.driving_license")
                                        .flex-grow.grid.grid-cols-2.gap-4
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                //- .field-style {{ item.license_type }}

                                                select.field-style(v-model="model.driving_license[index].license_type")
                                                    option(v-for="item in dl_opsi" :value="item.value") {{ item.label }}
                                                span.icon-field
                                                    b-icon(name="chevron-down")

                                            .field.field--editable.field--no-margin.w-full
                                                //- .field-style {{ item.license_number }}
                                                input.field-style(type="number" placeholder="Tulis Nomor SIM disini..." v-model="model.driving_license[index].license_number")

                                        .pr-2
                                            b-button(icon_only="trash" kind="danger" size="small" type="button" @click.native="removeDl(index)")

                                    //- .flex.items-center.gap-4.border.rounded.p-2.mb-2
                                        .flex-grow.grid.grid-cols-2.gap-4
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                select.field-style
                                                    option(selected) SIM A
                                                    option SIM B
                                                    option SIM C
                                                span.icon-field
                                                    b-icon(name="chevron-down")
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                input.field-style(type="text" placeholder="Tulis Nomor SIM disini..." value="123123123")
                                        .pr-2
                                            b-button(icon_only="trash" kind="danger" size="small")

                                    //- .flex.items-center.gap-4.border.rounded.p-2
                                        .flex-grow.grid.grid-cols-2.gap-4
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                select.field-style
                                                    option SIM A
                                                    option SIM B
                                                    option(selected) SIM C
                                                span.icon-field
                                                    b-icon(name="chevron-down")
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                input.field-style(type="text" placeholder="Tulis Nomor SIM disini..." value="567567567")
                                        .pr-2
                                            b-button(icon_only="trash" kind="danger" size="small")

                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Kendaraan
                            p.text-gray-400 Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.

                        .col-span-7
                                strong.mb-4.block Tambah Kendaraan
                                .flex.items-center.gap-4
                                    .flex-grow.grid.grid-cols-3.gap-4
                                        .field.field--icon-right.w-full
                                            label.field-label Jenis Kendaraan
                                            select.field-style(v-model="vehicle_type")
                                                option(value="") Pilih Kendaraan
                                                option(v-for="item in vehicle_reg_opsi" :value="item.value") {{ item.label }}
                                            span.icon-field
                                                b-icon(name="chevron-down")
                                        .field.w-full
                                            label.field-label Nomor STNK
                                            input.field-style(type="number" placeholder="Tulis Nomor STNK disini..." v-model="vehicle_stnk_number" @keydown.enter.prevent @keyup.enter="addVehicle()")

                                        .field.w-full
                                            label.field-label Nomor Polisi
                                            input.field-style(type="number" placeholder="Tulis No. Polisi disini..."  v-model="vehicle_police_reg_number" @keydown.enter.prevent @keyup.enter="addVehicle()")

                                    .field
                                        label.field-label.opacity-0 Action
                                        b-button(icon_only="plus" kind="tertiary" type="button" @click.native="addVehicle()")

                                //- .field.field--icon-right.w-full
                                .w-full(v-if="model.vehicle_reg.length > 0")
                                    strong.mb-4.block SIM tersimpan

                                    .saved-item(v-for="(item,index) in model.vehicle_reg")
                                        .flex-grow.grid.grid-cols-3.gap-4
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                select.field-style(v-model="model.vehicle_reg[index].type")
                                                    option(v-for="item in vehicle_reg_opsi" :value="item.value") {{ item.label }}
                                                span.icon-field
                                                    b-icon(name="chevron-down")

                                            .field.field--editable.field--no-margin.w-full
                                                input.field-style(type="number" placeholder="Tulis Nomor SIM disini..." v-model="model.vehicle_reg[index].stnk_number")

                                            .field.field--editable.field--no-margin.w-full
                                                input.field-style(type="number" placeholder="Tulis Nomor SIM disini..." v-model="model.vehicle_reg[index].police_reg_number")

                                        .pr-2
                                            b-button(icon_only="trash" kind="danger" size="small" type="button" @click.native="removeVehicle(index)")

                        //- .col-span-7
                                strong.mb-4.block Tambah Kendaraan
                                .flex.items-center.gap-4
                                    .flex-grow.grid.grid-cols-3.gap-4
                                        .field.field--icon-right.w-full
                                            label.field-label Jenis Kendaraan
                                            select.field-style
                                                option Motor
                                                option Mobil
                                            span.icon-field
                                                b-icon(name="chevron-down")
                                        .field.field--icon-right.w-full
                                            label.field-label Nomor STNK
                                            input.field-style(type="text" placeholder="Tulis No. STNK disini..." value="")
                                        .field.field--icon-right.w-full
                                            label.field-label Nomor Polisi
                                            input.field-style(type="text" placeholder="Tulis No. Polisi disini..." value="")
                                    .field
                                        label.field-label.opacity-0 Action
                                        b-button(icon_only="plus" kind="tertiary")

                                .field.field--icon-right.w-full
                                    strong.mb-4.block Kendaraan tersimpan
                                    .flex.items-center.gap-4.border.rounded.p-2.mb-2
                                        .flex-grow.grid.grid-cols-3.gap-4
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                select.field-style
                                                    option(selected) Motor
                                                    option Mobil
                                                span.icon-field
                                                    b-icon(name="chevron-down")
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                input.field-style(type="text" placeholder="Tulis No. STNK disini..." value="567567567")

                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                input.field-style(type="text" placeholder="Tulis No. polisi disini..." value="B 1243 Y")
                                        .pr-2
                                            b-button(icon_only="trash" kind="danger" size="small")
                                    .flex.items-center.gap-4.border.rounded.p-2
                                        .flex-grow.grid.grid-cols-3.gap-4
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                select.field-style
                                                    option Motor
                                                    option(selected) Mobil
                                                span.icon-field
                                                    b-icon(name="chevron-down")
                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                input.field-style(type="text" placeholder="Tulis No. STNK disini..." value="123123123")

                                            .field.field--editable.field--no-margin.field--icon-right.w-full
                                                input.field-style(type="text" placeholder="Tulis No. polisi disini..." value="B 1242 Y")
                                        .pr-2
                                            b-button(icon_only="trash" kind="danger" size="small")
                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Sosial Media
                            p.text-gray-400 Simpan Sosial media aktor, utamakan simpan sosial media yang populer seperti Facebook, Twitter, Instagram dan YouTube.

                        .col-span-7
                            strong.mb-4.block Sosail Media Populer
                            .block
                                .flex-grow.grid.grid-cols-3.gap-4
                                    .field.field--icon-right.w-full
                                        label.field-label Sosial Media
                                        input.field-style(type="text" value="Facebook" disabled)
                                    .field.field--icon-right.w-full.col-span-2
                                        label.field-label Tautan
                                        input.field-style(type="text" placeholder="Tulis tautan Facebook disini..." v-model="default_social_media.facebook")

                                .flex-grow.grid.grid-cols-3.gap-4
                                    .field.field--icon-right.w-full
                                        input.field-style(type="text" value="Twitter" disabled)
                                    .field.field--icon-right.w-full.col-span-2
                                        input.field-style(type="text" placeholder="Tulis tautan Twitter disini..." v-model="default_social_media.twitter")

                                .flex-grow.grid.grid-cols-3.gap-4
                                    .field.field--icon-right.w-full
                                        input.field-style(type="text" value="Instagram" disabled)
                                    .field.field--icon-right.w-full.col-span-2
                                        input.field-style(type="text" placeholder="Tulis tautan Instagram disini..." v-model="default_social_media.instagram")

                                .flex-grow.grid.grid-cols-3.gap-4
                                    .field.field--icon-right.w-full
                                        input.field-style(type="text" value="Youtube" disabled)
                                    .field.field--icon-right.w-full.col-span-2
                                        input.field-style(type="text" placeholder="Tulis tautan YouTube disini..." v-model="default_social_media.youtube")

                            template(v-if="data_social_media.length > 0")
                                .flex.items-center.gap-4(v-for="(item, index) in data_social_media")
                                    .flex-grow.grid.grid-cols-3.gap-4
                                        .field.field--icon-right.w-full
                                            input.field-style(type="text" :value="titleCase(item.media_type)" disabled="")

                                        .flex.items-center.gap-4.flex-grow.col-span-2
                                            .field.field--icon-right.w-full.flex-grow
                                                input.field-style(type="text" placeholder="Tulis tautan sosial media disini" v-model="data_social_media[index].username" @change="updateAllSocmed()")

                                            .field
                                                b-button(icon_only="trash" kind="danger" type="button" @click.native="removeSocmed(index)")

                            .block

                                .flex-grow.grid.grid-cols-3.gap-4
                                    .field.field--icon-right.w-full
                                        label.field-label Sosial Media Lainnya
                                        select.field-style(v-model="socmed_type")
                                            option(value="") Pilih Sosial Media
                                            option.cursor-not-allowed(disabled) Facebook
                                            option.cursor-not-allowed(disabled) Twitter
                                            option.cursor-not-allowed(disabled) Instagram
                                            option.cursor-not-allowed(disabled) YouTube
                                            option(value="tiktok") TikTok
                                            option(value="vine") Vine
                                            option(value="bigo") Bigo
                                            //- option(value="tiner") Tiner
                                            option(value="vimeo") Vimeo
                                        span.icon-field
                                            b-icon(name="chevron-down")
                                    .flex.items-center.gap-4.flex-grow.col-span-2
                                        .field.field--icon-right.w-full.flex-grow
                                            label.field-label Tautan
                                            input.field-style(type="text" placeholder="Tulis tautan sosial media disini" v-model="socmed_username" @keydown.enter.prevent @keyup.enter="addSocmed()")
                                        .field
                                            label.field-label.opacity-0 Action
                                            b-button(icon_only="plus" kind="tertiary" type="button" @click.native="addSocmed()")

            .form-general__footer
                router-link(to="/bdi/tokoh")
                    b-button(text="Batalkan" type="button")
                b-button(text="Simpan" kind="primary" type="submit")


        //- open popup
        .modal(v-bind:class="{'modal--show' : openModalActorOfStructure}")
            .modal-overlay
            .modal-container
                .modal-container__header
                    h2 Cari Tokoh
                    b-button(icon_only="x" @click.native="openModalActorOfStructure = !openModalActorOfStructure")
                .modal-container__body
                    .p-4.pb-0
                        input.field-style.field-style--small(placeholder="Cari Nama Tokoh")
                    .boxed.boxed-actor.relative
                        template(v-if="!GotActor")
                            .flex.items-center.justify-center.h-full
                                .text-center.w-80
                                    b-icon.text-gray-500.mb-4(name="users" size="2x")
                                    p Silakan ketik minimal 3 karakter untuk mencari tokoh.
                        template(v-else)
                            template(v-if="FindingActor")
                                b-loading(text="Mencari tokoh 'Agil'")
                            template(v-else)
                                template(v-if="!FoundActor")
                                    .flex.items-center.justify-center.h-full
                                        .text-center.w-80.text-red-500
                                            b-icon.mb-4(name="info" size="2x")
                                            p Maaf, Tokoh {nama} tidak ditemukan
                                template(v-else)
                                    .pt-4
                                        button.list-of-actor(v-for="item in actor")
                                            figure.mr-2
                                                img(:src="item.photo", alt="alt").w-10.h-10.rounded
                                            span {{ item.name}}

</template>

<script>
import {mapState} from 'vuex';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import moment from 'moment';
import {required, maxLength} from 'vuelidate/lib/validators';

export default {
    components: {
        DateRangePicker,
    },
    data() {
        return {
            actorSelected: true,
            // url: 'https://graph-ntxdemo.vercel.app/icon/yorrys.png',
            openModalActorOfStructure: false,
            GotActor: false,
            FindingActor: false,
            FoundActor: false,
            addedStructure: [
                {
                    jabatan: 'Ketua Umum',
                    actor: 'Wawan Setiawan',
                    photo: 'https://randomuser.me/api/portraits/men/82.jpg',
                },
                {
                    jabatan: 'Wakil Ketua Umum',
                    actor: 'Hari Panca',
                    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
                },
                {
                    jabatan: 'Departemen Propaganda & Terbitan',
                    actor: 'Tessa Kurnawati',
                    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
                },
                {
                    jabatan: 'Departemen Hubungan Internasional',
                    actor: 'Wulandari',
                    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
                },
            ],
            actor: [
                {
                    name: 'Wawan Setiawan',
                    photo: 'https://randomuser.me/api/portraits/men/82.jpg',
                },
                {
                    name: 'Hari Panca',
                    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
                },
                {
                    name: 'Tessa Kurnawati',
                    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
                },
                {
                    name: 'Wulandari',
                    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
                },
                {
                    name: 'Wawan Setiawan',
                    photo: 'https://randomuser.me/api/portraits/men/82.jpg',
                },
                {
                    name: 'Hari Panca',
                    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
                },
                {
                    name: 'Tessa Kurnawati',
                    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
                },
                {
                    name: 'Wulandari',
                    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
                },
                {
                    name: 'Wawan Setiawan',
                    photo: 'https://randomuser.me/api/portraits/men/82.jpg',
                },
                {
                    name: 'Hari Panca',
                    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
                },
                {
                    name: 'Tessa Kurnawati',
                    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
                },
                {
                    name: 'Wulandari',
                    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
                },
                {
                    name: 'Wawan Setiawan',
                    photo: 'https://randomuser.me/api/portraits/men/82.jpg',
                },
                {
                    name: 'Hari Panca',
                    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
                },
                {
                    name: 'Tessa Kurnawati',
                    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
                },
                {
                    name: 'Wulandari',
                    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
                },
                {
                    name: 'Wawan Setiawan',
                    photo: 'https://randomuser.me/api/portraits/men/82.jpg',
                },
                {
                    name: 'Hari Panca',
                    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
                },
                {
                    name: 'Tessa Kurnawati',
                    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
                },
                {
                    name: 'Wulandari',
                    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
                },
                {
                    name: 'Hari Panca',
                    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
                },
                {
                    name: 'Tessa Kurnawati',
                    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
                },
                {
                    name: 'Wulandari',
                    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
                },
                {
                    name: 'Wawan Setiawan',
                    photo: 'https://randomuser.me/api/portraits/men/82.jpg',
                },
                {
                    name: 'Hari Panca',
                    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
                },
                {
                    name: 'Tessa Kurnawati',
                    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
                },
                {
                    name: 'Wulandari',
                    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
                },
            ],

            url: null,
            photo: null,

            opsiReligion: [
                {
                    value: 'Islam',
                    label: 'Islam',
                },
                {
                    value: 'Kristen',
                    label: 'Kristen',
                },
                {
                    value: 'Katolik',
                    label: 'Katolik',
                },
                {
                    value: 'Hindu',
                    label: 'Hindu',
                },
                {
                    value: 'Buddha',
                    label: 'Buddha',
                },
                {
                    value: 'Konghucu',
                    label: 'Konghucu',
                },
            ],
            dateRange: {
                // startDate: moment().subtract(6, 'days').toDate(),
                startDate: moment().toDate(),
                endDate: moment().toDate(),
            },
            default_ranges: {
                'Hari ini': [moment().toDate(), moment().toDate()],
                'Kemarin': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
                // 'Last 7 days': [moment().subtract(6, 'days').toDate(), moment().toDate()],
                // 'Last week': [moment().subtract(1, 'isoWeek').startOf('isoWeek').toDate(), moment().subtract(1, 'isoWeek').endOf('isoWeek').toDate()],
            },

            dl_opsi: [
                {
                    value: 'SIM A',
                    label: 'SIM A',
                },
                {
                    value: 'SIM B',
                    label: 'SIM C',
                },
                {
                    value: 'SIM C',
                    label: 'SIM C',
                },
                {
                    value: 'SIM C1',
                    label: 'SIM C1',
                },
                {
                    value: 'SIM C2',
                    label: 'SIM C2',
                },
                {
                    value: 'SIM D',
                    label: 'SIM D',
                },
                {
                    value: 'SIM D2',
                    label: 'SIM D2',
                },
            ],
            dl_type: '',
            dl_number: '',

            vehicle_reg_opsi: [
                {
                    value: 'Motor',
                    label: 'Motor',
                },
                {
                    value: 'Mobil',
                    label: 'Mobil',
                },
            ],
            vehicle_type: '',
            vehicle_stnk_number: '',
            vehicle_police_reg_number: '',

            default_social_media: {
                facebook: '',
                twitter: '',
                instagram: '',
                youtube: '',
            },
            data_social_media: [],
            socmed_type: '',
            socmed_username: '',

            // ----------------------------------------------------

            model: {
                name: '',
                kk_number: '',
                ktp_number: '',
                birth_place: '',
                birth_date: '',
                gender: '',
                marital_status: '',
                religion: '',
                profession: '',
                blood_type: '',

                address: '',
                province: '',
                city: '',
                district: '',
                village: '',
                rt_rw: '',
                postal_code: '',

                driving_license: [],
                vehicle_reg: [],

                social_media: [],
            },
        };
    },
    validations: {
        model: {
            name: {
                required,
                maxLength: maxLength(255),
            },
            kk_number: {
                // required,
                maxLength: maxLength(255),
            },
            ktp_number: {
                // required,
                maxLength: maxLength(255),
            },
            birth_place: {
                // required,
                maxLength: maxLength(255),
            },
            birth_date: {
                // required
            },
            gender: {
                required,
            },
            marital_status: {
                // required
            },
            religion: {
                // required
            },
            profession: {
                // required,
                maxLength: maxLength(255),
            },
            blood_type: {
                // required,
                maxLength: maxLength(255),
            },

            address: {
                // required,
                maxLength: maxLength(255),
            },
            province: {
                // required
            },
            city: {
                // required
            },
            district: {
                // required
            },
            village: {
                // required
            },
            rt_rw: {
                // required
            },
            postal_code: {
                // required
            },

            driving_license: {
                // required
            },
            vehicle_reg: {
                // required
            },

            social_media: {
                // required
            },
        },
    },
    props: ['id'],
    computed: {
        ...mapState('actor', [
            'detail',
        ]),
        route_query() {
            return this.$route.query;
        },
    },
    watch: {
        id() {},
        'model.driving_license'(newVal) {
            // console.log('watch model.driving_license', newVal);
        },
        'model.vehicle_reg'(newVal) {
            // console.log('watch model.vehicle_reg', newVal);
        },
        detail(newVal) {
            // console.log('watch detail', newVal);
            const param = this.route_query.name;
            if (param !== undefined && this.id == 'create') {
                this.model.name = param;
            } else {
                this.model.name = (newVal.name ? newVal.name : '');
            }
            this.model.kk_number = (newVal.kk_number ? newVal.kk_number : '');
            this.model.ktp_number = (newVal.ktp_number ? newVal.ktp_number : '');
            this.model.birth_place = (newVal.birth_place ? newVal.birth_place : '');

            if (newVal.birth_date) {
                // this.model.birth_date = (newVal.birth_date ? newVal.birth_date : '');
                // this.model.birth_date = (newVal.birth_date ? moment(newVal.birth_date, 'YYYY-MM-DD') : '');

                this.model.birth_date = newVal.birth_date;
                this.dateRange.startDate = moment(newVal.birth_date, 'YYYY-MM-DD');
                this.dateRange.endDate = moment(newVal.birth_date, 'YYYY-MM-DD');
            }

            this.model.gender = (newVal.gender ? newVal.gender : '');
            this.model.marital_status = (newVal.marital_status ? newVal.marital_status : '');
            this.model.religion = (newVal.religion ? newVal.religion : '');
            this.model.profession = (newVal.profession ? newVal.profession : '');
            this.model.blood_type = (newVal.blood_type ? newVal.blood_type : '');

            this.model.address = (newVal.address ? newVal.address : '');
            this.model.province = (newVal.province ? newVal.province : '');
            this.model.city = (newVal.city ? newVal.city : '');
            this.model.district = (newVal.district ? newVal.district : '');
            this.model.village = (newVal.village ? newVal.village : '');
            this.model.rt_rw = (newVal.rt_rw ? newVal.rt_rw : '');
            this.model.postal_code = (newVal.postal_code ? newVal.postal_code : '');

            this.model.driving_license = (newVal.driving_license ? newVal.driving_license : []);
            this.model.vehicle_reg = (newVal.vehicle_reg ? newVal.vehicle_reg : []);

            this.url = (newVal.photo ? newVal.photo : '');

            // social media
            for (const index in this.default_social_media) {
                this.default_social_media[index] = '';
            }

            this.data_social_media = [];

            if (newVal.social_media && newVal.social_media.length > 0) {
                for (let i = 0; i < newVal.social_media.length; i++) {
                    newVal.social_media[i];
                    if (i <= 3) {
                        this.default_social_media[newVal.social_media[i].media_type] = newVal.social_media[i].username;
                    } else {
                        this.data_social_media.push(newVal.social_media[i]);
                    }
                }

                this.model.social_media = newVal.social_media;
            }
        },
        'default_social_media.facebook': function(newVal) {
            this.updateAllSocmed();
        },
        'default_social_media.twitter': function(newVal) {
            this.updateAllSocmed();
        },
        'default_social_media.instagram': function(newVal) {
            this.updateAllSocmed();
        },
        'default_social_media.youtube': function(newVal) {
            this.updateAllSocmed();
        },
        data_social_media(newVal) {
            // console.log('watch data_social_media', newVal)
            this.updateAllSocmed();
        },
        // photo(newVal) {
        //     console.log('wath photo')
        //     console.log(newVal)
        // }
    },
    methods: {
        // onFileChange(e) {
        //     const file = e.target.files[0];
        //     this.url = URL.createObjectURL(file);
        // },
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            // Event.$emit('showLoading', true);

            const file = files[0];
            // console.log(file)
            const fsize = Math.round((file.size / 1024));

            if (fsize > 2048) { // check if not more than 2mb
                Event.$emit('error', 'Ukuran file lebih dari 2 Mb!');
                // this.url = null;
                // this.photo = null;
                return;
            }

            this.url = URL.createObjectURL(file);
            this.photo = file;
        },
        async pickerUpdate(e) {
            // console.log(moment(this.dateRange.endDate).format('YYYY-MM-DD'))
            this.model.birth_date = moment(this.dateRange.startDate).format('YYYY-MM-DD');

            // let ranges = moment(e.endDate.getTime()).diff(moment(e.startDate.getTime()), 'days') + 1;
            // let def = this.$store.getters['config/getDateRangeByRoute'](this.route_name)

            // // if (ranges > def) {
            // if (ranges > this.$store.getters['config/getValidateRange']) {
            //     const default_date = this.$store.getters['config/getDefaultDate'](def);
            //     this.updateDateRange(default_date.from_date, default_date.to_date);
            //     await this.dateChange();

            //     // Event.$emit('error', 'Date range is not more than ' + this.$store.getters['config/getValidateRange'] + ' days!');
            //     this.$swal.fire({
            //         icon: 'error',
            //         title: 'Date range is not more than ' + this.$store.getters['config/getValidateRange'] + ' days!',
            //         text: 'Your date range is ' + ranges + ' days.',
            //     });
            //     return;
            // }

            // this.updateDateRange(moment(this.dateRange.startDate).format('YYYY-MM-DD'), moment(this.dateRange.endDate).format('YYYY-MM-DD'));
        },
        addDl() {
            if (this.dl_type === '' || this.dl_number === '') {
                Event.$emit('error', 'Jenis SIM & nomor SIM wajib diisi!');
                return;
            }

            this.model.driving_license.push({
                license_type: this.dl_type,
                license_number: this.dl_number,
            });

            this.dl_type = '';
            this.dl_number = '';
        },
        removeDl(index) {
            // console.log(this.model.driving_license[index]);
            this.$swal.fire({
                icon: 'warning',
                title: 'Hapus surat izin mengemudi?',
                text: this.model.driving_license[index].license_type +' - '+ this.model.driving_license[index].license_number,
                confirmButtonText: 'Ya',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.model.driving_license.splice(index, 1);
                    }
                });
        },
        addVehicle() {
            if (this.vehicle_type === '' || this.vehicle_stnk_number === '' || this.vehicle_police_reg_number === '') {
                Event.$emit('error', 'Jenis kendaraan, nomor STNK,  nomor polisi wajib diisi!');
                return;
            }

            this.model.vehicle_reg.push({
                type: this.vehicle_type,
                stnk_number: this.vehicle_stnk_number,
                police_reg_number: this.vehicle_police_reg_number,
            });

            this.vehicle_type = '';
            this.vehicle_stnk_number = '';
            this.vehicle_police_reg_number = '';
        },
        removeVehicle(index) {
            // console.log(this.model.vehicle_reg[index]);
            this.$swal.fire({
                icon: 'warning',
                title: 'Hapus kendaraan?',
                text: this.model.vehicle_reg[index].type +' - STNK ('+ this.model.vehicle_reg[index].stnk_number +') - No. Polisi ('+ this.model.vehicle_reg[index].police_reg_number +')',
                confirmButtonText: 'Ya',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.model.vehicle_reg.splice(index, 1);
                    }
                });
        },
        titleCase(string) {
            const sentence = string.toLowerCase().split(' ');
            for (let i = 0; i< sentence.length; i++) {
                sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
            }
            // document.write(sentence.join(" "));
            return sentence.join(' ');
        },
        addSocmed() {
            if (this.socmed_type === '' || this.socmed_username === '') {
                Event.$emit('error', 'Jenis sosial media dan tautan wajib diisi!');
                return;
            }

            const socmed = {
                media_type: this.socmed_type,
                username: this.socmed_username,
            };

            if (this.data_social_media.length === 0) {
                this.data_social_media.push(socmed);
            } else {
                const check_data = this.data_social_media.filter(function(e) {
                    return e.media_type === socmed.media_type;
                });

                if (check_data.length > 0) {
                    Event.$emit('warning', 'Sosial media '+ socmed.media_type +' telah terdaftar!');
                    return;
                } else {
                    this.data_social_media.push(socmed);
                }
            }

            this.socmed_type = '';
            this.socmed_username = '';

            this.updateAllSocmed();
        },
        removeSocmed(index) {
            this.$swal.fire({
                icon: 'warning',
                title: 'Hapus sosial media '+ this.data_social_media[index].media_type +'?',
                // text: 'Data berhasil disimpan.',
                confirmButtonText: 'Ya',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.data_social_media.splice(index, 1);
                        this.updateAllSocmed();
                    }
                });
        },
        updateAllSocmed() {
            const data = [];

            for (const index in this.default_social_media) {
                data.push({
                    media_type: index,
                    username: this.default_social_media[index],
                });
            }

            this.model.social_media = [].concat(data, this.data_social_media);
        },
        setEmptyModel(all=true) {
            for (const key in Object.keys(this.model)) {
                if (all === true) {
                    this.model[Object.keys(this.model)[key]] = '';
                }
            }
            this.model.gender = '';
            this.model.marital_status = '';

            this.dl_number = '';
            this.dl_type = '';

            this.vehicle_type = '';
            this.vehicle_stnk_number = '';
            this.vehicle_police_reg_number = '';
        },
        // setErrors(empty=true, errors=null) {
        //     if (empty === true) {
        //         this.error_name = '';
        //         // this.error_status = '';

        //     } else if (empty !== true && errors !== null) {
        //         this.error_name = errors.name ? errors.name : '';
        //         // this.error_status = errors.status ? errors.status : '';
        //     }
        // },
        reset(direct=false) {
            // this.setEmptyModel(false);
            this.setEmptyModel(true);
            // reset vuelidate
            this.$nextTick(() => {
                this.$v.$reset();
            });
            // this.setErrors(true);
        },
        async submit(e) {
            e.preventDefault();
            this.$v.$touch();

            if (this.$v.model.$invalid) {
                for (const key in Object.keys(this.$v.model)) {
                    const input = Object.keys(this.$v.model)[key];
                    if (input.includes('$')) return false;
                    if (this.$v.model[input].$error) {
                        break;
                    }
                }
                // Event.$emit('error', 'Please fill the form correctly.');
                // Event.$emit('showLoading', false);
                window.scrollTo(0, 0);
                return;
            }

            // console.log(this.model);
            // return;

            Event.$emit('showLoading', true);
            // let model_data = Object.keys(this.model).map((key) => this.model[key]);
            const model_data = this.model;
            model_data.photo = this.photo;
            model_data.driving_license = JSON.stringify(model_data.driving_license);
            model_data.vehicle_reg = JSON.stringify(model_data.vehicle_reg);
            model_data.social_media = JSON.stringify(model_data.social_media);

            if (this.id === 'create') {
                // model_data.activity = [];
                // model_data.ambition = '';
                // model_data.award = '';
                // model_data.biographic = '';
                // model_data.career = '';
                // model_data.character = '';
                // model_data.created_by = '';
                // model_data.education = '';
                // model_data.family = '';
                // model_data.license_plate = [];
                // model_data.msisdn = '';
                // model_data.opinion = '';
                // model_data.organizational_experience = '';
                // model_data.profile = '';
                // model_data.social_media = [];
                // model_data.strength = '';

                // model_data.created_by = this.profile.name;
                // model_data.updated_by = this.profile.name;

                this.$store.dispatch('actor/create', model_data)
                    .then((resp) => {
                    // console.log(resp.data);
                        if (resp.result === 'success') {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Data berhasil disimpan.',
                                // text: 'Data berhasil disimpan.',
                                confirmButtonText: 'Tetap dihalaman ini',
                                confirmButtonColor: '#5a80e7',
                                showCancelButton: true,
                                cancelButtonText: 'Kembali ke BDI',
                                allowOutsideClick: false,
                            })
                                .then((result) => {
                                    // this.reset();

                                    if (result.isConfirmed) {
                                        // Event.$emit('showLoading', true);

                                        // let model_data = this.detail_topic;

                                        // model_data.status = (status === 1 ? true : false);
                                        // model_data.updated_by = this.profile.name;
                                        // delete model_data.id;

                                        // this.settingTopic = false;

                                        // this.processSubmit(model_data);
                                        this.$router.push({path: '/tokoh/'+ resp.data.id + '/form/profile'});
                                        this.getData();
                                    } else {
                                        // console.log('else swal')
                                        this.$router.push({path: '/bdi/tokoh'});
                                        // this.getData();
                                    }
                                    Event.$emit('success', 'Data berhasil dibuat!');
                                });

                            // return;
                        } else {
                        // if (resp.data.message && resp.data.message.errors) {
                        //     this.setErrors(false, resp.data.message.errors);
                        //     // Event.$emit('error', null, resp.data.message.errors);
                        //     Event.$emit('showLoading', false);
                        //     window.scrollTo(0,0);
                        // } else {
                            Event.$emit('error');
                        // }
                        }
                    });

            // update
            } else {
                // console.log('submit update');
                // console.log(model_data);

                this.$store.dispatch('actor/update', [this.id, model_data, 'information'])
                    .then((resp) => {
                        if (resp.result === 'success') {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Data berhasil disimpan.',
                                // text: 'Data berhasil disimpan.',
                                confirmButtonText: 'Tetap dihalaman ini',
                                confirmButtonColor: '#5a80e7',
                                showCancelButton: true,
                                cancelButtonText: 'Kembali ke BDI',
                                allowOutsideClick: false,
                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        this.getData();
                                    } else {
                                        // console.log('else swal')
                                        this.$router.push({path: '/bdi/tokoh'});
                                        // this.getData();
                                    }

                                    Event.$emit('success', 'Data berhasil diperbarui!');
                                });
                        } else {
                            Event.$emit('error');
                        }
                    });
            }
        },
        async getData() {
            await this.reset(true);
            Event.$emit('getDataActor');
        },
    },
    // filters: {
    //     date: function(date) {
    //         return moment(date).locale('id').format('DD MMM YYYY');
    //     },
    // },
    mounted() {
        const param = this.route_query.name;
        if (param !== undefined && this.id == 'create') {
            this.model.name = param;
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.log(to.name);
            // vm.$store.commit('actor/setListActor', {});
            if (to.name === 'ProfileOfActorForm') {
                vm.getData();
                // console.log(vm.id);

                if (vm.id === 'create') {
                    vm.model.birth_date = moment(vm.dateRange.startDate).format('YYYY-MM-DD');
                }
            }
        });
    },
    // beforeRouteLeave (to, from, next) {
    //     // this.reset();
    //     this.$store.commit('actor/setDetail', {});
    //     next();
    // },

};
</script>

<style lang="sass">

.box-photo
    @apply flex items-center
    &__cover
        @apply mr-8
.photo-square
    @apply w-40 h-40 rounded bg-gray-50 overflow-hidden
    img
        @apply w-full h-full object-cover

.cta-upload
    @apply px-4 py-2 border relative overflow-hidden rounded cursor-pointer inline-block
    border-color: var(--color-primary-500)
    color: var(--color-primary-500)
    input
        @apply absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer z-40

.box-create-actor
    height: 50vh
    @apply flex items-center justify-center text-center
    .box-create-actor-container
        width: 400px
</style>
