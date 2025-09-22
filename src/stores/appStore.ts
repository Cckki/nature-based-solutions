import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('storage', () => {
  // define something automatically responsive and can be access globally
  const headerHeight = ref(80)
  return { headerHeight }
})
