<template lang="pug">
    section.bdi-section-organization

        //- header page
        HeaderPage(:title="titlePage")

        //- list of content
        routerView
        
</template>

<script>
import HeaderPage from '@/components/sections/HeaderPage'
export default {
    name: 'BdiListOfPhoto',
    components: {
        HeaderPage
    },
    data() {
        return {
            titlePage: 'Foto',
        }
    },
}
</script>

<style lang="sass">

</style>