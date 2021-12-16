<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadOrganization
        .content-bdi__body
            .relative.text-center.m-5.p-5.w-full(v-if="status_detail === 'loading'")
                b-loading(text="Memuat data")

            ul(v-else-if="detail.structure && detail.structure.length > 0")
                li.w-full.flex.items-center.mb-2(v-for="item in detail.structure")
                    span.block(class="w-1/2") {{ item.position }}
                    Strong.block(class="w-1/2") {{ item.figure.name }}

            .grid.grid-cols-1.gap-0(v-else)
                .block.text-center.mt-10
                    span Data tidak ditemukan.
            //- ul
                li.w-full.flex.items-center.mb-2(v-for="item in ListOfStructure")
                    span.block(class="w-1/2") {{ item.title }}
                    Strong.block(class="w-1/2") {{ item.name }}
</template>

<script>
import { mapState } from 'vuex';
import HeadOrganization from '@/pages/organization/HeadOrganization';

export default {
    name: 'StructureOfOrganization',
    components: {
        HeadOrganization
    },
    data() {
        return {
            ListOfStructure: [
                {
                    title: 'Ketua Umum',
                    name: 'Nining Elitos',
                },
                {
                    title: 'Sekretaris Jendral',
                    name: 'Abdulrachman',
                },
                {
                    title: 'Departemen Pendidikan',
                    name: 'Sumarto',
                },
                {
                    title: 'Departemen Hubungan Internasional',
                    name: 'Simon SH',
                },
                {
                    title: 'Departemen Organisasi',
                    name: 'Beno Widodo',
                },
                {
                    title: 'Departemen Buruh Migran',
                    name: 'Darto',
                },
                {
                    title: 'Departemen Litbang',
                    name: 'Yahya',
                },
                {
                    title: 'Departemen Keuangan',
                    name: 'Eka Pangulimara H',
                },
                {
                    title: 'Departemen Hukum & Advokasi',
                    name: 'Mursianto',
                },
                {
                    title: 'Departemen Propaganda & Terbitan',
                    name: 'Agustinus',
                },
                {
                    title: 'Departemen Kesekertariatan',
                    name: 'Sunarno',
                },
            ]
        }
    },
    props: ['id'],
    computed: {
        ...mapState('organization', [
            'status_detail',
            'detail',
        ]),
    },
}
</script>