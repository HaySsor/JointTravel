<template>
  <AppLoader v-if="chosenGroup === null" />
  <main v-else class="choose-group-box">
    <FreeTripsList :trips="chosenGroup?.freeTrips" />
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFakeSpecificsFetch } from '@/hooks/useFakeFetch'
import { onMounted } from 'vue'
import AppLoader from '@/components/AppLoader.vue'
import FreeTripsList from '@/components/FreeTripsList.vue'

const { chosenGroup, fetchSpecificsData } = useFakeSpecificsFetch()

const {
  params: { group }
} = useRoute()

onMounted(() => {
  typeof group === 'string' ? fetchSpecificsData(group) : null
})
</script>

<style lang="scss">
.choose-group-box {
  margin-top: 30px;
}
</style>
