<template>
  <div>
    <AppLoader v-if="specificTrip === null" />
    <div v-else class="trip__box">
      <div class="trip__box-img">
        <img :src="specificTrip?.src" :alt="specificTrip?.title" />
      </div>
      <div class="trip__box-title">
        <h1>{{ specificTrip?.title }}</h1>
      </div>
      <div class="trip__box-data">
        <div class="trip__box-data-img">
          <img src="/public/photo/calender.png" alt="." />
        </div>
        <span>{{ specificTrip.dateOfDeparture }} - {{ specificTrip.dateOfEnd }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFakeTripFetch } from '../hooks/useFakeFetch'
import { useRoute } from 'vue-router'
import type { freeTrips } from '../types/types'
import AppLoader from '@/components/AppLoader.vue'

const { fetchSpecificTrip } = useFakeTripFetch()
const route = useRoute()

const specificTrip = ref<freeTrips | null>(null)

onMounted(async () => {
  const res = await fetchSpecificTrip(route.params.group.toString(), route.params.id.toString())
  if (res) {
    specificTrip.value = { ...res }
  }
})
</script>

<style lang="scss">
.trip__box {
  padding: 10px;
  &-img {
    display: flex;
    justify-content: center;

    padding: 20px 0px;
    border-radius: 10px;
    img {
      width: 90%;
      border-radius: 25px;
      border: 3px solid darkslategray;
      box-shadow: 0 10px 10px rgba(47, 79, 79, 0.339);
    }
  }
  &-title {
    margin-top: 10px;
    padding-left: 20px;
    h1 {
      position: relative;
      font-size: 2.5rem;
      .dark & {
        color: white;
      }

      &::after {
        content: '';
        height: 3px;
        width: 120px;
        background-color: rgba(32, 178, 171, 0.779);
        position: absolute;
        bottom: -10px;
        left: 0;
      }
    }
  }
  &-data {
    padding-left: 20px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    gap: 20px;
    &-img {
      width: 50px;

      img {
        width: 100%;
      }
    }
    span {
      font-size: 1.9rem;
      .dark & {
        color: white;
      }
    }
  }
}
</style>
