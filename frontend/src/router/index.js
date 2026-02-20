import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Импортируем стор, чтобы проверять токен

// Импортируем наши страницы (Views)
// import LoginPage from '@/components/loginAuth/Login.vue'
// import DashboardPage from '@/components/secured/Dashboard.vue'

// 1. ОПРЕДЕЛЯЕМ МАРШРУТЫ
const routes = [
    {
        path: '/',
        redirect: '/dashboard' // С корня сразу кидаем внутрь (гард разберется, пускать или нет)
    },
    {
        path: '/login',
        name: 'Login',
        // component: LoginPage,
        component: () => import('@/components/loginAuth/Login.vue'),
        // META: Дополнительная информация для роутера
        meta: {
            layout: 'auth', // Какой лейаут использовать (см. шаг 4)
            onlyGuest: true // Флаг: сюда можно только НЕ авторизованным
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        // component: DashboardPage,
        component: ()=> import('@/components/secured/Dashboard.vue'),
        meta: {
            layout: 'main', // Используем основной макет с меню
            requiresAuth: true // Флаг: сюда можно только С токеном
        }
    },
    // Страница 404 (опционально)
    {
        path: '/:pathMatch(.*)*',
        redirect: '/dashboard'
    }
]

// 2. СОЗДАЕМ РОУТЕР
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// 3. НАСТРАИВАЕМ ГЛОБАЛЬНОГО ОХРАННИКА (Navigation Guard)
// Эта функция запускается ПЕРЕД каждым переходом на новую страницу
router.beforeEach((to, from, next) => {
    // Инициализируем стор внутри гарда (важно делать это здесь, а не снаружи)
    const authStore = useAuthStore()

    // Проверяем, авторизован ли пользователь (есть ли токен)
    const isLoggedIn = authStore.isAuthenticated

    // СЦЕНАРИЙ 1: Пользователь идет на защищенный маршрут (requiresAuth)
    if (to.meta.requiresAuth && !isLoggedIn) {
        // Если токена нет -> редирект на логин
        // query: { redirect: ... } нужен, чтобы после входа вернуть юзера туда, куда он хотел
        return next({ path: '/login', query: { redirect: to.fullPath } })
    }

    // СЦЕНАРИЙ 2: Пользователь идет на страницу для гостей (Login/Register)
    if (to.meta.onlyGuest && isLoggedIn) {
        // Если токен есть -> нечего ему делать на логине, кидаем в дашборд
        return next('/dashboard')
    }

    // СЦЕНАРИЙ 3: Все ок, пропускаем
    next()
})

export default router