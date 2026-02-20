import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'






const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'Login',

        component: () => import('@/components/loginAuth/Login.vue'),

        meta: {
            layout: 'auth',
            onlyGuest: true
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',

        component: ()=> import('@/components/secured/Dashboard.vue'),
        meta: {
            layout: 'main',
            requiresAuth: true
        }
    },

    {
        path: '/:pathMatch(.*)*',
        redirect: '/dashboard'
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {

    const authStore = useAuthStore()


    const isLoggedIn = authStore.isAuthenticated


    if (to.meta.requiresAuth && !isLoggedIn) {


        return next({ path: '/login', query: { redirect: to.fullPath } })
    }


    if (to.meta.onlyGuest && isLoggedIn) {

        return next('/dashboard')
    }


    next()
})

export default router