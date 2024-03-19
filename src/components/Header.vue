<script setup>
import { ref } from 'vue'
import Weather from '@/components/Weather.vue'
import CurrentTime from '@/components/CurrentTime.vue'
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
const fullScreenState = ref(false)
const handleFullScreen = () => {
  if (!fullScreenState.value) {
    document.body.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
  fullScreenState.value = !fullScreenState.value
}
</script>
<template>
  <div class="header">
    <div class="logo">
      <!-- <img src="../assets/logo.svg" alt="" /> -->
    </div>
    <ul class="top-menu">
      <li :class="{ active: route.name === 'Home' }">
        <span><router-link to="./">车辆总览</router-link></span>
      </li>
    </ul>
    <Weather />
    <CurrentTime />
    <span class="full-screen-btn" @click="handleFullScreen">
      <img
        v-show="!fullScreenState"
        src="@/assets/icon-fullscreen.svg"
        alt=""
      />
      <img
        v-show="fullScreenState"
        src="@/assets/icon-exit-fullscreen.svg"
        alt=""
      />
    </span>
  </div>
</template>
<style lang="scss">
.header {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  padding-left: 20px;
  padding-right: 40px;
}
.logo {
  img {
    height: 47px;
  }
}
.top-menu {
  list-style: none;
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  padding: 0 0 0 150px;
  > li {
    position: relative;
    margin-right: 35px;
    padding: 10px 0 10px 40px;
    font-size: 24px;
    letter-spacing: 1px;
    color: rgba(234, 248, 255, 0.85);
    text-shadow: 0px 2px 4px rgba(0, 42, 104, 0.6);
    font-weight: 500;
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 32px 32px;
    cursor: pointer;
    span {
      position: relative;
      z-index: 2;
      white-space: nowrap;
    }
    &.active {
      color: #eaf8ff;
    }
  }
}

.full-screen-btn {
  cursor: pointer;
  margin-left: 18px;
}
</style>
