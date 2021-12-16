<template lang="pug">
    router-view
</template>

<script>
export default {
    name: 'bdiarea',
    data() {
        return {
            openMore: false,
        }
    },
    methods: {
        toggleMore() {
            this.openMore = !this.openMore
        }
    },
}
</script>