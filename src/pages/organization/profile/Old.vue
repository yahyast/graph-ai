<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadOrganization
        .content-bdi__body
            .text-sm.border-gray-200.p-4.text-yellow-900.mb-6.bg-yellow-200.rounded
                p Suntingan pada {{ decoded_data !== null && decoded_data.createdAt ? datetimeFormat(decoded_data.createdAt) : '-' }} </router-link> oleh {{ decoded_data !== null && decoded_data.user ? decoded_data.user : '-' }}. <router-Link class="link" :to="'/organisasi/'+ id +'/detail/profil/log'" style="font-weight: normal !important"> Lihat semua riwayat perubahan </router-link>

            .grid.grid-cols-10.gap-8
                .col-span-6
                    h2.subheading Profil Ringkas
                    p.text-paragraph Kongres Aliansi Serikat Buruh Indonesia (KASBI) adalah serikat pekerja Indonesia yang dibentuk tahun 2005 melalui penggabungan 18 serikat pekerja.
                .col-span-4
                    .block
                        CardInfo.card--actor.w-full(
                            title="Nining Elitos"
                            url="/actor/profile"
                            photo="https://graph-ntxdemo.vercel.app/icon/nining.png"
                            type="tokoh"
                            desc="Ketua Umum Kongres Aliansi Serikat Buruh Indonesia (KASBI)"
                        )

            //- vue-json-pretty(:path="'res'" :data="data !== undefined ? decodeDetailData(data) : null")
            //- vue-json-pretty(:path="'res'" :data="decoded_data")

</template>

<script>
import HeadOrganization from '@/pages/organization/HeadOrganization';
import CardInfo from '@/components/sections/Card';
import moment from 'moment';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
    name: 'ProfileOfOrganization',
    components: {
        HeadOrganization,
        CardInfo,
        VueJsonPretty,
    },
    props: ['id'],
    data() {
        return {
            decoded_data: null,
        };
    },
    computed: {
        data() {
            return this.$route.params.data;
        },
    },
    watch: {
        data() {},
    },
    methods: {
        getData() {
            if (this.data !== undefined) {
                this.decoded_data = this.decodeDetailData(this.data);
            }
        },
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.log(to.name);
            if (to.name === 'DetailProfileLogOfOrganization') {
                vm.getData();
            }
        });
    },
};
</script>
