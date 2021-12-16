<template lang="pug">
    section.bdi-section-organization

        //- header page
        HeaderPage(:title="titlePage")

        //- form filter
        .flex.items-center.justify-between.mb-6
            .flex.items-center.gap-x-4
                //- .block.w-64
                    .field.field--icon-right.w-full
                        select.field-style
                            option Filter A
                            option Filter B
                            option Filter C
                            option Filter D
                            option Filter E
                        span.icon-field
                            b-icon(name="chevron-down")
                .block.w-64
                    .field.field--icon-left.w-full
                        input.field-style(placeholder="Cari Organisasi" v-model="keyword" @keyup="searchKeyword")
                        span.icon-field
                            b-icon(name="search")

            routerLink(to="/organisasi/create/form/profile")
                b-button(text="Organisasi baru" text_icon_left="plus" kind="primary")

        //- .grid.grid-cols-1.gap-0(v-if="status_list_organization.status === 'loading'")
            .block.relative.mt-10
                b-loading(text="Loading..." kind="circular")

        //- list of content
        //- template(v-else)
            .grid.grid-cols-3.gap-3(v-if="list_organization.doc && list_organization.doc.length > 0")
                .block(
                    v-for="item in list_organization.doc"
                )
                    //- :url="item.id"
                    CardInfo.w-full(
                        :title="item.name ? item.name : '-'"
                        url="/organisasi/name/profil"
                        :photo="item.photo"
                    )

            .grid.grid-cols-1.gap-0(v-else)
                .block.text-center.mt-10
                    span Data tidak ditemukan.

        .grid.grid-cols-3.gap-3(v-if="list_data.length > 0")
            .block(
                v-for="item in list_data"
            )
                CardInfo.w-full(
                    :title="item.name ? item.name : '-'"
                    :url="'/organisasi/'+ item.id +'/detail/profil'"
                    :photo="item.photo"
                )

        .grid.grid-cols-1.gap-0(v-if="list_data.length > 0 || status_list_organization.status === 'loading'")
            .block.text-center.mt-10.mb-10
                .relative(v-if="status_list_organization.status === 'loading'")
                    b-loading(text="Memuat data organisasi" kind="")

                template(v-else)
                    b-button(v-if="list_organization.pagination && list_organization.pagination.hasNext && list_organization.pagination.hasNext === true" text="Klik untuk menampilkan organisasi lainnya" kind="tertiary" @click.native="loadMore()")
                    span(v-else) Semua organisasi sudah ditampilkan

        .grid.grid-cols-1.gap-0(v-else)
            .block.text-center.mt-10
                span Organisasi tidak ditemukan.

            //- .block(
            //-     v-for="item in listOrganization"
            //- )
                CardInfo.w-full(
                    :title="item.title"
                    :url="item.url"
                    :photo="item.photo"
                )

</template>

<script>
import {mapState} from 'vuex';
import CardInfo from '@/components/sections/Card';
import HeaderPage from '@/components/sections/HeaderPage';

export default {
    name: 'BdiListOfOrganization',
    components: {
        CardInfo,
        HeaderPage,
    },
    data() {
        return {
            titlePage: 'Organisasi',
            listOrganization: [
                {
                    title: 'Konfederasi Serikat Pekerja Seluruh Indonesia (KSPSI)',
                    url: '/organisasi/name/profil',
                    photo: 'https://graph-ntxdemo.vercel.app/icon/kspsi.png',
                },
                {
                    title: 'Kongres Aliansi Serikat Buruh Indonesia (KASBI)',
                    url: '/organisasi/name/profil',
                    photo: 'https://graph-ntxdemo.vercel.app/icon/kasbi.png',
                },
                {
                    title: 'Konfederasi Serikat Pekerja Seluruh Indonesia (KSPSI)',
                    url: '/organisasi/name/profil',
                    photo: 'https://graph-ntxdemo.vercel.app/icon/kspsi.png',
                },
                {
                    title: 'Kongres Aliansi Serikat Buruh Indonesia (KASBI)',
                    url: '/organisasi/name/profil',
                    photo: 'https://graph-ntxdemo.vercel.app/icon/kasbi.png',
                },
                {
                    title: 'Konfederasi Serikat Pekerja Seluruh Indonesia (KSPSI)',
                    url: '/organisasi/name/profil',
                    photo: 'https://graph-ntxdemo.vercel.app/icon/kspsi.png',
                },
                {
                    title: 'Kongres Aliansi Serikat Buruh Indonesia (KASBI)',
                    url: '/organisasi/name/profil',
                    photo: 'https://graph-ntxdemo.vercel.app/icon/kasbi.png',
                },
            ],

            list_data: [],
            // limit: 9,
            limit: 45,
            page: 1,
            orderShort: '',
            keyword: '',
            timeout: null,
        };
    },
    computed: {
        ...mapState('organization', [
            'status_list_organization',
            'list_organization',
        ]),
    },
    watch: {
        list_organization(newVal) {
            // console.log(newVal)
            if (newVal.doc && newVal.doc.length > 0) {
                for (let i = 0; i < newVal.doc.length; i++) {
                    this.list_data.push(newVal.doc[i]);
                }
            }
        },
    },
    methods: {
        getData(reset=false) {
            if (reset) {
                this.list_data = [];
                this.page = 1;
            }
            this.$store.dispatch('organization/getListOrganization', [this.limit, this.page, this.keyword, this.orderShort]);
        },
        loadMore() {
            this.page += 1;
            this.getData();
        },
        searchKeyword() {
            clearTimeout(this.timeout);
            const self = this;
            this.timeout = setTimeout(function() {
                self.getData(true);
            }, 650);
        },
    },
    mounted() {
        console.log('mounted list organization');
        // console.log(this.$route.name);

        if (this.$route.params.keyword !== undefined) {
            const keyword = this.$route.params.keyword;

            this.$router.push({path: '/bdi/organisasi'});
            this.keyword = keyword;
            this.getData();
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$store.commit('organization/setListOrganization', {});
            if (to.name === 'BDI_ListOfOrganization') {
                vm.getData();
            }
        });
    },
};
</script>
