<template lang="pug">
    .bdi-layouts
        GeneralSidebar
        .bdi-layouts__content
            //- header page
            HeaderPage(title="Bantuan")
            h1 Helo, this is general page for Bantuan
</template>

<script>

import GeneralSidebar from '@/pages/general/Sidebar'
import HeaderPage from '@/components/sections/HeaderPage'

export default {
    name: 'GeneralHelp',
    components: {
        GeneralSidebar,
        HeaderPage
    }
}
</script>