import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from "../components/Dashboard"

const Home = () => import('../views/Home');
const Favorites = () => import("../views/Favorites");

const routes = [{
    path: '/weather',
    component: Dashboard,
    children: [{
        path: 'home',
        component: Home
    },
    {
        path: 'favorties',
        component: Favorites
    }
    ]
}]

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: routes
})

