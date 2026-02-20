import axios from 'axios'
import router from '@/router' // Импортируем роутер, чтобы редиректить

// 1. Создаем экземпляр с базовыми настройками
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Берет адрес из .env
    headers: {
        'Content-Type': 'application/json',
        // Здесь можно добавить другие заголовки, общие для всех
    }
})

// 2. ИНТЕРЦЕПТОР ЗАПРОСА (Request Interceptor)
// Срабатывает ПЕРЕД тем, как запрос улетит на сервер
api.interceptors.request.use(
    (config) => {
        // Пытаемся достать токен (обычно мы храним его в localStorage после входа)
        const token = localStorage.getItem('token')

        // Если токен есть, добавляем его в заголовок Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        // Если ошибка еще до отправки запроса
        return Promise.reject(error)
    }
)

// 3. ИНТЕРЦЕПТОР ОТВЕТА (Response Interceptor)
// Срабатывает, когда сервер вернул ответ или ошибку
api.interceptors.response.use(
    (response) => {
        // Если все ок (статус 2xx), просто отдаем ответ дальше
        return response
    },
    async (error) => {
        // Если пришла ошибка
        if (error.response && error.response.status === 401) {
            // 401 = Unauthorized (Токен протух или неверный)

            // 1. Чистим мусор (удаляем старый токен)
            localStorage.removeItem('token')

            // 2. Редиректим на страницу входа
            // (Можно использовать router.push или window.location)
            await router.push('/login')
        }

        // Пробрасываем ошибку дальше, чтобы её можно было обработать в компоненте (показать алерт)
        return Promise.reject(error)
    }
)

export default api