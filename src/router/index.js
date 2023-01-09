import Vue    from 'vue'
import Router from 'vue-router'

//Frontend
import FrontendLayout from "@/views/frontend/Layout";
import FrontendRoutes from "@/views/frontend/_routes";
//Backend
import BackendRoutes  from "@/views/backend/_routes";
import BackendLayout  from "@/views/backend/Layout";

import NotFound from '@/components/NotFound.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        //==========Frontend routing==========
        {
            path     : '/',
            component: FrontendLayout,
            children : FrontendRoutes
        },
        //==========Backend routing==========
        {
            path     : '/admin/',
            component: BackendLayout,
            children : BackendRoutes,
            meta     : {
                requireAuth: true,
            }
        },
        //==========NotFound==========
        {
            path     : '*',
            name     : 'Not Found',
            component: NotFound,
            meta     : {
                title: 'Not Found'
            }
        }
    ],
});
export default router
