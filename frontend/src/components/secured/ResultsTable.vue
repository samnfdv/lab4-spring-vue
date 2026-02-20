<script setup>
import { computed, onMounted } from 'vue'
import { usePointsStore } from '@/stores/points'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const store = usePointsStore()


onMounted(() => {
  store.fetchPoints()
})
const sortedPoints = computed(() =>
    [...store.points].reverse()
)
</script>

<template>
  <div class="results-card">
    <h3>История проверок</h3>
    <DataTable
        :value="sortedPoints"
        :loading="store.loading"
        stripedRows
        paginator
        :rows="8"
        responsiveLayout="stack"
        breakpoint="656px"
        class="p-datatable-sm"
        emptyMessage="Нет результатов. Добавьте первую точку!"
    >


      <Column field="x" header="X" sortable style="width: 15%" />
      <Column field="y" header="Y" sortable style="width: 15%" />
      <Column field="r" header="R" sortable style="width: 15%" />
      <Column field="success" header="Результат" >
        <template #body="slotProps">
    <span :class="slotProps.data.success ? 'badge--hit' : 'badge--miss'">
      {{ slotProps.data.success ? '✓ Попал' : '✗ Мимо' }}
    </span>
        </template>
      </Column>
      <Column field="checkTime" header="Время" sortable style="width: 27%">
        <template #body="slotProps">
          {{ slotProps.data.time ?? '—' }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.results-card {
  background: #CCE5FF;
  border: 4px solid #F2749B;
  border-radius: 15px;
  padding: 1.5rem;
}

h3 {
  color: #F2749B;
  font-weight: 900;
  text-transform: uppercase;
}

/* Перекрашиваем PrimeVue DataTable */
:deep(.p-datatable) {
  border: 3px solid #F2749B;
  border-radius: 10px;
  overflow: hidden;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: #F2749B;
  color: #CCE5FF;
  font-weight: 900;
  text-transform: uppercase;
  border: none;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  background: #CCE5FF;
  color: #F2749B;
  font-weight: 800;
}

:deep(.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even)) {
  background: rgba(242, 116, 155, 0.1); /* Легкий оттенок для полосок */
}

/* Бейджи Попал/Мимо */
.badge--hit {
  background: #F2749B;
  color: #CCE5FF;
  padding: 4px 8px;
  border-radius: 5px;
  font-weight: 900;
}

.badge--miss {
  border: 2px solid #F2749B;
  padding: 2px 6px;
  border-radius: 5px;
  font-weight: 900;
}

/* Пагинация */
:deep(.p-paginator) {
  background: #CCE5FF !important;
  border-top: 3px solid #F2749B !important;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: #F2749B;
  color: #CCE5FF;
}
:deep(.p-paginator .p-paginator-pages .p-paginator-page),
:deep(.p-paginator .p-link) {
  background: #CCE5FF !important;
  color: #F2749B !important;
  border: 2px solid #F2749B !important;
  font-weight: 900 !important;
  margin: 0 4px;
  min-width: 35px;
  height: 35px;
  border-radius: 50% !important; /* Круглые кнопки как на скриншоте */
}

:deep(.p-datatable-thead > tr > th) {
  border-bottom: 3px solid #CCE5FF !important;
}
/* На мобилках уменьшаем отступы, чтобы таблица влезла */
@media (max-width: 655px) {
  :deep(.p-datatable .p-datatable-tbody > tr > td) {
    padding: 0.4rem 0.5rem !important;
    font-size: 0.8rem;
  }

  /* Скрываем колонку времени на совсем маленьких экранах, если не влезает */
  :deep(.p-datatable th:nth-child(5)),
  :deep(.p-datatable td:nth-child(5)) {
    display: none;
  }
}

</style>