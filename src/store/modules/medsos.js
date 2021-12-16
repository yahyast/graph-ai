import axios from '@/axios-main';
import axiosOrigin from 'axios';

const cancelToken = axiosOrigin.CancelToken;
let cancelListTrending;
let cancelListTweet;
let cancelListFollowing;
let cancelLDetailProfile;

const medsos = {
    namespaced: true,
    state: {
        status_list_trending: {
            status: false,
            cancel: null,
            code: null,
        },
        status_list_tweet: {
            status: false,
            cancel: null,
            code: null,
        },
        status_detail_following: {
            status: false,
            cancel: null,
            code: null,
        },
        status_detail_profile: {
            status: false,
            cancel: null,
            code: null,
        },

        list_trending: [],
        list_tweet: [],
        list_tweet_trending: [],
        detail_following: {},
        detail_profile: {},
    },
    mutations: {
        setStatusListTrending: (state, status) => {
            state.status_list_trending = status;
        },
        setStatusListTweet: (state, status) => {
            state.status_list_tweet = status;
        },
        setStatusListFollowing: (state, status) => {
            state.status_detail_following = status;
        },
        setStatusDetailProfile: (state, status) => {
            state.status_detail_profile = status;
        },

        setListTrending: (state, data) => {
            state.list_trending = data;
        },
        setListTweet: (state, data) => {
            state.list_tweet = data;
        },
        setListTweetTrending: (state, data) => {
            state.list_tweet_trending = data;
        },
        setListFollowing: (state, data) => {
            state.detail_following = data;
        },
        setDetailProfile: (state, data) => {
            state.detail_profile = data;
        },
    },
    getters: {},
    actions: {
        async getListTrending({state, commit, dispatch}, [startDate='', endDate='', limit=50]) {
            if (state.status_list_trending.cancel !== null && state.status_list_trending.status === 'loading') {
                await state.status_list_trending.cancel('Operation canceled by the user.');
            }

            const params = {
                limit: limit,
                start_date: startDate,
                end_date: endDate,
            };

            await axios.get('medsos/medsos/list-trend', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelListTrending = c;
                    commit('setStatusListTrending', {
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

                    commit('setListTrending', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListTrending', result);
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
                        result.cancel = cancelListTrending;
                    }

                    commit('setStatusListTrending', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getListTweet({state, commit, dispatch}, [limit=20, page=1, startDate='', endDate='', label='', query='', fromTrending=false]) {
            if (state.status_list_tweet.cancel !== null && state.status_list_tweet.status === 'loading') {
                await state.status_list_tweet.cancel('Operation canceled by the user.');
            }

            const params = {
                limit: limit,
                page: page,
                start_date: startDate,
                end_date: endDate,
                label: label,
                q: query,
                source: 1,
                // user:
            };

            await axios.get('medsos/medsos/list', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelListTweet = c;
                    commit('setStatusListTweet', {
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
                    if (fromTrending) {
                        commit('setListTweetTrending', data);
                    } else {
                        commit('setListTweet', data);
                    }

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListTweet', result);
                })
                .catch((resp) => {
                    const result = {
                        status: 'failed',
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    if (axiosOrigin.isCancel(resp)) {
                        result.status = 'loading';
                        result.cancel = cancelListTweet;
                    }

                    commit('setStatusListTweet', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getListFollowing({state, commit, dispatch}, [username='']) {
            if (state.status_detail_following.cancel !== null && state.status_detail_following.status === 'loading') {
                await state.status_detail_following.cancel('Operation canceled by the user.');
            }

            const params = {
                username: username,
            };

            await axios.get('medsos/following/twitter', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelListFollowing = c;
                    commit('setStatusListFollowing', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    const data = resp.data.data;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    commit('setListFollowing', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListFollowing', result);
                })
                .catch((resp) => {
                    const result = {
                        status: 'failed',
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    if (axiosOrigin.isCancel(resp)) {
                        result.status = 'loading';
                        result.cancel = cancelListFollowing;
                    }

                    commit('setStatusListFollowing', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },

        async getDetailProfile({state, commit, dispatch}, [user='']) {
            if (state.status_detail_profile.cancel !== null && state.status_detail_profile.status === 'loading') {
                await state.status_detail_profile.cancel('Operation canceled by the user.');
            }

            const params = {
                user: user,
            };

            await axios.get('medsos/medsos/detail', {
                params: params,
                cancelToken: new cancelToken(function executor(c) {
                    cancelLDetailProfile = c;
                    commit('setStatusDetailProfile', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };
                    if (resp.data && resp.data.data && resp.data.data.length > 0) {
                        let data = resp.data.data;
                        try {
                            data = data[0];
                            commit('setDetailProfile', data);
                        } catch (error) {
                            console.log('error');
                            console.log(error);
                        }


                        if (Object.keys(data).length===0) {
                            result.status = 'empty';
                        }
                    } else {
                        result.status = 'empty';
                    }

                    commit('setStatusDetailProfile', result);
                })
                .catch((resp) => {
                    const result = {
                        status: 'failed',
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    if (axiosOrigin.isCancel(resp)) {
                        result.status = 'loading';
                        result.cancel = cancelLDetailProfile;
                    }

                    commit('setStatusDetailProfile', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },
    },
};

export default medsos;
