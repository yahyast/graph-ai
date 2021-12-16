<template lang="pug">
    form.form-general(@submit.prevent="submit($event)")
        .form-general__header.w-full
            h2.text-2xl Struktur Organisasi
        .form-general__body.w-full
            .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Tambah Struktur
                    p.text-gray-400 Silakan buat jabatan baru dan pilih tokoh.
                .col-span-7
                    .field.flex-grow
                        label.field-label Nama Jabatan
                        input.field-style(placeholder="Contoh 'Ketua Umum'" type="text" v-model="position")
                    .field.flex-grow
                        label.field-label Pilih Tokoh
                        input.field-style.cursor-pointer(placeholder="Cari nama tokoh" type="text" @focus="openModalActorOfStructure = !openModalActorOfStructure" readonly :value="choosen_actor.name ? choosen_actor.name : 'Cari tokoh'")
                    .field
                        b-button(text="Tambah Struktur" text_icon_left="plus" kind="tertiary" type="button" @click.native="addStructure()")
            .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Struktur terpilih
                    p.text-gray-400 Anda bisa mengubah dan menghapus struktur yang sudah dipilih.
                .col-span-7

                    template(v-if="choosen_structure.length > 0")
                        .choosen-actor.saved-item(v-for="(item, index) in choosen_structure")
                            //- .flex-grow
                                //- input.field-style(v-model="choosen_structure[index].position" type="text")
                                input.field-style(v-model="item.position" type="text" readonly)
                                .flex-grow.relative.field-actor
                                    .relative
                                        img(:src="item.figure.photo" alt="alt" @error="getErrorImage($event,'profile')").w-8.h-8.rounded.absolute
                                        input.field-style(v-model="item.figure.name" type="text" readonly)
                                        //- button.block-action(@click="openModalActorOfStructure = !openModalActorOfStructure" type="button")
                            .flex-grow.grid.grid-cols-2
                                span.flex.h-10.items-center.pl-4 {{ choosen_structure[index].position }}
                                .flex.items-center
                                    figure.mr-2
                                        img.avatar(:src="item.figure.photo" alt="alt" @error="getErrorImage($event,'profile')")
                                    span.block {{ item.figure.name }}

                                
                            .block-button-delete
                                b-button(icon_only="trash" kind="danger" size="small" type="button" @click.native="removeStructure(index)")

                    span(v-else) Silakan tambah struktur

        .form-general__footer.pb-6
            router-link(to="/bdi/organisasi")
                b-button(text="Batalkan" type="button")
            b-button(text="Simpan" kind="primary" type="submit")

        //- open popup
        .modal(v-bind:class="{'modal--show' : openModalActorOfStructure}")
            .modal-overlay
            .modal-container
                .modal-container__header
                    h2 Tokoh
                    b-button(icon_only="x" @click.native="openModalActorOfStructure = !openModalActorOfStructure" type="button")
                .modal-container__body
                    .p-4.pb-0
                        input.field-style.field-style--small#input-keyword-actor(placeholder="Cari Nama Tokoh" v-model="keyword" ref="inputKeyword" @keyup="searchKeyword")
                    .boxed.boxed-actor.relative

                        .flex.items-center.justify-center.h-full(v-if="status_search_actor.status === false && keyword.length >= 0")
                            .text-center.w-80
                                b-icon.text-gray-500.mb-4(name="users" size="2x")
                                p Silakan ketik minimal 3 karakter untuk mencari tokoh.

                        b-loading(v-else-if="keyword.length > 0 && status_search_actor.status === 'loading'" :text="'Mencari '+ keyword" )

                        .pt-4(v-else-if="search_actor.length > 0")
                            button.list-of-actor(v-for="(item, index) in search_actor" type="button" @click="chooseActor(index)")
                                figure.mr-2
                                    img(:src="item.photo" alt="alt" @error="getErrorImage($event,'profile')").w-10.h-10.rounded
                                span {{ item.name}}

                        .flex.items-center.justify-center.h-full(v-else-if="search_actor.length === 0")
                            .text-center.w-80.text-red-500
                                b-icon.mb-4(name="info" size="2x")
                                p Maaf, tokoh {{ keyword }} tidak ditemukan.

        //- open popup
        //- .modal(v-bind:class="{'modal--show' : openModalActorOfStructure}")
            .modal-overlay
            .modal-container
                .modal-container__header
                    h2 Tokoh {Nama Struktur}
                    b-button(icon_only="x" @click.native="openModalActorOfStructure = !openModalActorOfStructure" type="button")
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
                                        button.list-of-actor(v-for="item in actor" type="button")
                                            figure.mr-2
                                                img(:src="item.photo", alt="alt").w-10.h-10.rounded
                                            span {{ item.name}}

</template>
<script>
import {mapState} from 'vuex';

export default {
    name: 'FormStructureOfOrganization',
    props: ['id'],
    data() {
        return {
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

            keyword: '',
            timeout: null,
            // default_profile: '/images/no-image-profile.jpg',

            position: '',
            choosen_actor: {},

            choosen_structure: [],

            model: {
                structure: [],
            },
        };
    },
    computed: {
        ...mapState('actor', [
            'status_search_actor',
            'search_actor',
        ]),
        ...mapState('organization', [
            'detail',
        ]),
    },
    watch: {
        // id() {},
        detail(newVal) {
            if (newVal.structure) {
                const map_data = newVal.structure.map((item) => {
                    return {
                        position: item.position,
                        figure: item.figure,
                    };
                });

                this.choosen_structure = map_data;
            }
        },
        openModalActorOfStructure(newVal) {
            if (newVal === true) {
                this.$nextTick(() => this.$refs.inputKeyword.focus());
            } else {
                this.keyword = '';
                this.resetSearchActor();
            }
        },
        choosen_structure(newVal) {
            const map_data = newVal.map((item) => {
                return {
                    position: item.position,
                    figure_id: item.figure.id,
                };
            });
            this.model.structure = map_data;
        },
    },
    methods: {
        // getDefaultImage(e) {
        //     const img = this.default_profile;
        //     e.target.src = img;
        // },
        async getData() {
            // await this.reset(true);
            Event.$emit('getDataOrganization');
        },
        resetSearchActor() {
            this.$store.dispatch('actor/cancelSearchActor');

            const status = this.status_search_actor;
            status.status = false;
            this.$store.commit('actor/setStatusSearchActor', status);
            this.$store.commit('actor/setSearchActor', []);
        },
        searchKeyword() {
            clearTimeout(this.timeout);
            if (this.keyword.length >= 3) {
                const self = this;
                this.timeout = setTimeout(function() {
                    self.$store.dispatch('actor/getSearchActor', [30, 1, self.keyword]);
                }, 650);
            } else {
                this.resetSearchActor();
            }
        },
        chooseActor(index) {
            const actor = this.search_actor[index];

            this.choosen_actor = actor;

            this.openModalActorOfStructure = false;
        },
        addStructure() {
            if (this.position.length === 0 || Object.keys(this.choosen_actor).length == 0) {
                Event.$emit('warning', 'Jabatan dan tokoh wajib diisi!');
                return;
            }

            const structure = {
                position: this.position,
                figure: this.choosen_actor,
            };

            if (this.choosen_structure.length === 0) {
                this.choosen_structure.push(structure);
            } else {
                const check_data = this.choosen_structure.filter(function(e) {
                    return e.position === structure.position;
                });

                if (check_data.length > 0) {
                    Event.$emit('warning', 'Jabatan telah terdaftar!');
                    return;
                } else {
                    this.choosen_structure.push(structure);
                }
            }

            // this.openModalActorOfStructure = '';
            this.position = '';
            this.choosen_actor = {};
        },
        removeStructure(index) {
            // console.log(this.choosen_structure[index]);
            this.$swal.fire({
                icon: 'warning',
                title: 'Hapus struktur?',
                text: this.choosen_structure[index].position +' - '+ this.choosen_structure[index].figure.name,
                confirmButtonText: 'Ya',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                allowOutsideClick: false,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    this.choosen_structure.splice(index, 1);
                }
            });
        },
        submit(e) {
            e.preventDefault();
            // this.$v.$touch();

            // if (this.$v.model.$invalid) {
            //     for (let key in Object.keys(this.$v.model)) {
            //         const input = Object.keys(this.$v.model)[key];
            //         if (input.includes("$")) return false;
            //         if (this.$v.model[input].$error) {
            //             break;
            //         }
            //     }
            //     // Event.$emit('error', 'Please fill the form correctly.');
            //     // Event.$emit('showLoading', false);
            //     window.scrollTo(0,0);
            //     return;
            // }

            Event.$emit('showLoading', true);

            const model_data = this.model;
            model_data.structure = JSON.stringify(model_data.structure);
            // console.log('submit this.model');
            // console.log(this.model);

            // update only
            this.$store.dispatch('organization/update', [this.id, model_data, 'structure'])
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
                                    this.$router.push({path: '/bdi/tokoh'});
                                }

                                Event.$emit('success', 'Data berhasil diperbarui!');
                            });
                    } else {
                        Event.$emit('error');
                    }
                });
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.log(to.name);
            if (to.name === 'FormOfOrganizationStructure') {
                vm.getData();
            }
        });
    },
};
</script>

<style lang="sass">
    .choosen-actor
        @apply border p-2 mb-2 rounded flex items-start
        .block-button-delete
            @apply flex items-center justify-center
            width: 42px
            height: 42px
        .field-style
            border-color: transparent
            @apply mb-2
            &:hover
                @apply border-gray-300

</style>
