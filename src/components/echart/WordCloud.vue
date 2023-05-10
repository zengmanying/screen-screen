<script setup>
import { computed, ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { DatasetComponent } from 'echarts/components'
import 'echarts-wordcloud'

use([CanvasRenderer, DatasetComponent])

const initOptions = ref({
  renderer: 'canvas',
})

const options = {
  backgroundColor: 'transparent',
  animation: true,
  series: [
    {
      type: 'wordCloud',

      // The shape of the "cloud" to draw. Can be any polar equation represented as a
      // callback function, or a keyword present. Available presents are circle (default),
      // cardioid (apple or heart shape curve, the most known polar equation), diamond (
      // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

      shape: 'circle',

      // Keep aspect ratio of maskImage or 1:1 for shapes
      // This option is supported since echarts-wordcloud@2.1.0
      keepAspect: false,

      // A silhouette image which the white area will be excluded from drawing texts.
      // The shape option will continue to apply as the shape of the cloud to grow.

      // maskImage: maskImage,

      // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
      // Default to be put in the center and has 75% x 80% size.

      left: 'center',
      top: 'center',
      width: '100%',
      height: '100%',
      right: null,
      bottom: null,

      // Text size range which the value in data will be mapped to.
      // Default to have minimum 12px and maximum 60px size.

      sizeRange: [12, 24],

      // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

      rotationRange: [0, 0],
      rotationStep: 45,

      // size of the grid in pixels for marking the availability of the canvas
      // the larger the grid size, the bigger the gap between words.

      gridSize: 8,

      // set to true to allow word to be drawn partly outside of the canvas.
      // Allow word bigger than the size of the canvas to be drawn
      // This option is supported since echarts-wordcloud@2.1.0
      drawOutOfBound: false,

      // if the font size is too large for the text to be displayed,
      // whether to shrink the text. If it is set to false, the text will
      // not be rendered. If it is set to true, the text will be shrinked.
      // This option is supported since echarts-wordcloud@2.1.0
      shrinkToFit: false,

      // If perform layout animation.
      // NOTE disable it will lead to UI blocking when there is lots of words.
      layoutAnimation: true,

      // Global text style
      textStyle: {
        fontFamily: 'Source Han Sans CN',
        // Color can be a callback function or a color string
        color: function () {
          // Random color
          return (
            'rgb(' +
            [
              Math.round(Math.random() * 200 + 55),
              Math.round(Math.random() * 200 + 55),
              Math.round(Math.random() * 200 + 55),
            ].join(',') +
            ')'
          )
        },
      },
      emphasis: {
        // focus: 'self',
        textStyle: {
          textShadowBlur: 10,
          textShadowColor: '#333',
        },
      },
      data: [
        {
          name: '雨伞',
          value: 30,
        },
        {
          name: '晴天',
          value: 28,
        },
        {
          name: '电话',
          value: 24,
        },
        {
          name: '手机',
          value: 23,
        },
        {
          name: '下雨',
          value: 22,
        },
        {
          name: '暴雨',
          value: 21,
        },
        {
          name: '多云',
          value: 20,
        },
        {
          name: '雨衣',
          value: 29,
        },
        {
          name: '屋檐',
          value: 28,
        },
        {
          name: '大风',
          value: 27,
        },
        {
          name: '台风',
          value: 26,
        },
        {
          name: '下雪',
          value: 25,
        },
        {
          name: '打雷',
          value: 24,
        },
        {
          name: '小雨',
          value: 30,
        },
        {
          name: '中雨',
          value: 18,
        },
        {
          name: '大雨',
          value: 14,
        },
        {
          name: '雷阵雨',
          value: 13,
        },
        {
          name: '下雪',
          value: 12,
        },
        {
          name: '小雪',
          value: 11,
        },
        {
          name: '中雪',
          value: 10,
        },
        {
          name: '大雪',
          value: 9,
        },
        {
          name: '暴雪',
          value: 8,
        },
        {
          name: '东风',
          value: 7,
        },
        {
          name: '南风',
          value: 6,
        },
        {
          name: '西北风',
          value: 5,
        },
        {
          name: '北风',
          value: 4,
        },
        {
          name: '闪电',
          value: 3,
        },
      ],
    },
  ],
}

const optionsWithData = computed(() => {
  return {
    ...options,
  }
})
</script>
<template>
  <VChart
    element-loading-text="Loading..."
    class="chart"
    :autoresize="true"
    :init-options="initOptions"
    :option="optionsWithData"
    :style="{ width: '100%', height: '100%' }"
    theme="dark"
  />
</template>
