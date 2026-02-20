<script setup>
import {ref} from 'vue'
import {useAuthStore} from '@/stores/auth'
import {useRouter} from 'vue-router'
import ClockWidget from './Time.vue'
const authStore = useAuthStore()
const router = useRouter()


const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const isLogin = ref(true)
const password2 = ref('')

async function passwordError() {
  throw new Error('Введенные пароли не совпадают');
}


const handleSubmit = async () => {

  errorMessage.value = ''
  isLoading.value = true

  try {

    if (isLogin.value) {

      await authStore.login({
        username: username.value,
        password: password.value
      })
    } else {
      if (password.value === password2.value) {
        await authStore.register({
          username: username.value,
          password: password.value
        })
      }else{await passwordError() }
    }


    await router.push('/dashboard')

  } catch (error) {
    if (isLogin.value){
    errorMessage.value = 'Неверный логин или пароль'}
    else {errorMessage.value=error.message}
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">

    <div class="auth-card">
      <ClockWidget />
      <h1>{{ isLogin ? 'Вход' : 'Регистрация' }}</h1>


    <form @submit.prevent="handleSubmit" id="formo4ka">
      <div class="form-group">
        <label>Логин:</label>
        <input v-model="username" type="text" required />
      </div>

      <div class="form-group">
        <label>Пароль:</label>
        <input v-model="password" type="password" required/>
      </div>

      <div class="form-group" v-if="!isLogin">
        <label>Повторите пароль:</label>
        <input v-model="password2" type="password" required/>
      </div>

      <transition name="fade">

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </transition>

      <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">
            {{ isLogin ? 'Войти' : 'Создать аккаунт' }}
          </span>
        <span v-else class="loader"></span>
      </button>


      <div class="switch-mode">
          <span @click="isLogin = !isLogin">
            {{ isLogin ? 'Ещё нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти' }}
          </span>
      </div>

    </form>
      </div>
  </div>
</template>
<style scoped>
/* Импортируем жирный шрифт для пущего сходства */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&display=swap');

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* Фон страницы — голубой */
  background-color: #CCE5FF;
  font-family: 'Montserrat', sans-serif;
  color: #F2749B;
}

/* Контейнер формы делаем прозрачным, так как фон уже голубой */
#formo4ka {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

h1 {
  /* Текст — розовый */
  color: #F2749B;
  text-align: center;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 2.5rem;
  margin-bottom: 40px;
  line-height: 0.9;
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 0.9rem;
  color: #F2749B;
}

/* Поля ввода: голубой фон и розовая рамка как на кнопке в примере */
input {
  width: 100%;
  padding: 15px;
  background-color: #CCE5FF;
  border: 3px solid #F2749B; /* Жирная розовая рамка */
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  color: #F2749B;
  box-sizing: border-box;
  outline: none;
  font-size: 1.1rem;
}

input::placeholder {
  color: rgba(242, 116, 155, 0.5);
}

/* Кнопка: розовый фон, голубой текст (инверсия) */
button {
  width: 100%;
  padding: 18px;
  background-color: #F2749B;
  color: #CCE5FF;
  border: none;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.1s ease;
}

button:hover {
  transform: scale(1.02);
}

button:active {
  transform: scale(0.98);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Ошибка: жирный розовый текст */
.error {
  color: #F2749B;
  font-weight: 800;
  text-align: center;
  border: 3px solid #F2749B;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 20px;
}

/* Переключатель внизу */
label[style*="cursor"],
.login-page label:last-child {
  display: block;
  text-align: center;
  margin-top: 25px;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.8rem;
  transition: opacity 0.2s;
}

label:last-child:hover {
  opacity: 0.7;
}

/* Лоадер в розовом цвете */
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid #CCE5FF;
  border-top-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>