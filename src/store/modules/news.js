import {axiosGraphql} from '@/axios-main';
import axiosOrigin from 'axios';

const cancelToken = axiosOrigin.CancelToken;
let cancelListNews;

const news = {
    namespaced: true,
    state: {
        status_list_news: {
            status: 'false',
            cancel: null,
            code: null,
        },
        list_news: [],
        search_news: {},
    },
    mutations: {
        setStatusListNews: (state, status) => {
            state.status_list_news = status;
        },
        setListNews: (state, data) => {
            state.list_news = data;
        },
        setSearchNews: (state, data) => {
            state.search_news = data;
        },
    },
    getters: {},
    actions: {
        async getListNews({state, commit, dispatch}, [limit=10, page=1, search, startDate='', endDate='']) {
            if (state.status_list_news.cancel !== null && state.status_list_news.status === 'loading') {
                await state.status_list_news.cancel('Operation canceled by the user.');
            }
            await axiosGraphql.post(null, {
                query: `query ($search: SearchParam){ 
                    searchNews (
                        limit: `+ limit +`,
                        page: `+ page +`,
                        search: $search,
                        start_date: "`+ startDate +`",
                        end_date: "`+ endDate +`",
                    ) {
                        doc {
                            title
                            source
                            url
                            urlToImage
                            content
                            description
                            publishedAt
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
                    search: search,
                },
            }, {
                cancelToken: new cancelToken(function executor(c) {
                    cancelListNews = c;
                    commit('setStatusListNews', {
                        status: 'loading',
                        cancel: c,
                        code: null,
                    });
                }),
            })
                .then((resp) => {
                    const data = resp.data.data.searchNews;
                    const result = {
                        status: true,
                        cancel: null,
                        code: resp.response && resp.response.status ? resp.response.status : null,
                    };

                    // console.log(data)
                    commit('setListNews', data);

                    if (Object.keys(data).length===0) {
                        result.status = 'empty';
                    }

                    commit('setStatusListNews', result);
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
                        result.cancel = cancelListNews;
                    }

                    commit('setStatusListNews', result);
                    if (!axiosOrigin.isCancel(resp)) {
                        dispatch('errors/handleApiResponse', [result.code, (resp.response.data && resp.response.data.message ? resp.response.data.message : null)], {root: true});
                    }
                });
        },
    },
};

export default news;
