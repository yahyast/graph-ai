<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadIssue(:id="id")
        .content-bdi__header
            .relative.text-center.m-5.p-5(v-if="status_detail === 'loading'")
                b-loading(text="Memuat data")
            //- p this is profile
            p.text-paragraph(v-else v-html="detail.description && detail.description.length > 0 ? detail.description : '-'")
</template>

<script>
import { mapState } from 'vuex';
import HeadIssue from '@/pages/issue/HeadIssue';

export default {
    name: 'ProfileOfIssue',
    components: {
        HeadIssue
    },
    props: ['id'],
    computed: {
        ...mapState('issue', [
            'status_detail',
            'detail',
        ]),
    },
}
</script>