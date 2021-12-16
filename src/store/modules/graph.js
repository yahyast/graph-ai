/* eslint-disable max-len */
import { axiosNtx, axiosNtxMock } from '@/axios-main';
import axiosOrigin from 'axios';
import moment from 'moment';

const cancelToken = axiosOrigin.CancelToken;
let cancelListGatra, cancelSearchEvent, cancelDetailEvent, cancelDetailEventIan, cancelDetailEventReport, cancelDynamicsNationalThreats;

const graph = {
    namespaced: true,
    state: {
        status_list_gatra: {
            status: false,
            cancel: null,
            code: null,
        },
        status_search_event: {
            status: false,
            cancel: null,
            code: null,
        },
        status_detail_event: {
            status: false,
            cancel: null,
            code: null,
        },
        status_detail_event_ian: {
            status: false,
            cancel: null,
            code: null,
        },
        status_detail_event_report: {
            status: false,
            cancel: null,
            code: null,
        },
        status_dynamics_national_threats: {
            status: false,
            cancel: null,
            code: null,
        },

        list_gatra: [],
        search_event: [],
        detail_event: {},
        detail_event_ian: [],
        detail_event_report: [],
        dynamics_national_threats: [],
    },
    mutations: {
        setStatusListGatra: (state, status) => {
            state.status_list_gatra = status;
        },
        setStatusSearchEvent: (state, status) => {
            state.status_search_event = status;
        },
        setStatusDetailEvent: (state, status) => {
            state.status_detail_event = status;
        },
        setStatusDetailEventIan: (state, status) => {
            state.status_detail_event_ian = status;
        },
        setStatusDetailEventReport: (state, status) => {
            state.status_detail_event_report = status;
        },
        setStatusDynamicsNationalThreats: (state, status) => {
            state.status_dynamics_national_threats = status;
        },

        setListGatra: (state, data) => {
            state.list_gatra = data;
        },
        setSearchEvent: (state, data) => {
            state.search_event = data;
        },
        setDetailEvent: (state, data) => {
            state.detail_event = data;
        },
        setDetailEventIan: (state, data) => {
            state.detail_event_ian = data;
        },
        setDetailEventReport: (state, data) => {
            state.detail_event_report = data;
        },
        setDynamicsNationalThreats: (state, data) => {
            state.dynamics_national_threats = data;
        },
    },
    getters: {},
    actions: {
    // async getListGatra({ state, commit, dispatch }, [limit='', page='', keyword='']) {
        async getListGatra({state, commit, dispatch}) {
            if (state.status_list_gatra.cancel !== null && state.status_list_gatra.status === 'loading') {
                await state.status_list_gatra.cancel('Operation canceled by the user.');
            }

            const params = {
                // limit: limit,
                // page: page,
                // keyword: keyword,
                // order_by: order_by,
                // from_date: from_date,
                // to_date: to_date,
            };

            // await axiosNtx.get('api/mock/gatra', {
            await axiosNtx.get('gatra', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelListGatra = c;
                    commit('setStatusListGatra', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data)
                    const data = resp.data.data;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    commit('setListGatra', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListGatra', result);
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
                        result.cancel = cancelListGatra;
                    }

                    commit('setStatusListGatra', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response && resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        // async getSearchEvent({state, commit, dispatch}, [gatra='', query='', source='BERITA|LAPORAN', date_from='', date_to='']) {
        async getSearchEvent({state, commit, dispatch}, [gatra='', query='', source='berita,laporan', date_from='', date_to='']) {
            if (state.status_search_event.cancel !== null && state.status_search_event.status === 'loading') {
                await state.status_search_event.cancel('Operation canceled by the user.');
            }

            let params = {
                // gatra: 'politik,ideologi,hankam,ekonomi,sosbud,misc',
                gatra: gatra,
                query: query,
                source: source,
                // date_from: (date_from !== '' ? date_from : moment().subtract(2, 'years').format('YYYY-MM-DD')),
                date_from: (date_from !== '' ? date_from : moment().subtract(2, 'months').format('YYYY-MM-DD')),
                date_to: (date_to !== '' ? date_to : moment().format('YYYY-MM-DD')),
                // has_coordinate: true,
                has_coordinate: 'true',
            };

            // await axiosNtx.get('api/mock/event', {
            await axiosNtx.get('event', {
            // await axiosNtxMock.get('event', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelSearchEvent = c;
                    commit('setStatusSearchEvent', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data)
                    const data = resp.data.data;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    commit('setSearchEvent', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusSearchEvent', result);
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
                        result.cancel = cancelSearchEvent;
                    }

                    commit('setStatusSearchEvent', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response && resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getDetailEvent({state, commit, dispatch}, id) {
            if (state.status_detail_event.cancel !== null && state.status_detail_event.status === 'loading') {
                await state.status_detail_event.cancel('Operation canceled by the user.');
            }

            // let params = new FormData();
            // params.append('id', id);

            const params = {
                //   id: id,
            };

            // await axiosNtx.get('/api/mock/event/'+ id, {
            await axiosNtx.get('event/'+ id, {
            // await axiosNtxMock.get('event/'+ id, {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelDetailEvent = c;
                    commit('setStatusDetailEvent', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data)
                    const data = resp.data.data;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    commit('setDetailEvent', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusDetailEvent', result);

                    // return 'success';
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
                        result.cancel = cancelDetailEvent;
                    }

                    commit('setStatusDetailEvent', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getDetailEventIan({state, commit, dispatch}, [id, date_from='', date_to='']) {
            if (state.status_detail_event_ian.cancel !== null && state.status_detail_event_ian.status === 'loading') {
                await state.status_detail_event_ian.cancel('Operation canceled by the user.');
            }

            const params = {
                  location_id: id,
                  date_from: (date_from !== '' ? date_from : moment().subtract(1, 'months').format('YYYY-MM-DD')),
                  date_to: (date_to !== '' ? date_to : moment().format('YYYY-MM-DD')),
                  group_by: 'date',
            };

            // await axiosNtx.get('/api/mock/dinamika', {
            await axiosNtx.get('dinamika', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelDetailEventIan = c;
                    commit('setStatusDetailEventIan', {
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

                    commit('setDetailEventIan', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusDetailEventIan', result);
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
                        result.cancel = cancelDetailEventIan;
                    }

                    commit('setStatusDetailEventIan', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response && resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getDetailEventReport({state, commit, dispatch}, id) {
            if (state.status_detail_event_report.cancel !== null && state.status_detail_event_report.status === 'loading') {
                await state.status_detail_event_report.cancel('Operation canceled by the user.');
            }

            // const params = {
            //       location_id: id,
            // };

            // await axiosNtx.get('/api/mock/event/'+ id +'/similar-event', {
            await axiosNtx.get('event/'+ id +'/similar-event', {
                // params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelDetailEventReport = c;
                    commit('setStatusDetailEventReport', {
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

                    commit('setDetailEventReport', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusDetailEventReport', result);
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
                        result.cancel = cancelDetailEventReport;
                    }

                    commit('setStatusDetailEventReport', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response && resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getDynamicsNationalThreats({state, commit, dispatch}, [date_from, date_to, group_by='date']) {
            if (state.status_dynamics_national_threats.cancel !== null && state.status_dynamics_national_threats.status === 'loading') {
                await state.status_dynamics_national_threats.cancel('Operation canceled by the user.');
            }

            const params = {
                  // location_id: id,
                  date_from: date_from,
                  date_to: date_to,
                  group_by: group_by,
            };

            // await axiosNtx.get('/api/mock/dinamika', {
            await axiosNtx.get('dinamika', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelDynamicsNationalThreats = c;
                    commit('setStatusDynamicsNationalThreats', {
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

                    commit('setDynamicsNationalThreats', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusDynamicsNationalThreats', result);
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
                        result.cancel = cancelDynamicsNationalThreats;
                    }

                    commit('setStatusDynamicsNationalThreats', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response && resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },
    },
};

export default graph;
