import router from "@/router";

const errors = {
  namespaced: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {
    async handleApiResponse ({ commit }, [status_code=null, message='Something wrong, please try again.']) {
      if (status_code !== null) {
        switch(status_code) {
          case 401:
            await commit('auth/clearAuth', null, { root: true });

            if (router.currentRoute.name !== 'LoginPage')
              router.push({ name: 'LoginPage' });
              // alert('401');
            break;

          case 419:
            await commit('auth/clearAuth', null, { root: true });

            if (router.currentRoute.name !== 'LoginPage')
              router.push({ name: 'LoginPage' });
              // alert('401');
            break;

          case 403:
              Event.$emit('error', 'Anda tidak mempunyai hak akses.');
            // if (router.currentRoute.name !== 'LoginPage') {
            //   router.push({ name: 'LoginPage' });
            //   // alert('403: Forbidden Page!');
            // }
            break;

          // case 404:
          //   if (router.currentRoute.name !== 'PageNotFound')
          //     router.push({ name: 'PageNotFound' });
          //   break;

          // case 422:
          //   break;
          
          default:
            // Event.$emit('warning', message);
            Event.$emit('error');
            // alert(status_code);
        } 
      }
    },
  }
};

export default errors;
