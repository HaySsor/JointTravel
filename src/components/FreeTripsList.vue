<template>
  <ul class="free-list">
    <FreeTipsItem v-for="trip in trips" :key="trip.id" :trip="trip" />
  </ul>
</template>

<script setup lang="ts">
import FreeTipsItem from './FreeTipsItem.vue'
import type { freeTrips } from '@/types/types'

defineProps<{
  trips: freeTrips[] | undefined
}>()
</script>

<style lang="scss">
.free-list {
  list-style: none;
  padding: 0 10px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 10px;
  
}
</style>
