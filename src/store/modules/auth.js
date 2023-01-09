export default {
    state    : () => ({
        user       : {},
    }),
    getters  : {
        getUserFromGetters(state) {
            return state.user
        },
    },
    actions  : {
        /*getUser(context) {
          ApiService.get('/admin/user').then(response => {
            context.commit("GETUSER", response.data.data);
          }).catch(error => {
            console.log(error, 'error')
          })
        },*/
    },
    mutations: {
        GETUSER(state, data) {
            return state.user = data
        },
    },
}
