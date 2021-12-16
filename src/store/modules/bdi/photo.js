import axios from "@/axios-main";
import axiosOrigin from "axios";

var cancelToken = axiosOrigin.CancelToken;
let cancelListPhoto, cancelListAlbum;

const issue = {
  namespaced: true,
  state: {
    status_list_photo: {
      status: false,
      cancel: null,
      code: null,
    },
    status_list_album: {
      status: false,
      cancel: null,
      code: null,
    },
    status_detail_album: false,

    list_photo: {},
    list_album: {},
    detail_album: {},
  },
  mutations: {
    setStatusListPhoto: (state, status) => {
      state.status_list_photo = status;
    },
    setStatusListAlbum: (state, status) => {
      state.status_list_album = status;
    },
    setStatusDetailAlbum: (state, status) => {
      state.status_detail_album = status;
    },

    setListPhoto: (state, data) => {
      state.list_photo = data;
    },
    setListAlbum: (state, data) => {
      state.list_album = data;
    },
    setDetailAlbum: (state, data) => {
      state.detail_album = data;
    },
  },
  getters: {},
  actions: {
    async getListPhoto({ state, commit, dispatch }, [limit=9, page=1, keyword='']) {

      if (state.status_list_photo.cancel !== null && state.status_list_photo.status === 'loading')
        await state.status_list_photo.cancel('Operation canceled by the user.');

      let params = {
        limit: limit,
        // offset: page,
        page: page,
        // search: keyword,
      };

      await axios.get('upload-image/image/list', {
        params: params,
        cancelToken: new cancelToken(function executor(c) {
          cancelListPhoto = c;
          commit('setStatusListPhoto', {
            status: 'loading',
            cancel: c,
            code: null,
          });
        }),
      })
      .then((resp) => {
        // console.log(resp.data.data)
        let data = resp.data.data;
        let result = {
          status: true,
          cancel: null,
          code: resp.response && resp.response.status ? resp.response.status : null,
        };

        commit('setListPhoto', data);

        if (Object.keys(data).length===0)
          result.status = 'empty';

        commit('setStatusListPhoto', result);
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
          result.cancel = cancelListPhoto;
        }

        commit('setStatusListPhoto', result);
        if (!axiosOrigin.isCancel(resp))
          dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], { root: true });
      });
    },

    deletePhoto({ commit, dispatch }, id) {

      return axios.delete('upload-image/image/delete/'+ id)
      .then((resp) => {
        // console.log(resp);
        // if (resp.status === 200 && resp.data && resp.data.data && Object.keys(resp.data.data).length > 0) {
        if (resp.status === 200) {
          return 'success';
        } else {
          return 'failed';
        }
      })
      .catch((resp) => {
        // console.log(resp)
        let result = {
          status: 'failed',
          code: (resp.response && resp.response.status ? resp.response.status : null),
          message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
          data: (resp.response && resp.response.data ? resp.response.data : null),
        };

        dispatch('errors/handleApiResponse', [result.code, result.message], { root: true });

        return {
          result: result.status,
          data: result.data,
        };
      });
    },

    async getListAlbum({ state, commit, dispatch }, [limit=9, page=1, keyword='']) {

      if (state.status_list_album.cancel !== null && state.status_list_album.status === 'loading')
        await state.status_list_album.cancel('Operation canceled by the user.');

      let params = {
        limit: limit,
        // offset: page,
        page: page,
        // search: keyword,
      };

      await axios.get('upload-image/album/list', {
        params: params,
        cancelToken: new cancelToken(function executor(c) {
          cancelListAlbum = c;
          commit('setStatusListAlbum', {
            status: 'loading',
            cancel: c,
            code: null,
          });
        }),
      })
      .then((resp) => {
        // console.log(resp.data.data)
        let data = resp.data.data;
        let result = {
          status: true,
          cancel: null,
          code: resp.response && resp.response.status ? resp.response.status : null,
        };

        commit('setListAlbum', data);

        if (Object.keys(data).length===0)
          result.status = 'empty';

        commit('setStatusListAlbum', result);
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
          result.cancel = cancelListAlbum;
        }

        commit('setStatusListAlbum', result);
        if (!axiosOrigin.isCancel(resp))
          dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], { root: true });
      });
    },

    getDetailAlbum({ commit, dispatch }, id) {

      commit('setStatusDetailAlbum', 'loading');
    
      return axios.get('upload-image/album/detail/' + id)
      .then((resp) => {
        // console.log(resp.data)
        let data = resp.data.data;
        commit('setStatusDetailAlbum', true);
        commit('setDetailAlbum', data);
        return 'success';
      })
      .catch((resp) => {
        // console.log(resp)
        // dispatch('errors/handleApiResponse', (resp.response && resp.response.status ? resp.response.status : null), { root: true });

        let result = {
          // status: 'failed',
          code: (resp.response && resp.response.status ? resp.response.status : null),
          message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
          // data: (resp.response && resp.response.data ? resp.response.data : null),
        };
        commit('setStatusDetailAlbum', 'failed');
        dispatch('errors/handleApiResponse', [result.code, result.message], { root: true });
        return 'failed';
      });
    },

    async createAlbum({ commit, dispatch, rootState }, data) {

      data.created_by = rootState.auth.profile.name;
      data.updated_by = rootState.auth.profile.name;

      let params = new FormData();

      for(var index in data) { 
        // console.log(index, data[index]);

        // if (index === 'image' || index === 'images') {
        if (index === 'images' && data[index].length > 0) {
          // if (data[index] !== null && data[index] !== '')
          //   params.append(index, data[index]);

          for (var i = 0; i < data[index].length; i++) {
            params.append(index, data[index][i]);
            // data[index][i]
          }

        } else {

          params.append(index, data[index]);
        }
      }

      return axios.post('upload-image/album/create', params, {
        // headers: {
        //   // 'Content-Type': 'application/json',
        //   'Content-Type': 'multipart/form-data',
        // }
      })
      .then((resp) => {
        // console.log(resp);
        if (resp.status === 200 && resp.data && resp.data.data && Object.keys(resp.data.data).length > 0) {
        // if (resp.status === 200) {
          return {result: 'success', data: resp.data.data};
        } else {
          return {result: 'failed', data: resp.data};
        }
      })
      .catch((resp) => {
        // console.log(resp)
        let result = {
          status: 'failed',
          code: (resp.response && resp.response.status ? resp.response.status : null),
          message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
          data: (resp.response && resp.response.data ? resp.response.data : null),
        };

        dispatch('errors/handleApiResponse', [result.code, result.message], { root: true });

        return {
          result: result.status,
          data: result.data,
        };
      });
    },

    async updateAlbum({ commit, dispatch, rootState }, [id, data]) {

      data.updated_by = rootState.auth.profile.name;

      let params = new FormData();

      for(var index in data) { 
        // console.log(index, data[index]);

        // if (index === 'image' || index === 'images') {
        if (index === 'images' && data[index].length > 0) {
          // if (data[index] !== null && data[index] !== '')
          //   params.append(index, data[index]);

          for (var i = 0; i < data[index].length; i++) {
            params.append(index, data[index][i]);
            // data[index][i]
          }

        } else {

          params.append(index, data[index]);
        }
      }

      return axios.post('upload-image/album/update/'+ id, params, {
        // headers: {
        //   // 'Content-Type': 'application/json',
        //   'Content-Type': 'multipart/form-data',
        // }
      })
      .then((resp) => {
        // console.log(resp);
        if (resp.status === 200 && resp.data && resp.data.data && Object.keys(resp.data.data).length > 0) {
        // if (resp.status === 200) {
          return {result: 'success', data: resp.data.data};
        } else {
          return {result: 'failed', data: resp.data};
        }
      })
      .catch((resp) => {
        // console.log(resp)
        let result = {
          status: 'failed',
          code: (resp.response && resp.response.status ? resp.response.status : null),
          message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
          data: (resp.response && resp.response.data ? resp.response.data : null),
        };

        dispatch('errors/handleApiResponse', [result.code, result.message], { root: true });

        return {
          result: result.status,
          data: result.data,
        };
      });
    },

    deleteAlbum({ commit, dispatch }, id) {

      return axios.delete('upload-image/album/delete/'+ id)
      .then((resp) => {
        // console.log(resp);
        // if (resp.status === 200 && resp.data && resp.data.data && Object.keys(resp.data.data).length > 0) {
        if (resp.status === 200) {
          return 'success';
        } else {
          return 'failed';
        }
      })
      .catch((resp) => {
        // console.log(resp)
        let result = {
          status: 'failed',
          code: (resp.response && resp.response.status ? resp.response.status : null),
          message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
          data: (resp.response && resp.response.data ? resp.response.data : null),
        };

        dispatch('errors/handleApiResponse', [result.code, result.message], { root: true });

        return {
          result: result.status,
          data: result.data,
        };
      });
    },

    // async create({ commit, dispatch, rootState }, data) {

    //   data.created_by = rootState.auth.profile.name;
    //   data.updated_by = rootState.auth.profile.name;

    //   let params = new FormData();

    //   for(var index in data) { 
    //     // console.log(index, data[index]);

    //     if (index === 'image') {
    //       if (data[index] !== null && data[index] !== '')
    //         params.append(index, data[index]);

    //     } else {

    //       params.append(index, data[index]);
    //     }
    //   }

    //   // return axiosGraphql.post(null, {
    //   return axios.post('issue/api/create', params)
    //   .then((resp) => {
    //     console.log(resp);
    //     if (resp.status === 200 && resp.data && resp.data.data && Object.keys(resp.data.data).length > 0) {
    //     // if (resp.status === 200) {
    //       return {result: 'success', data: resp.data.data};
    //     } else {
    //       return {result: 'failed', data: resp.data};
    //     }
    //   })
    //   .catch((resp) => {
    //     // console.log(resp)
    //     let result = {
    //       status: 'failed',
    //       code: (resp.response && resp.response.status ? resp.response.status : null),
    //       message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
    //       data: (resp.response && resp.response.data ? resp.response.data : null),
    //     };

    //     dispatch('errors/handleApiResponse', [result.code, result.message], { root: true });

    //     return {
    //       result: result.status,
    //       data: result.data,
    //     };
    //   });
    // },

    // async update({ commit, dispatch, rootState }, [id, data]) {

    //   data.updated_by = rootState.auth.profile.name;

    //   let params = new FormData();
    //   // params.append(id, id);

    //   for(var index in data) { 
    //     console.log(index, data[index]);

    //     if (index === 'image') {
    //       if (data[index] !== null && data[index] !== '')
    //         params.append(index, data[index]);
          
    //     } else {

    //       params.append(index, data[index]);
    //     }
    //   }

    //   return axios.post('issue/api/update/'+ id, params)
    //   .then((resp) => {
    //     console.log(resp);
    //     // if (resp.status === 200 && resp.data && resp.data.data && Object.keys(resp.data.data).length > 0) {
    //     if (resp.status === 200) {
    //       return {result: 'success', data: resp.data};
    //     } else {
    //       return {result: 'failed', data: resp.data};
    //     }
    //   })
    //   .catch((resp) => {
    //     console.log(resp)
    //     let result = {
    //       status: 'failed',
    //       code: (resp.response && resp.response.status ? resp.response.status : null),
    //       message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
    //       data: (resp.response && resp.response.data ? resp.response.data : null),
    //     };

    //     dispatch('errors/handleApiResponse', [result.code, result.message], { root: true });

    //     return {
    //       result: result.status,
    //       data: result.data,
    //     };
    //   });
    // },
  }
};

export default issue;
