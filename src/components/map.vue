<script setup lang="ts">
import { initMap, lazyLoadMarkers, initLegend } from "@/config/map.factory"
import { Regions } from "@/config/map.config"
import { ref, onMounted } from "vue"
import { useAppStore } from "@/stores/appStore"
import { coordinateFilter } from "@/utils/filter"
import { parseCsvToJson } from "@/utils/csv.parser"

const appStore = useAppStore()
const openTab = (url: string) => {
  if (url && url.replace(/\s+/g, "") != '') window.open(url, '_blank')
}

const caseInfo = ref({
  visible: false,
  data: {
    name: '',
    Description: '',
    AssetType:'',
    imgURL: '',
    Source: '',
    Location:''
  }
})

onMounted(async () => {
  const { map, markerCluster } = initMap("map", Regions.USA)
  const { legend } = initLegend(map)
  const spots1 = await parseCsvToJson(import.meta.env.BASE_URL + 'data/domestic.csv')
  const spots2 = await parseCsvToJson(import.meta.env.BASE_URL + 'data/overseas.csv')
  lazyLoadMarkers(map, coordinateFilter([...spots1, ...spots2]), null, (location) => {
    caseInfo.value.data = location
    caseInfo.value.visible = true
  })
})
</script>

<template>
  <div id="map" :style="{ height: `calc(100vh - ${appStore.headerHeight}px)` }">
    <a-modal v-model:open="caseInfo.visible" centered width="80%" :title="caseInfo.data.name"
      @ok="caseInfo.visible = false">
      <div class="map-case-wrapper">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          <a-form-item label="snapshot"  v-if="caseInfo.data.imgURL" >
            <img :src="caseInfo.data.imgURL" class="map-case-img" />
          </a-form-item>
          <a-form-item label="brief-intro">
            <div class="map-project-intro">
              {{ caseInfo.data.Location }}<br />
              {{ caseInfo.data.Description }}
            </div>
          </a-form-item>
          <a-form-item label="project-link">
            <a-typography-link type="link" style="white-space: normal" @click="openTab(caseInfo.data.Source)">
              {{ caseInfo.data.Source }}</a-typography-link>
          </a-form-item>
        </a-form>
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

.map-project-intro{
  text-align: justify;
}
</style>