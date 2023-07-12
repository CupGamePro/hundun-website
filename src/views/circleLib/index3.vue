<template>
  <div class="container">
    <div v-for="(ball, index) in balls" :key="index" class="ball">
      {{ ball.color }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const balls = ref([
  { color: '#ff0000', size: 50 },
  { color: '#00ff00', size: 50 },
  { color: '#0000ff', size: 50 },
  { color: '#ffff00', size: 50 },
  { color: '#00ffff', size: 50 }
])
const move = () => {
  const container = document.querySelector('.container')
  const ballsEl = document.querySelectorAll('.ball')
  const a = container.clientWidth / 2
  const b = container.clientHeight / 2
  const speed = 0.001

  ballsEl.forEach((ball, index) => {
    const angle = index * (Math.PI * 2 / balls.value.length) + speed
    const x = a * Math.cos(angle)
    const y = b * Math.sin(angle)

    ball.style.transform = `translate(${x}px, ${y}px)`
  })

  requestAnimationFrame(move)
}
onMounted(() => {
  move()
})
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

</style>
