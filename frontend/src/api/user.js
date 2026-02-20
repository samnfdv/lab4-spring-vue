import api from './instance'

export default {
    // Получить данные текущего пользователя
    // (иногда это выносят сюда из auth.js, если бэкенд считает это отдельным ресурсом)
    getProfile() {
        return api.get('/users/profile')
    },

    // Обновить данные (имя, фамилия, телефон)
    updateProfile(data) {
        // data = { name: 'New Name', phone: '+123...' }
        return api.put('/users/profile', data)
    },

    // Сменить пароль
    changePassword(passwords) {
        // passwords = { old: '...', new: '...' }
        return api.post('/users/change-password', passwords)
    },

    // Загрузить аватарку (для примера работы с файлами)
    uploadAvatar(formData) {
        return api.post('/users/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}