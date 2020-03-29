const mix = require('laravel-mix')
mix
  .options({
    publicPath: 'static',
    mode: 'production'
  })
  .styles(
    [
      'static/dev/css/style.css',
      'static/dev/css/skin-mode.css',
      'static/dev/css/color-skins/color.css',
      'static/dev/css/custom.css'
    ],
    'static/css/styles.css'
  )
  .styles(
    [
      'static/dev/plugins/p-scroll/p-scroll.css',
      'static/dev/plugins/horizontal-menu/dropdown-effects/fade-up.css',
      'static/dev/plugins/horizontal-menu/horizontal-menu.css',
      'static/dev/plugins/sidebar/sidebar.css',
      'static/dev/plugins/p-scroll/p-scroll.css'
    ],
    'static/css/vendors.css'
  )
  .styles(['static/fonts/feathericons/style.css'], 'static/css/icons.css')
  .combine(
    [
      // 'static/dev/js/jquery.min.js'
      // 'static/dev/plugins/bootstrap/js/bootstrap.min.js'
      // 'static/dev/js/popper.js',
      // 'static/dev/js/tooltip.js',
      // 'static/dev/plugins/horizontal-menu/horizontal-menu.js',
      // 'static/dev/plugins/sidebar/sidebar.js',
      // 'static/dev/plugins/p-scroll/p-scroll.js',
      // 'static/dev/js/stiky.js'
    ],
    'static/js/vendors.js'
  )
  .combine(['static/dev/js/scripts1.js'], 'static/js/build.js')
// .version()
