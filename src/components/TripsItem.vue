<template>
  <RouterLink
    :to="{
      name: 'Group',
      params: { group: props.trip?.title.toLocaleLowerCase() },
      query: { defLevel: 0 }
    }"
    class="trip-link"
  >
    <div class="trip-item-box" ref="targetEl">
      <img :src="props.trip?.src" />
      <h3 class="trip-item-box-title">{{ props.trip?.title }}</h3>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { useMotion } from '@vueuse/motion'
import type { Group } from '@/types/types'

const props = defineProps({
  trip: Object as PropType<Group>
})

const targetEl = ref()
useMotion(targetEl, {
  initial: {
    opacity: 0,
    y: 100
  },
  visibleOnce: {
    opacity: 1,
    y: 0
  }
})
</script>

<style lang="scss">
.trip-link {
  text-decoration: none;
}
.trip-item-box {
  width: 170px;
  height: 170px;
  background-color: #20b2aa;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.13);
  border-radius: 25px;
  overflow: hidden;
  isolation: isolate;

  img {
    width: 100%;
    height: 80%;
    z-index: -1;
    object-fit: cover;
    border-radius: 25px;
  }
  &-title {
    z-index: 10;
    font-size: 2rem;
    text-align: center;
    margin-top: 2px;
    color: white;
  }
}
</style>
<!-- 
 -->
