const config = {
    namespaced: true,
    state: {
        theme: 'light',
        list_gatra: [
            {
                label: 'ekonomi',
                name: 'Ekonomi',
            },
            {
                label: 'politik',
                name: 'Politik',
            },
            {
                label: 'ideologi',
                name: 'Ideologi',
            },
            {
                label: 'hankam',
                name: 'Pertahanan dan Keamanan',
            },
            {
                label: 'sosbud',
                name: 'Sosial Budaya',
            },
        ],
    },
    mutations: {
        setTheme: (state, data) => {
            state.theme = data;
        },
    },
    getters: {
        getDefaultImage() {
            return (process.env.VUE_APP_DEFAULT_IMAGE ? process.env.VUE_APP_DEFAULT_IMAGE : '/images/no-image.jpg');
        },
        getDefaultImageProfile() {
            return (process.env.VUE_APP_DEFAULT_IMAGE_PROFILE ? process.env.VUE_APP_DEFAULT_IMAGE_PROFILE : '/images/no-image-profile.jpg');
        },
    },
    actions: {},
};

export default config;
