<template lang="pug">
    article.card
        figure.card__cover
            router-link(:to="url" :target="targetUrl?targetUrl:''")
                img.rounded.w-full.h-full.object-cover(:src="photo ? photo : getDefaultImage(type !== undefined && type === 'tokoh'?'profile':'default')" @error="getErrorImage($event, type !== undefined && type === 'tokoh'?'profile':'default')")
        .card__info
            .card-info
                router-link(:to="url" :target="targetUrl?targetUrl:''").link {{ title }}
                template( v-if="type === 'tokoh'")
                    p.mt-2 {{ desc }}
                template(v-else)
            router-link(:to="url" :target="targetUrl?targetUrl:''").cta {{ actionWord? actionWord : 'Lihat profil' }}
            //- router-link(v-if="urlEdit" :to="urlEdit").cta
                b-button(text="Edit" text_icon_left="edit" kind="info")
</template>


<script>
export default {
    name: 'cardInfoBdi',
    props: {
        title: String,
        type: String,
        photo: String,
        url: String,
        // urlEdit: String,
        desc: String,
        defaultImg: String,
        actionWord: String,
        targetUrl: String,
    },
    data: function() {
        return {
            // default_img: '/images/no-image.png',
        };
    },
    methods: {

    },
};
</script>

<style lang="sass">


</style>
