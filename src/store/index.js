import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

import config from './modules/config';
import auth from './modules/auth';
import errors from './modules/errors';
// import dashboard from "./modules/dashboard";
// import clients from "./modules/clients";
// import modules from "./modules/modules";
// import functions from "./modules/functions";

import cases from './modules/general/cases';

import roles from './modules/general/roles';
import users from './modules/general/users';
// import acl from "./modules/acl";

import graph from './modules/graph';

import topics from './modules/topics';

import organization from './modules/bdi/organization';
import actor from './modules/bdi/actor';
import issue from './modules/bdi/issue';
import photo from './modules/bdi/photo';
import trend from './modules/trend';
import news from './modules/news';
import medsos from './modules/medsos';

Vue.use(Vuex);

const ls = new SecureLS({isCompression: false});

export default new Vuex.Store({
    state: {
        isIdle: false,
    },
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        config,
        auth,
        errors,
        // dashboard,
        // clients,
        // modules,
        // functions,
        cases,
        roles,
        users,
        // acl,

        graph,
        topics,
        organization,
        actor,
        issue,
        photo,
        trend,
        news,
        medsos,
    },
    plugins: [createPersistedState({
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        },
        paths: [
            'auth',
            'config.theme',
        ],
    })],
});
