<template>
  <RouterLink :to="{ name: 'Trip', params: { id: '1' } }" class="trip-link">
    <div
      class="trip-item-box"
      v-motion
      :initial="{
        opacity: 0,
        y: 100
      }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 200
        }
      }"
    >
      <img src="/public/photo/trip1.jpeg" />
      <h3 class="trip-item-box-title">Mountain</h3>
    </div>
  </RouterLink>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.trip-link {
  text-decoration: none;
}
.trip-item-box {
  width: 170px;
  height: 170px;
  background-color: #20b2aa;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.13);
  border-radius: 25px;
  overflow: hidden;
  isolation: isolate;

  img {
    width: 100%;
    height: 80%;
    z-index: -1;
    object-fit: cover;
    border-radius: 25px;
  }
  &-title {
    z-index: 10;
    font-size: 2rem;
    text-align: center;
    margin-top: 2px;
    color: white;
  }
}
</style>
<!-- 
 -->
