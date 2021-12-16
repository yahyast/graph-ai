<template lang="pug">
    header.header-page
        .header-page__title
            h1 {{ title }}
        .header-page__cta
            ul.breadcrumbs
                li: span BDI
                li: b-icon(name="chevron-right")
                li: span Organisasi
</template>


<script>
export default {
    name: 'headerPage',
    props: {
        title: String
    }
}
</script>

<style lang="sass">

</style>