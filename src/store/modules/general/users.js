import axios from "@/axios-main";
import axiosOrigin from "axios";

let cancelList, cancelLogActivity, cancelTacticalList;
var cancelToken = axiosOrigin.CancelToken;

const users = {
  namespaced: true,
  state: {
    // load data users
    status_list: {
      status: false,
      cancel: null,
      code: null,
    },
    status_detail: false,
    // status_log_activity: {
    //   status: false,
    //   cancel: null,
    //   code: null,
    // },
    // status_log_activity_chart: false,

    // load data users tactical
    // status_tactical_list: {
    //   status: false,
    //   cancel: null,
    //   code: null,
    // },

    // users
    list: {},
    detail: {},
    // log_activity: {},
    // log_activity_chart: {},

    // users tactical
    // tactical_list: {},
  },
  mutations: {
    // load data users
    setStatusList: (state, status) => {
      state.status_list = status;
    },
    setStatusDetail: (state, status) => {
      state.status_detail = status;
    },
    // setStatusLogActivity: (state, status) => {
    //   state.status_log_activity = status;
    // },
    
    // setStatusLogActivityChart: (state, status) => {
    //   state.status_log_activity_chart = status;
    // },

    // load data users tactical
    // setStatusTacticalList: (state, status) => {
    //   state.status_tactical_list = status;
    // },

    // users
    setList: (state, data) => {
      state.list = data;
    },
    setDetail: (state, data) => {
      state.detail = data;
    },
    // setLogActivity: (state, data) => {
    //   state.log_activity = data;
    // },
    // setLogActivityChart: (state, data) => {
    //   state.log_activity_chart = data;
    // },

    // // users tactical
    // setTacticalList: (state, data) => {
    //   state.tactical_list = data;
    // },
  },
  getters: {},
  actions: {
    async getList({ state, commit, dispatch }, [limit='', page='', role_id="", keyword='']) {

      if (state.status_list.cancel !== null && state.status_list.status === 'loading')
        await state.status_list.cancel('Operation canceled by the user.');

      let params = {
        limit: limit,
        page: page,
        role_id: role_id,
        // keyword: keyword,
        search: keyword,
        dir: 'desc',
      };
    
      axios.get('bff/auth/user/fetch', {
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

      return axios.get('bff/auth/user/detail/'+id)
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

    create({ commit, dispatch }, [name='', username='', email='', role_id='', assign_to_case='', upline_id='', password='', repeat_password='']) {

      let params = new FormData();
      params.append('name', name);
      params.append('username', username);
      params.append('email', email);
      params.append('role_id', role_id);
      params.append('assign_to_case', assign_to_case);
      params.append('upline_id', upline_id);
      // params.append('status', status);
      params.append('password', password);
      params.append('repeat_password', repeat_password);

      return axios.post('bff/auth/user', params)
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

    update({ commit, dispatch }, [id, name='', username='', email='', role_id='', assign_to_case='', upline_id='', password='', repeat_password='']) {

      let params = new FormData();
      params.append('id', id);
      params.append('name', name);
      params.append('username', username);
      params.append('email', email);
      params.append('role_id', role_id);
      params.append('assign_to_case', assign_to_case);
      params.append('upline_id', upline_id);
      // params.append('status', status);
      params.append('password', password);
      params.append('repeat_password', repeat_password);

      // let params = {
      //   id: id,
      //   name: name,
      //   username: username,
      //   email: email,
      //   // status: status,
      //   role_id: role_id,
      //   password: password,
      //   repeat_password: repeat_password,
      // };
    
      return axios.put('bff/auth/user', params)
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

      // return axios.post('api/v1/user/delete', params)
      return axios.delete('bff/auth/user/'+id)
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

export default users;
