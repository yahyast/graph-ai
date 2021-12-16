import Vue from 'vue';
import App from './MainApp.vue';
import router from './router/index';
import AppLayout from './layouts/AppLayout.vue';
import BlankLayout from './layouts/BlankLayout.vue';
import GraphLayout from './layouts/GraphLayout.vue';
// import {InlineSvgPlugin} from 'vue-inline-svg';
import BambooLibrary from 'bamboo-library';
// highcart
import HighchartsVue from 'highcharts-vue';
import More from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';

import VueLazyLoad from 'vue-lazyload';
import 'vue-image-lightbox/dist/vue-image-lightbox.min.css';

// vis.js
import {Network} from 'vue-vis-network';
import 'vue-vis-network/node_modules/vis-network/dist/vis-network.css';
import store from './store';
import axios from './axios-main';
import {axiosGraphql} from './axios-main';
// import apolloProvider from './apollo';
import Vuelidate from 'vuelidate';
import VueSweetalert2 from 'vue-sweetalert2';
import wysiwyg from 'vue-wysiwyg';

import './assets/sass/_tailwind-config.sass';
import './assets/sass/app.sass';
import './assets/sass/app.css';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

// tooltip
import VTooltip from 'v-tooltip';
import helpersMixin from '@/util/mixins/helpers';

Vue.config.productionTip = false;

More(Highcharts);
Vue.component('network', Network);
Vue.component('app-layout', AppLayout);
Vue.component('blank-layout', BlankLayout);
Vue.component('graph-layout', GraphLayout);
// Vue.component('multiselect', Multiselect);

// Vue.use(InlineSvgPlugin)
Vue.use(BambooLibrary);
Vue.use(HighchartsVue);
Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
Vue.use(VueLazyLoad, {
    error: store.getters['config/getDefaultImage'],
});
Vue.use(wysiwyg, {
    maxHeight: '1000px',
}); // config is optional. more below
Vue.use(VTooltip);

Vue.mixin(helpersMixin);

window.Event = new Vue();

router.beforeEach((to, from, next) => {
    // console.log('router.beforeEach()')
    // console.log(store.state.auth)

    if (store.state.auth.token && store.state.auth.token !== null && store.state.auth.token.access_token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token.access_token;
        axiosGraphql.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token.access_token;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        axiosGraphql.defaults.headers.common['Authorization'] = null;
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.state.auth.token === null) {
            next({
                path: '/login',
                // params: { nextUrl: to.fullPath }
            });
        } else {
            if (store.state.auth.token && store.state.auth.token.access_token) {
                next();
            } else {
                store.state.auth.token = null;
                next({
                    path: '/login',
                });
            }
        }
    } else {
        if (store.state.auth.token !== null && (to.name === 'LoginPage' || to.name === 'ForgotPasswordPage')) {
            next({
                path: '/',
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    store,
    // apolloProvider,
    render: (h) => h(App),
}).$mount('#app');
