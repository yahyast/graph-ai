<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadActor
        .content-bdi__body
            .text-sm.border-gray-200.p-4.text-yellow-900.mb-6.bg-yellow-200.rounded
                p Suntingan pada {{ decoded_data !== null && decoded_data.createdAt ? datetimeFormat(decoded_data.createdAt) : '-' }} </router-link> oleh {{ decoded_data !== null && decoded_data.user ? decoded_data.user : '-' }}. <router-Link class="link" :to="'/tokoh/'+ id +'/detail/profil/log'" style="font-weight: normal !important"> Lihat semua riwayat perubahan </router-link>

            .grid.grid-cols-2.gap-8
                .block
                    span.block.mb-4 Informasi saat ini ( Suntingan 10 Desember 2021)
                    .card-bg-theme.rounded.p-8
                        h2.subheading Profil Ringkas
                        p.text-paragraph Kongres Aliansi <span class="changed changed--current"> Serikat Buruh </span> Indonesia (KASBI) adalah serikat pekerja Indonesia yang dibentuk tahun 2005 melalui penggabungan 18 serikat pekerja.

                .block
                    span.block.mb-4 Suntingan 9 Desember 2021
                    .card-bg-theme.rounded.p-8
                        h2.subheading Profil Ringkas
                        p.text-paragraph Kongres Aliansi <span class="changed changed--before"> Sirikat Biruh </span> Indonesia (KASBI) adalah serikat pekerja Indonesia yang dibentuk tahun 2005 melalui penggabungan 18 serikat pekerja.

            //- vue-json-pretty(:path="'res'" :data="data !== undefined ? decodeDetailData(data) : null")
            //- vue-json-pretty(:path="'res'" :data="decoded_data")

</template>

<script>
import HeadActor from '@/pages/actor/HeadActor';
import CardInfo from '@/components/sections/Card';
import moment from 'moment';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
    name: 'ProfileOfOrganization',
    components: {
        HeadActor,
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
            if (to.name === 'DetailProfileLogOfActor') {
                vm.getData();
            }
        });
    },
};
</script>

<style lang="sass">
.changed
    @apply inline font-bold
    &--before
        background-color: rgb(253 175 138 / 25%)
        color: #d75656 !important

    &--current
        background-color: rgb(138 253 232 / 25%)
        color: #43b17e !important
</style>
