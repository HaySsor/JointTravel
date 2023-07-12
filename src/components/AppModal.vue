<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal-shadow"></div>
      <slot class="modal-content"> </slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.modal {
  position: fixed;
  inset: 0;
  isolation: isolate;

  &-shadow {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #3333339e;
    z-index: -2;
  }
  
}
</style>
