<template lang="pug">
    .bdi-layouts.bdi-layouts--form
        aside.bdi-layouts__sidebar.bdi-layouts--form__sidebar
            router-link(to="/").bdi-sidebar__logo.logo-ai
            .bdi-sidebar__menu
                .back-bdi.flex.mb-4
                    b-icon.mr-2(name="chevron-left")
                    router-link.block(to="/bdi/tokoh") Tokoh
                
                .detail-sidebar(v-if="id === 'create'")
                    router-link.block(:to="'/tokoh/'+ id +'/form/profile'") Informasi Tokoh
                    a.block.cursor-not-allowed(v-tooltip.bottom="'Isi informasi tokoh terlebih dahulu.'") Biografi &amp; profil
                    a.block.cursor-not-allowed(v-tooltip.bottom="'Isi informasi tokoh terlebih dahulu.'") Pengalaman
                    a.block.cursor-not-allowed(v-tooltip.bottom="'Isi informasi tokoh terlebih dahulu.'") Karakter
                    a.block.cursor-not-allowed(v-tooltip.bottom="'Isi informasi tokoh terlebih dahulu.'") Ambisi
                    a.block.cursor-not-allowed(v-tooltip.bottom="'Isi informasi tokoh terlebih dahulu.'") Opini
                    a.block.cursor-not-allowed(v-tooltip.bottom="'Isi informasi tokoh terlebih dahulu.'") Kekuatan
                    a.block.cursor-not-allowed(v-tooltip.bottom="'Isi informasi tokoh terlebih dahulu.'") Keluarga

                .detail-sidebar(v-else)
                    router-link.block(:to="'/tokoh/'+ id +'/form/profile'") Informasi Tokoh
                    router-link.block(:to="'/tokoh/'+ id +'/form/bio'") Biografi &amp; profil
                    router-link.block(:to="'/tokoh/'+ id +'/form/experience'") Pengalaman
                    router-link.block(:to="'/tokoh/'+ id +'/form/character'") Karakter
                    router-link.block(:to="'/tokoh/'+ id +'/form/ambition'") Ambisi
                    router-link.block(:to="'/tokoh/'+ id +'/form/opinion'") Opini
                    router-link.block(:to="'/tokoh/'+ id +'/form/strength'") Kekuatan
                    router-link.block(:to="'/tokoh/'+ id +'/form/family'") Keluarga

        .bdi-layouts__content.bdi-layouts--form__content
            .content-bdi
                .content-bdi__header
                    header.form-general
                        //- h1.text-2xl.font-bold {{ id ==='create' ? 'Tokoh Baru' : 'Ubah { Nama Tokoh }' }}
                        h1.text-2xl.font-bold {{ id ==='create' ? 'Tokoh Baru' : (detail.name ? 'Ubah Tokoh - '+ detail.name : '-') }}
                .content-bdi__body
                    router-view(:id="id")
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'BdiOrganizationForm',
    data() {
        return {
            // loading_detail: false,
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        ...mapState('actor', [
            'detail',
        ]),
    },
    watch: {
        id() {},
    },
    methods: {
        async getData() {
            if (this.id !== 'create') {
                Event.$emit('showLoading', true);

                await this.$store.dispatch('actor/getDetail', this.id)
                .then((resp) => {
                    if (resp === 'success') {
                        Event.$emit('showLoading', false);
                    } else {
                        Event.$emit('error');
                    }
                });
            } else {
                await this.$store.commit('actor/setDetail', {});
            }
        },
    },
    created() {
        Event.$on('getDataActor', () => {
            this.getData();
        });
    },
    beforeDestroy() {
        Event.$off('getDataActor');
    },
}
</script>
