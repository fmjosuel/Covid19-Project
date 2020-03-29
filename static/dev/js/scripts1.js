;(function($) {
  'use strict'

  // Active Class
  $('.app-sidebar a').each(function() {
    const pageUrl = window.location.href.split(/[?#]/)[0]
    if (this.href == pageUrl) {
      $(this).addClass('active')
      $(this)
        .parent()
        .parent()
        .parent()
        .addClass('active') // add active to li of the current link
      $(this)
        .parent()
        .parent()
        .prev()
        .addClass('active') // add active class to an anchor
      $(this)
        .parent()
        .parent()
        .prev()
        .click() // click the item to make it drop
    }
  })

  $('a[data-effect]').click(function() {
    $('head link#effect').attr('href', $(this).data('effect'))
    $(this)
      .toggleClass('active')
      .siblings()
      .removeClass('active')
  })

  $(window).on('scroll', function(e) {
    // ______________Headerfixed
    if ($(window).scrollTop() >= 66) {
      $('header').addClass('fixed-header')
    } else {
      $('.header').removeClass('fixed-header')
    }

    //  BACK TO TOP BUTTON
    if ($(this).scrollTop() > 0) {
      $('#back-to-top').fadeIn('slow')
    } else {
      $('#back-to-top').fadeOut('slow')
    }
  })

  // Cover images
  $('.cover-image').each(function() {
    const attr = $(this).attr('data-image-src')

    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css('background', 'url(' + attr + ') center center')
    }
  })

  // Cover image2
  $('.cover-image2').each(function() {
    const attr = $(this).attr('data-image-src')

    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css('background', 'url(' + attr + ') center center')
    }
  })

  // p-scroll
  // const ps = new PerfectScrollbar('.sidebar-right', {
  //   useBothWheelAxes: true,
  //   suppressScrollX: true
  // })

  // PAGE LOADING
  $(window).on('load', function(e) {
    $('#spinner').fadeOut('slow')
  })

  // Tooltip
  // $("[data-toggle='tooltip']").tooltip()

  // Popover
  // $('[data-toggle="popover"]').popover({
  //   container: 'body'
  // })

  if ($('#ms-menu-trigger')[0]) {
    $('body').on('click', '#ms-menu-trigger', function() {
      $('.ms-menu').toggleClass('toggled')
    })
  }

  $(document).on('click', '#back-to-top', function(e) {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      600
    )
    return false
  })

  // FullScreen
  $(document).on('click', '#fullscreen-button', function toggleFullScreen() {
    if (
      (document.fullScreenElement !== undefined &&
        document.fullScreenElement === null) ||
      (document.msFullscreenElement !== undefined &&
        document.msFullscreenElement === null) ||
      (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
      (document.webkitIsFullScreen !== undefined &&
        !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
      }
    } else if (document.cancelFullScreen) {
      document.cancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  })

  const toggleSidebar = function() {
    const w = $(window)
    if (w.outerWidth() <= 1024) {
      $('body').addClass('sidebar-gone')
      $(document)
        .off('click', 'body')
        .on('click', 'body', function(e) {
          if (
            $(e.target).hasClass('sidebar-show') ||
            $(e.target).hasClass('search-show')
          ) {
            $('body').removeClass('sidebar-show')
            $('body').addClass('sidebar-gone')
            $('body').removeClass('search-show')
          }
        })
    } else {
      $('body').removeClass('sidebar-gone')
    }
  }
  toggleSidebar()
  $(window).resize(toggleSidebar)

  // CollapseableLeftMenu
  $('[data-collapse]').each(function() {
    const me = $(this)
    const target = me.data('collapse')

    me.click(function() {
      $(target).collapse('toggle')
      $(target).on('shown.bs.collapse', function() {
        me.html('<i class="ion ion-minus"></i>')
      })
      $(target).on('hidden.bs.collapse', function() {
        me.html('<i class="ion ion-plus"></i>')
      })
      return false
    })
  })

  // Alerts
  $('.alert-dismissible').each(function() {
    const me = $(this)

    me.find('.close').on('click', function(e) {
      me.alert('close')
    })
  })

  $('#removeClass').on('click', function(e) {
    $('#qnimate').removeClass('popup-box-on')
  })
})(jQuery)
