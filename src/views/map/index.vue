<template>
  <div>
    <div style="min-height: 500px; justify-content: center;position: relative" id="map" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Scene } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

onMounted(() => {
  new Scene({
    id: 'map',
    map: new GaodeMap({
      pitch: 35.210526315789465,
      style: 'dark',
      center: [104.288144, 31.239692],
      zoom: 4.4
    })
  })
})
</script>