<script setup>
import { computed } from 'vue'
import { usePointsStore } from '@/stores/points'

const store = usePointsStore()

const V = 300
const C = V / 2
const RP = 100

const currentR = computed(() => store.currentR)

const rectConfig = { x: C - RP, y: C - RP / 2, width: RP, height: RP / 2 }
const trianglePoints = `${C},${C} ${C - RP },${C} ${C},${C + RP}`
const sectorPath = `M ${C} ${C} L ${C + RP } ${C} A ${RP } ${RP } 0 0 1 ${C} ${C + RP} Z`

const handleSvgClick = (event) => {
  if (!currentR.value || currentR.value <= 0) {
    alert('Пожалуйста, сначала выберите радиус R!')
    return
  }
  const svg = event.currentTarget
  const rect = svg.getBoundingClientRect()
  const scaleX = V / rect.width
  const scaleY = V / rect.height
  const vbX = (event.clientX - rect.left) * scaleX
  const vbY = (event.clientY - rect.top) * scaleY
  const mathX = parseFloat(((vbX - C) / RP * currentR.value).toFixed(3))
  const mathY = parseFloat(((C - vbY) / RP * currentR.value).toFixed(3))
  store.addPoint({ x: mathX, y: mathY, r: currentR.value })
}

const plottedPoints = computed(() => {
  if (!currentR.value || currentR.value <= 0) return []
  return store.points
      .filter(pt => pt.r === store.currentR)
      .map(pt => ({
        cx: C + (pt.x / currentR.value) * RP,
        cy: C - (pt.y / currentR.value) * RP,
        isHit: pt.success,
        original: pt
      }))
})
</script>

<template>
  <div class="graph-wrapper">
    <h3 class="graph-title">График</h3>
    <svg viewBox="0 0 300 300" class="graph-svg" @click="handleSvgClick" xmlns="http://www.w3.org/2000/svg">
      <rect :x="rectConfig.x" :y="rectConfig.y" :width="rectConfig.width" :height="rectConfig.height" class="area-shape" />
      <polygon :points="trianglePoints" class="area-shape" />
      <path :d="sectorPath" class="area-shape" />

      <line x1="5" :y1="C" :x2="V - 5" :y2="C" class="axis" />
      <line :x1="C" y1="5" :x2="C" :y2="V - 5" class="axis" />
      <polygon :points="`${V - 2},${C} ${V - 12},${C - 5} ${V - 12},${C + 5}`" fill="#334155" />
      <polygon :points="`${C},2 ${C - 5},12 ${C + 5},12`" fill="#334155" />
      <text :x="V - 8" :y="C - 8" class="axis-name">X</text>
      <text :x="C + 6" :y="14" class="axis-name">Y</text>

      <g>
        <line :x1="C + RP"   :y1="C - 5" :x2="C + RP"   :y2="C + 5" class="tick" />
        <text :x="C + RP"    :y="C + 16" text-anchor="middle" class="tick-label">R</text>
        <line :x1="C + RP/2" :y1="C - 5" :x2="C + RP/2" :y2="C + 5" class="tick" />
        <text :x="C + RP/2"  :y="C + 16" text-anchor="middle" class="tick-label">R/2</text>
        <line :x1="C - RP/2" :y1="C - 5" :x2="C - RP/2" :y2="C + 5" class="tick" />
        <text :x="C - RP/2"  :y="C + 16" text-anchor="middle" class="tick-label">-R/2</text>
        <line :x1="C - RP"   :y1="C - 5" :x2="C - RP"   :y2="C + 5" class="tick" />
        <text :x="C - RP"    :y="C + 16" text-anchor="middle" class="tick-label">-R</text>

        <line :x1="C - 5" :y1="C - RP"   :x2="C + 5" :y2="C - RP"   class="tick" />
        <text :x="C + 8"  :y="C - RP + 4"              class="tick-label">R</text>
        <line :x1="C - 5" :y1="C - RP/2" :x2="C + 5" :y2="C - RP/2" class="tick" />
        <text :x="C + 8"  :y="C - RP/2 + 4"            class="tick-label">R/2</text>
        <line :x1="C - 5" :y1="C + RP/2" :x2="C + 5" :y2="C + RP/2" class="tick" />
        <text :x="C + 8"  :y="C + RP/2 + 4"            class="tick-label">-R/2</text>
        <line :x1="C - 5" :y1="C + RP"   :x2="C + 5" :y2="C + RP"   class="tick" />
        <text :x="C + 8"  :y="C + RP + 4"              class="tick-label">-R</text>
      </g>

      <circle
          v-for="(pt, i) in plottedPoints"
          :key="i"
          :cx="pt.cx" :cy="pt.cy"
          r="5"
          :fill="pt.isHit ? '#22c55e' : '#ef4444'"
          stroke="white" stroke-width="1.5"
      >
        <title>X={{ pt.original.x }}, Y={{ pt.original.y }}, R={{ pt.original.r }} | {{ pt.isHit ? 'Попал' : 'Не попал' }}</title>
      </circle>
    </svg>
    <p class="graph-hint">Нажмите на график для добавления точки</p>
  </div>
</template>


<style scoped>
.graph-wrapper {
  background: #CCE5FF;
  border: 4px solid #F2749B;
  border-radius: 15px;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.graph-title {
  color: #F2749B;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 1rem;
}

.graph-svg {
  width: 100%;
  max-width: 380px;
  background: #CCE5FF;
  border: 3px solid #F2749B;
  border-radius: 10px;
}


.area-shape {
  fill: #F2749B;
  fill-opacity: 0.15;
  stroke: #F2749B;
  stroke-width: 2;
}

.axis { stroke: #F2749B; stroke-width: 2.5; }
.axis-name { fill: #F2749B; font-weight: 900; }
.tick { stroke: #F2749B; stroke-width: 2; }
.tick-label { fill: #F2749B; font-weight: 900; }

.graph-hint {
  color: #F2749B;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.7rem;
  margin-top: 10px;
}
</style>