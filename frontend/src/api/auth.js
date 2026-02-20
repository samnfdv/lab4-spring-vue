import api from './instance'

export default {

    login(payload) {
        return api.post('/login', payload)
    },


    register(payload) {
        return api.post('/register', payload)
    },


    logout() {
        return api.post('/logout')
    }
}