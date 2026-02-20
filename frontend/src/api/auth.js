import api from './instance' // Импортируем наш настроенный инстанс

export default {
    // Запрос на вход
    login(payload) {
        // payload — это объект { username: '...', password: '...' }
        return api.post('/login', payload)
    },

    // Запрос на регистрацию
    register(payload) {
        // payload — это данные формы регистрации
        return api.post('/register', payload)
    },

    // Получение профиля текущего юзера
    // Нам не нужно передавать ID или токен вручную,
    // интерцептор из instance.js сам подставит токен в заголовок
    getMe() {
        return api.get('/auth/me')
    },

    // Выход (если сервер требует запроса для убийства сессии)
    logout() {
        return api.post('/logout')
    }
}