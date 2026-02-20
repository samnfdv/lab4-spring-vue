import { defineStore } from 'pinia'
import authApi from '@/api/auth' // Импортируем методы API из Шага 2

// 'auth' — это уникальный ID стора
export const useAuthStore = defineStore('auth', {

    // 1. STATE (Состояние)
    // Это наша "база данных" на клиенте.
    state: () => ({
        // Сразу пытаемся достать данные из браузера, чтобы при обновлении страницы (F5)
        // пользователь не разлогинивался.
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),

    // 2. GETTERS (Вычисляемые свойства)
    // Это "ответы на вопросы" о состоянии.
    getters: {
        // Возвращает true, если токен есть (значит мы вошли), иначе false.
        // !! — превращает строку в булево значение.
        isAuthenticated: (state) => !!state.token,
    },

    // 3. ACTIONS (Действия)
    // Это бизнес-логика: "Сходи на сервер -> Получи ответ -> Измени State"
    actions: {

        // Действие ВХОДА
        async login(credentials) {
            try {
                // Шаг А: Стучимся в API (функция из api/auth.js)
                const response = await authApi.login(credentials)

                // Предположим, бэкенд возвращает: { token: 'abc...', user: { name: 'Max' } }
                const { token, user } = response.data

                // Шаг Б: Сохраняем данные в State (Pinia)
                this.token = token
                this.user = user

                // Шаг В: Сохраняем в LocalStorage (чтобы пережить перезагрузку страницы)
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))

                // Возвращаем true, чтобы компонент знал, что все прошло успешно
                return true
            } catch (error) {
                // Если ошибка — выбрасываем её дальше, чтобы компонент показал красное уведомление
                throw error
            }
        },

        // Действие РЕГИСТРАЦИИ
        async register(formData) {
            try {

                // Просто вызываем API. Обычно после регистрации сразу вызывают this.login()
                const response = await authApi.register(formData)



                // Предположим, бэкенд возвращает: { token: 'abc...', user: { name: 'Max' } }
                const { token, user } = response.data

                // Шаг Б: Сохраняем данные в State (Pinia)
                this.token = token
                this.user = user

                // Шаг В: Сохраняем в LocalStorage (чтобы пережить перезагрузку страницы)
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))

                // Возвращаем true, чтобы компонент знал, что все прошло успешно
                return true
            } catch (error) {
                throw error
            }
        },

        // Действие ВЫХОДА
        logout() {
            // 1. Чистим State
            this.token = null
            this.user = null

            // 2. Чистим Браузер
            localStorage.removeItem('token')
            localStorage.removeItem('user')

            // 3. Если нужно, дергаем API logout (необязательно, зависит от бэкенда)
            // authApi.logout()

            // Примечание: Редирект на страницу логина мы сделаем в компоненте или в роутере,
            // стор должен отвечать только за данные.
        },

        // (Опционально) Действие ОБНОВЛЕНИЯ ДАННЫХ ЮЗЕРА
        // Вызывается, если мы обновили страницу и хотим убедиться, что токен еще валиден,
        // или получить свежие данные профиля.
        async fetchUser() {
            if (!this.token) return; // Если токена нет, нечего и пытаться

            try {
                const response = await authApi.getMe()
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(this.user))
            } catch (error) {
                // Если токен протух, сервер вернет 401.
                // Наш axios interceptor из Шага 2 поймает это и сам сделает логаут.
                // Но на всякий случай можно почистить и тут:
                this.logout()
            }
        }
    }
})