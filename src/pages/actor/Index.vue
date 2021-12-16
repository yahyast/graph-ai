<template lang="pug">
    .bdi-layouts
        aside.bdi-layouts__sidebar
            router-link(to="/").bdi-sidebar__logo.logo-ai

            .bdi-sidebar__menu
                .back-bdi.flex.mb-4
                    b-icon.mr-2(name="chevron-left")
                    router-link.block(to="/bdi/tokoh") Kumpulan BDI

                .detail-sidebar
                    router-link.block(:to="'/tokoh/'+ id +'/detail/profil'") Profil
                    router-link.block(:to="'/tokoh/'+ id +'/detail/karakter'") Karakter
                    router-link.block(:to="'/tokoh/'+ id +'/detail/ambisi'") Ambisi
                    router-link.block(:to="'/tokoh/'+ id +'/detail/opini'") Opini
                    router-link.block(:to="'/tokoh/'+ id +'/detail/kekuatan'") Kekuatan
                    router-link.block(:to="'/tokoh/'+ id +'/detail/keluarga'") Keluarga
                    router-link.block(:to="'/tokoh/'+ id +'/detail/aktivitas'") Aktivitas
                    router-link.block(:to="'/tokoh/'+ id +'/detail/motif-agenda'") Motif &amp; Agenda

                    //- router-link.block(to="/tokoh/sikap") Sikap
                    //- router-link.block(to="/tokoh/perilaku") Perilaku

            .bdi-sidebar__more
                .floating-more(@click="toggleMore()" v-closable-menu-sidebar-general-bdi-actor="{exclude: ['menuSidebarGeneralActiveBdiActor'], handler: 'closeMenuGeneralSidebar'}")
                    b-button(text="Menu Lainnya" text_icon_left="more-horizontal" kind="tertiary")

        .bdi-layouts__content
            router-view(:id="id")

        .card-menu-popup.card-menu-popup--more(:class="{'card-menu-popup--show' : openMore}" ref="menuSidebarGeneralActiveBdiActor")
            MenuSidebarGeneral
</template>

<script>
import { mapState } from 'vuex';
import MenuSidebarGeneral from '@/components/MenuSidebarGeneral';
let handleOutsideClick;

export default {
    name: 'BdiActorPage',
    components: {
        MenuSidebarGeneral
    },
    directives: {
        'closable-menu-sidebar-general-bdi-actor': {
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
        ...mapState('actor', [
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
            await this.$store.dispatch('actor/getDetail', this.id)
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
            if (to.matched && to.matched[0] && to.matched[0].name === 'ActorPage') {
                vm.getData();
            }
        });
    },
}
</script>
