import Vue from 'vue';
import Router from 'vue-router';
import index from '@/pages/index';
import rank from '@/pages/rank';

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index
    }, {
        path: "/rank",
        name: "rank",
        component: rank
    }]
})