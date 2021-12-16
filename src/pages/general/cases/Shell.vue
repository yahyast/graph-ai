<template lang="pug">
    .bdi-layouts
        GeneralSidebar
        .bdi-layouts__content
            //- header page
            HeaderPage(title="Manajemen Kasus")
            //- form filter
            router-view
</template>

<script>

import GeneralSidebar from '@/pages/general/Sidebar'
import HeaderPage from '@/components/sections/HeaderPage'

export default {
    name: 'GeneralCasesShell',
    components: {
        GeneralSidebar,
        HeaderPage
    },
    data() {
        return {
            
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.$route.params.id && vm.$route.params.id === 'create')
                vm.$router.push({ name: 'GeneralCasesCreate', params: {} });
        })
    },
}
</script>