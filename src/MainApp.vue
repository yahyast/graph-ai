<template lang="pug">
    #app
        component(:is="layout")
            router-view
</template>

<script>
// import helpersMixin from '@/util/mixins/helpers';
import {mapState} from 'vuex';

const applayout = 'app-layout';
export default {
    name: 'MainApp',
    computed: {
        layout() {
            return (this.$route.meta.layout || applayout );
        },
        ...mapState('config', [
            'theme',
        ]),
    },
    // mixins: [helpersMixin],
    methods: {
        // changeTitle() {
        //     let title = this.title
        // },
        showLoading(show=true) {
            if (show) {
                this.$swal.fire({
                    title: '',
                    html: '<div class="save_loading"><svg viewBox="0 0 140 140" width="140" height="140"><g class="outline"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="rgba(0,0,0,0.1)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></g><g class="circle"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="#71BBFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dashoffset="200" stroke-dasharray="300"></path></g></svg></div><div><h4>Loading...</h4></div>',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
            } else {
                this.$swal.close();
            }
        },
        success(message='Sukses!', timer=3000) {
            this.$swal.fire({
                icon: 'success',
                title: message,
                timer: timer,
            });
        },
        warning(message=null, data=null) {
            let warnings = '';

            if (data !== null) {
                Object.keys(data).forEach(function(item) {
                    // warnings += data[item] + '<br><br>';
                    // warnings += '<div class="swal2-html-container" style="display: block;">' + data[item] + '<br><div>';
                    warnings = warnings + '<div class="swal2-html-container mt-2" style="display: block;">' + data[item] + '<div>';
                });
            }

            this.$swal.fire({
                icon: 'warning',
                title: 'Peringatan!',
                text: (message!==null ? message : 'Data still not found, please try again.'),
                html: warnings,
                // timer: 3000
            });
        },
        error(message=null, data=null, title=null) {
            let errors = '';

            if (data !== null) {
                errors = errors + '<section class="container-alert">';
                Object.keys(data).forEach(function(item) {
                    // errors += data[item] + '<br><br>';
                    // errors += '<div class="swal2-html-container" style="display: block;">' + data[item] + '<br><div>';
                    // errors = errors + '<div class="swal2-html-container mt-2" style="display: block;">' + data[item] + '<div>';
                    errors = errors + '<div class="container-alert__list">' + data[item] + '</div>';
                });
                errors = errors + '</section>';
            }

            this.$swal.fire({
                icon: 'error',
                // title: 'Failed!',
                title: (title!==null ? title : 'Gagal!'),
                text: (message!==null ? message : 'Terdapat masalah.'),
                html: errors,
                // timer: 3000
            });
        },
        changeTheme() {
            document.getElementById('htmlAI').setAttribute('data-theme', this.theme);
        },
        async handleLocalStorageChange() {
            const state_data = this.ls_getData();

            // check theme
            if (state_data && state_data.config) {
                if (typeof state_data.config.theme !== this.theme) {
                    await this.$store.commit('config/setTheme', state_data.config.theme);
                    this.changeTheme();
                }
            }
            
            // try handle logout
            // console.log(state_data);
            // console.log(this.$route.matched[0].meta.requiresAuth);
            // console.log(this.$route.name);

            // if (state_data.auth && state_data.auth.token && state_data.auth.token !== null && state_data.auth.token.access_token) {
            // // //     // if (this.$route.matched[0].meta.requiresAuth === undefined)
            // // //     //     // this.$router.push('/');
            // // //     //     this.$router.push({ name: 'GraphPage' });
            // //     console.log('harusnya ke dashboard')
            //     if (this.$route.name === 'LoginPage')
            //         Event.$emit('logout');


            // // //     // this.$route.matched[0].meta.requiresAuth
            // } else if (state_data.auth && state_data.auth.token && state_data.auth.token === null) {
            // // //     // if (this.$route.matched[0].meta.requiresAuth === true)
            // // //     // if (this.$route.name !== 'LoginPage')
            // // //     //     // this.$router.push('/login');
            // // //     //     this.$router.push({ name: 'LoginPage' });

            // //     console.log('harusnya logout')
            // }

        },
    },
    created() {
        Event.$on('showLoading', (status=true) => {
            this.showLoading(status);
        });

        Event.$on('success', (message=null, timer=null) => {
            this.success(message, timer);
        });

        Event.$on('error', (message=null, data=null, title=null) => {
            this.error(message, data, title);
        });

        Event.$on('warning', (message=null, data=null) => {
            this.warning(message, data);
        });

        this.changeTheme();
        this.ls_attachListener(this.handleLocalStorageChange);
    },
};
</script>

<style lang="sass">
    .small-heading
        // @apply .text-xs .uppercase .font-bold .mb-4
        letter-spacing: 0.05em

    .save_loading
        width: 140px
        height: 140px
        margin: 0 auto
        animation-duration: 0.5s
        animation-timing-function: linear
        animation-iteration-count: infinite
        animation-name: loadingSweetalert2
        transform-origin: 50% 50%

    @keyframes loadingSweetalert2
        100%
            transform: rotate(-360deg) translate(0,0)

    .tooltip
        display: block !important
        z-index: 10000

        .tooltip-inner
            max-width: 300px
            text-align: center
            // background: black
            background-color: rgba(0, 0, 0, 0.8)
            color: white
            // border-radius: 16px
            border-radius: 5px
            // padding: 5px 10px 4px
            padding: 10px

        .tooltip-arrow
            width: 0
            height: 0
            border-style: solid
            position: absolute
            margin: 5px
            border-color: black
            z-index: 1

        &[x-placement^="top"]
            margin-bottom: 5px

        .tooltip-arrow
            border-width: 5px 5px 0 5px
            border-left-color: transparent !important
            border-right-color: transparent !important
            border-bottom-color: transparent !important
            bottom: -5px
            left: calc(50% - 5px)
            margin-top: 0
            margin-bottom: 0

        &[x-placement^="bottom"]
            margin-top: 5px

        .tooltip-arrow
            border-width: 0 5px 5px 5px
            border-left-color: transparent !important
            border-right-color: transparent !important
            border-top-color: transparent !important
            top: -5px
            left: calc(50% - 5px)
            margin-top: 0
            margin-bottom: 0

        &[x-placement^="right"]
            margin-left: 5px

        .tooltip-arrow
            border-width: 5px 5px 5px 0
            border-left-color: transparent !important
            border-top-color: transparent !important
            border-bottom-color: transparent !important
            left: -5px
            top: calc(50% - 5px)
            margin-left: 0
            margin-right: 0

        &[x-placement^="left"]
            margin-right: 5px

        .tooltip-arrow
            border-width: 5px 0 5px 5px
            border-top-color: transparent !important
            border-right-color: transparent !important
            border-bottom-color: transparent !important
            right: -5px
            top: calc(50% - 5px)
            margin-left: 0
            margin-right: 0

        &[aria-hidden='true']
            visibility: hidden
            opacity: 0
            transition: opacity .15s, visibility .15s

        &[aria-hidden='false']
            visibility: visible
            opacity: 1
            transition: opacity .15s

    .popup-layer--session
        // z-index: 999999 !important
        z-index: 1059 !important

    .container-alert
        border: 1px solid #a0aec0
        border-radius: 4px
        background-color: #f7fafc
        &__list
            border-bottom: 1px solid #a0aec0
            border-radius: 4px
            text-align: left
            font-size: 16px
            line-height: 24px
            padding: 1rem
            &:last-child
                margin-bottom: 0px
                border-bottom: 0px
</style>
