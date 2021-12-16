<template lang="pug">
    .form-general
        template(v-if="!actorSelected")
            .box-create-actor
                .box-create-actor-container
                    h2.text-xl.font-bold.mb-2 Pilih Tokoh
                    p.text-gray-400.mb-4 Tokoh hanya bisa diambil dari database. <br> Hubungi admin jika tokoh tidak ditemukan.
                    input.field-style(  placeholder="Cari nama tokoh" type="text" @focus="openModalActorOfStructure = !openModalActorOfStructure")

        form(v-else @submit="submit($event)")
            .form-general__header.w-full
                h2.text-2xl Profil
            .form-general__body.w-full
                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Tokoh
                            p.text-gray-400 Tokoh hanya bisa diambil dari database. <br> Hubungi admin jika tokoh tidak ditemukan.
                        .col-span-7
                            .field
                                label.field-label Tokoh terpilih
                                //- input.field-style( value="Yorrys T.H Raweyai" type="text" @focus="openModalActorOfStructure = !openModalActorOfStructure")
                                input.field-style( value="Yorrys T.H Raweyai" type="text")
                            .field
                                .box-photo
                                    .box-photo__cover
                                        figure.photo-square
                                            img(v-if="url" :src="url")
                                    .box-photo__info
                                        label.field-label Foto tokoh
                                        .cta-upload.mb-2
                                            input( type="file" @change="onFileChange")
                                            span Ganti Foto
                                        p.text-gray-400 Silakan gunakan foto ukuran 1:1 dengan format png atau jpg. <br> Pastikan gambar dibawah ukuran 2MB.

                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Identitas Aktor
                            p.text-gray-400 Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.
                        .col-span-7
                            .field
                                label.field-label Nomor Kartu Keluarga
                                input.field-style(type="text" placeholder="contoh '78978978978979' " value="78978978978979")
                            .field
                                label.field-label Nomor KTP
                                input.field-style(type="text" placeholder="contoh '0812345678353' " value="3174032801510002")
                            .field
                                label.field-label Tempat &amp; Tanggal lahir
                                .grid.grid-cols-2.gap-4
                                    input.field-style( placeholder="Tulis kota kelahiran " value="Serui Yapen Waropen" type="text")

                                    //- input.field-style(type="date" value="1951-01-28")
                                    .box-calendar
                                        b-icon(name="calendar")
                                        date-range-picker(
                                            v-if="dateRange.startDate && dateRange.endDate"
                                            ref="picker"
                                            v-model="dateRange"
                                            @update="pickerUpdate($event)"
                                            :locale-data="{ firstDay: 1, format: 'dd mmmm yyyy' }"
                                            :date-format="dateFormatPicker"
                                            opens="left"
                                            drops="up"
                                            :ranges="default_ranges"
                                            :autoApply="true"
                                            :singleDatePicker="true"
                                        )
                                            //- template(slot="input" slot-scope="picker" style="min-width: 350px;") {{ picker.startDate | date }} - {{ picker.endDate | date }}
                                            template(slot="input" slot-scope="picker" style="min-width: 350px;") {{ picker.startDate | date }}

                            .field
                                label.field-label Jenis Kelamin
                                .grid.grid-cols-2.gap-4
                                    b-radio(label="Laki-laki" name="jk")
                                    b-radio(label="Perempuan" name="jk")

                            .field
                                label.field-label Status Perkawinan
                                .grid.grid-cols-2.gap-4
                                    b-radio(label="Belum kawin" name="nikah")
                                    b-radio(label="Kawin" name="nikah")

                            .field.field--icon-right.w-full
                                    label.field-label Agama
                                    select.field-style
                                        option Kristen Protestan
                                        option Agama A
                                        option Agama C
                                        option Agama D
                                    span.icon-field
                                        b-icon(name="chevron-down")

                            .field
                                label.field-label Pekerjaan
                                input.field-style(type="text" placeholder="Tulis pekerjaan aktor disini..." value="")

                            .field
                                label.field-label Golongan darah
                                input.field-style(type="text" placeholder="Tulis golongan darah aktor disini..." value="")

                    .grid.grid-cols-11.gap-8.mb-16
                        .col-span-4.pr-12
                            h2.text-xl.font-bold.mb-2 Alamat Aktor
                            p.text-gray-400 Pastikan deskripsi diisi sesuai dengan informasi yang terbaru.
                        .col-span-7
                            .field
                                label.field-label Alamat
                                input.field-style(type="text" placeholder="Tulis Alamat" value="Jalan Kemang Timur Raya No.43 A")
                            .grid.grid-cols-2.gap-x-4
                                .field.field--icon-right.w-full
                                    label.field-label Provinsi
                                    select.field-style
                                        option DKI Jakarta
                                        option Provinsi A
                                        option Provinsi C
                                        option Provinsi D
                                    span.icon-field
                                        b-icon(name="chevron-down")

                                .field.field--icon-right.w-full
                                    label.field-label Kota
                                    select.field-style
                                        option Jakarta Selatan
                                        option Kota A
                                        option Kota C
                                        option Kota D
                                    span.icon-field
                                        b-icon(name="chevron-down")

                                .field.field--icon-right.w-full
                                    label.field-label Kecamatan
                                    select.field-style
                                        option Mampang Prapatan
                                        option kecamatan A
                                        option kecamatan C
                                        option kecamatan D
                                    span.icon-field
                                        b-icon(name="chevron-down")

                                .field.field--icon-right.w-full
                                    label.field-label Kelurahan
                                    select.field-style
                                        option Bangka
                                        option kecamatan A
                                        option kecamatan C
                                        option kecamatan D
                                    span.icon-field
                                        b-icon(name="chevron-down")
                                .field
                                    label.field-label RT/RW
                                    input.field-style(type="text" placeholder="Tulis RT & RW" value="008/003")
                                .field
                                    label.field-label Kode Pos
                                    input.field-style(type="text" placeholder="Tulis kode pos")

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
                                            select.field-style
                                                option SIM A
                                                option SIM B
                                                option SIM C
                                            span.icon-field
                                                b-icon(name="chevron-down")
                                        .field.field--icon-right.w-full
                                            label.field-label Nomor SIM
                                            input.field-style(type="text" placeholder="Tulis Nomor SIM disini..." value="")
                                    .field
                                        label.field-label.opacity-0 Action
                                        b-button(icon_only="plus" kind="tertiary")

                                .field.field--icon-right.w-full
                                    strong.mb-4.block SIM tersimpan
                                    .flex.items-center.gap-4.border.rounded.p-2.mb-2
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

                                    .flex.items-center.gap-4.border.rounded.p-2
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

            .form-general__footer
                router-link(to="/bdi/tokoh")
                    b-button(text="Batalkan")

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
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import moment from 'moment';

export default {
    components: {
        DateRangePicker,
    },
    data() {
        return {
            actorSelected: true,
            url: 'https://graph-ntxdemo.vercel.app/icon/yorrys.png',
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

            dateRange: {
                // startDate: moment().subtract(6, 'days').toDate(),
                startDate: moment().toDate(),
                endDate: moment().toDate(),
            },
            default_ranges: {
                'Today': [moment().toDate(), moment().toDate()],
                'Yesterday': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
                'Last 7 days': [moment().subtract(6, 'days').toDate(), moment().toDate()],
                'Last week': [moment().subtract(1, 'isoWeek').startOf('isoWeek').toDate(), moment().subtract(1, 'isoWeek').endOf('isoWeek').toDate()],
            },

            // // activity: [ActivityInput]
            // address: String
            // // ambition: String
            // // award: String
            // // biographic: String
            // birth_date: Date
            // birth_place: String
            // blood_type: String
            // // career: String
            // // character: String
            // city: String
            // // created_by: String
            // district: String
            // driving_license: [DrivingLicenseInput]
            // // education: String
            // // family: String
            // gender: String
            // kk_number: String
            // ktp_number: String
            // // license_plate: [LicensePlateInput]
            // martial_status: String
            // // msisdn: String
            // name: String
            // // opinion: String
            // // organizational_experience: String
            // postal_code: String
            // profession: String
            // // profile: String
            // province: String
            // religion: String
            // rt_rw: String
            // // social_media: [SocialMediaInput]
            // stnk_number: [StnkNumberInput]
            // // strength: String
            // // updated_by: String
            // // village: String


            // activity: [ActivityInput]
            // ambition: String
            // award: String
            // biographic: String
            // career: String
            // character: String
            // created_by: String
            // education: String
            // family: String
            // license_plate: [LicensePlateInput]
            // msisdn: String
            // opinion: String
            // organizational_experience: String
            // profile: String
            // social_media: [SocialMediaInput]
            // strength: String
            // updated_by: String
            // village: String

            // ----------------------------------------------------

            model: {

                name: '',
                // photo: '',
                kk_number: '',
                ktp_number: '',
                birth_place: '',
                birth_date: '',
                gender: '',
                martial_status: '',
                religion: '',
                // career: '',
                profession: '',
                blood_type: '',

                address: '',
                province: '',
                city: '',
                district: '',
                rt_rw: '',
                postal_code: '',

                driving_license: [],
                stnk_number: [],
            },
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    watch: {
        id() {},
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
        updateDateRange(from_date, to_date) {
            if (this.module.length > 0) {
                // this.$store.commit(this.module + '/setFromDate', from_date);
                // this.$store.commit(this.module + '/setToDate', to_date);
            }
        },
        async pickerUpdate(e) {
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
    },
    // filters: {
    //     date: function (date) {
    //         return moment(date).locale("id").format('DD MMM YYYY');
    //     }
    // },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.log(to.name);
            // vm.$store.commit('actor/setListActor', {});
            // if (to.name === 'BDI_ListOfActor')
            //     vm.getData();
        });
    },
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
