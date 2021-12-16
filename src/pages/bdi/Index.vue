<template lang="pug">
    .bdi-layouts
        aside.bdi-layouts__sidebar
            router-link(to="/").bdi-sidebar__logo.logo-ai

            .bdi-sidebar__menu
                router-link.menu-bdi(to="/bdi/search" v-if="route_name=='BDI_SearchResult'")
                    .box-icon
                        b-icon(name="search")
                    span Cari BDI
                router-link.menu-bdi(to="/bdi/organisasi")
                    .box-icon
                        b-icon(name="award")
                    span Organisasi
                router-link.menu-bdi(to="/bdi/tokoh")
                    .box-icon
                        b-icon(name="users")
                    span Tokoh
                router-link.menu-bdi(to="/bdi/isu")
                    .box-icon
                        b-icon(name="file-text")
                    span Isu
                router-link.menu-bdi(to="/bdi/foto")
                    .box-icon
                        b-icon(name="user-plus")
                    span Foto

            .bdi-sidebar__more
                .floating-more(@click="toggleMore()" v-closable-menu-sidebar-general-bdi="{exclude: ['menuSidebarGeneralActiveBdi'], handler: 'closeMenuGeneralSidebar'}")
                    b-button(text="Menu Lainnya" text_icon_left="more-horizontal" kind="tertiary")

        .bdi-layouts__content
            router-view


        .card-menu-popup.card-menu-popup--more(:class="{'card-menu-popup--show' : openMore}" ref="menuSidebarGeneralActiveBdi")
            MenuSidebarGeneral

</template>

<script>
import MenuSidebarGeneral from '@/components/MenuSidebarGeneral';
let handleOutsideClick;

export default {
    name: 'BdiPage',
    components: {
        MenuSidebarGeneral,
    },
    directives: {
        'closable-menu-sidebar-general-bdi': {
            bind (el, binding, vnode) {
                handleOutsideClick = (e) => {
                    e.stopPropagation();
                    const { handler, exclude } = binding.value;
                    let clickedOnExcludedEl = false;

                    exclude.forEach(refName => {
                        if (!clickedOnExcludedEl) {
                            const excludedEl = vnode.context.$refs[refName];
                            if (excludedEl)
                                clickedOnExcludedEl = excludedEl.contains(e.target);
                        }
                    })

                    if (!el.contains(e.target) && !clickedOnExcludedEl) {
                        vnode.context[handler]();
                    }
                }
                document.addEventListener('click', handleOutsideClick);
                document.addEventListener('touchstart', handleOutsideClick);
            },
            unbind () {
                document.removeEventListener('click', handleOutsideClick);
                document.removeEventListener('touchstart', handleOutsideClick);
            }
        }
    },
    data() {
        return {
            openMore: false,
        };
    },
    computed: {
        route_name() {
            return this.$route.name;
        },
    },
    methods: {
        toggleMore() {
            this.openMore = !this.openMore;
        },
        closeMenuGeneralSidebar() {
            this.openMore = false;
        },
    },
};
</script>
