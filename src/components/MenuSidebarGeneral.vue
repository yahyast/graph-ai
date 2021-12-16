<template lang="pug">
    .block.block-area 
        .px-4.py-2
            .box-theme
                button.box-theme__item(@click="toggleTheme('light')" v-bind:class="{'mode-active' : theme === 'light'}") Mode Terang
                button.box-theme__item(@click="toggleTheme('dark')" v-bind:class="{'mode-active' : theme === 'dark'}") Mode Gelap
                
        //- router-link.menu-item(to="/help")
            b-button(text="Bantuan" text_icon_left="info")
        //- router-link.menu-item(to="/notification")
            b-button(text="Notifikasi" text_icon_left="bell")
        router-link.menu-item(to="/profile")
            b-button(text="Profil" text_icon_left="user")
        router-link.menu-item(to="/cases")
            b-button(text="Kasus" text_icon_left="tag")

        //- router-link.menu-item(to="/roles")
            b-button(text="Pengaturan" text_icon_left="settings")
        button.menu-item(@click="logout()")
            b-button(text="Logout" text_icon_left="log-out")
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            // theme: 'light'
        }
    },
    computed: {
        ...mapState('config', [
            'theme',
        ]),
    },
    methods: {
        async toggleTheme(theme) {
            // this.theme = theme;
            await this.$store.commit('config/setTheme', theme);
            this.changeTheme();
        },
        changeTheme() {
            document.getElementById('htmlAI').setAttribute('data-theme', this.theme);
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
                    Event.$emit('error');

                    // this.$swal.fire({
                    //     title: 'Failed logout!',
                    //     icon: 'error',
                    //     text: (resp.data && resp.data.message ? resp.data.message : 'Something wrong.'),
                    //     // timer: 3000,
                    // });
                }
            });
        },

        
        
    },
    mounted() {
        // this.changeTheme();

        Event.$on('logout', () => {
            this.logout();
        });
    },
    
}
</script>

<style lang="sass">
    .box-theme
        background-color: var(--bg-sidebar)
        border-color: var(--color-primary-500)
        @apply grid grid-cols-2 p-1 rounded border
        &__item
            @apply text-center p-2 rounded text-xs font-bold
            &.mode-active
                background-color: var(--color-primary-500)
                color: #fff
</style>

