import axios from '@/axios-main';
import axiosOrigin from 'axios';

const cancelToken = axiosOrigin.CancelToken;
let cancelList;
let cancelSearchIssue;
let cancelFindSuggestion;

const issue = {
    namespaced: true,
    state: {
        status_list: {
            status: false,
            cancel: null,
            code: null,
        },
        status_search_issue: {
            status: false,
            cancel: null,
            code: null,
        },
        status_find_suggestion: {
            status: false,
            cancel: null,
            code: null,
        },
        status_detail: false,

        list: [],
        search_issue: [],
        find_suggestion: [],
        detail: {},
    },
    mutations: {
        setStatusList: (state, status) => {
            state.status_list = status;
        },
        setStatusSearchIssue: (state, status) => {
            state.status_search_issue = status;
        },
        setStatusFindSuggestion: (state, status) => {
            state.status_find_suggestion = status;
        },
        setStatusDetail: (state, status) => {
            state.status_detail = status;
        },

        setList: (state, data) => {
            state.list = data;
        },
        setSearchIssue: (state, data) => {
            state.search_issue = data;
        },
        setFindSuggestion: (state, data) => {
            state.find_suggestion = data;
        },
        setDetail: (state, data) => {
            state.detail = data;
        },
    },
    getters: {},
    actions: {
        async getList({state, commit, dispatch}, [limit=9, page=1, keyword='', gatra='', sort='desc']) {
            if (state.status_list.cancel !== null && state.status_list.status === 'loading') {
                await state.status_list.cancel('Operation canceled by the user.');
            }

            const params = {
                limit: limit,
                // offset: page,
                page: page,
                gatra: gatra,
                search: keyword,
                dir: sort,
            };

            await axios.get('issue/', {
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
                    // console.log(resp.data.data)
                    const data = resp.data.data;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    commit('setList', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusList', result);
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
                        result.cancel = cancelList;
                    }

                    commit('setStatusList', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async cancelSearchIssue({state}) {
            if (state.status_search_issue.cancel !== null && state.status_search_issue.status === 'loading') {
                await state.status_search_issue.cancel('Operation canceled by the user.');
            }
        },

        async getSearchIssue({state, commit, dispatch}, [limit=30, page=1, keyword='', gatra='', sort='desc']) {
            // if (state.status_search_issue.cancel !== null && state.status_search_issue.status === 'loading')
            //   await state.status_search_issue.cancel('Operation canceled by the user.');

            await dispatch('cancelSearchIssue');

            const params = {
                limit: limit,
                // offset: page,
                page: page,
                gatra: gatra,
                search: keyword,
                dir: sort,
            };

            // await axios.get('issue/', {
            await axios.get('issue/search', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelSearchIssue = c;
                    commit('setStatusSearchIssue', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data.data)
                    const data = resp.data.data;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    // commit('setList', data);
                    commit('setSearchIssue', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusSearchIssue', result);
                })
                .catch((resp) => {
                    const result = {
                        status: 'failed',
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    if (axiosOrigin.isCancel(resp)) {
                        result.status = 'loading';
                        result.cancel = cancelSearchIssue;
                    }

                    commit('setStatusSearchIssue', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getFindSuggestion({state, commit, dispatch}, [keyword='']) {
            if (state.status_find_suggestion.cancel !== null && state.status_find_suggestion.status === 'loading') {
                await state.status_find_suggestion.cancel('Operation canceled by the user.');
            }

            const params = {
                search: keyword,
            };

            await axios.get('issue/suggestion', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelFindSuggestion = c;
                    commit('setStatusFindSuggestion', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data.data)
                    const data = resp.data.data;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    // commit('setList', data);
                    commit('setFindSuggestion', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusFindSuggestion', result);
                })
                .catch((resp) => {
                    const result = {
                        status: 'failed',
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    if (axiosOrigin.isCancel(resp)) {
                        result.status = 'loading';
                        result.cancel = cancelFindSuggestion;
                    }

                    commit('setStatusFindSuggestion', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        getDetail({commit, dispatch}, id) {
            commit('setStatusDetail', 'loading');

            return axios.get('issue/detail/' + id)
                .then((resp) => {
                    console.log(resp.data);
                    const data = resp.data.data;
                    commit('setStatusDetail', true);
                    commit('setDetail', data);
                    return 'success';
                })
                .catch((resp) => {
                    // console.log(resp)
                    // dispatch('errors/handleApiResponse', (resp.response && resp.response.status ? resp.response.status : null), { root: true });

                    const result = {
                        // status: 'failed',
                        code: (resp.response && resp.response.status ? resp.response.status : null),
                        message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
                        // data: (resp.response && resp.response.data ? resp.response.data : null),
                    };
                    commit('setStatusDetail', 'failed');
                    dispatch('errors/handleApiResponse', [result.code, result.message], {root: true});
                    return 'failed';
                });
        },

        async create({commit, dispatch, rootState}, data) {
            data.created_by = rootState.auth.profile.name;
            data.updated_by = rootState.auth.profile.name;

            const params = new FormData();

            for (const index in data) {
                // console.log(index, data[index]);

                if (index === 'image') {
                    if (data[index] !== null && data[index] !== '') {
                        params.append(index, data[index]);
                    }
                } else {
                    params.append(index, data[index]);
                }
            }

            // return axiosGraphql.post(null, {
            return axios.post('issue/create', params)
                .then((resp) => {
                    console.log(resp);
                    if (resp.status === 200 && resp.data && resp.data.data && Object.keys(resp.data.data).length > 0) {
                        // if (resp.status === 200) {
                        return {result: 'success', data: resp.data.data};
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
            data.updated_by = rootState.auth.profile.name;

            const params = new FormData();
            // params.append(id, id);

            for (const index in data) {
                console.log(index, data[index]);

                if (index === 'image') {
                    if (data[index] !== null && data[index] !== '') {
                        params.append(index, data[index]);
                    }
                } else {
                    params.append(index, data[index]);
                }
            }

            return axios.post('issue/update/'+ id, params)
                .then((resp) => {
                    console.log(resp);
                    // if (resp.status === 200 && resp.data && resp.data.data && Object.keys(resp.data.data).length > 0) {
                    if (resp.status === 200) {
                        return {result: 'success', data: resp.data};
                    } else {
                        return {result: 'failed', data: resp.data};
                    }
                })
                .catch((resp) => {
                    console.log(resp);
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
    },
};

export default issue;
