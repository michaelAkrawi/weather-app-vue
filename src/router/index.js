import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/Home');
const Favorites = () => import("../views/Favorites");

const routes = [
    {
        path: '/',
        redirect: '/weather/home'
    },
    {
        path: '/weather/home',
        name : 'home',
        props : true,
        component: Home,
    }, {
        path: '/weather/favorites',
        component: Favorites
    }
]

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: routes
})

