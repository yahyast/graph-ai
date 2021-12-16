<template lang="pug">
    .snapshot
        figure.snapshot__account
            img.avatar.avatar--large( :src="photo" @error="getErrorImage")
            strong.block.mb-2.text-xl {{ name }}
            //.followers
                strong(style="padding-right:4px") {{ nFormatter(followers) }}
                span Pengikut

        ul.snapshot__info
            li
                b-icon.mb-2.text-gray-400(name="map-pin")
                span {{ location }}
            li
                b-icon.mb-2.text-gray-400(name="link")
                span: a.link(:href="link" target="_blank") {{ link }}
            //- li
                b-icon.mb-2.text-gray-400(name="gift")
                span {{ bday}}

        .snapshot__bio
            p {{ bio }}
</template>

<script>
export default {
    name: 'snapShotAccount',
    props: ['photo', 'name', 'followers', 'location', 'link', 'bday', 'bio'],
};
</script>

<style lang="sass">
.snapshot
    @apply flex flex-col
    &__account
        @apply w-full flex flex-col justify-center items-center

        img
            width: 184px
            height: 184px
            @apply mb-4

        .followers
            @apply inline-flex items-center justify-center px-4 py-1 rounded-full
            color: #ffffff
            background-color: rgb(17, 159, 161)

    &__info
        @apply grid grid-cols-3 py-4
        li
            @apply flex flex-col items-center text-xs border-l px-4 border-gray-100
            span
                @apply w-full truncate text-center font-bold
            &:first-child
                @apply border-l-0

    &__bio
        font-size: 13px

    &--align-left
        .snapshot__account
            @apply w-full flex flex-col justify-start items-start
        .snapshot__info
            @apply block
            li
                @apply flex flex-row items-center justify-center text-xs border-l-0 px-0 py-2
            .b-icon
                @apply mb-0 mr-2
            span
                @apply text-left
            &:first-child
                @apply border-l-0


</style>
