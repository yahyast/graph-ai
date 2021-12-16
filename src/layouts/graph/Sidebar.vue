<template lang="pug">
    .block
        aside.graph-layouts__sidebar
            .graph-navigation
                .graph-navigation__top
                    button.btn-nav.btn-nav--gatra(@click="openOpsi('gatra')" v-closable-menu-list-gatra="{exclude: ['menuListGatra'], handler: 'closeMenuListGatra'}")
                    button.btn-nav.btn-nav--isu(@click="openOpsi('isu')" v-closable-menu-list-issue="{exclude: ['menuListIssue'], handler: 'closeMenuListIssue'}")
                .graph-navigation__bottom
                    router-link.btn-nav.btn-nav--bdi(to='/bdi/organisasi')
                    router-link.btn-nav.btn-nav--management(to='/manajemen/isu')
            .floating-more(@click="openOpsi('more')" v-closable-menu-sidebar-general-graph="{exclude: ['menuSidebarGeneralActiveGraph'], handler: 'closeMenuGeneralSidebar'}")
                b-button(icon_only="more-horizontal" kind="tertiary")

        .card-menu-popup.card-menu-popup--gatra(:class="{'card-menu-popup--show' : openOpsiGatra}" ref="menuListGatra")
            button.btn-item(v-if="status_list_gatra.status === 'loading'")
                b-loading(kind="circular" text="" height="0")

            template(v-else)

                template(v-if="opsiGatra.length > 0")
                    //- button.btn-item(v-for="(item, index) in opsiGatra" @click="chooseGatra(index)" :key="index" :class="{'btn-item--selected' : item.selected}")
                    button.btn-item(v-for="(item, index) in opsiGatra" @click="chooseGatra(index)" :key="index" :class="{'btn-item--selected' : (selectedGatra === item.id)}")
                        .mr-2
                            .icon-bullet
                        span {{ item.label }}

                .menu-popup__blank(v-else)
                    .block
                        b-icon.mb-2(name="info" size="2x")
                        span Gatra tidak ditemukan.

            //- button.btn-item(v-for="item in OpsiGatra" @click="item.selected = !item.selected"  :class="{'btn-item--selected' : item.selected}")
                .mr-2
                    .icon-bullet
                span {{ item.name }}

        .card-menu-popup.card-menu-popup--isu(:class="{'card-menu-popup--show' : openOpsiIsu}" ref="menuListIssue")
            .menu-popup__blank(v-if="selectedGatra === ''")
                .block
                    b-icon.mb-2(name="info" size="2x")
                    span Pilih Gatra untuk menampilkan isu.

            template(v-else)
                template(v-if="opsiIssue.length > 0")
                    button.btn-item(v-for="(item, index) in opsiIssue" @click="chooseIssue(index)" :class="{'btn-item--selected' : (selectedIssue === item.title)}")
                        .mr-2
                            .icon-bullet
                        span(v-tooltip="item.title.length > 22 ? item.title : ''") {{ item.title.length > 22 ? item.title.substr(0, 22) +'...' : item.title }}

                template(v-if="opsiIssue.length > 0 || status_list.status === 'loading'")
                    button.btn-item(v-if="status_list.status === 'loading'")
                        b-loading(kind="circular" text="" height="0")

                    template(v-else)
                        .text-center.pt-2.pb-2(v-if="list.current_page && list.total_page && list.current_page < list.total_page")
                            b-button(text="Lainnya..." kind="tertiary" size="small" @click.native="loadMoreIssue()")

                .menu-popup__blank(v-else)
                    .block
                        b-icon(name="info")
                        span Isu tidak ditemukan.

            //- button.btn-item(v-for="item in OpsiIsu" @click="item.selected = !item.selected"  :class="{'btn-item--selected' : item.selected}")
                .mr-2
                    .icon-bullet
                span {{ item.name}}

        .card-menu-popup.card-menu-popup--more(:class="{'card-menu-popup--show' : openMore}" ref="menuSidebarGeneralActiveGraph")
            MenuSidebarGeneral

</template>

<script>
import {mapState} from 'vuex';
// import Vue from 'vue';
import MenuSidebarGeneral from '@/components/MenuSidebarGeneral';
let handleOutsideClick, handleOutsideClickListGatra, handleOutsideClickListIssue;

export default {
    name: 'GrahpSidebar',
    components: {
        MenuSidebarGeneral,
    },
    directives: {
        'closable-menu-sidebar-general-graph': {
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
        },
        'closable-menu-list-gatra': {
            bind (el, binding, vnode) {
                handleOutsideClickListGatra = (e) => {
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
                document.addEventListener('click', handleOutsideClickListGatra);
                document.addEventListener('touchstart', handleOutsideClickListGatra);
            },
            unbind () {
                document.removeEventListener('click', handleOutsideClickListGatra);
                document.removeEventListener('touchstart', handleOutsideClickListGatra);
            }
        },
        'closable-menu-list-issue': {
            bind (el, binding, vnode) {
                handleOutsideClickListIssue = (e) => {
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
                document.addEventListener('click', handleOutsideClickListIssue);
                document.addEventListener('touchstart', handleOutsideClickListIssue);
            },
            unbind () {
                document.removeEventListener('click', handleOutsideClickListIssue);
                document.removeEventListener('touchstart', handleOutsideClickListIssue);
            }
        },
    },
    data() {
        return {
            openOpsiGatra: false,
            openOpsiIsu: false,
            openMore: false,
            opsiGatra: [],
            selectedGatra: '',
            // OpsiGatra: [
            //     {
            //         name: 'Sosial Budaya',
            //         selected: false
            //     },
            //     {
            //         name: 'Ideologi',
            //         selected: false
            //     },
            //     {
            //         name: 'Politik',
            //         selected: false
            //     },
            //     {
            //         name: 'Ekonomi',
            //         selected: false
            //     },
            //     {
            //         name: 'Hankam',
            //         selected: false
            //     },
            // ],

            page_issue: 1,
            limit_issue: 10,
            opsiIssue: [],
            selectedIssue: '',
            // OpsiIsu: [
            //     {
            //         name: 'Terorisme',
            //         selected: false,
            //     },
            //     {
            //         name: 'Gerakan Radikal',
            //         selected: false,
            //     },
            //     {
            //         name: 'Konflik Relijius',
            //         selected: false,
            //     },
            //     {
            //         name: 'Gerakan Makar',
            //         selected: false,
            //     },
            //     {
            //         name: 'Penolakan Omnibus Law',
            //         selected: false,
            //     },
            //     {
            //         name: ' Reuni Gerakan 212',
            //         selected: false,
            //     },
            //     {
            //         name: 'Terorisme',
            //         selected: false,
            //     },
            //     {
            //         name: 'Gerakan Radikal',
            //         selected: false,
            //     },
            //     {
            //         name: 'Konflik Relijius',
            //         selected: false,
            //     },
            //     {
            //         name: 'Gerakan Makar',
            //         selected: false,
            //     },
            //     {
            //         name: 'Penolakan Omnibus Law',
            //         selected: false,
            //     },
            //     {
            //         name: ' Reuni Gerakan 212',
            //         selected: false,
            //     },
            // ],
        };
    },
    computed: {
        ...mapState('graph', [
            'status_list_gatra',
            'list_gatra',
        ]),
        ...mapState('issue', [
            'status_list',
            'list',
        ]),
    },
    watch: {
        list_gatra(newVal) {
            let opsiGatra = [];

            if (newVal && newVal.length > 0) {
                opsiGatra = newVal;

                Object.keys(opsiGatra).map(function(key, index) {
                    opsiGatra[index]['selected'] = false;
                });
            }

            this.opsiGatra = opsiGatra;
        },
        // opsiGatra() {},
        selectedGatra(newVal) {
            if (newVal !== '') {
                this.opsiIssue = [];
                this.selectedIssue = '';

                this.page_issue = 1;
                this.getListIssue();
            } else if (newVal === '') {} {
                this.getSearchEvent();
            }
        },
        list(newVal) {
            if (newVal && newVal.data && newVal.data.length > 0) {
                for (let i = 0; i < newVal.data.length; i++) {
                    newVal.data[i].selected = false;
                    this.opsiIssue.push(newVal.data[i]);
                }
            }
        },
    },
    methods: {
        openOpsi(typeOpsi) {
            if (typeOpsi === 'gatra') {
                this.openOpsiGatra = !this.openOpsiGatra;
                this.openOpsiIsu = false;
                this.openMore = false;
            } else if (typeOpsi === 'isu') {
                this.openOpsiGatra = false;
                this.openOpsiIsu = !this.openOpsiIsu;
                this.openMore = false;
            } else {
                this.openOpsiGatra = false;
                this.openOpsiIsu = false;
                this.openMore = !this.openMore;
            }

            Event.$emit('openIfoIan', false);
        },
        closeMenuGeneralSidebar() {
            this.openMore = false;
        },
        closeMenuListGatra() {
            this.openOpsiGatra = false;
        },
        closeMenuListIssue() {
            this.openOpsiIsu = false;
        },
        chooseGatra(index) {
            this.selectedGatra = this.opsiGatra[index].id;
            this.getSearchEvent();
        },
        chooseIssue(index) {
            // this.selectedIssue = this.opsiIssue[index].id;
            this.selectedIssue = this.opsiIssue[index].title;
            this.getSearchEvent();
        },
        loadMoreIssue() {
            this.page_issue += 1;
            this.getListIssue();
        },
        logout() {
            this.$store.dispatch('auth/logout').then((resp) => {
                if (resp.result && resp.result === 'success') {
                    // this.$router.push({ name: 'pageLogin' });
                    this.$router.push('/login');

                    // Event.$emit('showLoading', false);
                    // this.$swal.close();
                } else {
                    // alert('error');

                    this.$swal.fire({
                        title: 'Failed logout!',
                        icon: 'error',
                        text: (resp.data && resp.data.message ? resp.data.message : 'Something wrong.'),
                        // timer: 3000,
                    });
                }
            });
        },
        getListGatra() {
            // for dispatch get data
            this.$store.dispatch('graph/getListGatra');
        },
        getListIssue() {
            this.$store.dispatch('issue/getList', [this.limit_issue, this.page_issue, '', this.selectedGatra]);
        },
        getSearchEvent() {
            this.$store.dispatch('graph/getSearchEvent', [this.selectedGatra, this.selectedIssue]);
        },
    },
    mounted() {
        // console.log('mounted on GrahpSidebar')
        this.getListGatra();
    },
    // beforeRouteEnter (to, from, next) {
    //     console.log(to.name);
    //     console.log(ehe);
    //     next(vm => {
    //         console.log(to.name);


    //         vm.$store.commit('graph/setListGatra', []);

    //         // if (to.name === 'GeneralRolesIndex' && vm.$route.params.id === undefined)
    //         vm.getListGatra();
    //     })
    // },
    // beforeRouteLeave (to, from, next) {
    //     next();
    // },
};
</script>

<style lang="sass">
.menu-popup__blank
    @apply w-full flex items-center justify-center absolute p-12 text-center
    height: calc( 100% - 0.75rem )
</style>
