<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadActor
        .content-bdi__body
            .heading-submenu
                h2.subheading Karakter/Watak
                routerLink(:to="'/tokoh/'+ id +'/form/character'" v-tooltip="'Sunting'")
                    b-button(kind='tertiary' icon_only="edit-2")
            .relative.text-center.m-5.p-5.w-full(v-if="status_detail === 'loading'")
                b-loading(text="Memuat data")
            p.text-paragraph(v-else v-html="detail.character && detail.character.length > 0 ? detail.character : '-'")
            
</template>

<script>
import { mapState } from 'vuex';
import HeadActor from '@/pages/actor/HeadActor';

export default {
    name: 'CharacterOfActor',
    components: {
        HeadActor
    },
    props: ['id'],
    computed: {
        ...mapState('actor', [
            'status_detail',
            'detail',
        ]),
    },
}
</script>