module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  globals: {
    $: true,
    echarts: true,
    Chart: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {}
}
