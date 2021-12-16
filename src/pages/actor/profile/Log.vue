<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadActor
        .content-bdi__body
            h2.text-xl Riwayat Suntingan Profil Ringkas

            ul.box-history.mt-8(v-if="list_data.length > 0")
                li(v-for="item in list_data")
                    router-link.link.date-time(:to="'/tokoh/'+ id +'/detail/profil/log/detail/'+ encodeDetailData(item)") {{ item.createdAt ? datetimeFormat(item.createdAt) : '-' }}
                    span.block.px-2 •
                    router-link.link(:to="'/tokoh/'+ id +'/detail/profil/log/detail/'+ encodeDetailData(item)") {{ item.user ? item.user : '-' }}

            .block.text-center.mt-10.mb-10(v-if="list_data.length > 0 || status_list_log_history.status === 'loading'")
                .relative(v-if="status_list_log_history.status === 'loading'")
                    b-loading(text="Memuat data" kind="")

                template(v-else)
                    b-button(v-if="list_log_history.paginator && list_log_history.paginator.hasNextPage && list_log_history.paginator.hasNextPage === true" text="Lainnya..." kind="tertiary" @click.native="loadMore()")
                    //- span(v-else) Tidak ada data lain.

            .block.text-center.mt-10(v-else)
                span Data tidak ditemukan.

            //- ul.box-history.mt-8
                li(v-for="item in history")
                    router-link.link.date-time(:to="item.url") {{ item.dateTime }}
                    span.block.px-2 •
                    router-link.link(to="#") {{ item.updateedBy }}

</template>

<script>
import {mapState} from 'vuex';
import HeadActor from '@/pages/actor/HeadActor';
import moment from 'moment';

export default {
    name: 'ProfileOfOrganizationLog',
    components: {
        HeadActor,
    },
    props: ['id'],
    data() {
        return {
            history: [
                {
                    dateTime: '10 November 2021 10:00 WIB',
                    updateedBy: 'Admin',
                    url: '/organisasi/name/profil/log/detail',
                },
                {
                    dateTime: '10 Agustus 2021 10:00 WIB',
                    updateedBy: 'Admin',
                    url: '/organisasi/name/profil/log/detail',
                },
                {
                    dateTime: '10 Mei 2021 10:00 WIB',
                    updateedBy: 'Admin',
                    url: '/organisasi/name/profil/log/detail',
                },
                {
                    dateTime: '10 Mei 2021 10:00 WIB',
                    updateedBy: 'Admin',
                    url: '/organisasi/name/profil/log/detail',
                },
            ],


            list_data: [],
            limit: 10,
            page: 1,
        };
    },
    computed: {
        ...mapState('actor', [
            'status_list_log_history',
            'list_log_history',
        ]),
    },
    watch: {
        list_log_history(newVal) {
            // console.log(newVal)
            if (newVal.histories && newVal.histories.length > 0) {
                for (let i = 0; i < newVal.histories.length; i++) {
                    this.list_data.push(newVal.histories[i]);
                }
            }
        },
    },
    methods: {
        getData(reset=false) {
            // if (reset) {
            //     this.list_data = [];
            //     this.page = 1;
            // }
            this.$store.dispatch('actor/getListLogHIstory', [this.limit, this.page, this.id]);
        },
        loadMore() {
            this.page += 1;
            this.getData();
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // console.log(vm.id)
            console.log(to.name);
            // vm.$store.commit('organization/setListOrganization', {});
            if (to.name === 'ProfileLogOfActor') {
                vm.getData();
            }
        });
    },
};
</script>
