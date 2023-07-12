import './assets/main.scss'

import { createApp, type App } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import AppC from './App.vue'
import router from './router'
import Unicon from 'vue-unicons'
import { uniArrowCircleDown } from 'vue-unicons/dist/icons'
import { auth } from './helpers/firebase'

Unicon.add([uniArrowCircleDown])

let app: App

auth.onAuthStateChanged(() => {
  if (!app) {
    const app = createApp(AppC)
    app.use(createPinia())
    app.use(router)
    app.use(MotionPlugin)
    app.use(Unicon)

    app.mount('#app')
  }
})
