<template>
  <main class="main">
    <header class="header-home">
      <div
        class="header-home__hero"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :delay="200"
      >
        <h1
          class="header-home__hero-title"
          :style="{
            left: calcLeftTitle
          }"
        >
          JointTrips
        </h1>
        <img src="/photo/heroImg.jpg" alt="" />
      </div>
      <div
        class="header-home__info"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :delay="500"
      >
        <h3 class="header-home__info-title">JointTravel invites !!</h3>

        <div class="header-home__info-box">
          <img src="/public/photo/icon1.png" alt="" />
          <div class="header-home__info-box-text">
            <p>
              Welcome to our tour pages, your gateway to extraordinary experiences! Discover a
              captivating collection of meticulously crafted tours designed to take you on
              unforgettable journeys. Whether you're a nature enthusiast, history buff, or a seeker
              of vibrant cultures, our diverse range of tours will satisfy your wanderlust.
            </p>
            <p>
              Immerse yourself in breathtaking landscapes, delve into fascinating local traditions,
              and create cherished memories that will last a lifetime. Let our expert guides lead
              you through hidden gems and iconic landmarks, offering a unique perspective and
              insider knowledge. Get ready to embark on an adventure of a lifetime as you explore
              our meticulously curated tour options
            </p>
          </div>
        </div>
      </div>
    </header>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useWindowSize } from '../hooks/useWindowSize'

const { windowSize, resize, disableResize } = useWindowSize()

onMounted(() => {
  resize()
})
onUnmounted(() => {
  disableResize()
})

const calcLeftTitle = computed(() => {
  return `${windowSize.value / 2 - (windowSize.value / 2) * 0.7}px`
})
</script>

<style lang="scss">
.main {
  padding: 0 10px;
  .header-home {
    &__hero {
      margin-top: 20px;
      width: 100%;
      position: relative;
      &-title {
        position: absolute;
        top: 8%;
        font-size: 3.5rem;
      }
      img {
        width: 100%;
        mix-blend-mode: darken;
      }
    }
    &__info {
      position: relative;
      z-index: 1;
      top: -30px;
      width: 100%;
      height: 450px;
      background-color: #d7a987;
      border: 3px solid #987760;
      border-radius: 40px;
      padding: 20px;

      &-title {
        font-size: 2.5rem;
        position: relative;
        text-align: center;
        color: white;
      }
      &-box {
        margin-top: 30px;
        color: white;
        img {
          width: 70px;
          float: left;
          padding: 10px;
        }
        &-text {
          p {
            font-size: 1.6rem;
            line-height: 1.3;
          }
        }
        &-text :first-child {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
