import axios from "@/axios-main";
import { axiosGraphql } from "@/axios-main";
// import config from "@/config/api";
// import router from "@/router";

const auth = {
  namespaced: true,
  state: {
    token: null,
    user: null,
    profile: {},
  },
  mutations: {
    authUser(state, userData) {
      if (userData.data) {
        state.user = userData.data;
      }
    },
    setToken(state, token) {
      if (token.access_token) {
        // token.access_token = token.access_token +'aoipsjdoaud999999999eheheh';

        state.token = token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token.access_token;
        axiosGraphql.defaults.headers.common["Authorization"] = "Bearer " + token.access_token;
      }
    },
    // storeUser(state, user) {
    //   state.userInfo = user;
    // },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      axios.defaults.headers.common["Authorization"] = null;
      axiosGraphql.defaults.headers.common["Authorization"] = null ;
    },
    setProfile(state, data) {
      state.profile = data;
    },
  },
  getters: {
    isAuthenticated(state) {
      if (!state.token) return false;
      return true;
    },
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    }
  },
  actions: {
    // setLogoutTimer({ dispatch }, expiresIn) {
    //   setTimeout(() => {
    //     dispatch("logout");
    //   }, expiresIn * 1000);
    // },
    // tryAutoLogin({ commit, dispatch }) {
    //   if (!localStorage.getItem("token")) {
    //     return false;
    //   }
    //   if (new Date() >= localStorage.getItem("expiresDate")) {
    //     return false;
    //   }

    //   commit("authUser", {
    //     token: localStorage.getItem("token")
    //   });
    //   return !!dispatch("fetchUser");
    // },

    async login({ commit, dispatch }, [email, password]) {

      // console.log('on auth -> login')
      axios.defaults.headers.common["Origin-Request"] = 'graph';

      let params = new FormData();

      params.append('email', email);
      params.append('password', password);

      return axios.post('bff/auth/login', params)
      .then((resp) => {
        // console.log(resp.data)
        
        axios.defaults.headers.common["Origin-Request"] = null;

        if (resp.data && resp.data.data && resp.data.data.access_token) {
          // commit('authUser', resp.data);
          commit('setToken', resp.data.data);

          return {result: 'success', data: resp.data};
          
        } else {

          return {result: 'failed', data: resp.data};
        }
      })
      .catch((resp) => {
        // console.log(resp)
        axios.defaults.headers.common["Origin-Request"] = null;
        return {result: 'failed', data: (resp.response && resp.response.data ? resp.response.data : null)};
      });
    },

    logout({ commit, dispatch }) {

      return axios.post('bff/auth/logout')
      .then((resp) => {
        // console.log(resp)
        if (resp.status === 200) {
          
          // commit('setDownloadApp', {});
          commit("clearAuth");

          return {result: 'success', data: resp.data};
        } else {
          return {result: 'failed', data: resp.data};
        }
      })
      .catch((resp) => {
        // console.log(resp)
        dispatch('errors/handleApiResponse', [(resp.response && resp.response.status ? resp.response.status : null)], { root: true });

        return {result: 'failed', data: (resp.response && resp.response.data ? resp.response.data : null)};
      });

      // router.push({ name: 'LoginPage' });
    },

    // getProfile({ commit, dispatch }, [id]) {
    getProfile({ commit, dispatch, getters }) {

      return axios.get('bff/auth/user/profile')
      .then((resp) => {
        // console.log(resp.data)
        let data = resp.data;
        // update local storage
        // commit('authUser', { user: data.data });
        commit('authUser', data.data );
        commit('setProfile', data.data);
        return 'success';
      })
      .catch((resp) => {
        // console.log(resp)
        dispatch('errors/handleApiResponse', [(resp.response && resp.response.status ? resp.response.status : null)], { root: true });
        return 'failed';
      });
    },

    // updateProfile({ commit, dispatch, getters }, [name='', username='', email='', password='', repeat_password='']) {
    updateProfile({ commit, dispatch, getters }, [name='', password='', repeat_password='']) {

      let params = new FormData();
      params.append('name', name);
      // params.append('username', username);
      // params.append('email', email);
      // params.append('role_id', getters.getUser.role.id);
      params.append('password', password);
      params.append('repeat_password', repeat_password);

      return axios.put('bff/auth/user/update', params)
      .then((resp) => {
        // console.log(resp.data)        
        if (resp.status === 200 && resp.data.message.toLowerCase() === 'success') {
          return {result: 'success', data: resp.data};
        } else {
          return {result: 'failed', data: resp.data};
        }
      })
      .catch((resp) => {
        // console.log(resp)
        dispatch('errors/handleApiResponse', [(resp.response && resp.response.status ? resp.response.status : null)], { root: true });

        return {result: 'failed', data: (resp.response && resp.response.data ? resp.response.data : null)};
      });
    },
  },
};

export default auth;
