<template>
  <div class="container">
    <div v-for="(ball, index) in balls" :key="index" class="ball"
      :style="{ backgroundColor: ball.color, width: ball.size + 'px', height: ball.size + 'px', animationDelay: (index * 0.2) + 's' }">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const balls = ref([
  { color: '#ff0000', size: 50 },
  { color: '#00ff00', size: 40 },
  { color: '#0000ff', size: 30 },
  { color: '#ffff00', size: 20 },
  { color: '#00ffff', size: 10 }
])
console.log(balls);
const move = () => {
  const container = document.querySelector('.container')
  const ballsEl = document.querySelectorAll('.ball')
  const a = container.clientWidth / 2
  const b = container.clientHeight / 2
  const speed = 0.01
  const time = Date.now() * speed

  ballsEl.forEach((ball, index) => {
    const angle = index * ((Math.PI * 2) / ballsEl.length) + time
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

.ball {
  position: absolute;
  border-radius: 50%;
  animation: move 5s linear infinite;
}

@keyframes move {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(0, 0);
  }
}
</style>
