<template>
  <header class="navbar">
    <RouterLink :to="{ name: 'Home' }" class="navbar__link-logo" @click="() => (isOpen = false)">
      <img src="/house.png" alt="." aria-hidden="true" />
    </RouterLink>
    <button class="navbar__button" @click="toggleOpen" v-if="windowSize < 587">
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
    <nav v-if="desktopVersion" class="navbar__nav-desktop">
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
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useWindowSize } from '../hooks/useWindowSize'

const { windowSize, resize, disableResize } = useWindowSize()

const isOpen = ref<boolean>(false)

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

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const desktopVersion = ref<boolean>(window.innerWidth > 586)

onMounted(() => {
  resize()
})
onUnmounted(() => {
  disableResize()
})

watch(windowSize, (windowWidth) => {
  if (windowWidth > 586) {
    desktopVersion.value = true
    isOpen.value = false
  } else {
    desktopVersion.value = false
  }
})
</script>

<style lang="scss">
.navbar {
  height: 70px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.147);
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightseagreen;
  z-index: 10;
  &__link-logo {
    margin-left: 20px;
    width: 50px;
    height: 50px;
    border: 3px solid darkslategray;
    border-radius: 20px;
    background-color: lightgoldenrodyellow;

    img {
      width: 100%;
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
}

@keyframes openNavbar {
  from {
    height: 0px;
    padding: 0px;
  }
  to {
    height: 100px;
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

@media screen and (min-width: 586px) {
  .navbar {
    &__nav-desktop {
      width: 250px;
      &-list-desktop {
        display: flex;

        justify-content: space-around;
        align-items: center;
        list-style: none;

        &-item {
          text-decoration: none;
          padding: 15px;
          font-size: 1.6rem;
          color: white;
          &:is(.active) {
            padding-bottom: 10px;
            border-bottom: 2px solid darkslategray;
          }
        }
      }
    }
  }
}

/* Animation */
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
