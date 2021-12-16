import {axiosGraphql, axiosNtx} from '@/axios-main';
import axios from '@/axios-main';
import axiosOrigin from 'axios';
// import {apolloClient} from '@/apollo';
// import gql from 'graphql-tag';

// import fs from 'fs';
// import {fs} from 'fs';
// import { readStream } from '@/util/fs';

const cancelToken = axiosOrigin.CancelToken;
let cancelListActor;
let cancelSearchActor;
let cancelListLogHistory;
let cancelIanFigure;
let cancelRelatedFigures;
let cancelMotiveAgenda;

const actor = {
    namespaced: true,
    state: {
        status_list_actor: {
            status: false,
            cancel: null,
            code: null,
        },
        status_search_actor: {
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
        status_ian_figure: {
            status: false,
            cancel: null,
            code: null,
        },
        status_related_figures: {
            status: false,
            cancel: null,
            code: null,
        },
        status_motive_agenda: {
            status: false,
            cancel: null,
            code: null,
        },

        list_actor: [],
        search_actor: [],
        detail: {},
        list_log_history: {},
        ian_figure: {},
        related_figures: {},
        motive_agenda: {},
    },
    mutations: {
        setStatusListActor: (state, status) => {
            state.status_list_actor = status;
        },
        setStatusSearchActor: (state, status) => {
            state.status_search_actor = status;
        },
        setStatusDetail: (state, status) => {
            state.status_detail = status;
        },
        setStatusListLogHistory: (state, status) => {
            state.status_list_log_history = status;
        },
        setStatusIanFigure: (state, status) => {
            state.status_ian_figure = status;
        },
        setStatusRelatedFigures: (state, status) => {
            state.status_related_figures = status;
        },
        setStatusMotiveAgenda: (state, status) => {
            state.status_motive_agenda = status;
        },

        setListActor: (state, data) => {
            state.list_actor = data;
        },
        setSearchActor: (state, data) => {
            state.search_actor = data;
        },
        setDetail: (state, data) => {
            state.detail = data;
        },
        setListLogHistory: (state, data) => {
            state.list_log_history = data;
        },
        setIanFigure: (state, data) => {
            state.ian_figure = data;
        },
        setRelatedFigures: (state, data) => {
            state.related_figures = data;
        },
        setMotiveAgenda: (state, data) => {
            state.motive_agenda = data;
        },
    },
    getters: {},
    actions: {
        async getListActor({state, commit, dispatch}, [limit=9, page=1, keyword='', orderShort='']) {
            if (state.status_list_actor.cancel !== null && state.status_list_actor.status === 'loading') {
                await state.status_list_actor.cancel('Operation canceled by the user.');
            }

            await axiosGraphql.post(null, {
                query: `query { 
                    getFigure (keyword: "`+ keyword +`", limit: `+ limit +`, orderShort: "`+ orderShort +`", page: `+ page +`) {
                        doc {
                            id
                            name
                            photo
                            position {
                                data
                            }
                        }
                        pagination {
                            currentPage
                            hasNext
                            hasPrev
                            nextPage
                            perPage
                            prevPage
                            total
                            totalPage
                        }
                    }
                }`,
            }, {
                cancelToken: new cancelToken(function executor(c) {
                    cancelListActor = c;
                    commit('setStatusListActor', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data.data)
                    const data = resp.data.data.getFigure;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    commit('setListActor', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListActor', result);
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
                        result.cancel = cancelListActor;
                    }

                    commit('setStatusListActor', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async cancelSearchActor({state}) {
            if (state.status_search_actor.cancel !== null && state.status_search_actor.status === 'loading') {
                await state.status_search_actor.cancel('Operation canceled by the user.');
            }
        },

        async getSearchActor({state, commit, dispatch}, [limit=30, page=1, keyword='', orderShort='']) {
            // if (state.status_search_actor.cancel !== null && state.status_search_actor.status === 'loading')
            //   await state.status_search_actor.cancel('Operation canceled by the user.');

            await dispatch('cancelSearchActor');

            await axiosGraphql.post(null, {
                query: `query { 
                    getFigure (keyword: "`+ keyword +`", limit: `+ limit +`, orderShort: "`+ orderShort +`", page: `+ page +`) {
                        doc {
                            id
                            name
                            photo
                        }
                    }
                }`,
            }, {
                cancelToken: new cancelToken(function executor(c) {
                    cancelSearchActor = c;
                    commit('setStatusSearchActor', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    // console.log(resp.data.data)
                    const data = resp.data.data.getFigure.doc;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    // commit('setListActor', data);
                    commit('setSearchActor', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusSearchActor', result);
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
                        result.cancel = cancelSearchActor;
                    }

                    commit('setStatusSearchActor', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        getDetail({commit, dispatch}, id) {
            commit('setStatusDetail', 'loading');

            return axiosGraphql.post(null, {
                // id
                // license_plate {
                //   id
                //   plate_number
                //   plate_type
                // }
                query: `query ($id: ID) { 
                    detailFigure(id: $id) {
                        id
                        activity {
                            activity_date
                            notes
                        }
                        address
                        ambition
                        award
                        biographic
                        birth_date
                        birth_place
                        blood_type
                        career
                        character
                        city
                        created_by
                        district
                        driving_license {
                            license_number
                            license_type
                        }
                        education
                        family
                        gender
                        kk_number
                        ktp_number
                        marital_status
                        msisdn
                        name
                        opinion
                        organizational_experience
                        photo
                        postal_code
                        profession
                        profile
                        province
                        religion
                        rt_rw
                        social_media {
                            media_type
                            username
                        }
                        strength
                        updated_at
                        updated_by
                        vehicle_reg {
                            police_reg_number
                            stnk_number
                            type
                        }
                        village
                    }
                }`,
                variables: {
                    id: id,
                },
            })
                .then((resp) => {
                    // console.log(resp.data)
                    const data = resp.data.data.detailFigure;
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

            return axios.post('figure/create', params)
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

            // ==== graphql ===

            // let operation = {
            //   query: `mutation ($figure: FigureInput, $photo: Upload) {
            //     createFigure(figure: $figure, photo: $photo) {
            //       id
            //       address
            //       birth_date
            //       birth_place
            //       blood_type
            //       city
            //       created_by
            //       district
            //       driving_license {
            //         license_number
            //         license_type
            //       }
            //       gender
            //       kk_number
            //       ktp_number
            //       marital_status
            //       name
            //       photo
            //       postal_code
            //       profession
            //       province
            //       religion
            //       rt_rw
            //       updated_by
            //       vehicle_reg {
            //         stnk_number
            //         police_reg_number
            //         type
            //       }
            //       village
            //     }
            //   }`,
            //   variables: {
            //     figure: data,
            //     photo: null
            //     // photo: photo
            //   },
            // };


            // // try upload file with apollo

            // // if (photo !== null) {
            // //   // let map = {
            // //   //   "0": ["variables.photo"]
            // //   // };

            // //   // // const concat = require("concat-stream")

            // //   // // var fs = require('fs');

            // //   // // const util = require('util'),
            // //   // // request = util.promisify(require('request')),
            // //   // // fs = require('fs'),
            // //   // //       fsp = fs.promises;

            // //   // // const fsa = fs;

            // //   // // let fd = new FormData()
            // //   // let o = operation;

            // //   // console.log('o', o);
            // //   // console.log('photo', photo);
            // //   // var FormData = require('form-data');

            // //   // operation = new FormData();
            // //   // operation.append('operations', JSON.stringify(o));
            // //   // operation.append('map', JSON.stringify(map));
            // //   // // operation.append('0', photo);
            // //   // operation.append('0', photo);
            // //   // // operation.append('0', fs.createReadStream(photo));
            // //   // // operation.append('0', readStream(photo));

            // //   // // var fs = require('fs');
            // //   // // const fs = require('fs');

            // //   // // operation.append(0, fs.createReadStream(photo));

            // //   // console.log(operation)


            // //   // ---------------------------------------------------------------------------------------------------------

            // //   console.log('try apollo');
            // //   console.log(apolloClient);

            // //   // let data = await apolloClient.query({
            // //   //   query: gql`
            // //   //     query FigurePaginate ($keyword: String, $limit: Int, $orderShort: String, $page: Int) {
            // //   //       getFigure (keyword: $keyword, limit: $limit, orderShort: $orderShort, page: $page) {
            // //   //         doc {
            // //   //           id
            // //   //           name
            // //   //           photo
            // //   //           position {
            // //   //             data
            // //   //           }
            // //   //         }
            // //   //         pagination {
            // //   //           currentPage
            // //   //           hasNext
            // //   //           hasPrev
            // //   //           nextPage
            // //   //           perPage
            // //   //           prevPage
            // //   //           total
            // //   //           totalPage
            // //   //         }
            // //   //       }
            // //   //     }
            // //   //   `,
            // //   //   variables: {
            // //   //     keyword: keyword,
            // //   //     limit: limit,
            // //   //     orderShort: orderShort,
            // //   //     page: page
            // //   //   }
            // //   // })
            // //   // .then((resp) => {
            // //   //   console.log('in then', resp)

            // //   // })
            // //   // .catch((resp) => {
            // //   //   console.log('in catch', resp)

            // //   // });

            // //   console.log(data);
            // //   console.log(photo);

            // //   let send_data = await apolloClient.mutate({
            // //       // mutation ($figure: FigureInput, $photo: Upload) {
            // //     mutation: gql`
            // //       mutation($figure: FigureInput, $photo: Upload) {
            // //         createFigure(figure: $figure, photo: $photo) {
            // //           id
            // //           address
            // //           birth_date
            // //           birth_place
            // //           blood_type
            // //           city
            // //           created_by
            // //           district
            // //           driving_license {
            // //             license_number
            // //             license_type
            // //           }
            // //           gender
            // //           kk_number
            // //           ktp_number
            // //           marital_status
            // //           name
            // //           photo
            // //           postal_code
            // //           profession
            // //           province
            // //           religion
            // //           rt_rw
            // //           updated_by
            // //           vehicle_reg {
            // //             stnk_number
            // //             police_reg_number
            // //             type
            // //           }
            // //           village
            // //         }
            // //       }
            // //     `,
            // //     variables: {
            // //       "figure": data,
            // //       // photo: null
            // //       "photo": photo
            // //     },
            // //   })
            // //   .then((resp) => {
            // //     console.log('in then', resp)

            // //   })
            // //   .catch((resp) => {
            // //     console.log('in catch', resp)

            // //   });

            // //   return;
            // // }

            // // return axiosGraphql.post(null, operation, {
            // // // return axiosGraphql.post('', operation, {
            // //   // headers: operation.getHeaders(),
            // //   headers: {
            // //   // Headers: {
            // //     // 'Content-Type': multipart/form-data;
            // //     // 'Content-Type': 'application/json;multipart/form-data;',
            // //     // 'Content-Type': 'application/json',
            // //     // 'Content-Type': `application/json; boundary=${operation._boundary}`,
            // //     // 'content-type': 'application/json',
            // //     ...operation.getHeaders()
            // //     // 'x-sdfsfd': 'asdasdad',
            // //     // 'Content-Type': 'application/json;charset=UTF-8',
            // //     // "Access-Control-Allow-Origin": "*",
            // //   }
            // // })

            // return axiosGraphql.post(null, operation)
            // .then((resp) => {
            //   // console.log(resp);
            //   if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.createFigure && Object.keys(resp.data.data.createFigure).length > 0) {
            //   // if (resp.status === 200) {
            //     return {result: 'success', data: resp.data.data.createFigure};
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

            return axios.post('figure/update', params)
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

            // ==== graphql ====

            // let query = `mutation ($id: ID, $figure: FigureInput, $photo: Upload) {
            //       updateFigure(id: $id, figure: $figure, photo: $photo) {
            //         created_by
            //         updated_by`;

            // switch (form_type) {
            //   case 'information':
            //     query += `
            //         id
            //         address
            //         birth_date
            //         birth_place
            //         blood_type
            //         city
            //         district
            //         driving_license {
            //           license_number
            //           license_type
            //         }
            //         gender
            //         kk_number
            //         ktp_number
            //         marital_status
            //         name
            //         photo
            //         postal_code
            //         profession
            //         province
            //         religion
            //         rt_rw
            //         vehicle_reg {
            //           stnk_number
            //           police_reg_number
            //           type
            //         }
            //         village`;
            //     break;

            //   case 'biography':
            //     query += `
            //       profile
            //       biographic`;
            //     break;

            //   case 'experience':
            //     query += `
            //       organizational_experience`;
            //     break;

            //   case 'character':
            //     query += `
            //       character`;
            //     break;

            //   case 'ambition':
            //     query += `
            //       ambition`;
            //     break;

            //   case 'opinion':
            //     query += `
            //       opinion`;
            //     break;

            //   case 'strength':
            //     query += `
            //       strength`;
            //     break;

            //   case 'family':
            //     query += `
            //       family`;
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
            //     figure: data,
            //     photo: null
            //   },
            // })
            // .then((resp) => {
            //   // console.log(resp);
            //   if (resp.status === 200 && resp.data && resp.data.data && resp.data.data.updateFigure && Object.keys(resp.data.data.updateFigure).length > 0) {
            //   // if (resp.status === 200) {
            //     return {result: 'success', data: resp.data.data.updateFigure};
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
                    getHistories (itemName: "figures", itemId: "`+ id +`", limit: `+ limit +`, page: `+ page +`) {
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

        async getIanFigure({state, commit, dispatch}, [name]) {
            if (state.status_ian_figure.cancel !== null && state.status_ian_figure.status === 'loading') {
                await state.status_ian_figure.cancel('Operation canceled by the user.');
            }

            // let params = new FormData();
            // params.append('id', id);

            const params = {
                //   id: id,
            };

            // await axiosNtx.get('/api/mock/entity/UNK/ian?query='+name+'&entity-class=PER', {
            await axiosNtx.get('entity/UNKNOWN/ian?query='+name+'&entity-class=PER', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelIanFigure = c;
                    commit('setStatusIanFigure', {
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

                    commit('setIanFigure', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusIanFigure', result);

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
                        result.cancel = cancelIanFigure;
                    }

                    commit('setStatusIanFigure', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },
        async getRelatedFigures({state, commit, dispatch}, [name]) {
            if (state.status_related_figures.cancel !== null && state.status_related_figures.status === 'loading') {
                await state.status_related_figures.cancel('Operation canceled by the user.');
            }
            const params = {
                //   id: id,
            };

            // await axiosNtx.get('/api/mock/entity/UNK/network?query='+name+'&entity-class=PER', {
            await axiosNtx.get('entity/UNKNOWN/network?query='+name+'&entity-class=PER', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelRelatedFigures = c;
                    commit('setStatusRelatedFigures', {
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

                    commit('setRelatedFigures', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusRelatedFigures', result);

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
                        result.cancel = cancelRelatedFigures;
                    }

                    commit('setStatusRelatedFigures', result);
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
                'entity-class': 'PER',
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

export default actor;
