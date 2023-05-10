import createPlugin from 'postcss-px-to-viewport'

export default {
  plugins: [
    createPlugin({
      // Options...
      unitToConvert: 'px',
      viewportWidth: 1920,
      unitPrecision: 2,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 2,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false,
      landscapeUnit: 'vh',
      landscapeWidth: 568,
    }),
  ],
}
