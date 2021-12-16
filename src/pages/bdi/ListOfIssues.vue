<template lang="pug">
    section.bdi-section-issues

        //- header page
        HeaderPage(:title="titlePage")

        //- form filter
        .flex.items-center.justify-between.mb-5.gap-4
            .flex.items-center.gap-x-4
                .block.w-64
                    .field.field--icon-right.w-full
                        .field-style.field-style--loading(v-if="status_list_gatra.status === 'loading'")
                            b-loading(kind="circular")

                        .relative(v-else)
                            select.field-style(v-model="gatra" @change="getData(true)")
                                option(value="") - Semua Gatra -
                                //- option(v-for="item in list_gatra" :value="item.label") {{ item.name }}
                                option(v-for="item in list_gatra" :value="item.id") {{ item.label }}
                            span.icon-field
                                b-icon(name="chevron-down")

                .block.w-64
                    .field.field--icon-left.w-full
                        input.field-style(placeholder="Cari Isu" v-model="keyword" @keyup="searchKeyword")
                        span.icon-field
                            b-icon(name="search")

            routerLink(to="/isu/create/form/profil")
                b-button(text="Isu baru" text_icon_left="plus" kind="primary")

        .grid.grid-cols-3.gap-3(v-if="list_data.length > 0")
            .block(
                v-for="item in list_data"
            )
                CardInfo.w-full(
                    :title="item.title ? item.title : '-'"
                    :url="'/isu/'+ item.id +'/detail/profil'"
                    :photo="item.image ? (item.image.substr(0, 4) === 'http' ? item.image : 'http://'+ item.image) : null"
                )

        .grid.grid-cols-1.gap-0(v-if="list_data.length > 0 || status_list.status === 'loading'")
            .block.text-center.mt-10.mb-10
                .relative(v-if="status_list.status === 'loading'")
                    b-loading(text="Memuat data isu" kind="")

                template(v-else)
                    b-button(v-if="list.current_page && list.total_page && list.current_page < list.total_page" text="Klik untuk menampilkan isu lainnya" kind="tertiary" @click.native="loadMore()")
                    //- span(v-else) Tidak ada data lain.

        .grid.grid-cols-1.gap-0(v-else)
            .block.text-center.mt-10
                span Isu tidak ditemukan.

        //- list of content
        //- .grid.grid-cols-3.gap-3
            .block(
                v-for="item in listIssues"
            )
                CardInfo.w-full(
                    :title="item.title"
                    :url="item.url"
                    :photo="item.photo"
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
            titlePage: 'Isu',
            listIssues: [
                {
                    title: 'Omnibus Law',
                    url: '/isu/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/omlaw.png"
                },
                {
                    title: 'uu cipta kerja',
                    url: '/isu/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/omlaw.png"
                },
                {
                    title: 'UU ITE',
                    url: '/isu/profil',
                    photo: "https://graph-ntxdemo.vercel.app/icon/omlaw.png"
                },
            ],

            list_data: [],
            // limit: 9,
            limit: 45,
            page: 1,
            // orderShort: '',
            gatra: '',
            keyword: '',
            timeout: null,
        };
    },
    computed: {
        ...mapState('issue', [
            'status_list',
            'list',
        ]),
        // ...mapState('config', [
        //     'list_gatra',
        // ]),
        ...mapState('graph', [
            'status_list_gatra',
            'list_gatra',
        ]),
    },
    watch: {
        list(newVal) {
            // console.log(newVal)
            if (newVal.data && newVal.data.length > 0) {
                for (var i = 0; i < newVal.data.length; i++) {
                    this.list_data.push(newVal.data[i]);
                }
            }
        },
    },
    methods: {
        getData(reset=false, get_gatra=false) {
            if (reset) {
                this.list_data = [];
                this.page = 1;
            }

            // if (this.status_list_gatra.status !== true)
            if (get_gatra === true)
                this.$store.dispatch('graph/getListGatra');

            this.$store.dispatch('issue/getList', [this.limit, this.page, this.keyword, this.gatra]);
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
        console.log('mounted list issue');
        // console.log(this.$route.name);
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$store.commit('issue/setList', {});
            if (to.name === 'BDI_ListOfIssues')
                vm.getData(true, true);
        });
    },
}
</script>