<script setup lang="ts">
import { initMap, lazyLoadMarkers, initLegend } from "@/config/map.factory"
import { Regions } from "@/config/map.config"
import { ref, onMounted } from "vue"
import { useAppStore } from "@/stores/appStore"
import { coordinateFilter } from "@/utils/filter"
import { parseCsvToJson } from "@/utils/csv.parser"

const appStore = useAppStore()
const caseInfo = ref({
  visible: false,
  data: {
    name:'',
    imgURL:'',
  }
})

onMounted(async () => {
  const { map, markerCluster } = initMap("map", Regions.USA)
  const { legend } = initLegend(map)
  const spots1 = await parseCsvToJson(import.meta.env.BASE_URL + 'data/domestic.csv')
  const spots2 = await parseCsvToJson(import.meta.env.BASE_URL + 'data/overseas.csv')
  lazyLoadMarkers(map, coordinateFilter([...spots1, ...spots2]), null, (location) => {
    // caseInfo.value.data = location
    // caseInfo.value.visible = true
    if (location.Source && location.Source != '') window.open(location.Source, '_blank')
  })
})
</script>

<template>
  <div id="map" :style="{ height: `calc(100vh - ${appStore.headerHeight}px)` }">
    <a-modal v-model:open="caseInfo.visible" centered width="80%" :title="caseInfo.data.name"
      @ok="caseInfo.visible = false">
      <div class="map-case-wrapper">
        <img v-if="caseInfo.data.imgURL" :src="caseInfo.data.imgURL" class="map-case-img" />
        <div>
          {{ caseInfo.data }}
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
/* scoped restrict css below only for this file */
#map {
  width: 100%;
}

.map-case-wrapper {
  text-align: center;
}

.map-case-img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
}
</style>