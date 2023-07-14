<template>
  <AppLoader v-if="filterList === null" />
  <main v-else class="choose-group-box">
    <div class="filter-box">
      <div class="option-box">
        <span class="text">Difficult Level</span>
        <select class="filter-box__select" v-model="defLevelSelect">
          <option value="0">All trips</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
    <FreeTripsList v-if="ListFilter" :trips="ListFilter" />
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useFakeSpecificsFetch } from '@/hooks/useFakeFetch'
import { computed, onMounted, ref, watch } from 'vue'
import AppLoader from '@/components/AppLoader.vue'
import FreeTripsList from '@/components/FreeTripsList.vue'
import type { freeTrips } from '@/types/types'

const { fetchSpecificsData } = useFakeSpecificsFetch()
const router = useRouter()

const {
  params: { group, defLevel }
} = useRoute()

const filterList = ref<freeTrips[] | null>(null)

onMounted(async () => {
  const res = await fetchSpecificsData(group.toString())
  if (res) {
    filterList.value = res
  }
})

const defLevelSelect = ref(defLevel)

watch(defLevelSelect, (newValue) => {
  router.push({
    name: 'Group',
    params: {
      group,
      defLevel: newValue
    }
  })
})

const ListFilter = computed(() => {
  const list = filterList.value?.filter(
    (trip) => trip.difficultyLevel <= parseFloat(defLevelSelect.value.toString())
  )

  return defLevelSelect.value == '0' ? filterList.value : list
})
</script>

<style lang="scss">
.choose-group-box {
  margin-top: 10px;
}
.filter-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid darkslategray;
  padding: 10px;
  border-radius: 25px;
  margin-bottom: 10px;

  .option-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .text {
      font-size: 1.4rem;
      .dark & {
        color: white;
      }
    }
  }
  &__select {
    padding: 5px 15px;
    border: none;
    border: 1px solid darkslategray;
    border-radius: 25px;
  }
}
</style>
