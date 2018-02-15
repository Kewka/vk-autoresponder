import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { ROUTE_COMPLETE, ROUTE_LOAD } from '../store/mutations-types'

Vue.use(Router)


const checkToken = (to, from, next) => {
    if (localStorage.getItem('access_token')) next()
    else next('/')
}

const routes = [
    {
        path: '/',
        component: () => import('@/views/Home'),
        meta: {
            title: 'Главная'
        }
    },
    {
        path: '/account',
        component: () => import('@/views/Account'),
        meta: {
            title: 'Аккаунт'
        },
        beforeEnter: checkToken
    },
    {
        path: '/answers',
        component: () => import('@/views/Answers'),
        meta: {
            title: 'Ответы'
        },
        beforeEnter: checkToken
    },
    {
        path: '/history',
        component: () => import('@/views/History'),
        meta: {
            title: 'История'
        },
        beforeEnter: checkToken
    },
    {
        path: '/settings',
        component: () => import('@/views/Settings'),
        meta: {
            title: 'Настройки'
        },
        beforeEnter: checkToken
    },
    {
        path: '/responders',
        component: () => import('@/views/Responders'),
        meta: {
            title: 'Автоответчики'
        }
    },
    {
        path: '/login',
        component: () => import('@/views/Login'),
        meta: {
            title: 'Вход'
        },
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('access_token')) next('/')
            else next()
        }
    },
    {
        path: '/login-success',
        component: () => import('@/views/LoginSuccess')
    },
    {
        path: '/help',
        component: () => import('@/views/Help'),
        meta: {
            title: 'Справка'
        }
    },
    {
        path: '/logout',
        component: () => import('@/views/Logout'),
    },
    {
        path: '/redirect',
        component: () => import('@/views/Redirect'),
        meta: {
            title: 'Перенаправление'
        }
    },
    {
        path: '*',
        component: () => import('@/views/NotFound'),
        meta: {
            title: 'Ошибка'
        }
    },
]

const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    store.commit(ROUTE_LOAD)
    next()
})

router.afterEach((to, from) => {
    document.title = to.meta.title || 'VK Автоответчик'
    store.commit(ROUTE_COMPLETE)
})

export default router