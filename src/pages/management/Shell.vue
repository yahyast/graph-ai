<template lang="pug">
    .management-layouts(v-bind:class="{'management-layouts--collapse' : TwitterHidden }")
        .management-layouts__sidebar
            ManagementSidebar
        routerView
</template>

<script>
import ManagementSidebar from "@/pages/management/Sidebar";
export default {
    name:'ManagementPageShell',
    components: {
        ManagementSidebar
    },
    data() {
        return {
            TwitterHidden: false,
        }
    },
    methods: {
        
    },
    created() {
        Event.$on('ctaTwitterHidden', () => {
            this.TwitterHidden = !this.TwitterHidden
        });
    }
}
</script>