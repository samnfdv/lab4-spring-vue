import { defineStore } from 'pinia'
import authApi from '@/api/auth'


export const useAuthStore = defineStore('auth', {



    state: () => ({


        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),


    getters: {

        isAuthenticated: (state) => !!state.token,
    },


    actions: {


        async login(credentials) {
            try {

                const response = await authApi.login(credentials)


                const { token, user } = response.data


                this.token = token
                this.user = user


                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))


                return true
            } catch (error) {

                throw error
            }
        },


        async register(formData) {
            try {


                const response = await authApi.register(formData)




                const { token, user } = response.data


                this.token = token
                this.user = user


                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))

                return true
            } catch (error) {
                throw error
            }
        },


        logout() {

            this.token = null
            this.user = null


            localStorage.removeItem('token')
            localStorage.removeItem('user')




        },


        async fetchUser() {
            if (!this.token) return;

            try {
                const response = await authApi.getMe()
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(this.user))
            } catch (error) {

                this.logout()
            }
        }
    }
})