// src/api/points
import api from './instance'

export default {
    // Получить все точки (историю)
    getAll() {
        return api.get('/auth/allResults')
    },

    // Отправить новую точку
    add(point) {
        // point = { x: 1, y: 2, r: 3 }
        return api.post('/auth/addPoint', point)
    }
}