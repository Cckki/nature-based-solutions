<script setup lang="ts">// setup -> auto export && declare component
import Header from '@/components/header.vue'
import { ref } from 'vue'

const height = ref(80)
const mapTitle = ref('Nature-Based Solutions in Transportation Projects')

</script>

<template>
  <div>
    <Header :height="height" :title="mapTitle" />
    <div :style="{ 'padding-top': height + 'px' }">
      <RouterView />
    </div>
  </div>
</template>

<style>
/* Eliminate the default style of Chrome */
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  min-width: 1000px;
  overflow-x: auto;
}
</style>
