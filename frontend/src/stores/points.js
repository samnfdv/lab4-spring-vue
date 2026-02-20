// src/stores/points.js
import { defineStore } from 'pinia'
import pointsApi from '@/api/points'

export const usePointsStore = defineStore('points', {
    state: () => ({
        points: [],
        currentR: 1,
        loading: false,
    }),

    actions: {

        setRadius(val) {
            this.currentR = Number(val)
        },


        async fetchPoints() {
            this.loading = true
            try {
                const response = await pointsApi.getAll()
                this.points = response.data
            } catch (e) {
                console.error('Ошибка загрузки точек:', e)
            } finally {
                this.loading = false
            }
        },


        async addPoint(pointData) {
            try {
                const response = await pointsApi.add(pointData)
                if (response.data) {

                    this.points = response.data
                }
            } catch (error) {
                console.error('Ошибка отправки точки:', error)
                throw error
            }
        }
    }
})