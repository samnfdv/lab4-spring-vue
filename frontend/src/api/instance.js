import axios from 'axios'
import router from '@/router'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',

    }
})


api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token')


        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {

        return Promise.reject(error)
    }
)


api.interceptors.response.use(
    (response) => {

        return response
    },
    async (error) => {

        if (error.response && error.response.status === 401) {

            localStorage.removeItem('token')


            await router.push('/login')
        }


        return Promise.reject(error)
    }
)

export default api