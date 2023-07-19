<script setup>
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div
    :class="[
      'app-container',
      {
        'app-container--battery':
          route.name === 'Battery' ||
          route.name === 'AF' ||
          route.name === 'BF',
      },
    ]"
  >
    <Header></Header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
