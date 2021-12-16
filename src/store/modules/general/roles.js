import axios from "@/axios-main";
import axiosOrigin from "axios";

let cancelList;
var cancelToken = axiosOrigin.CancelToken;

const roles = {
  namespaced: true,
  state: {
    // load data roles
    status_list: {
      status: false,
      cancel: null,
      code: null,
    },
    status_detail: false,

    // roles
    list: {},
    detail: {},
  },
  mutations: {
    // load data roles
    setStatusList: (state, status) => {
      state.status_list = status;
    },
    setStatusDetail: (state, status) => {
      state.status_detail = status;
    },

    // roles
    setList: (state, data) => {
      state.list = data;
    },
    setDetail: (state, data) => {
      state.detail = data;
    },
  },
  getters: {},
  actions: {
    async getList({ state, commit, dispatch }, [limit='', page='', keyword='']) {

      if (state.status_list.cancel !== null && state.status_list.status === 'loading')
        await state.status_list.cancel('Operation canceled by the user.');

      let params = {
        limit: limit,
        page: page,
        keyword: keyword,
      };
    
      await axios.get('bff/roles', {
        params: params,
        cancelToken: new cancelToken(function executor(c) {
          cancelList = c;
          commit('setStatusList', {
            status: 'loading',
            cancel: c,
            code: null,
          });
        }),
      })
      .then((resp) => {
        // console.log(resp.data)
        let data = resp.data.data;
        let result = {
          status: true,
          cancel: null,
          code: resp.response && resp.response.status ? resp.response.status : null,
        };

        commit('setList', data);

        if (Object.keys(data).length===0)
          result.status = 'empty';

        commit('setStatusList', result);
      })
      .catch((resp) => {
        // console.log(resp)
        let result = {
          status: 'failed',
          cancel: null,
          code: resp.response && resp.response.status ? resp.response.status : null,
        };

        if (axiosOrigin.isCancel(resp)) {
          result.status = 'loading';
          result.cancel = cancelList;
        }

        commit('setStatusList', result);
        if (!axiosOrigin.isCancel(resp))
        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], { root: true });
      });
    },

    getDetail({ commit, dispatch }, id) {

      return axios.get('bff/roles/detail/'+id)
      .then((resp) => {
        // console.log(resp.data)
        let data = resp.data.data;
        commit('setDetail', data);
        return 'success';
      })
      .catch((resp) => {
        // console.log(resp)
        dispatch('errors/handleApiResponse', (resp.response && resp.response.status ? resp.response.status : null), { root: true });
        return 'failed';
      });
    },

    // create({ commit, dispatch }, [name='', label='', status='', description='']) {
    create({ commit, dispatch }, [name='', label='', description='']) {

      let params = new FormData();
      params.append('name', name);
      params.append('label', label);
      // params.append('status', status);
      params.append('description', description);

      return axios.post('bff/roles/store', params)
      .then((resp) => {

        if (resp.status === 200 && resp.data.message.toLowerCase() === 'success') {
          return {result: 'success', data: resp.data};
        } else {
          return {result: 'failed', data: resp.data};
        }
      })
      .catch((resp) => {
        // console.log(resp)
        dispatch('errors/handleApiResponse', (resp.response && resp.response.status ? resp.response.status : null), { root: true });
        return {result: 'failed', data: (resp.response && resp.response.data ? resp.response.data : null)};
      });
    },

    // update({ commit, dispatch }, [id, name='', label='', status='', description='']) {
    update({ commit, dispatch }, [id, name='', label='', description='']) {

      let params = new FormData();
      params.append('id', id);
      params.append('name', name);
      params.append('label', label);
      // params.append('status', status);
      params.append('description', description);
    
      return axios.post('bff/roles/edit', params)
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
        dispatch('errors/handleApiResponse', (resp.response && resp.response.status ? resp.response.status : null), { root: true });
        return {result: 'failed', data: (resp.response && resp.response.data ? resp.response.data : null)};
      });
    },

    delete({ commit, dispatch }, id) {

      // let params = new FormData();
      // params.append('id', id);

      // return axios.post('bff/roles/destroy/'+id, params)
      return axios.post('bff/roles/destroy/'+id)
      .then((resp) => {
        // console.log(resp)
        
        if (resp.status === 200 && resp.data.message.toLowerCase() === 'success') {
          return 'success';
        } else {
          return 'failed';
        }
      })
      .catch((resp) => {
        // console.log(resp)
        dispatch('errors/handleApiResponse', (resp.response && resp.response.status ? resp.response.status : null), { root: true });
        return {result: 'failed', data: (resp.response && resp.response.data ? resp.response.data : null)};
      });

    },
  }
};

export default roles;
