import { ref } from 'vue'
import type { Trip } from '../types/types'

import Trips from '../data/trips.json'

export const useFakeFetch = () => {
  const data = ref<Trip[] | null>(null)

  const fetchData = async () => {
    await wait(2000)
    const res: Trip[] = Trips.trips
    data.value = [...res]
  }

  return { data, fetchData }
}

export const useFakeSpecificsFetch = () => {
  const chosenGroup = ref<Trip | null>(null)

  const fetchSpecificsData = async (id: number) => {
    await wait(1000)
    const res: Trip[] = Trips.trips
    const find = res.find((item) => item.id === id)

    if (find) {
      chosenGroup.value = find
    }
  }

  return { chosenGroup, fetchSpecificsData }
}

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true)
    }, time)
  })
}
