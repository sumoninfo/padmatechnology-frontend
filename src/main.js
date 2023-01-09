import Vue   from 'vue'
import App   from './App.vue'
import store from './store'
import './scss/main.scss'
import './assets/tailwind.css'
// Filters
import './filters/filters.js'
import './plugins/firebase.js'
//VueProgressBar
import VueProgressBar  from 'vue-progressbar'

const vueProgressBarOptions = {
    color      : '#3ca3bb',
    failedColor: '#874b4b',
    thickness  : '5px',
    transition : {
        speed      : '0.2s',
        opacity    : '0.6s',
        termination: 300
    },
    autoRevert : true,
    location   : 'top',
    inverse    : false
}
Vue.use(VueProgressBar, vueProgressBarOptions)

//sweetalert2
window.Swal  = require('sweetalert2');
//Toast
const Toast  = Swal.mixin({
    toast            : true,
    position         : 'top-end',
    showConfirmButton: false,
    timer            : 3000,
    timerProgressBar : true,
    didOpen          : (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
window.Toast = Toast;
//services
import ApiService      from './services/api.service.js'
import * as JwtService from "./services/jwt.service.js";

ApiService.init();
import router          from './router'

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!JwtService.getToken()) {
            next({
                name  : 'userLogin',
                params: {nextUrl: to.fullPath}
            })
        } else {
            authUser(JwtService.getLoggedUser())
        }
    } else if (JwtService.getLoggedUser() == 'user') {
        authUser('user')
    }
    //if user logged and user state login page then redirect to dashboard
    if (to.name == 'userLogin' || to.name == 'adminLogin') {
        if (JwtService.getToken()) {
            let type= to.name.split('Login')[0];
            next({name: `${type}Dashboard`});
        }
    }

    //Logged user data return then commit in vuex
    function authUser(type) {
        ApiService.get(`/${type}/auth`).then(response => {
            store.commit("GETUSER", response.data.data);
            next()
        }).catch(error => {
            JwtService.destroyToken();
            next({name: `${type}Login`})
        })
    }

    next();
    Vue.nextTick(() => {
        document.title = `${to.meta.title} - ${process.env.VUE_APP_TITLE}` || process.env.VUE_APP_TITLE
    })
});

new Vue({
    router,
    store,
    //global computed
    computed: {
        user() {
            return this.$store.state.auth.user;
        },
    },
    render: h => h(App)
}).$mount('#app')
