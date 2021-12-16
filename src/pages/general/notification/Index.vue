<template lang="pug">
    .bdi-layouts
        GeneralSidebar
        .bdi-layouts__content
            //- header page
            HeaderPage(title="Notifikasi")
            h1 Helo, this is general page for Notifikasi
</template>

<script>

import GeneralSidebar from '@/pages/general/Sidebar'
import HeaderPage from '@/components/sections/HeaderPage'

export default {
    name: 'GeneralNotification',
    components: {
        GeneralSidebar,
        HeaderPage
    }
}
</script>