<template>
  <ul class="free-list">
    <TransitionGroup name="list">
      <FreeTipsItem v-for="trip in trips" :key="trip.id" :trip="trip" />
    </TransitionGroup>
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
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .list-leave-active {
    position: absolute;
  }
}
</style>
