<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const now = ref(new Date())
let timer = null

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
})
onUnmounted(() => clearInterval(timer))

const hours   = computed(() => String(now.value.getHours()).padStart(2, '0'))
const minutes = computed(() => String(now.value.getMinutes()).padStart(2, '0'))


const dateStr = computed(() =>
    now.value.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
)
</script>

<template>
  <div class="lock-clock">
    <div class="lock-date">{{ dateStr }}</div>
    <div class="lock-time">
      <span class="lock-digits">{{ hours }}</span>
      <span class="lock-colon">:</span>
      <span class="lock-digits">{{ minutes }}</span>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;800&display=swap');

.lock-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-bottom: 28px;
  user-select: none;
}

/* Дата — как на фото: обычный белый/розовый текст, по центру, без сокращений */
.lock-date {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  color: #F2749B;
  text-transform: capitalize; /* "пятница" → "Пятница" */
  margin-bottom: 4px;
  text-shadow: 0 1px 8px rgba(242, 116, 155, 0.3);
}

/* Блок времени */
.lock-time {
  display: flex;
  align-items: center;
  line-height: 1;
  gap: 0;
}

/* Цифры — огромные, с объёмным стеклянным эффектом как на фото */
.lock-digits {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: clamp(5.5rem, 20vw, 9rem);
  letter-spacing: -0.02em;
  line-height: 1;



  /* Объём: несколько слоёв теней */
  color: #F2749B;
}

/* Двоеточие — того же стиля, мигает */
.lock-colon {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: clamp(5.5rem, 20vw, 9rem);
  line-height: 1;
  margin: 0 4px;
  position: relative;
  top: -6px; /* Двоеточие чуть выше, как у Apple */


  color: #F2749B;

  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.2; }
}
</style>