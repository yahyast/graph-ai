<template lang="pug">
    .content-bdi
        .content-bdi__header
            HeadOrganization
        .content-bdi__body
            .grid.grid-cols-2.gap-8
                .block
                    h2.subheading Perilaku

                .block
                    h2.subheading Skala Ancaman Perilaku
</template>

<script>
import HeadOrganization from '@/pages/organization/HeadOrganization'
export default {
    name: 'BehaviorOfOrganization',
    components: {
        HeadOrganization
    }
}
</script>