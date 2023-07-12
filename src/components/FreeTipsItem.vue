<template>
  <li class="free-tips__container-item" :style="{ backgroundImage: `url(${trip.src})` }">
    <div class="free-tips__container-item-title">
      <h3>{{ trip.title }}</h3>
      <div class="free-tips__container-item-title-guide">
        <img src="/public/photo/guid.png" alt="." />
        <span class="free-tips__container-item-title-guide-name">{{ trip.guide }}</span>
      </div>
    </div>
    <div class="free-tips__container-item-bot">
      <div class="free-tips__container-item-bot-middle">
        <div class="free-tips__container-item-bot-middle-left">
          <div class="image-box">
            <img src="/public/photo/defficulty.png" />
          </div>
          <div class="info-box">
            <span>{{ trip.difficultyLevel }} / 10</span>
          </div>
        </div>
        <div class="free-trips__container-item-bot-middle-right">
          <div class="info-box">
            <span>Free Vacancies </span>
            <span style="color: green; font-size: 1.5rem">{{ trip.vacancies }} </span>
          </div>
        </div>
      </div>

      <div class="free-tips__container-item-bot-bottom">
        <div class="free-tips__container-item-bot-bottom-left">
          <div class="image-box">
            <img src="/public/photo/calender.png" />
          </div>
          <div class="info-box">
            <span> Start {{ trip.dateOfDeparture }}</span>
          </div>
          <div class="info-box">
            <span> End {{ trip.dateOfEnd }}</span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { freeTrips } from '@/types/types'

defineProps<{
  trip: freeTrips
}>()
</script>

<style lang="scss">
.image-box {
  width: 30px;

  img {
    width: 100%;
  }
}
.info-box {
  background-color: white;
  padding: 5px 10px;
  border-radius: 25px;
  box-shadow: 0 5px 15px rgba(47, 79, 79, 0.478);
  border: 2px solid rgba(23, 128, 123, 0.493);
  span {
    font-size: 1.4rem;
  }
}

.free-tips__container-item {
  width: 90%;
  height: 250px;
  box-shadow: 0 5px 15px rgba(47, 79, 79, 0.478);
  border-radius: 25px;
  padding: 15px;
  background-size: cover;
  background-repeat: no-repeat;
  border: 3px solid rgba(23, 128, 123);
  flex-direction: column;
  display: flex;
  justify-content: space-between;

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 1.6rem;
      background-color: white;
      padding: 5px 15px;
      border-radius: 20px;
      box-shadow: 0 5px 15px rgba(47, 79, 79, 0.478);
      border: 3px solid rgba(23, 128, 123);

      
    }
    &-guide {
      width: 30px;
      aspect-ratio: 1;

      img {
        width: 100%;
      }
      &-name {
        position: relative;
        left: -15px;
        width: 60px;
        display: flex;
        justify-content: center;
        text-align: center;
        font-size: 1.2rem;
        background-color: white;
        box-shadow: 0 5px 15px rgba(47, 79, 79, 0.478);
        border-radius: 20px;
        padding: 2px;
      }
    }
  }
  &-bot {
    display: grid;
    gap: 5px;
    &-middle {
      display: flex;
      align-items: center;
      gap: 20px;
      &-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      &-right {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    &-bottom {
      display: flex;
      &-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      &-right {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }
}
</style>
