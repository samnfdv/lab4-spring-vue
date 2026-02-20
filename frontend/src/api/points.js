import api from './instance'

export default {

    getAll() {
        return api.get('/auth/allResults')
    },


    add(point) {
        return api.post('/auth/addPoint', point)
    }
}