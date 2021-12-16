/* eslint-disable max-len */
import axios from 'axios';
import config from './config/api';

// default config
const instance = axios.create({
    // baseURL: config.API_URL + 'v1/bff/',
    baseURL: config.API_URL + 'v1/',
    // timeout: 30000
});
instance.defaults.headers.common['Content-Type'] = config.AUTH_HEADERS['Content-Type'];
instance.defaults.headers.common['Accept'] = config.AUTH_HEADERS['Accept'];
// instance.defaults.headers.common['Origin-Request'] = config.AUTH_HEADERS['Origin-Request'];
instance.defaults.headers.common['Authorization'] = config.AUTH_HEADERS['Authorization'];
instance.defaults.headers.common['api-key'] = 'bb6f56b300e8'; // key issue only
// instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


// server graphql
const axiosGraphql = axios.create({
    // baseURL: config.API_URL_GRAPHQL + 'graphql',
    baseURL: config.API_URL_GRAPHQL,
    // timeout: 30000
});
// axiosGraphql.defaults.headers.common["Content-Type"] = config.AUTH_HEADERS['Content-Type'];
axiosGraphql.defaults.headers.common['Content-Type'] = 'application/json';
axiosGraphql.defaults.headers.common['Accept'] = config.AUTH_HEADERS['Accept'];
axiosGraphql.defaults.headers.common['Origin-Request'] = 'graph';
axiosGraphql.defaults.headers.common['Authorization'] = config.AUTH_HEADERS['Authorization'];


// server ntx
const axiosNtx = axios.create({
    baseURL: config.API_URL_NTX,
    // timeout: 30000
});

const access_token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImF1dG9jb21wbGV0ZSBzaG93X2V2ZW50IHZhbGlkYXRlX2V2ZW50IGdldF9ldmVudCBzaG93X2lhbiBzaG93X2VudGl0eSBzaG93X2VudGl0eV9uZXR3b3JrIHNob3dfZGluYW1pa2Egc2hvd19sb2NhdGlvbiBhZGRfa2FzdXMgc2hvd19uZXh0X2V2ZW50IHNob3dfZ2F0cmEgc2hvd19lbnRpdHlfY2xhc3Mgc2hvd19yZWxhdGlvbiBzaG93X3NpbWlsYXJfZXZlbnQgc2hvd19zaW1pbGFyX2V2ZW50X2lhbiIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJpYXQiOjE2Mzg4NTk1MTUsImV4cCI6MTc5NjY0NDI3NSwiY2xpZW50X2lkIjoiYjJIZk1JNFRiaGZvaGxkam01SDZhb0dsIn0.Wf5SoYjqVHiKGyffrDXBo-WxxRS1rSQjth0QpyumUN0RGO3UEXWkc5r8y6sXUmc-LdcUt5yzBAmTULbtxEGiaP8UbZ6xMP-9w5UthUVh-41wR7Ej9lzEHvo7DN70ImuVteB7JpBHypt6mnWp6WGbk5LyyM0MQaGkPqoGdnELGBo';

axiosNtx.defaults.headers.common['Content-Type'] = config.AUTH_HEADERS['Content-Type'];
axiosNtx.defaults.headers.common['Accept'] = config.AUTH_HEADERS['Accept'];
axiosNtx.defaults.headers.common["Authorization"] = process.env.VUE_APP_NTX_API_ACCESS_TOKEN ? 'Bearer '+ process.env.VUE_APP_NTX_API_ACCESS_TOKEN : access_token;

// axiosNtx.defaults.headers.common['access-control-allow-headers'] = '*';
// axiosNtx.defaults.headers.common['access-control-allow-methods'] = 'POST,GET,OPTIONS,DELETE,PUT,PATCH';
// axiosNtx.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axiosNtx.defaults.headers.common['access-control-expose-headers'] = '*';


// ntx mock up only 
const axiosNtxMock = axios.create({
    baseURL: 'https://ntx-demo.pacmann.io/api/mock',
});

axiosNtxMock.defaults.headers.common['Content-Type'] = config.AUTH_HEADERS['Content-Type'];
axiosNtxMock.defaults.headers.common['Accept'] = config.AUTH_HEADERS['Accept'];


export {instance, axios, axiosGraphql, axiosNtx, axiosNtxMock};

export default instance;
