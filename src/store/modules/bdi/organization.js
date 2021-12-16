import axios from '@/axios-main';
import {axiosGraphql, axiosNtx} from '@/axios-main';
import axiosOrigin from 'axios';

const cancelToken = axiosOrigin.CancelToken;
let cancelListOrganization;
let cancelSearchOrganization;
let cancelListLogHistory;
let cancelIanOrganization;
let cancelRelatedOrganizations;
let cancelMotiveAgenda;

const organization = {
    namespaced: true,
    state: {
        status_list_organization: {
            status: false,
            cancel: null,
            code: null,
        },
        status_search_organization: {
            status: false,
            cancel: null,
            code: null,
        },
        status_detail: false,
        status_list_log_history: {
            status: false,
            cancel: null,
            code: null,
        },
        status_ian_organization: {
            status: false,
            cancel: null,
            code: null,
        },
        status_related_organizations: {
            status: false,
            cancel: null,
            code: null,
        },
        status_motive_agenda: {
            status: false,
            cancel: null,
            code: null,
        },

        list_organization: [],
        search_organization: [],
        detail: {},
        list_log_history: {},
        ian_organization: {},
        related_organizations: {},
        motive_agenda: {},
    },
    mutations: {
        setStatusListOrganization: (state, status) => {
            state.status_list_organization = status;
        },
        setStatusSearchOrganization: (state, status) => {
            state.status_search_organization = status;
        },
        setStatusDetail: (state, status) => {
            state.status_detail = status;
        },
        setStatusListLogHistory: (state, status) => {
            state.status_list_log_history = status;
        },
        setStatusIanOrganization: (state, status) => {
            state.status_ian_organization = status;
        },
        setStatusRelatedOrganizations: (state, status) => {
            state.status_related_organizations = status;
        },
        setStatusMotiveAgenda: (state, status) => {
            state.status_motive_agenda = status;
        },


        setListOrganization: (state, data) => {
            state.list_organization = data;
        },
        setSearchOrganization: (state, data) => {
            state.search_organization = data;
        },
        setDetail: (state, data) => {
            state.detail = data;
        },
        setListLogHistory: (state, data) => {
            state.list_log_history = data;
        },

        setIanOrganization: (state, data) => {
            state.ian_organization = data;
        },
        setRelatedOrganizations: (state, data) => {
            state.related_organizations = data;
        },
        setMotiveAgenda: (state, data) => {
            state.motive_agenda = data;
        },
    },
    getters: {},
    actions: {
        async getListOrganization({state, commit, dispatch}, [limit=9, page=1, keyword='', orderShort='']) {
            if (state.status_list_organization.cancel !== null && state.status_list_organization.status === 'loading') {
                await state.status_list_organization.cancel('Operation canceled by the user.');
            }

            // limit: limit,
            // page: page,
            // keyword: keyword,
            // order_by: order_by,
            // from_date: from_date,
            // to_date: to_date,

            // let params = {
            //   ehe: 'ehe'
            // };

            // let params = new FormData();
            // params.append('ehe', 'ehe');

            // params.append('query', `query {
            //     getOrganization {
            //       id
            //       name
            //       photo
            //       profile
            //       related_figure
            //       related_organization
            //       structure
            //     }
            //   }`);

            // console.log(params)

            await axiosGraphql.post(null, {
                // params: params,
                // data: params,
                query: `query { 
                    getOrganization (keyword: "`+ keyword +`", limit: `+ limit +`, orderShort: "`+ orderShort +`", page: `+ page +`) {
                        doc {
                            id
                            name
                            photo
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
            }, {
                // params: params,
                // data: params,
                // headers: {
                //   'x-custom': 'ehe'
                // },
                cancelToken: new cancelToken(function executor(c) {
                    cancelListOrganization = c;
                    commit('setStatusListOrganization', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data.data)
                    const data = resp.data.data.getOrganization;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    commit('setListOrganization', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListOrganization', result);
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
                        result.cancel = cancelListOrganization;
                    }

                    commit('setStatusListOrganization', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        getDetail({commit, dispatch}, id) {
            commit('setStatusDetail', 'loading');

            return axiosGraphql.post(null, {
                query: `query ($id: ID) { 
                    detailOrganization(id: $id) {
                        created_by
                        figures {
                            figure {
                                id
                                name
                                photo
                                position {
                                data
                                }
                            }
                        }
                        id
                        name
                        organization_activity {
                            activity_date
                            notes
                        }
                        photo
                        profile
                        related_figure
                        related_organization
                        social_media {
                            media_type
                            username
                        }
                        structure {
                            figure_id
                            figure
                            position
                        }
                        updated_at
                        updated_by
                    }
                    }`,
                variables: {
                    id: id,
                },
            })
                .then((resp) => {
                    // console.log(resp.data)
                    const data = resp.data.data.detailOrganization;
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
                        message: (resp.response && resp.response.data && resp.response.data.message ? resp.response.data.message : null),
                        // data: (resp.response && resp.response.data ? resp.response.data : null),
                    };
                    commit('setStatusDetail', 'failed');
                    dispatch('errors/handleApiResponse', [result.code, result.message], {root: true});
                    return 'failed';
                });
        },

        // async create({ commit, dispatch, rootState }, [data, photo=null]) {
        async create({commit, dispatch, rootState}, data) {
            data.created_by = rootState.auth.profile.name;
            data.updated_by = rootState.auth.profile.name;

            const params = new FormData();

            for (const index in data) {
                if (index === 'photo') {
                    if (data[index] !== null && data[index] !== '') {
                        params.append(index, data[index]);
                    }
                } else {
                    params.append(index, data[index]);
                }
            }

            return axios.post('organization/create', params)
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

            // ====== graphql ======

            // let operation = {
            //   query: `mutation ($organization: OrganizationInput, $photo: Upload) {
            //     createOrganization(organization: $organization, photo: $photo) {
            //       name
            //       photo
            //       profile
            //       created_by
            //       updated_by
            //     }
            //   }`,
            //   variables: {
            //     organization: data,
            //     // photo: null
            //     photo: photo
            //   },
            // };

            // if (photo !== null) {
            //   let map = {
            //     "0": ["variables.photo"]
            //   };

            //   // const concat = require("concat-stream")

            //   // let fd = new FormData()
            //   let o = operation;
            //   operation = new FormData();
            //   operation.append('operations', JSON.stringify(o));
            //   operation.append('map', JSON.stringify(map));
            //   operation.append('0', photo);

            //   // var fs = require('fs');
            //   // const fs = require('fs');

            //   // operation.append(0, fs.createReadStream(photo));

            //   console.log(operation)
            // }

            // // return axiosGraphql.post(null, operation, {
            // return axiosGraphql.post('', operation, {
            //   headers: {
            //     'Content-Type': 'application/json',
            //   }
            // })
            // .then((resp) => {
            //   // console.log(resp);
            //   if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.createOrganization && Object.keys(resp.data.data.createOrganization).length > 0) {
            //   // if (resp.status === 200) {
            //     return {result: 'success', data: resp.data.data.createOrganization};
            //   } else {
            //     return {result: 'failed', data: resp.data};
            //   }
            // })
            // .catch((resp) => {
            //   // console.log(resp)
            //   let result = {
            //     status: 'failed',
            //     code: (resp.response && resp.response.status ? resp.response.status : null),
            //     message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
            //     data: (resp.response && resp.response.data ? resp.response.data : null),
            //   };

            //   dispatch('errors/handleApiResponse', [result.code, result.message], { root: true });

            //   return {
            //     result: result.status,
            //     data: result.data,
            //   };
            // });
        },

        async update({commit, dispatch, rootState}, [id, data, form_type]) {
            data.updated_by = rootState.auth.profile.name;

            const params = new FormData();
            params.append('id', id);

            for (const index in data) {
                if (index === 'photo') {
                    if (data[index] !== null && data[index] !== '') {
                        params.append(index, data[index]);
                    }
                } else {
                    params.append(index, data[index]);
                }
            }

            return axios.post('organization/update', params)
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

            // ====== graphql ======

            // let query = `mutation ($id: ID, $organization: OrganizationInput, $photo: Upload) {
            //       updateOrganization(id: $id, organization: $organization, photo: $photo) {
            //         created_by
            //         updated_by`;

            // switch (form_type) {
            //   case 'profile':
            //     query += `
            //       name
            //       photo
            //       profile`;
            //     break;

            //   case 'related_figure':
            //     query += `
            //       figures {
            //         figure {
            //           id
            //           name
            //           photo
            //         }
            //       }
            //       related_figure`;
            //     break;

            //   case 'structure':
            //     query += `
            //       structure {
            //         figure
            //         figure_id
            //         position
            //       }`;
            //     break;

            //   default:
            //     // code block
            // };
            // query += `}}`;

            // return axiosGraphql.post(null, {
            //   // params: params,
            //   // data: params,

            //   query: query,
            //   variables: {
            //     id: id,
            //     organization: data,
            //     photo: null
            //   },
            // })
            // .then((resp) => {
            //   // console.log(resp);
            //   if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.updateOrganization && Object.keys(resp.data.data.updateOrganization).length > 0) {
            //   // if (resp.status === 200) {
            //     return {result: 'success', data: resp.data.data.updateOrganization};
            //   } else {
            //     return {result: 'failed', data: resp.data};
            //   }
            // })
            // .catch((resp) => {
            //   // console.log(resp)
            //   let result = {
            //     status: 'failed',
            //     code: (resp.response && resp.response.status ? resp.response.status : null),
            //     message: (resp.response.data && resp.response.data.message ? resp.response.data.message : null),
            //     data: (resp.response && resp.response.data ? resp.response.data : null),
            //   };

            //   dispatch('errors/handleApiResponse', [result.code, result.message], { root: true });

            //   return {
            //     result: result.status,
            //     data: result.data,
            //   };
            // });
        },

        async getListLogHIstory({state, commit, dispatch}, [limit=10, page=1, id='']) {
            if (state.status_list_log_history.cancel !== null && state.status_list_log_history.status === 'loading') {
                await state.status_list_log_history.cancel('Operation canceled by the user.');
            }

            await axiosGraphql.post(null, {
                query: `query { 
                    getHistories (itemName: "organizations", itemId: "`+ id +`", limit: `+ limit +`, page: `+ page +`) {
                        histories {
                            id
                            itemId
                            itemName
                            user
                            changes
                            createdAt
                            updatedAt
                        }
                        paginator {
                            currentPage
                            hasNextPage
                            hasPrevPage
                            itemCount
                            next
                            pageCount
                            perPage
                            prev
                        }
                    }
                }`,
            }, {
                cancelToken: new cancelToken(function executor(c) {
                    cancelListLogHistory = c;
                    commit('setStatusListLogHistory', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data.data)
                    const data = resp.data.data.getHistories;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    commit('setListLogHistory', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListLogHistory', result);
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
                        result.cancel = cancelListLogHistory;
                    }

                    commit('setStatusListLogHistory', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getIanOrganization({state, commit, dispatch}, [name]) {
            if (state.status_ian_organization.cancel !== null && state.status_ian_organization.status === 'loading') {
                await state.status_ian_organization.cancel('Operation canceled by the user.');
            }

            // let params = new FormData();
            // params.append('id', id);

            const params = {
                //   id: id,
            };

            // await axiosNtx.get('/api/mock/entity/UNK/ian?query='+name+'&entity-class=ORG', {
            await axiosNtx.get('entity/UNKNOWN/ian?query='+name+'&entity-class=ORG', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelIanOrganization = c;
                    commit('setStatusIanOrganization', {
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

                    commit('setIanOrganization', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusIanOrganization', result);

                    // return 'success';
                })
                .catch((resp) => {
                    const result = {
                        status: 'failed',
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    if (axiosOrigin.isCancel(resp)) {
                        result.status = 'loading';
                        result.cancel = cancelIanOrganization;
                    }

                    commit('setStatusIanOrganization', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },
        async cancelSearchOrganization({state}) {
            if (state.status_search_organization.cancel !== null && state.status_search_organization.status === 'loading') {
                await state.status_search_organization.cancel('Operation canceled by the user.');
            }
        },

        async getSearchOrganization({state, commit, dispatch}, [limit=30, page=1, keyword='', orderShort='']) {
            // if (state.status_search_organization.cancel !== null && state.status_search_organization.status === 'loading')
            //   await state.status_search_organization.cancel('Operation canceled by the user.');

            await dispatch('cancelSearchOrganization');

            // await axiosGraphql.post(null, {
            //     query: `query {
            //         searchOrganization (keyword: "`+ keyword +`", limit: `+ limit +`, orderShort: "`+ orderShort +`", page: `+ page +`) {
            //             doc {
            //                 id
            //                 name
            //                 photo
            //             }
            //         }
            //     }`,
            // }, {
            await axiosGraphql.post(null, {
                // params: params,
                // data: params,
                query: `query { 
                    getOrganization (keyword: "`+ keyword +`", limit: `+ limit +`, orderShort: "`+ orderShort +`", page: `+ page +`) {
                        doc {
                            id
                            name
                            photo
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
                cancelToken: new cancelToken(function executor(c) {
                    cancelSearchOrganization = c;
                    commit('setStatusSearchOrganization', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data.data)
                    // const data = resp.data.data.searchOrganization.doc;
                    const data = resp.data.data.getOrganization.doc;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    // commit('setListOrganization', data);
                    commit('setSearchOrganization', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusSearchOrganization', result);
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
                        result.cancel = cancelSearchOrganization;
                    }

                    commit('setStatusSearchOrganization', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },
        async getRelatedOrganizations({state, commit, dispatch}, [name]) {
            if (state.status_related_organizations.cancel !== null && state.status_related_organizations.status === 'loading') {
                await state.status_related_organizations.cancel('Operation canceled by the user.');
            }

            const params = {
                //   id: id,
            };

            // await axiosNtx.get('/api/mock/entity/UNK/network?query='+name+'&entity-class=ORG', {
            await axiosNtx.get('entity/UNKNOWN/network?query='+name+'&entity-class=ORG', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelRelatedOrganizations = c;
                    commit('setStatusRelatedOrganizations', {
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

                    commit('setRelatedOrganizations', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusRelatedOrganizations', result);

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
                        result.cancel = cancelRelatedOrganizations;
                    }

                    commit('setStatusRelatedOrganizations', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getMotiveAgenda({state, commit, dispatch}) {
            if (state.status_motive_agenda.cancel !== null && state.status_motive_agenda.status === 'loading') {
                await state.status_motive_agenda.cancel('Operation canceled by the user.');
            }

            const id = 'UNKNOWN';
            const params = {
                // id: 'UNKNOWN',
                'query': (state.detail && state.detail.name ? state.detail.name : ''),
                'entity-class': 'ORG',
            };

            // await axiosNtx.get('/api/mock/entity/'+ id +'/ian', {
            await axiosNtx.get('entity/'+ id +'/ian', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelMotiveAgenda = c;
                    commit('setStatusMotiveAgenda', {
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

                    commit('setMotiveAgenda', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusMotiveAgenda', result);
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
                        result.cancel = cancelMotiveAgenda;
                    }

                    commit('setStatusMotiveAgenda', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

    },
};

export default organization;
