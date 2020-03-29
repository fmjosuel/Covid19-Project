!(function(e) {
  'use strict'
  e('.app-sidebar a').each(function() {
    const n = window.location.href.split(/[?#]/)[0]
    this.href == n &&
      (e(this).addClass('active'),
      e(this)
        .parent()
        .parent()
        .parent()
        .addClass('active'),
      e(this)
        .parent()
        .parent()
        .prev()
        .addClass('active'),
      e(this)
        .parent()
        .parent()
        .prev()
        .click())
  }),
    e('a[data-effect]').click(function() {
      e('head link#effect').attr('href', e(this).data('effect')),
        e(this)
          .toggleClass('active')
          .siblings()
          .removeClass('active')
    }),
    e(window).on('scroll', function(n) {
      e(window).scrollTop() >= 66
        ? e('header').addClass('fixed-header')
        : e('.header').removeClass('fixed-header'),
        e(this).scrollTop() > 0
          ? e('#back-to-top').fadeIn('slow')
          : e('#back-to-top').fadeOut('slow')
    }),
    e('.cover-image').each(function() {
      const n = e(this).attr('data-image-src')
      void 0 !== n &&
        !1 !== n &&
        e(this).css('background', 'url(' + n + ') center center')
    }),
    e('.cover-image2').each(function() {
      const n = e(this).attr('data-image-src')
      void 0 !== n &&
        !1 !== n &&
        e(this).css('background', 'url(' + n + ') center center')
    }),
    e(window).on('load', function(n) {
      e('#spinner').fadeOut('slow')
    }),
    e('#ms-menu-trigger')[0] &&
      e('body').on('click', '#ms-menu-trigger', function() {
        e('.ms-menu').toggleClass('toggled')
      }),
    e(document).on('click', '#back-to-top', function(n) {
      return e('html, body').animate({ scrollTop: 0 }, 600), !1
    }),
    e(document).on('click', '#fullscreen-button', function() {
      ;(void 0 !== document.fullScreenElement &&
        document.fullScreenElement === null) ||
      (void 0 !== document.msFullscreenElement &&
        document.msFullscreenElement === null) ||
      (void 0 !== document.mozFullScreen && !document.mozFullScreen) ||
      (void 0 !== document.webkitIsFullScreen && !document.webkitIsFullScreen)
        ? document.documentElement.requestFullScreen
          ? document.documentElement.requestFullScreen()
          : document.documentElement.mozRequestFullScreen
          ? document.documentElement.mozRequestFullScreen()
          : document.documentElement.webkitRequestFullScreen
          ? document.documentElement.webkitRequestFullScreen(
              Element.ALLOW_KEYBOARD_INPUT
            )
          : document.documentElement.msRequestFullscreen &&
            document.documentElement.msRequestFullscreen()
        : document.cancelFullScreen
        ? document.cancelFullScreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.webkitCancelFullScreen
        ? document.webkitCancelFullScreen()
        : document.msExitFullscreen && document.msExitFullscreen()
    })
  const n = function() {
    e(window).outerWidth() <= 1024
      ? (e('body').addClass('sidebar-gone'),
        e(document)
          .off('click', 'body')
          .on('click', 'body', function(n) {
            ;(e(n.target).hasClass('sidebar-show') ||
              e(n.target).hasClass('search-show')) &&
              (e('body').removeClass('sidebar-show'),
              e('body').addClass('sidebar-gone'),
              e('body').removeClass('search-show'))
          }))
      : e('body').removeClass('sidebar-gone')
  }
  n(),
    e(window).resize(n),
    e('[data-collapse]').each(function() {
      const n = e(this)
      const t = n.data('collapse')
      n.click(function() {
        return (
          e(t).collapse('toggle'),
          e(t).on('shown.bs.collapse', function() {
            n.html('<i class="ion ion-minus"></i>')
          }),
          e(t).on('hidden.bs.collapse', function() {
            n.html('<i class="ion ion-plus"></i>')
          }),
          !1
        )
      })
    }),
    e('.alert-dismissible').each(function() {
      const n = e(this)
      n.find('.close').on('click', function(e) {
        n.alert('close')
      })
    }),
    e('#removeClass').on('click', function(n) {
      e('#qnimate').removeClass('popup-box-on')
    })
})(jQuery)
