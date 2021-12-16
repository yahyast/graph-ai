<template lang="pug">
    .post-tweet
        .post-tweet__avatar
            img.avatar(:src="photo ? photo : getDefaultImage" @error="getErrorImage")
        .post-tweet__content
            .mb-1
                span.mr-1.uname {{ username }}
                span.text-gray-500 {{ date }}
            p {{ content }}
</template>

<script>
export default {
    name: 'postTweet',
    props: ['photo', 'username', 'date', 'content'],
};
</script>

<style lang="sass">
.post-tweet
    @apply px-4 py-2 transition-all block w-full text-left text-xs flex
    &__avatar
        @apply mr-2
        flex: 0 0 32px

    &:hover
        .uname
            color: var(--color-primary-500)
</style>
