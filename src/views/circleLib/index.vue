<template>
  <PageCard style="min-height: calc(100vh - 120px); background-color: #00172C;">
    <canvas ref="container" class="container">
    </canvas>
  </PageCard>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import green from '../../assets/green.png'
const container = ref(null);
let balls = ref([{}]);

// const getImage = (score) => {
//   let img = ''
//   if (score > 90) {
//     img = '../../assets/green.png'
//   } else if (score < 60) {
//     img = '../../assets/red.png'
//   } else {
//     img = '../../assets/yellow.png'
//   }
//   return img
// }

const drawBall = (x, y, radius, color, name, score) => {
  const canvas = container.value;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.clearRect(x - 115, y - 60, 230, 120);

  // add text
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "#FF8E25");
  gradient.addColorStop(1, "#FFD645");
  ctx.fillStyle = gradient;
  ctx.font = '400 48px Impact';
  ctx.textAlign = 'center';
  ctx.fillText(score, x, y - 20);
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px Impact';
  ctx.fillText(name, x, y);
  ctx.fill()

  ctx.ellipse(x, y + 30, 59, 12, 0, 0, Math.PI * 2);
  const rg = ctx.createRadialGradient(x,y+30, 35, 12, 0, 0, 10) // 1. 创建径向渐变线
	rg.addColorStop(0, "#14A9FF")    // 2. 设定关键点
	rg.addColorStop(1, "#1DACFF")    // 2. 设定关键点
	ctx.fillStyle = rg;           // 3. 填充径向渐变

	ctx.fill();
};

const drawEllipse = (x, y, a, b) => {
  const canvas = container.value;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.ellipse(x, y, a, b, 0, 0, Math.PI * 2);
  ctx.strokeStyle = '#00A3FF'
  ctx.fillStyle = '#00A3FF'
  ctx.stroke();
};

const animate = () => {
  const canvas = container.value;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.value.forEach((ball) => {
    // calculate new position
    ball.angle += ball.speed;
    ball.x = ball.centerX + ball.a * Math.cos(ball.angle);
    ball.y = ball.centerY + ball.b * Math.sin(ball.angle);

    // draw ball
    drawBall(ball.x, ball.y, ball.radius, ball.color, ball.name, ball.score, ball.img);
  });

  // draw ellipse
  drawEllipse(canvas.width / 2, canvas.height / 2, 400, 200);

  requestAnimationFrame(animate);
};

const handleBalls = (devices) => {
  const canvas = container.value;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  balls.value = devices.map((device, index) => {
    const ball = {
      centerX: canvas.width / 2,
      centerY: canvas.height / 2,
      x: 0,
      y: 0,
      radius: 60,
      color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
      speed: 0.005,
      angle: index * (Math.PI * 2 / devices.length),
      a: 400,
      b: 200,
      name: device.name,
      score: device.score,
    };
    
    return ball;
  });
}
onMounted(() => {

  // create balls
  const data = [
    { name: '设备1', score: 95 },
    { name: '设备2', score: 75 },
    { name: '设备3', score: 85 },
    { name: '设备4', score: 65 },
    { name: '设备5', score: 90 },
    { name: '设备6', score: 80 },
    { name: '设备7', score: 70 },
    { name: '设备8', score: 85 },
    { name: '设备9', score: 75 },
    { name: '设备10', score: 90 },
    { name: '设备11', score: 90 }
  ];

  let devices = data.slice(0, 5)
  let index = 0
  let index2 = 0
  handleBalls(devices)

  setInterval(() => {
    if (index > 4) {
      index = 0
    }
    if (index2 > data.length - 1 ) {
      index2 = 0
    }
    if(index === index2) {
      index2 = index2 + 5
    }
    balls.value[index].name = data[index2].name
    balls.value[index].score = data[index2].score
    index ++
    index2 ++
  }, 10000);

  animate();
});
</script>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
  }
</style>