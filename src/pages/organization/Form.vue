<template lang="pug">
    .bdi-layouts.bdi-layouts--form
        aside.bdi-layouts__sidebar.bdi-layouts--form__sidebar
            router-link(to="/").bdi-sidebar__logo.logo-ai
            .bdi-sidebar__menu
                .back-bdi.flex.mb-4
                    b-icon.mr-2(name="chevron-left")
                    router-link.block(to="/bdi/organisasi") Organisasi

                .detail-sidebar(v-if="id === 'create'")
                    router-link.block(:to="'/organisasi/'+ id +'/form/profile'") Profil Organisasi
                    a.block.cursor-not-allowed(v-tooltip.bottom="'Isi profil organisasi terlebih dahulu.'") Tokoh Terkait
                    a.block.cursor-not-allowed(v-tooltip.bottom="'Isi profil organisasi terlebih dahulu.'") Struktur

                .detail-sidebar(v-else)
                    router-link.block(:to="'/organisasi/'+ id +'/form/profile'") Profil Organisasi
                    router-link.block(:to="'/organisasi/'+ id +'/form/related-people'") Tokoh Terkait
                    router-link.block(:to="'/organisasi/'+ id +'/form/structure'") Struktur

        .bdi-layouts__content.bdi-layouts--form__content
            .content-bdi
                .content-bdi__header
                    header.form-general
                        //- h1.text-2xl.font-bold Organisasi Baru / Ubah Organisasi
                        h1.text-2xl.font-bold {{ id ==='create' ? 'Organisasi Baru' : (detail.name ? 'Ubah Organisasi - '+ detail.name : '-') }}
                .content-bdi__body
                    router-view(:id="id")
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'BdiOrganizationForm',
    computed: {
        id() {
            return this.$route.params.id;
        },
        ...mapState('organization', [
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

                await this.$store.dispatch('organization/getDetail', this.id)
                    .then((resp) => {
                        if (resp === 'success') {
                            Event.$emit('showLoading', false);
                        } else {
                            Event.$emit('error');
                        }
                    });
            } else {
                await this.$store.commit('organization/setDetail', {});
            }
        },
    },
    created() {
        Event.$on('getDataOrganization', () => {
            this.getData();
        });
    },
    beforeDestroy() {
        Event.$off('getDataOrganization');
    },
};
</script>
