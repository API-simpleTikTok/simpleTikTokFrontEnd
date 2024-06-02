import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: { name: 'index' }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
                path: '/index',
                name: 'index',
                component: () =>
                    import ('../views/index/index.vue'),
                children: [{
                    path: '',
                    component: () =>
                        import ('../components/index/video.vue')
                }]
            },
            {
                path: '/follow',
                name: "follow",
                component: () =>
                    import ('../views/follow/Follow.vue')
            },
            {
                path: '/news',
                name: 'news',
                component: () =>
                    import ('../views/news/new')
            },
            {
                path: '/me',
                name: 'me',
                component: () =>
                    import ('../views/me/me.vue')
            }


        ]

    },
    {
        path: '/sign',
        name: 'sign',
        component: () =>
            import ('../views/sign.vue')
    },
    {
        path: '/reg',
        name: 'reg',
        component: () =>
            import ('../views/reg.vue')
    },
    {
        path: '/edit',
        name: 'edit',
        component: () =>
            import ('../views/me/edit')
    },
    {
        path: '/public',
        name: 'public',
        component: () =>
            import ('../views/public/public')
    },

    { //up主自定义了一个弹窗
        path: '/test',
        component: () =>
            import ('../components/alert.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router