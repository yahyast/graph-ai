<template lang="pug">
    aside.bdi-layouts__sidebar
        router-link(to="/").bdi-sidebar__logo.logo-ai

        .bdi-sidebar__menu.general-menu
            .back-bdi.flex.mb-4
                b-icon.mr-2(name="chevron-left")
                router-link.block(to="/bdi/isu") Kumpulan BDI

            .block.mb-8
                //- router-link.block.mb-2(to="/help")
                    b-button(text="Bantuan" text_icon_left="info")
                //- router-link.block.mb-2(to="/notification")
                    b-button(text="Notifikasi" text_icon_left="bell")
                router-link.block.mb-2(to="/profile")
                    b-button(text="Profil" text_icon_left="user")

                router-link.block.mb-2(to="/cases" :class="route_name === 'GeneralCasesIndex' || route_name === 'GeneralCasesCreate' || route_name === 'GeneralCasesEdit' ? 'router-link-exact-active' : ''")
                    b-button(text="Kasus" text_icon_left="tag")

            .block
                p.text-xs.mb-3.ml-4.text-gray-400 Pengaturan Umum
                router-link.block.mb-2(to="/roles" :class="route_name === 'GeneralRolesIndex' || route_name === 'GeneralRolesCreate' || route_name === 'GeneralRolesEdit' ? 'router-link-exact-active' : ''")
                    b-button(text="Roles" text_icon_left="layers")
                router-link.block.mb-2(to="/users" :class="route_name === 'GeneralUsersIndex' || route_name === 'GeneralUsersCreate' || route_name === 'GeneralUsersEdit' ? 'router-link-exact-active' : ''")
                    b-button(text="Users" text_icon_left="user-check")
                //- router-link.block.mb-2(to="/acl")
                    b-button(text="ACL" text_icon_left="shuffle")

</template>

<script>

export default {
    name: 'sidebargeneral',
    data(){
        return {
            layer: '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Layers</title><path d="M256 256c-13.47 0-26.94-2.39-37.44-7.17l-148-67.49C63.79 178.26 48 169.25 48 152.24s15.79-26 22.58-29.12l149.28-68.07c20.57-9.4 51.61-9.4 72.19 0l149.37 68.07c6.79 3.09 22.58 12.1 22.58 29.12s-15.79 26-22.58 29.11l-148 67.48C282.94 253.61 269.47 256 256 256zm176.76-100.86z"/><path d="M441.36 226.81L426.27 220l-38.77 17.74-94 43c-10.5 4.8-24 7.19-37.44 7.19s-26.93-2.39-37.42-7.19l-94.07-43L85.79 220l-15.22 6.84C63.79 229.93 48 239 48 256s15.79 26.08 22.56 29.17l148 67.63C229 357.6 242.49 360 256 360s26.94-2.4 37.44-7.19l147.87-67.61c6.81-3.09 22.69-12.11 22.69-29.2s-15.77-26.07-22.64-29.19z"/><path d="M441.36 330.8l-15.09-6.8-38.77 17.73-94 42.95c-10.5 4.78-24 7.18-37.44 7.18s-26.93-2.39-37.42-7.18l-94.07-43L85.79 324l-15.22 6.84C63.79 333.93 48 343 48 360s15.79 26.07 22.56 29.15l148 67.59C229 461.52 242.54 464 256 464s26.88-2.48 37.38-7.27l147.92-67.57c6.82-3.08 22.7-12.1 22.7-29.16s-15.77-26.07-22.64-29.2z"/></svg>',
        }
    },
    computed: {
        route_name() {
            return this.$route.name;
        },
    },
    watch: {
        route_name() {},
    },
    methods: {
        // 
    },
    mounted() {
        console.log(this.route_name)
    },
}
</script>

<style lang="sass">
.general-menu
    .router-link-exact-active
        .btn--modifier
            color: var(--color-primary-500) !important
            background-color: var(--bg-card--hover)
</style>