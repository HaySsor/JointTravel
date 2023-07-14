<template>
  <header class="navbar">
    <div class="navbar__link">
      <RouterLink :to="{ name: 'Home' }" class="navbar__link-logo" @click="() => (isOpen = false)">
        <img src="/house.png" alt="." aria-hidden="true" />
      </RouterLink>
      <input type="checkbox" class="dark-mode-switch" v-model="darkMode" />
    </div>

    <div class="navbar-box">
      <span v-if="userStore.user.ifLogged" class="navbar-box-name">{{
        userStore.user.userName
      }}</span>
      <button class="navbar__button" @click="toggleOpen">
        <div
          class="navbar__button-line navbar__button-line--one"
          :style="{
            animation: dynamicClassBarsOne + '.5s' + ' forwards'
          }"
        ></div>
        <div
          class="navbar__button-line navbar__button-line--two"
          :style="{
            animation: dynamicClassBarsTwo + '.5s' + ' forwards'
          }"
        ></div>
        <div
          class="navbar__button-line navbar__button-line--three"
          :style="{
            animation: dynamicClassBarsThree + '.5s' + ' forwards'
          }"
        ></div>
      </button>
    </div>

    <nav class="navbar__nav-desktop">
      <ul class="navbar__nav-desktop-list-desktop">
        <li>
          <RouterLink :to="{ name: 'About' }" class="navbar__nav-desktop-list-desktop-item">
            About
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Contact' }" class="navbar__nav-desktop-list-desktop-item">
            Contact
          </RouterLink>
        </li>
        <li v-if="!userStore.user.ifLogged">
          <RouterLink :to="{ name: 'Login' }" @click="closeMenu" class="navbar__nav-list-item">
            Login
          </RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Home' }" @click="logout" class="navbar__nav-list-item">
            Logout
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <nav class="navbar__nav" :style="{ animation: dynamicClass + '.5s' + ' forwards' }">
    <ul class="navbar__nav-list" v-if="isOpen">
      <li>
        <RouterLink :to="{ name: 'About' }" @click="closeMenu" class="navbar__nav-list-item">
          About
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Contact' }" @click="closeMenu" class="navbar__nav-list-item">
          Contact
        </RouterLink>
      </li>
      <li v-if="!userStore.user.ifLogged">
        <RouterLink :to="{ name: 'Login' }" @click="closeMenu" class="navbar__nav-list-item">
          Login
        </RouterLink>
      </li>
      <li v-else>
        <RouterLink :to="{ name: 'Home' }" @click="logout" class="navbar__nav-list-item">
          Logout
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useDark, useToggle } from '@vueuse/core'
import { ref, computed, watch } from 'vue'

const localHostDarkMode = localStorage.getItem('vueuse-color-scheme')

const isOpen = ref<boolean>(false)
const userStore = useUserStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const darkMode = ref(localHostDarkMode === 'auto' ? false : true)

watch(darkMode, () => {
  toggleDark()
})

const dynamicClass = computed(() => {
  return isOpen.value ? 'openNavbar' : 'closeNavbar'
})
const dynamicClassBarsOne = computed(() => {
  return isOpen.value ? 'lineOneCloseAnime' : 'lineOneOpenAnime'
})
const dynamicClassBarsTwo = computed(() => {
  return isOpen.value ? 'lineTwoCloseAnime' : 'lineTwoOpenAnime'
})
const dynamicClassBarsThree = computed(() => {
  return isOpen.value ? 'lineThreeCloseAnime' : 'lineThreeOpenAnime'
})

const closeMenu = () => {
  isOpen.value = false
}
const logout = async () => {
  isOpen.value = false
  await userStore.LogoutUser()
}

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss">
.navbar {
  height: 70px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.147);
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #20b2aa;
  z-index: 10;
  &-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    &-name {
      font-size: 1.8rem;
      color: white;
    }
  }
  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    &-logo {
      width: 50px;
      height: 50px;
      margin-left: 20px;
      border: 3px solid darkslategray;
      border-radius: 20px;
      background-color: lightgoldenrodyellow;

      img {
        width: 100%;
      }
    }
    input[type='checkbox'] {
      --webkit-appearance: none;
      --moz-appearance: none;
      appearance: none;
      position: relative;
      height: 25px;
      width: 45px;
      background-color: white;
      border-radius: 5rem;
      transition: background-color 0.3s;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.282);

      &::after {
        position: absolute;
        content: '';
        top: 50%;
        left: 30%;
        transform: translate(-50%, -50%);
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background-color: gold;
        transition: left 0.3s;
      }
      &:checked {
        background-color: #333;

        &::after {
          left: 70%;
          background-color: rgb(166, 166, 166);
        }
      }
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    padding: 12px;
    margin-right: 20px;
    border-radius: 20px;
    border: 3px solid darkslategray;
    &-line {
      width: 20px;
      height: 2px;
      background-color: darkslategray;
    }
  }
  &__nav {
    width: 95%;
    background-color: rgb(23, 128, 123);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.147);
    padding: 20px;
    margin: 0 auto;
    border-radius: 0 0 10px 10px;
    z-index: 5;

    &-list {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      list-style: none;
      gap: 25px;

      &-item {
        padding: 10px 10px;
        text-decoration: none;
        color: white;
        font-size: 1.5rem;
      }
    }
  }
  &__nav-desktop {
    display: none;
  }
}

@media screen and (min-width: 586px) {
  .navbar {
    &__nav-desktop {
      display: block;
      width: 250px;
      &-list-desktop {
        display: flex;

        justify-content: space-around;
        align-items: center;
        list-style: none;
        margin-right: 30px;
        &-item {
          text-decoration: none;
          padding: 15px;
          font-size: 1.8rem;
          color: white;
          &:is(.active) {
            padding-bottom: 10px;
            border-bottom: 2px solid darkslategray;
          }
        }
      }
    }
    &__button {
      display: none;
    }
    &__nav {
      display: none;
    }
  }
}

/* Animation */
@keyframes openNavbar {
  from {
    height: 0px;
    padding: 0px;
  }
  to {
    height: 135px;
  }
}
@keyframes closeNavbar {
  from {
    height: 100px;
  }
  to {
    height: 0px;
    padding: 0px;
  }
}

@keyframes lineOneCloseAnime {
  to {
    transform: translate(0px, 7px) rotate(45deg);
  }
}
@keyframes lineTwoCloseAnime {
  to {
    transform: translate(0px, 0px) rotate(-45deg);
  }
}
@keyframes lineThreeCloseAnime {
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
}
@keyframes lineOneOpenAnime {
  from {
    transform: translate(0px, 7px) rotate(45deg);
  }
  to {
    transform: translate(0px, 0px) rotate(0deg);
  }
}
@keyframes lineTwoOpenAnime {
  from {
    transform: rotate(-45deg);
  }
  to {
    transform: rotate(0deg);
  }
}
@keyframes lineThreeOpenAnime {
  0% {
    transform: translateY(10px);
  }

  50% {
    transform: translateY(10px);
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
