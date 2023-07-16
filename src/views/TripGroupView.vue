<template>
  <AppLoader v-if="filterList === null" />
  <main v-else class="choose-group-box">
    <div class="filter-box">
      <div class="option-box">
        <span class="text">Difficult Level</span>
        <select class="filter-box__select" v-model="defLevelSelect">
          <option value="0">All trips</option>
          <option v-for="option in maxDefLevelInTrip" :value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="option-box">
        <span class="text">Free Vacancies</span>
        <input type="number" class="filter-box__input" v-model="numberOfVacancies" />
      </div>
    </div>
    <FreeTripsList v-if="DisplayListFilter" :trips="DisplayListFilter" />
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useFakeSpecificsFetch } from '@/hooks/useFakeFetch'
import { computed, onMounted, ref, watch, provide } from 'vue'
import AppLoader from '@/components/AppLoader.vue'
import FreeTripsList from '@/components/FreeTripsList.vue'
import type { freeTrips } from '@/types/types'

const { fetchSpecificsData } = useFakeSpecificsFetch()
const router = useRouter()
const route = useRoute()
const defLevelSelect = ref<any>(route.query.defLevel || '0')

const filterList = ref<freeTrips[] | null>(null)
const maxDefLevelInTrip = ref<number[]>([])
const numberOfVacancies = ref(route.query.vacancies || '0')

provide('group', route.params.group.toString())

onMounted(async () => {
  const res = await fetchSpecificsData(route.params.group.toString())
  if (res) {
    filterList.value = res
  }
})

watch(defLevelSelect, (newValue) => {
  router.push({
    name: 'Group',
    params: { ...route.params },
    query: { ...route.query, defLevel: newValue.toString() }
  })
})

watch(numberOfVacancies, (newValue) => {
  if (newValue === '') {
    router.push({
      name: 'Group',
      params: { ...route.params },
      query: { ...route.query, vacancies: '0' }
    })
  } else {
    router.push({
      name: 'Group',
      params: { ...route.params },
      query: { ...route.query, vacancies: newValue }
    })
  }
})

watch(filterList, () => {
  const listDefLevelTrip = filterList.value?.map((item) => item.difficultyLevel)
  if (listDefLevelTrip) {
    maxDefLevelInTrip.value = [...new Set(listDefLevelTrip)].sort((a, b) => a - b)
  }
})

const filterArrayOfNumberVacancies = (array: freeTrips[]) => {
  return array?.filter((item) => item.vacancies >= parseFloat(numberOfVacancies.value.toString()))
}

const DisplayListFilter = computed(() => {
  let list = filterList.value

  if (numberOfVacancies.value !== '0' && numberOfVacancies.value !== '' && list !== null) {
    const newList = filterArrayOfNumberVacancies(list)
    if (newList) {
      list = newList
    }
  }

  if (defLevelSelect.value !== '0') {
    let newList = list?.filter((item) => item.difficultyLevel <= parseFloat(defLevelSelect.value))
    if (newList) {
      if (numberOfVacancies.value !== '0' && numberOfVacancies.value !== '') {
        newList = filterArrayOfNumberVacancies(newList)
      }
      list = newList
    }
  }

  return list
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
  gap: 10px;

  .option-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    .text {
      font-size: 1.4rem;
      text-align: center;
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
  &__input {
    padding: 5px;
    border-radius: 20px;
    border: 1px solid darkslategray;
    width: 50px;
  }
}
</style>
