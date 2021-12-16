<template lang="pug">
    header.header-page.header-page--bdi(v-if="status_detail === 'loading'")
        .m-5.p-5.relative.text-center.w-full.h-full
            b-loading(text="Memuat data")

    header.header-page.header-page--bdi(v-else)
        .header-page--bdi__cover
            //- img(src="https://graph-ntxdemo.vercel.app/icon/omlaw.png", alt="alt")
            img(:src="detail.image ? (detail.image.substr(0, 4) === 'http' ? detail.image : 'http://'+ detail.image) : ''" alt="alt" @error="getErrorImage")
        .header-page--bdi__info
            h1.heading {{ detail.title && detail.title.length > 0 ? detail.title : '-' }}

        routerLink.ml-3(:to="'/isu/'+ id +'/form/profil'" v-tooltip="'Sunting'")
            b-button(kind='tertiary' icon_only="edit-2")
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'IssueHeader',
    data: function() {
        return {
            // default_profile: '/images/no-image-profile.jpg',
            // default_image: this.$store.getters['config/getDefaultImage'],
        };
    },
    props: ['id'],
    computed: {
        ...mapState('issue', [
            'status_detail',
            'detail',
        ]),
    },
    watch: {
        detail(newVal) {
            console.log(newVal);
        },
    },
    methods: {
        // getDefaultImage(e) {
        //     e.target.src = this.default_image;
        // },
    },
};
</script>
