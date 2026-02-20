<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Graph from './Graph.vue'
import PointsForm from './PointsForm.vue'
import ResultsTable from './ResultsTable.vue'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="page">


    <header class="page-header">
      <div class="header-left">
        <span class="student-info">Нефёдов Семён Александрович · Группа P3221 · Вариант 22</span>
      </div>
      <div class="header-right">
        <span class="username">{{ authStore.user?.username }}</span>
        <a href="#" class="logout-link" @click.prevent="logout">Выйти</a>
      </div>
    </header>


    <main class="page-body">


      <section class="top-section">
        <div class="form-col">
          <PointsForm />
        </div>
        <div class="graph-col">
          <Graph />
        </div>
      </section>


      <section class="table-section">
        <ResultsTable />
      </section>

    </main>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

.page {
  min-height: 100vh;
  background: #CCE5FF; /* Наш голубой фон */
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
}

/* --- Шапка --- */
.page-header {
  background: #CCE5FF;
  color: #F2749B;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #F2749B; /* Жирный низ */
}

.student-info, .username {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1rem;
}

.logout-link {
  color: #CCE5FF;
  background-color: #F2749B;
  padding: 8px 15px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 900;
  text-transform: uppercase;
  transition: transform 0.1s;
}

.logout-link:hover {
  transform: scale(1.05);
}

.page-body {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.top-section {
  display: grid;
  gap: 2rem;
}


@media (min-width: 1211px) {
  .top-section {
    /* Форме отдаем 1.2 части, графику 1 часть — так график станет уже */
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    gap: 30px;
  }
}
/* Базовые стили (Мобильный режим: < 656px) */
.page-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  overflow-y: auto;
}

.top-section {
  display: grid;
  grid-template-columns: 1fr; /* Всё в одну колонку */
  gap: 20px;
}

.page-header {
  flex-direction: column; /* Шапка в два ряда на мобилках */
  align-items: center;
  text-align: center;
  gap: 10px;
}

/* "Планшетный" режим (656px <= экран < 1211px) */
@media (min-width: 656px) and (max-width: 1210px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
  }

  .top-section {
    grid-template-columns: 1fr 1fr; /* Делим экран пополам */
    align-items: start;
  }
}

/* "Десктопный" режим (экран >= 1211px) */
@media (min-width: 1211px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 3rem;
  }

  .top-section {
    /* Форма чуть шире графика для баланса */
    grid-template-columns: 1.2fr 1fr;
    gap: 30px;
  }

  .page-body {
    max-width: 1300px;
    margin: 0 auto;
  }
}
</style>
