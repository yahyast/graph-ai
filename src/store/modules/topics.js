import {axiosGraphql} from '@/axios-main';
import axiosOrigin from 'axios';

const cancelToken = axiosOrigin.CancelToken;
let cancelListTopics;

const topics = {
    namespaced: true,
    state: {
        status_list_topics: {
            status: false,
            cancel: null,
            code: null,
        },

        list_topics: [],
        detail_topic: {},
    },
    mutations: {
        setStatusListTopics: (state, status) => {
            state.status_list_topics = status;
        },

        setListTopics: (state, data) => {
            state.list_topics = data;
        },
        setDetailTopic: (state, data) => {
            state.detail_topic = data;
        },
    },
    getters: {},
    actions: {
        async getListTopics({state, commit, dispatch}) {
            if (state.status_list_topics.cancel !== null && state.status_list_topics.status === 'loading') {
                await state.status_list_topics.cancel('Operation canceled by the user.');
            }

            // let params = {
            // limit: limit,
            // page: page,
            // keyword: keyword,
            // order_by: order_by,
            // from_date: from_date,
            // to_date: to_date,
            // };

            // let params = new FormData();
            // params.append('ehe', 'ehe');

            await axiosGraphql.post(null, {
                // params: params,
                // data: params,
                query: `query { 
                    topics {
                        id
                        name
                        status
                        created_by
                        updated_by
                    }
                }`,
            }, {
                // params: params,
                // data: params,
                // headers: {
                //   'x-custom': 'ehe'
                // },
                cancelToken: new cancelToken(function executor(c) {
                    cancelListTopics = c;
                    commit('setStatusListTopics', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data.data)
                    const data = resp.data.data.topics;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    // console.log(data)
                    commit('setListTopics', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListTopics', result);
                })
                .catch((resp) => {
                    // console.log(resp)
                    const result = {
                        status: 'failed',
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    if (axiosOrigin.isCancel(resp)) {
                        result.status = 'loading';
                        result.cancel = cancelListTopics;
                    }

                    commit('setStatusListTopics', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async create({commit, dispatch, rootState}, data) {
            data.status = true;
            data.created_by = rootState.auth.profile.name;
            data.updated_by = rootState.auth.profile.name;

            // let params = new FormData();
            // params.append('name', name);
            // params.append('label', label);
            // params.append('status', status);
            // params.append('description', description);

            return axiosGraphql.post(null, {
                // params: params,
                // data: params,
                query: `mutation ($topic: TopicInput) { 
                    createTopic(topic: $topic) {
                        id
                        name
                        status
                        created_by
                        updated_by
                    }
                }`,
                // variables: data,
                variables: {
                    topic: data,
                },
            })
                .then((resp) => {
                    // console.log(resp);
                    if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.createTopic && Object.keys(resp.data.data.createTopic).length > 0) {
                        // if (resp.status === 200) {
                        return {result: 'success', data: resp.data.data.createTopic};
                    } else {
                        return {result: 'failed', data: resp.data};
                    }
                })
                .catch((resp) => {
                    // console.log(resp)
                    const result = {
                        status: 'failed',
                        code: (resp.response && resp.response.status ? resp.response.status : null),
                        message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
                        data: (resp.response && resp.response.data ? resp.response.data : null),
                    };

                    dispatch('errors/handleApiResponse', [result.code, result.message], {root: true});

                    return {
                        result: result.status,
                        data: result.data,
                    };
                });
        },

        async update({commit, dispatch, rootState}, [id, data]) {
            // data.updated_by = rootState.auth.profile.name;

            // let params = new FormData();
            // params.append('name', name);
            // params.append('label', label);
            // params.append('status', status);
            // params.append('description', description);

            return axiosGraphql.post(null, {
                // params: params,
                // data: params,
                query: `mutation ($id: ID, $topic: TopicInput) { 
                    updateTopic(id: $id, topic: $topic) {
                        id
                        name
                        status
                        created_by
                        updated_by
                    }
                }`,
                // variables: data,
                variables: {
                    id: id,
                    topic: data,
                },
            })
                .then((resp) => {
                    // console.log(resp);
                    if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.updateTopic && Object.keys(resp.data.data.updateTopic).length > 0) {
                        // if (resp.status === 200) {
                        return {result: 'success', data: resp.data.data.updateTopic};
                    } else {
                        return {result: 'failed', data: resp.data};
                    }
                })
                .catch((resp) => {
                    // console.log(resp)
                    const result = {
                        status: 'failed',
                        code: (resp.response && resp.response.status ? resp.response.status : null),
                        message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
                        data: (resp.response && resp.response.data ? resp.response.data : null),
                    };

                    dispatch('errors/handleApiResponse', [result.code, result.message], {root: true});

                    return {
                        result: result.status,
                        data: result.data,
                    };
                });
        },

        // getDetail({ commit, dispatch }, id) {

        //   let params = new FormData();
        //   params.append('id', id);

    //   return axios.post('api/v1/role', params)
    //   .then((resp) => {
    //     // console.log(resp.data)
    //     let data = resp.data;
    //     commit('setDetail', data);
    //     return 'success';
    //   })
    //   .catch((resp) => {
    //     // console.log(resp)
    //     dispatch('errors/handleApiResponse', (resp.response && resp.response.status ? resp.response.status : null), { root: true });
    //     return 'failed';
    //   });
    // },
    },
};

export default topics;
