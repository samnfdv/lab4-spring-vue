<script setup>
import { ref, watch } from 'vue'
import { usePointsStore } from '@/stores/points'

const store = usePointsStore()


const xValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
const rValues = [ 1, 2, 3, 4]


const x = ref(0)
const y = ref('')
const r = ref(1)

const errorMessage = ref('')
const isLoading = ref(false)


watch(r, (val) => {
  store.setRadius(val)
}, { immediate: true })


const validate = () => {
  const yStr = y.value.toString().replace(',', '.').trim()
  if (yStr === '' || isNaN(yStr)) return 'Y должен быть числом'
  const yNum = parseFloat(yStr)
  if (yNum < -5 || yNum > 3) return 'Y должен быть в диапазоне от -5 до 3'
  if (r.value === null || r.value === undefined) return 'Выберите радиус R'
  return null
}

const onSubmit = async () => {
  errorMessage.value = ''
  const error = validate()
  if (error) { errorMessage.value = error; return }

  const payload = {
    x: x.value,
    y: parseFloat(y.value.toString().replace(',', '.')),
    r: r.value
  }

  isLoading.value = true
  try {
    await store.addPoint(payload)
  } catch {
    errorMessage.value = 'Ошибка сервера. Попробуйте позже.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="form-card">
    <h3>Параметры точки</h3>

    <form @submit.prevent="onSubmit" class="points-form" novalidate>


      <div class="form-group">
        <label class="group-label">Координата X:</label>
        <div class="checkbox-grid">
          <label
              v-for="val in xValues"
              :key="'x' + val"
              class="checkbox-item"
              :class="{ active: x === val }"
          >
            <input
                type="radio"
                :value="val"
                v-model="x"
                name="xGroup"
                class="hidden-input"
            />
            {{ val }}
          </label>
        </div>
      </div>


      <div class="form-group">
        <label for="y-input" class="group-label">Координата Y <span class="hint-inline">(-5 … 3)</span>:</label>
        <input
            id="y-input"
            type="text"
            v-model="y"
            placeholder="Например: -2.5"
            class="text-input"
            :class="{ 'input-error': errorMessage && errorMessage.includes('Y') }"
        />
      </div>


      <div class="form-group">
        <label class="group-label">Радиус R:</label>
        <div class="checkbox-row">
          <label
              v-for="val in rValues"
              :key="'r' + val"
              class="checkbox-item"
              :class="{ active: r === val }"
          >
            <input
                type="radio"
                :value="val"
                v-model="r"
                name="rGroup"
                class="hidden-input"
            />
            {{ val }}
          </label>
        </div>
      </div>


      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>


      <button type="submit" class="submit-btn" :disabled="isLoading">
        <span v-if="isLoading">⏳ Отправка...</span>
        <span v-else>✓ Проверить</span>
      </button>

    </form>
  </div>
</template>


<style scoped>
.form-card {
  background: #CCE5FF;
  border: 5px solid #F2749B;
  border-radius: 20px;
  padding: 2rem;
}

h3 {
  color: #F2749B;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

.group-label, .error-msg {
  color: #F2749B;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: block;
}

/* Сетка для X и R */
.checkbox-grid, .checkbox-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

/* Стилизация кнопок-выбора */
.checkbox-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  min-width: 45px;
  background: #CCE5FF;
  border: 3px solid #F2749B; /* Розовая рамка */
  border-radius: 10px;
  color: #F2749B;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

/* Полностью скрываем стандартный кружок радио-кнопки */
.hidden-input {
  display: none;
}

.checkbox-item:hover {
  background: rgba(242, 116, 155, 0.1);
}

/* Активное состояние (когда выбрали) */
.checkbox-item.active {
  background: #F2749B;
  color: #CCE5FF;
}

/* Поле ввода Y */
.text-input {
  width: 100%;
  background: #CCE5FF;
  border: 3px solid #F2749B;
  border-radius: 10px;
  padding: 12px;
  color: #F2749B;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1rem;
  outline: none;
}



/* Кнопка Проверить */
.submit-btn {
  background: #F2749B;
  color: #CCE5FF;
  border: none;
  border-radius: 10px;
  padding: 18px;
  width: 100%;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 10px;
}
/* Сетка X по умолчанию (Мобильный) */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 кнопки в ряд */
  gap: 8px;
}

/* Планшет и Десктоп */
@media (min-width: 656px) {
  .checkbox-grid {
    grid-template-columns: repeat(5, 1fr); /* 5 кнопок в ряд */
  }
}

/* Если на планшете (656-1210) форма зажата графиком,
   можно уменьшить шрифт, чтобы всё влезло */
@media (min-width: 656px) and (max-width: 1210px) {
  .checkbox-item {
    padding: 8px 5px;
    font-size: 0.8rem;
  }
  h3 { font-size: 1.1rem; }
}
</style>