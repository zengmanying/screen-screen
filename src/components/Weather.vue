<template>
  <div class="weather">
    <img :src="iconUrl" alt="Weather icon" />
    {{ Math.round(temperature) }}°C
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_KEY = '3309dbe80bc5799fef421021735c8724'
const CITY = 'Beijing'

const city = ref('')
const temperature = ref('')
const weather = ref('')
const iconCode = ref('')
const iconUrl = ref('')

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=zh_cn`
    )
    city.value = response.data.name
    temperature.value = response.data.main.temp
    weather.value = response.data.weather[0].description
    iconCode.value = response.data.weather[0].icon
    iconUrl.value = `http://openweathermap.org/img/w/${iconCode.value}.png`
  } catch (error) {
    console.error(error)
  }
})
</script>
<style lang="scss">
.weather {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.85);
  font-size: 20px;
  img {
    margin-right: 8px;
  }
}
</style>
