<script lang="ts" setup>
import { useAppStore } from "@/stores/appStore"
import { onMounted } from "vue"
// this is a self-defined component as an example
// unplugin-auto-import will automatically import vue content you will use

// define what parent-component can set 
interface Props {
    title?: string,
    height?: number
}
// assign [props] with default value in case parent-component does not specify
const props = withDefaults(defineProps<Props>(), {
    title: '',
    height: 80
})

// define what parent-component can get
defineExpose({
})

const appStore = useAppStore()
onMounted(() => {
    appStore.headerHeight = props.height // store as responsive value/function for global (sibling-component, etc) to use 
})

</script>

<template>
    <div class="header-wrapper" :style="{ 'height': props.height + 'px', 'line-height': props.height + 'px' }">
        {{ props.title }}
    </div>
</template>

<style scoped>
 /* scoped restrict css below only for this file */
.header-wrapper {
    width: 100%;
    text-align: center;
    font-family: monospace;
    font-size: 18px;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    z-index: 1000;
}
</style>