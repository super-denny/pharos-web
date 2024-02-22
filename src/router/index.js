import VueRouter from 'vue-router';
import Vue from 'vue'

import Home from "../pages/home/Home";
import Guidance from "../pages/guidance/Guidance";
import Comparison from "../pages/comparison/Comparison";
import FormatJson from "../pages/format/FormatJson";
import PersonCenter from "@/pages/person/PersonCenter.vue";

Vue.use(VueRouter)

//路由
const routers = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/guidance/guidance',
                name: 'guidance',
                component: Guidance
            },
            {
                path: '/comparison/comparison',
                name: 'comparison',
                component: Comparison
            },
            {
                path: '/format/format',
                name: 'format',
                component: FormatJson
            },
            {
                path: '/person/personCenter',
                name: 'personCenter',
                component: PersonCenter
            },
        ]
    }
];

const createRouter = () =>
    new VueRouter({
        mode: 'history',
        routes: routers,
        scrollBehavior() {
            return {x: 0, y: 0};
        },
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default router;
