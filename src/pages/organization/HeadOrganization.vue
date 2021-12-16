<template lang="pug">
    header.header-page.header-page--bdi(v-if="status_detail === 'loading'")
        .m-7.p-7.relative.text-center.w-full.h-full
            b-loading(text="Memuat data")

    header.header-page.header-page--bdi(v-else)
        .header-page--bdi__cover
            //- img(src="https://graph-ntxdemo.vercel.app/icon/kasbi.png", alt="alt")
            img(:src="detail.photo ? detail.photo : ''" alt="alt" @error="getErrorImage")
        .header-page--bdi__info
            //- h1.heading Kongres Aliansi Serikat Buruh Indonesia <br> (KASBI)
            h1.heading {{ detail.name && detail.name.length > 0 ? detail.name : '-' }}
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'OrganizationHeader',
    data: function() {
        return {
            // default_img: '/images/no-image.png',
            // default_image: this.$store.getters['config/getDefaultImage'],
        };
    },
    computed: {
        ...mapState('organization', [
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
