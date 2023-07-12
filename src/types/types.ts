export type Group = {
  id: number
  src: string
  title: string
  freeTrips: freeTrips[]
}

export type freeTrips = {
  id: number | string
  title: string
  guide: string
  vacancies: number
  tourSize: number
  dateOfDeparture: string
  dateOfEnd: string
  difficultyLevel: number
  price: string
  src?: string
}

export type UserData = {
  email: string
  password: string
}
