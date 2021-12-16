<template lang="pug">
    form.form-general(@submit.prevent="submit($event)")
        .form-general__header.w-full
            h2.text-2xl Tokoh Terkait
        .form-general__body.w-full
            //- #NOTE Sementara dihide
            //- .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Pilih Tokoh
                    p.text-gray-400 Silakan pilih tokoh untuk dimasukan dalam organisasi ini.
                .col-span-7
                    .field.flex-grow.mt-8
                        //- label.field-label Cari dan Pilih Tokoh
                        //- input.field-style(placeholder="Contoh 'Jhon Doe'" type="text" @focus="openModalActorOfPeopleRelated = !openModalActorOfPeopleRelated")
                        b-button(kind="tertiary" text="Cari dan pilih tokoh terkait" text_icon_left="plus" type="button" @click.native="openModalActorOfPeopleRelated = !openModalActorOfPeopleRelated")

            .grid.grid-cols-11.gap-8.mb-16
                .col-span-4.pr-12
                    h2.text-xl.font-bold.mb-2 Tokoh Terpilih
                    p.text-gray-400 Bagian ini adalah daftar tokoh yang sudah anda pilih untuk dimasukan kedalam organisai.

                //- #NOTE Sementara (flow baru)
                .col-span-7
                    .relative.text-center.m-5.p-5.w-full(v-if="status_related_organizations.status === 'loading'")
                        b-loading(text="Memuat data")
                    template(v-if="relatedFigureData.length > 0")
                        h3.mb-4 {{ relatedFigureData.length }} Tokoh Terpilih
                        .choosen-people.grid.grid-cols-2.gap-4
                            .choosen-people__list(v-for="(item, index) in relatedFigureData")
                                .flex.items-center
                                    figure.mr-2
                                        img(:src="getDefaultImage('profile')" @error="getErrorImage($event, 'profile')").w-10.h-10.object-cover.rounded
                                    span {{ item.label}}

                    .block.mt-8(v-else-if="relatedFigureData.length == 0 && status_related_organizations.status !== 'loading'")
                        strong.font-bold Belum ada tokoh terkait

                //- #NOTE Sementara di comment (flow lama)
                //- .col-span-7
                    template(v-if="choosen_related_figure.length > 0")
                        h3.mb-4 {{ choosen_related_figure.length }} Tokoh Terpilih
                        .choosen-people.grid.grid-cols-2.gap-4
                            .choosen-people__list(v-for="(item, index) in choosen_related_figure")
                                .flex.items-center
                                    figure.mr-2
                                        img(:src="item.photo" alt="alt" @error="getErrorImage").w-10.h-10.object-cover.rounded
                                    span {{ item.name}}
                                b-button(icon_only="trash" size="small" kind="danger" type="button" @click.native="removeActor(index)")

                    .block.mt-8(v-else)
                        strong.font-bold Belum ada tokoh terkait
                        //- #NOTE Sementara dihide
                        //- p Silakan cari dan pilih tokoh terkait

                        //- .flex.items-center.justify-between.p-2.border.rounded(v-for="item in actorSelected")
                            .flex.items-center
                                figure.mr-2
                                    img(:src="item.photo", alt="alt").w-10.h-10.rounded
                                span {{ item.name}}
                            b-button(icon_only="trash" size="small" kind="danger")

        .form-general__footer
            router-link(to="/bdi/organisasi")
                b-button(text="Batalkan" type="button")
            b-button(text="Simpan" kind="primary" type="submit")

        //- open popup
        .modal(v-bind:class="{'modal--show' : openModalActorOfPeopleRelated}")
            .modal-overlay
            .modal-container
                .modal-container__header
                    h2 Tokoh
                    b-button(icon_only="x" @click.native="openModalActorOfPeopleRelated = !openModalActorOfPeopleRelated" type="button")
                .modal-container__body
                    .p-4.pb-0
                        input.field-style.field-style--small#input-keyword-actor(placeholder="Cari Nama Tokoh" v-model="keyword" ref="inputKeyword" @keyup="searchKeyword")
                    .boxed.boxed-actor.relative

                        .flex.items-center.justify-center.h-full(v-if="status_search_actor.status === false && keyword.length >= 0")
                            .text-center.w-80
                                b-icon.text-gray-500.mb-4(name="users" size="2x")
                                p Silakan ketik minimal 3 karakter untuk mencari tokoh.

                        b-loading(v-else-if="keyword.length > 0 && status_search_actor.status === 'loading'" :text="'Mencari '+ keyword")

                        .pt-4(v-else-if="search_actor.length > 0")
                            button.list-of-actor(v-for="(item, index) in search_actor" type="button" @click="chooseActor(index)")
                                figure.mr-2
                                    img(:src="item.photo" alt="alt" @error="getDefaultImage($event,'profile')").w-10.h-10.rounded
                                span {{ item.name}}

                        .flex.items-center.justify-center.h-full(v-else-if="search_actor.length === 0")
                            .text-center.w-80.text-red-500
                                b-icon.mb-4(name="info" size="2x")
                                p Maaf, tokoh {{ keyword }} tidak ditemukan.


                        //- template(v-else)
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

                        //- template(v-if="!GotActor")
                            .flex.items-center.justify-center.h-full
                                .text-center.w-80
                                    b-icon.text-gray-500.mb-4(name="users" size="2x")
                                    p Silakan ketik minimal 3 karakter untuk mencari tokoh.

                        //- template(v-else)
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
    name: 'FormPeopleReltedOfOrganization',
    props: ['id'],
    data() {
        return {
            openModalActorOfPeopleRelated: false,
            GotActor: false,
            FindingActor: false,
            FoundActor: false,
            actorSelected: [
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

            choosen_related_figure: [],

            model: {
                related_figure: [],
            },
            relatedFigureData: [],

        };
    },
    computed: {
        ...mapState('actor', [
            'status_search_actor',
            'search_actor',
        ]),
        ...mapState('organization', [
            'status_detail',
            'detail',
            'status_related_organizations',
            'related_organizations',
        ]),
    },
    watch: {
        // id() {},
        detail(newVal) {
            this.relatedFigureData = [];
            // get Related ORG
            this.$store.dispatch('organization/getRelatedOrganizations', [(newVal.name?newVal.name:null)]);
            // #NOTE:end
            // this.model.related_figure = (newVal.related_figure ? newVal.related_figure : []);
            this.choosen_related_figure = (newVal.figures && newVal.figures.figure ? newVal.figures.figure : []);
        },
        openModalActorOfPeopleRelated(newVal) {
            if (newVal === true) {
                this.$nextTick(() => this.$refs.inputKeyword.focus());
            } else {
                this.keyword = '';
                this.resetSearchActor();
            }
        },
        choosen_related_figure(newVal) {
            const map_data = newVal.map((item) => {
                return item.id;
            });
            this.model.related_figure = map_data;
        },
        related_organizations(newVal) {
            if (newVal && newVal.length >0) {
                const dataFigure = newVal.filter(function(el) {
                    return el.class == 'PER';
                });
                this.relatedFigureData = dataFigure;
            }
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
            // #NOTE:start sementara
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

            if (this.choosen_related_figure.length === 0) {
                this.choosen_related_figure.push(actor);
            } else {
                const check_data = this.choosen_related_figure.filter(function(e) {
                    return e.id === actor.id;
                });

                if (check_data.length > 0) {
                    Event.$emit('warning', 'Tokoh telah terdaftar!');
                } else {
                    this.choosen_related_figure.push(actor);
                }
            }

            this.openModalActorOfPeopleRelated = false;
        },
        removeActor(index) {
            // console.log(this.choosen_related_figure[index].name);
            this.$swal.fire({
                icon: 'warning',
                title: 'Hapus tokoh '+ this.choosen_related_figure[index].name +'?',
                // text: 'Data berhasil disimpan.',
                confirmButtonText: 'Ya, Hapus',
                confirmButtonColor: '#DD6B55',
                showCancelButton: true,
                cancelButtonText: 'Batalkan',
                allowOutsideClick: false,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.choosen_related_figure.splice(index, 1);
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
            model_data.related_figure = JSON.stringify(model_data.related_figure);
            // console.log('submit this.model');
            // console.log(this.model);

            // update only
            this.$store.dispatch('organization/update', [this.id, model_data, 'related_figure'])
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
            if (to.name === 'FormOfOrganizationOrganizer') {
                vm.getData();
            }
        });
    },
};
</script>


<style lang="sass">
    .box-related-people
        @apply grid grid-cols-11
        &__sidebar
            @apply col-span-5
        &__arrow
            @apply flex items-center justify-center bg-gray-50
        &__content
            @apply col-span-5

        .height-people
            height: 100vh
            @apply overflow-auto
</style>
