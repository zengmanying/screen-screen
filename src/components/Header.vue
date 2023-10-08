<script setup>
import { ref } from 'vue'
import Weather from '@/components/Weather.vue'
import CurrentTime from '@/components/CurrentTime.vue'
import TipsDialog from './TipsDialog.vue'
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
const tipsVisible = ref(false)
const handleTipsShow = () => {
  tipsVisible.value = true
}
</script>
<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/logo.svg" alt="" />
    </div>
    <ul class="top-menu">
      <li :class="{ active: route.name === 'Home' }">
        <span><router-link to="./">车辆总览</router-link></span>
      </li>
      <li :class="{ active: route.name === 'AF' || route.name === 'BF' }">
        <div class="menu-dropdown-content">
          <span><router-link to="/AF">用户使用行为</router-link></span>
          <div class="menu-dropdown">
            <span
              >{{ route.name === 'BF' ? 'B品牌' : 'A品牌' }}
              <img src="../assets/af/dropdown-trigger.png"
            /></span>
            <ul>
              <li :class="{ active: route.name === 'AF' }">
                <router-link to="/AF">A品牌</router-link>
              </li>
              <li :class="{ active: route.name === 'BF' }">
                <router-link to="/BF">B品牌</router-link>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li :class="{ active: route.name === 'Battery' }">
        <span><router-link to="/battery">电池安全预警</router-link></span>
      </li>
    </ul>
    <Weather />
    <CurrentTime />
    <span class="tips-btn" @click="handleTipsShow">
      <img src="@/assets/tips-modal-trigger.svg" alt="" />
    </span>
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
  <TipsDialog v-if="tipsVisible" v-model:visible="tipsVisible" />
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
      &::after {
        position: absolute;
        left: 50%;
        bottom: 0;
        z-index: 1;
        transform: translateX(-50%);
        display: block;
        content: '';
        width: 164px;
        height: 44px;
        background: url('@/assets/top-menu-selected-bg.png') no-repeat;
        background-repeat: no-repeat;
        background-position: center bottom;
        background-size: cover;
      }
    }
    &:nth-child(1) {
      background-image: url('@/assets/icon-car.svg');
      &.active {
        background-image: url('@/assets/icon-car-selected.svg');
      }
    }
    &:nth-child(2) {
      background-image: url('@/assets/icon-user.svg');
      &.active {
        background-image: url('@/assets/icon-user-selected.svg');
      }
    }
    &:nth-child(3) {
      background-image: url('@/assets/icon-electri.svg');
      &.active {
        background-image: url('@/assets/icon-electri-selected.svg');
      }
    }
  }
}

.tips-btn {
  margin-left: 18px;
}

.full-screen-btn {
  cursor: pointer;
  margin-left: 18px;
}
.menu-dropdown-content {
  display: flex;
  align-self: center;
}
.menu-dropdown {
  position: relative;
  z-index: 99;
  margin-left: 8px;
  span {
    display: inline-flex;
    align-items: center;
    width: 120px;
    height: 31px;
    padding: 0 10px;
    background: url('../assets/af/dropdown-bg.png') no-repeat;
    background-size: contain;
    background-position: center;
    color: #fff;
    img {
      width: 9px;
      margin-left: 8px;
    }
  }
  ul {
    position: absolute;
    width: 100%;
    list-style: none;
    visibility: hidden;
    padding: 0;
    margin: 0;
    border: 1px solid rgba(30, 231, 231, 0.3);
    border-top: 0;
    margin-top: -3px;
    li {
      width: 100%;
      height: 29px;
      line-height: 29px;
      text-align: center;
      font-size: 18px;
      background-color: rgba(1, 19, 84, 0.8);
      a {
        color: rgba(126, 137, 164, 1);
      }
      &.active {
        a {
          color: #fff;
        }
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgba(30, 231, 231, 0.2);
      }
      &:hover {
        a {
          color: #fff;
        }
      }
    }
  }
  &:hover {
    ul {
      visibility: visible;
    }
  }
}
</style>
