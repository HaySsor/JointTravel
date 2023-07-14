<template>
  <div class="trips-container">
    <TripsItem v-for="trip in data" :key="trip.id" :trip="trip" />
    <div class="trips-container-blob"></div>
  </div>
</template>

<script setup lang="ts">
import TripsItem from './TripsItem.vue'
import { useFakeFetch } from '@/hooks/useFakeFetch'

const { data, fetchData } = useFakeFetch()
await fetchData()
</script>

<style lang="scss">
.trips-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  place-items: center;
  gap: 10px;

  &-blob {
    display: none;
  }
}

@media screen and (min-width: 586px) {
  .trips-container {
    &-blob {
      display: block;
      position: absolute;
      inset: 0;
      background-image: url('/public/photo/blob1.svg');
      background-repeat: no-repeat;
      z-index: -99;
      opacity: 0.1;
      background-position: center;
    }
  }
}
</style>
