// import { decrypt } from '@/util/crypto';

const api = {
    // API_URL: decrypt(process.env.VUE_APP_API_URL, false, true),
    API_URL: (process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL + ((process.env.VUE_APP_API_URL).slice(-1) === '/' ? '' : '/' ) : ''),
    API_URL_NTX: (process.env.VUE_APP_API_URL_NTX ? process.env.VUE_APP_API_URL_NTX + ((process.env.VUE_APP_API_URL_NTX).slice(-1) === '/' ? '' : '/' ) : ''),
    API_URL_GRAPHQL: (process.env.VUE_APP_API_URL_GRAPHQL ? process.env.VUE_APP_API_URL_GRAPHQL + ((process.env.VUE_APP_API_URL_GRAPHQL).slice(-1) === '/' ? '' : '/' ) : ''),
    AUTH_HEADERS: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Origin-Request': null,
        'Authorization': null,
    },
};

export default api;
