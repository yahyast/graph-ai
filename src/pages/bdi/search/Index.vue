<template lang="pug">
    section
        template(v-if="isError")
            .bdi-global-search--loading
                .block
                    //- b-loading(text="Gagal")
                    b-icon.mb-2(name="x-circle" size="2x")
                    h2.text-center.text-xl.font-bold Gagal
                    .text-center {{ errorTitle }}
        template(v-else-if="!loadedGlobalBDI")
            .bdi-global-search--loading
                b-loading(kind="circular" :text="loadingTitle")
        template(v-else)
            //- header page
            HeaderPage(:title="titlePage")

            .grid.grid-cols-3.gap-6
                .based-bdi
                    h2.text-xl.font-bold.mb-6 Berdasarkan Tokoh
                    template(v-if="find_suggestion.figures && find_suggestion.figures.length == 0")
                        .block
                            p.mb-3 <strong>{{ this.route_query.param }} </strong> tidak ditemukan
                            routerLink(:to="'/tokoh/create/form/profile?name='+this.route_query.param")
                                b-button(text_icon_left="plus" text="Tambahkan sebagai tokoh" kind="primary")
                    template(v-else)
                        ul
                            li(v-for="item in find_suggestion.figures")
                                //- routerLink(:to="item.url"): b-button(kind="secondary" :text="item.name")
                                routerLink(:to="'/tokoh/'+item.id+'/detail/profil'") {{ item.name }}
                .based-bdi
                    h2.text-xl.font-bold.mb-6 Berdasarkan Organisasi
                    template(v-if="find_suggestion.organisations && find_suggestion.organisations.length == 0")
                        .block
                            p.mb-3 <strong>{{ this.route_query.param }} </strong> tidak ditemukan
                            routerLink(:to="'/organisasi/create/form/profile?name='+this.route_query.param")
                                b-button(text_icon_left="plus" text="Tambahkan sebagai organisasi" kind="primary")
                    template(v-else)
                        ul
                            li(v-for="item in find_suggestion.organisations ")
                                //- routerLink(:to="item.id"): b-button(kind="secondary" :text="item.name")
                                routerLink(:to="'/organisasi/'+item.id+'/detail/profil'") {{ item.name }}

                .based-bdi
                    h2.text-xl.font-bold.mb-6 Berdasarkan Isu
                    template(v-if="find_suggestion.issues && find_suggestion.issues.length == 0")
                        .block
                            p.mb-3 <strong>{{ this.route_query.param }} </strong> tidak ditemukan
                            routerLink(:to="'/isu/create/form/profil?title='+this.route_query.param")
                                b-button(text_icon_left="plus" text="Tambahkan sebagai isu" kind="primary")
                    template(v-else)
                        ul
                            li(v-for="item in find_suggestion.issues ")
                                //- routerLink(:to="item.id"): b-button(kind="secondary" :text="item.name")
                                routerLink(:to="'/isu/'+item.id+'/detail/profil'") {{ item.name }}

</template>

<script>
import HeaderPage from '@/components/sections/HeaderPage';
import {mapState} from 'vuex';

export default {
    name: 'BdiSearch',
    components: {
        HeaderPage,
    },
    data() {
        return {
            loadedGlobalBDI: false,
            loadingTitle: 'Proses Authentication',
            isError: false,
            errorTitle: 'Parameter yang dikirim tidak sesuai',
        };
    },
    computed: {
        route_query() {
            return this.$route.query;
        },
        titlePage() {
            return 'Hasil pencarian '+ this.route_query.param+'';
        },
        ...mapState('issue', [
            'status_find_suggestion',
            'find_suggestion',
        ]),
    },
    methods: {
        async login() {
            let auth = this.route_query.token;
            auth = this.decodeBase64(auth);
            let result = null;
            await this.$store.dispatch('auth/login', this.splitStr(auth, ':') )
                .then((resp) => {
                    result = resp;
                });
            if (result !=null && result.result === 'success') {
                await this.$store.dispatch('auth/getProfile');
                // lanjut search BDI
                this.getBDI();
            } else {
                console.log('error login');
                this.isError = true;
                this.errorTitle = result.data.message;
                Event.$emit('error', result.data.message);
                // this.$router.push('/');
            }
        },
        getBDI() {
            const query = this.route_query.param;
            this.loadingTitle='Sedang mencari '+ query + ' di Tokoh, Organisasi, dan Isu';
            this.$store.dispatch('issue/getFindSuggestion', [query])
                .then((resp) => {
                    this.loadedGlobalBDI = true;
                });
        },

    },
    mounted() {
        // start: flow 1 harus login
        if (this.route_query.token !== undefined) {
            this.login();
        } else {
            this.isError = true;
            Event.$emit('error', 'Parameter yang dikirim tidak sesuai');
        }
        // end: flow 1 harus login
        // start: flow 2 cek login / blm
        // let errorLS = false;
        // let stateData = null;
        // try {
        //     stateData = this.ls_getData();
        // } catch (error) {
        //     errorLS = true;
        // }
        // if (!errorLS && (stateData && stateData.auth && stateData.auth.token) ) {
        //     const param = this.route_query.param;
        //     if (param !== undefined) {
        //         // search BDI method
        //         this.getBDI();
        //     } else {
        //         this.isError = true;

        //         Event.$emit('error', 'Parameter yang dikirim tidak sesuai');
        //     }
        // } else {
        //     console.log(this.route_query.token !== undefined);
        //     if (this.route_query.token !== undefined) {
        //         this.login();
        //     } else {
        //         this.isError = true;
        //         Event.$emit('error', 'Parameter yang dikirim tidak sesuai');
        //     }
        // }
        // end: flow 2 cek login / blm
    },
};
</script>

<style lang="sass">
    .bdi-global-search--loading
        @apply w-screen h-screen flex items-center justify-center absolute inset-0
        z-index: 9999
        background-color: var(--bg-theme)

        .b-loading .circular
            width: 48px
            height: 48px
            margin-bottom: 1rem

    .based-bdi
        @apply p-8 rounded
        background-color: var(--bg-card)
        h2
            @apply mb-6
        ul
            li
                @apply w-full mb-4
                a
                    color: var(--text-link)
                    &:hover
                        text-decoration: underline
    .swal2-container
        z-index: 10000
</style>
