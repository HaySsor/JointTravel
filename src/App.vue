<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import { useUserStore } from './stores/user'
import { auth } from './helpers/firebase'
setTimeout(function () {
  document.body.className = ''
}, 500)

const userStore = useUserStore()

if (auth.currentUser) {
  userStore.user.ifLogged = true
  const userName = auth.currentUser?.email?.match(/^(.*?)@/)
  if (userName !== null && userName) {
    userStore.user.userName = userName[1]
  }
}
</script>

<template>
  <div class="wrapper">
    <AppNavbar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.3s ease-in;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all 0.3s ease-in;
}

@media screen and (min-width: 1500px) {
  .wrapper {
    max-width: 1500px;
    margin: 0 auto;
  }
}
</style>
