import axios from "@/axios-main";
import axiosOrigin from "axios";

let cancelList;
var cancelToken = axiosOrigin.CancelToken;

const cases = {
  namespaced: true,
  state: {
    // load data case
    status_list: {
      status: false,
      cancel: null,
      code: null,
    },
    status_detail: false,

    // case
    list: {},
    detail: {},
  },
  mutations: {
    // load data case
    setStatusList: (state, status) => {
      state.status_list = status;
    },
    setStatusDetail: (state, status) => {
      state.status_detail = status;
    },

    // case
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
    
      await axios.get('case/fetch', {
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
        dispatch('errors/handleApiResponse', [result.code, (resp.response && resp.response.data && resp.response.data.message ? resp.response.data.message : null)], { root: true });
      });
    },

    getDetail({ commit, dispatch }, id) {

      // let params = new FormData();
      // params.append('id', id);
    
      // return axios.post('case/detail/', params)
      return axios.get('case/detail/'+id,)
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
    create({ commit, dispatch, rootState }, [name='', gatra='', start_date='', end_date='', description='']) {

      let params = new FormData();
      params.append('name', name);
      params.append('gatra', gatra);
      // params.append('start_date', start_date);
      // params.append('end_date', end_date);
      params.append('description', description);
      
      params.append('created_by', rootState.auth.profile.name);
      params.append('updated_by', rootState.auth.profile.name);

      return axios.post('case/create', params)
      .then((resp) => {

        // if (resp.status === 200 && resp.data.message.toLowerCase() === 'success') {
        if (resp.status === 200) {
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
    update({ commit, dispatch, rootState }, [id, name='', gatra='', start_date='', end_date='', description='']) {

      let params = new FormData();
      // params.append('id', id);
      params.append('name', name);
      params.append('gatra', gatra);
      // params.append('start_date', start_date);
      // params.append('end_date', end_date);
      params.append('description', description);
      
      params.append('updated_by', rootState.auth.profile.name);
    
      return axios.put('case/update/'+id, params)
      .then((resp) => {
        // console.log(resp.data)
        
        // if (resp.status === 200 && resp.data.message.toLowerCase() === 'success') {
        if (resp.status === 200) {
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

      return axios.delete('case/delete/'+id)
      .then((resp) => {
        // console.log(resp)
        
        // if (resp.status === 200 && resp.data.message.toLowerCase() === 'success') {
        if (resp.status === 200) {
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

export default cases;
