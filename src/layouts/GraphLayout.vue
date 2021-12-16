<template lang="pug">
    main.graph-layouts
        GraphAside
        GraphSearch
        GraphDynamics
        GraphInfo
        router-view
</template>

<script>
import GraphAside from '@/layouts/graph/Sidebar'
import GraphSearch from '@/layouts/graph/Search'
import GraphDynamics from '@/layouts/graph/Dynamics'
import GraphInfo from '@/layouts/graph/Info'
export default {
    name: 'GraphLayouts',
    components: {
        GraphAside,
        GraphSearch,
        GraphDynamics,
        GraphInfo,
    }
}
</script>

<style lang="sass">
    
</style>

