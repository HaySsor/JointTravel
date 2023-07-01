import { ref } from 'vue'

export const useWindowSize = () => {
  const windowSize = ref<number>(window.innerWidth)
  const windowHight = ref<number>(window.innerWidth)

  const resize = () => {
    window.addEventListener('resize', () => {
      windowSize.value = window.innerWidth
      windowHight.value = window.innerWidth
    })
  }
  const disableResize = () => {
    window.removeEventListener('resize', () => {
      windowSize.value = window.innerWidth
      windowHight.value = window.innerWidth
    })
  }

  return { windowHight, windowSize, resize, disableResize }
}
