<template lang="pug">
    section.bdi-section-actors

        //- header page
        HeaderPage(:title="titlePage")

        //- form filter
        .flex.items-center.justify-between.mb-5.gap-4
            .flex.items-center.gap-x-4
                //- .block.w-64
                    .field.field--icon-right.w-full
                        select.field-style()
                            option Filter A
                            option Filter B
                            option Filter C
                            option Filter D
                            option Filter E
                        span.icon-field
                            b-icon(name="chevron-down")
                .block.w-64
                    .field.field--icon-left.w-full
                        input.field-style(placeholder="Cari Tokoh" v-model="keyword" @keyup="searchKeyword")
                        span.icon-field
                            b-icon(name="search")

            routerLink(to="/tokoh/create/form/profile")
                b-button(text="Tokoh baru" text_icon_left="plus" kind="primary")

        //- list of content
        .grid.grid-cols-3.gap-3(v-if="list_data.length > 0")
            .block(
                v-for="item in list_data"
            )
                //- :url-edit="'/tokoh/'+ item.id +'/form/profile'"
                CardInfo.w-full(
                    :title="item.name ? item.name : '-'"
                    :url="'/tokoh/'+ item.id +'/detail/profil'"
                    :photo="item.photo"
                    type="tokoh"
                    :desc="item.position && item.position.data && item.position.data.length > 0 ? item.position.data.map(function(e) { return e.position +' - '+ e.name }).join(' | ') : '-'"
                    default-img="profile"
                )

        .grid.grid-cols-1.gap-0(v-if="list_data.length > 0 || status_list_actor.status === 'loading'")
            .block.text-center.mt-10.mb-10
                .relative(v-if="status_list_actor.status === 'loading'")
                    b-loading(text="Memuat data tokoh" kind="")

                template(v-else)
                    b-button(v-if="list_actor.pagination && list_actor.pagination.hasNext && list_actor.pagination.hasNext === true" text="Klik untuk menampilkan tokoh lainnya" kind="tertiary" @click.native="loadMore()")
                    span(v-else) Semua tokoh sudah ditampilkan

        .grid.grid-cols-1.gap-0(v-else)
            .block.text-center.mt-10
                span Tokoh tidak ditemukan.

        //- .grid.grid-cols-3.gap-3
            .block(
                v-for="item in listIssues"
            )
                CardInfo.card--actor.w-full(
                    :title="item.title"
                    :url="item.url"
                    :photo="item.photo"
                    type="tokoh"
                    :desc="item.desc"
                    default-img="profile"
                )
        
</template>

<script>
import { mapState } from 'vuex';
import CardInfo from '@/components/sections/Card';
import HeaderPage from '@/components/sections/HeaderPage';

export default {
    name: 'BdiListOfIssues',
    components: {
        CardInfo,
        HeaderPage
    },
    data() {
        return {
            titlePage: 'Tokoh',
            listIssues: [
                {
                    title: 'Yorrys T.H Raweyai',
                    url: '/tokoh/name/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/yorrys.png",
                    desc: "Ketua Umum Konfederasi Serikat Pekerja Seluruh Indonesia (KSPSI)",
                },
                {
                    title: 'Nining Elitos',
                    url: '/tokoh/name/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/nining.png",
                    desc: "Ketua Umum Kongres Aliansi Serikat Buruh Indonesia (KASBI)",
                },
                {
                    title: 'Said Iqbal',
                    url: '/tokoh/name/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/said.png",
                    desc: "Presiden Konfederasi Serikat Pekerja Indonesia (KSPI)",
                },
                {
                    title: 'Andi Gani Nena Wea',
                    url: '/tokoh/name/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/andi.png",
                    desc: "Presiden Konfederasi Serikat Pekerja Seluruh Indonesia (KSPSI)",
                },
                {
                    title: 'Merah Johansyah',
                    url: '/tokoh/name/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/merah.png",
                    desc: "Koordinator Nasional Jaringan Advokasi Tambang (JATAM)",
                },
                {
                    title: 'Airlangga Hartarto',
                    url: '/tokoh/name/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/airlangga.png",
                    desc: "Menteri Kementerian Koordinator Perekonomian (2019-2024)",
                },
                {
                    title: 'Puan Maharani',
                    url: '/tokoh/name/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/puan.png",
                    desc: "Ketua DPR RI",
                },
                {
                    title: 'Rosan Perkasa',
                    url: '/tokoh/name/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/rosan.png",
                    desc: "Ketua Satuan Tugas Omnibus Law",
                },
                {
                    title: 'Pandu Patria Sjahrir',
                    url: '/tokoh/name/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/pandu.png",
                    desc: "Anggota Satuan Tugas Omnibus Law",
                },
            ],

            list_data: [],
            // limit: 9,
            limit: 45,
            page: 1,
            orderShort: '',
            keyword: '',
            timeout: null,
        }
    },
    computed: {
        ...mapState('actor', [
            'status_list_actor',
            'list_actor',
        ]),
    },
    watch: {
        list_actor(newVal) {
            // console.log(newVal)
            if (newVal.doc && newVal.doc.length > 0) {
                for (var i = 0; i < newVal.doc.length; i++) {
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
            this.$store.dispatch('actor/getListActor', [this.limit, this.page, this.keyword, this.orderShort]);
        },
        loadMore() {
            this.page += 1;
            this.getData();
        },
        searchKeyword() {
            clearTimeout(this.timeout);            
            var self = this;
            this.timeout = setTimeout(function () {
                self.getData(true);
            }, 650);
        },
    },
    mounted() {
        console.log('mounted list actor');
        // console.log(this.$route.name);

        if (this.$route.params.keyword !== undefined) {
            const keyword = this.$route.params.keyword;

            this.$router.push({ path: '/bdi/tokoh' });
            this.keyword = keyword;
            this.getData();
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.commit('actor/setListActor', {});
            if (to.name === 'BDI_ListOfActor')
                vm.getData();
        });
    },
}
</script>