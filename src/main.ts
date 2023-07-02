import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'
import Unicon from 'vue-unicons'
import { uniArrowCircleDown } from 'vue-unicons/dist/icons'

Unicon.add([uniArrowCircleDown])

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(Unicon)

app.mount('#app')
