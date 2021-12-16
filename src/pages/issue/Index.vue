<template lang="pug">
    .bdi-layouts
        aside.bdi-layouts__sidebar
            router-link(to="/").bdi-sidebar__logo.logo-ai

            .bdi-sidebar__menu
                .back-bdi.flex.mb-4
                    b-icon.mr-2(name="chevron-left")
                    router-link.block(to="/bdi/isu") Kumpulan BDI

                .detail-sidebar
                    router-link.block(:to="'/isu/'+ id +'/detail/profil'") Profil
                    router-link.block(:to="'/isu/'+ id +'/detail/aktivitas'") Aktivitas

            .bdi-sidebar__more
                .floating-more(@click="toggleMore()" v-closable-menu-sidebar-general-bdi-issue="{exclude: ['menuSidebarGeneralActiveBdiIssue'], handler: 'closeMenuGeneralSidebar'}")
                    b-button(text="Menu Lainnya" text_icon_left="more-horizontal" kind="tertiary")

        .bdi-layouts__content
            router-view(:id="id")            

        .card-menu-popup.card-menu-popup--more(:class="{'card-menu-popup--show' : openMore}" ref="menuSidebarGeneralActiveBdiIssue")
            MenuSidebarGeneral
</template>

<script>
import { mapState } from 'vuex';
import MenuSidebarGeneral from '@/components/MenuSidebarGeneral';
let handleOutsideClick;

export default {
    name: 'BdiIssuesPage',
    components: {
        MenuSidebarGeneral
    },
    directives: {
        'closable-menu-sidebar-general-bdi-issue': {
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
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        ...mapState('issue', [
            'detail',
        ]),
    },
    watch: {
        id() {},
    },
    methods: {
        toggleMore() {
            this.openMore = !this.openMore
        },
        closeMenuGeneralSidebar() {
            this.openMore = false;
        },
        async getData() {
            await this.$store.dispatch('issue/getDetail', this.id)
            .then((resp) => {
                if (resp === 'success') {
                } else {
                    Event.$emit('error');
                }
            });
        },
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // console.log(to);
            if (to.matched && to.matched[0] && to.matched[0].name === 'IssuePage') {
                vm.getData();
            }
        });
    },
}
</script>
