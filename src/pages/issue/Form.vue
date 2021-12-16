<template lang="pug">
    .bdi-layouts.bdi-layouts--form
        aside.bdi-layouts__sidebar.bdi-layouts--form__sidebar
            router-link(to="/").bdi-sidebar__logo.logo-ai
            .bdi-sidebar__menu
                .back-bdi.flex.mb-4
                    b-icon.mr-2(name="chevron-left")
                    router-link.block(to="/bdi/isu") Isu

                .detail-sidebar(v-if="id === 'create'")
                    router-link.block(:to="'/isu/'+ id +'/form/profil'") Informasi Umum

                .detail-sidebar(v-else)
                    router-link.block(:to="'/isu/'+ id +'/form/profil'") Informasi Umum

        .bdi-layouts__content.bdi-layouts--form__content
            .content-bdi
                .content-bdi__header
                    header.form-general
                        h1.text-2xl.font-bold {{ id ==='create' ? 'Isu Baru' : (detail.title ? 'Ubah Isu - '+ detail.title : '-') }}
                .content-bdi__body
                    router-view(:id="id")
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'BdiIssueForm',
    computed: {
        id() {
            return this.$route.params.id;
        },
        ...mapState('issue', [
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

                await this.$store.dispatch('issue/getDetail', this.id)
                .then((resp) => {
                    if (resp === 'success') {
                        Event.$emit('showLoading', false);
                    } else {
                        Event.$emit('error');
                    }
                });
            } else {
                await this.$store.commit('issue/setDetail', {});
            }
        },
    },
    created() {
        console.log('created form issue global ', this.id)
        Event.$on('getDataIssue', () => {
            this.getData();
        });
    },
    beforeDestroy() {
        Event.$off('getDataIssue');
    },
}
</script>
