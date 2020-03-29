// import webpack from 'webpack'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    bodyAttrs: {
      class: 'app'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'css/styles.css'
      },
      {
        rel: 'stylesheet',
        href: 'css/vendors.css'
      },
      {
        rel: 'stylesheet',
        href: 'css/icons.css'
      }
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
        body: true
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js',
        body: true
      },
      {
        src: 'js/vendors.js',
        body: true
      },
      {
        src: 'js/build.js',
        body: true
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/ga.js', mode: 'client' },
    { src: '~plugins/xlsx.js', mode: 'client' },
    { src: '~plugins/echarts.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery'
    //   })
    // ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.externals = {
        $: 'jQuery',
        jquery: 'jQuery'
        // echarts: 'echarts'
      }
    }
  },
  vendor: ['xlsx', 'chart.js', 'echarts', 'xlsx'],
  router: {
    linkExactActiveClass: 'active'
  }
}
