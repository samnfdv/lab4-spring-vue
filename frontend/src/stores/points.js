// src/stores/points.js
import { defineStore } from 'pinia'
import pointsApi from '@/api/points'

export const usePointsStore = defineStore('points', {
    state: () => ({
        points: [],      // Список всех результатов
        currentR: 1,     // Текущий радиус (синхронизируется с формой)
        loading: false,
    }),

    actions: {
        // Вызывается из PointsForm при смене радиокнопки R — перерисовывает точки на графике
        setRadius(val) {
            this.currentR = Number(val)
        },

        // Загрузка всей истории с сервера (вызывается при монтировании ResultsTable)
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

        // Отправка новой точки (из формы или клика по графику)
        // Сервер возвращает обновлённый полный список — заменяем им points
        async addPoint(pointData) {
            try {
                const response = await pointsApi.add(pointData)
                if (response.data) {
                    // Сервер присылает полный актуальный список
                    this.points = response.data
                }
            } catch (error) {
                console.error('Ошибка отправки точки:', error)
                throw error
            }
        }
    }
})