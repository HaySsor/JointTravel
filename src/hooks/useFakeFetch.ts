import { ref } from 'vue'
import type { Group } from '../types/types'

import Trips from '../data/trips.json'

export const useFakeFetch = () => {
  const data = ref<Group[] | null>(null)

  const fetchData = async () => {
    await wait(2000)
    const res: Group[] = Trips.trips
    data.value = [...res]
  }

  return { data, fetchData }
}

export const useFakeSpecificsFetch = () => {
  const fetchSpecificsData = async (group: string) => {
    await wait(1000)
    const res: Group[] = Trips.trips
    const find = res.find((item) => item.title.toLocaleLowerCase() === group)

    return find?.freeTrips
  }

  return { fetchSpecificsData }
}

export const useFakeTripFetch = () => {
  const fetchSpecificTrip = async (group: string, id: string) => {
    await wait(1000)
    const res: Group[] = Trips.trips
    const findList = res.find((item) => item.title.toLocaleLowerCase() === group)
    const specificsTips = findList?.freeTrips.find((item) => {
      return item.id.toString() === id
    })

    return specificsTips
  }
  return { fetchSpecificTrip }
}

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true)
    }, time)
  })
}
