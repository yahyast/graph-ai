import {axiosGraphql} from '@/axios-main';
import axiosOrigin from 'axios';

const cancelToken = axiosOrigin.CancelToken;
let cancelListTrend;

const trend = {
    namespaced: true,
    state: {
        status_list_trend: {
            status: false,
            cancel: null,
            code: null,
        },

        list_trend: [],
        detail_trend: {},
    },
    mutations: {
        setStatusListTrend: (state, status) => {
            state.status_list_trend = status;
        },

        setListTrend: (state, data) => {
            state.list_trend = data;
        },
        setDetaildTrend: (state, data) => {
            state.detail_trend = data;
        },
    },
    getters: {},
    actions: {
        async getListTrend({state, commit, dispatch}, [limit=10, page=1, keyword='', limitWordId='', status='']) {
            if (state.status_list_trend.cancel !== null && state.status_list_trend.status === 'loading') {
                await state.status_list_trend.cancel('Operation canceled by the user.');
            }
            const filter = {
                'status': status,
                'limit_word_id': limitWordId,
            };
            await axiosGraphql.post(null, {
                query: `query ($filter: FilterParam){ 
                    trends (
                        limit: `+ limit +`,
                        page: `+ page +`,
                        keyword: "`+ keyword +`"
                        filter: $filter 
                    ) {
                        doc {
                            id
                            label
                            slug
                            status
                            gatra
                            must_word
                            exclude_word
                            limit_word{
                                id
                                name
                            }
                        }
                        pagination {
                            perPage
                            total
                            totalPage
                            prevPage
                            hasPrev
                            nextPage
                            hasNext
                        }
                    }
                }`,
                variables: {
                    filter: filter,
                },
            }, {
                cancelToken: new cancelToken(function executor(c) {
                    cancelListTrend = c;
                    commit('setStatusListTrend', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    const data = resp.data.data.trends;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    // console.log(data)
                    commit('setListTrend', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListTrend', result);
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
                        result.cancel = cancelListTrend;
                    }

                    commit('setStatusListTrend', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async create({commit, dispatch, rootState}, data) {
            data.status = true;
            data.created_by = rootState.auth.profile.name;
            data.updated_by = rootState.auth.profile.name;
            return axiosGraphql.post(null, {
                query: `mutation ($trend: TrendInput) { 
                    createTrend(trend: $trend) {
                        id
                        gatra
                        must_word
                        exclude_word
                        limit_word {
                            id
                            name
                        }
                        label
                        created_by
                        updated_by
                    }
                }`,
                variables: {
                    trend: data,
                },
            })
                .then((resp) => {
                    // console.log(resp);
                    if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.createTrend && Object.keys(resp.data.data.createTrend).length > 0) {
                        // if (resp.status === 200) {
                        return {result: 'success', data: resp.data.data.createTrend};
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
            return axiosGraphql.post(null, {
                // params: params,
                // data: params,
                query: `mutation ($id: ID, $trend: TrendInput) {
                    updateTrend(id: $id, trend: $trend) {
                        id
                        gatra
                        must_word
                        exclude_word
                        limit_word {
                            id
                            name
                        }
                        label
                        created_by
                        updated_by
                    }
                }`,
                // variables: data,
                variables: {
                    id: id,
                    trend: data,
                },
            })
                .then((resp) => {
                    if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.updateTrend && Object.keys(resp.data.data.updateTrend).length > 0) {
                        // if (resp.status === 200) {
                        return {result: 'success', data: resp.data.data.updateTrend};
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

        // getDetail({commit, dispatch}, id) {
        //     const params = new FormData();
        //     params.append('id', id);

        //     return axios.post('api/v1/role', params)
        //         .then((resp) => {
        //             // console.log(resp.data)
        //             const data = resp.data;
        //             commit('setDetail', data);
        //             return 'success';
        //         })
        //         .catch((resp) => {
        //             // console.log(resp)
        //             dispatch('errors/handleApiResponse', (resp.response && resp.response.status ? resp.response.status : null), {root: true});
        //             return 'failed';
        //         });
        // },

        async changeStatus({commit, dispatch, rootState}, [id, status]) {
            // data.updated_by = rootState.auth.profile.name;

            // let params = new FormData();
            // params.append('name', name);
            // params.append('label', label);
            // params.append('status', status);
            // params.append('description', description);

            return axiosGraphql.post(null, {
                query: `mutation { 
                    changeTrendStatus(
                        id: "`+ id +`", 
                        status: `+ status +`,
                    ) {
                        id
                        label
                    }
                }`,
            })
                .then((resp) => {
                    // console.log(resp);
                    if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.changeTrendStatus && Object.keys(resp.data.data.changeTrendStatus).length > 0) {
                        // if (resp.status === 200) {
                        return {result: 'success', data: resp.data.data.changeTrendStatus};
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

        async refreshTrend({commit, dispatch, rootState}, [id]) {
            return axiosGraphql.post(null, {
                query: `mutation { 
                    refreshTrend(
                        id: "`+ id +`", 
                    )
                }`,
            })
                .then((resp) => {
                    // console.log(resp);
                    if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.refreshTrend && Object.keys(resp.data.data.refreshTrend).length > 0) {
                        // if (resp.status === 200) {
                        return {result: 'success', data: resp.data.data.refreshTrend};
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

    },
};

export default trend;
