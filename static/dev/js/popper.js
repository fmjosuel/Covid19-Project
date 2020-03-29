/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */ ;(function(
  e,
  t
) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = t())
    : typeof define === 'function' && define.amd
    ? define(t)
    : (e.Popper = t())
})(this, function() {
  'use strict'
  function e(e) {
    return e && {}.toString.call(e) === '[object Function]'
  }
  function t(e, t) {
    if (e.nodeType !== 1) return []
    const o = getComputedStyle(e, null)
    return t ? o[t] : o
  }
  function o(e) {
    return e.nodeName === 'HTML' ? e : e.parentNode || e.host
  }
  function n(e) {
    if (!e) return document.body
    switch (e.nodeName) {
      case 'HTML':
      case 'BODY':
        return e.ownerDocument.body
      case '#document':
        return e.body
    }
    const i = t(e)
    const r = i.overflow
    const p = i.overflowX
    const s = i.overflowY
    return /(auto|scroll)/.test(r + s + p) ? e : n(o(e))
  }
  function r(e) {
    const o = e && e.offsetParent
    const i = o && o.nodeName
    return i && i !== 'BODY' && i !== 'HTML'
      ? ['TD', 'TABLE'].includes(o.nodeName) && t(o, 'position') === 'static'
        ? r(o)
        : o
      : e
      ? e.ownerDocument.documentElement
      : document.documentElement
  }
  function p(e) {
    const t = e.nodeName
    return t !== 'BODY' && (t === 'HTML' || r(e.firstElementChild) === e)
  }
  function s(e) {
    return e.parentNode === null ? e : s(e.parentNode)
  }
  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement
    const o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING
    const i = o ? e : t
    const n = o ? t : e
    const a = document.createRange()
    a.setStart(i, 0), a.setEnd(n, 0)
    const l = a.commonAncestorContainer
    if ((e !== l && t !== l) || i.contains(n)) return p(l) ? l : r(l)
    const f = s(e)
    return f.host ? d(f.host, t) : d(e, s(t).host)
  }
  function a(e) {
    const t =
      arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'top'
    const o = t === 'top' ? 'scrollTop' : 'scrollLeft'
    const i = e.nodeName
    if (i === 'BODY' || i === 'HTML') {
      const n = e.ownerDocument.documentElement
      const r = e.ownerDocument.scrollingElement || n
      return r[o]
    }
    return e[o]
  }
  function l(e, t) {
    const o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
    const i = a(t, 'top')
    const n = a(t, 'left')
    const r = o ? -1 : 1
    return (
      (e.top += i * r),
      (e.bottom += i * r),
      (e.left += n * r),
      (e.right += n * r),
      e
    )
  }
  function f(e, t) {
    const o = t === 'x' ? 'Left' : 'Top'
    const i = o == 'Left' ? 'Right' : 'Bottom'
    return (
      parseFloat(e['border' + o + 'Width'], 10) +
      parseFloat(e['border' + i + 'Width'], 10)
    )
  }
  function m(e, t, o, i) {
    return J(
      t['offset' + e],
      t['scroll' + e],
      o['client' + e],
      o['offset' + e],
      o['scroll' + e],
      ie()
        ? o['offset' + e] +
            i['margin' + (e === 'Height' ? 'Top' : 'Left')] +
            i['margin' + (e === 'Height' ? 'Bottom' : 'Right')]
        : 0
    )
  }
  function h() {
    const e = document.body
    const t = document.documentElement
    const o = ie() && getComputedStyle(t)
    return { height: m('Height', e, t, o), width: m('Width', e, t, o) }
  }
  function c(e) {
    return se({}, e, { right: e.left + e.width, bottom: e.top + e.height })
  }
  function g(e) {
    let o = {}
    if (ie())
      try {
        o = e.getBoundingClientRect()
        const i = a(e, 'top')
        const n = a(e, 'left')
        ;(o.top += i), (o.left += n), (o.bottom += i), (o.right += n)
      } catch (e) {}
    else o = e.getBoundingClientRect()
    const r = {
      left: o.left,
      top: o.top,
      width: o.right - o.left,
      height: o.bottom - o.top
    }
    const p = e.nodeName === 'HTML' ? h() : {}
    const s = p.width || e.clientWidth || r.right - r.left
    const d = p.height || e.clientHeight || r.bottom - r.top
    let l = e.offsetWidth - s
    let m = e.offsetHeight - d
    if (l || m) {
      const g = t(e)
      ;(l -= f(g, 'x')), (m -= f(g, 'y')), (r.width -= l), (r.height -= m)
    }
    return c(r)
  }
  function u(e, o) {
    const i = ie()
    const r = o.nodeName === 'HTML'
    const p = g(e)
    const s = g(o)
    const d = n(e)
    const a = t(o)
    const f = parseFloat(a.borderTopWidth, 10)
    const m = parseFloat(a.borderLeftWidth, 10)
    let h = c({
      top: p.top - s.top - f,
      left: p.left - s.left - m,
      width: p.width,
      height: p.height
    })
    if (((h.marginTop = 0), (h.marginLeft = 0), !i && r)) {
      const u = parseFloat(a.marginTop, 10)
      const b = parseFloat(a.marginLeft, 10)
      ;(h.top -= f - u),
        (h.bottom -= f - u),
        (h.left -= m - b),
        (h.right -= m - b),
        (h.marginTop = u),
        (h.marginLeft = b)
    }
    return (
      (i ? o.contains(d) : o === d && d.nodeName !== 'BODY') && (h = l(h, o)), h
    )
  }
  function b(e) {
    const t = e.ownerDocument.documentElement
    const o = u(e, t)
    const i = J(t.clientWidth, window.innerWidth || 0)
    const n = J(t.clientHeight, window.innerHeight || 0)
    const r = a(t)
    const p = a(t, 'left')
    const s = {
      top: r - o.top + o.marginTop,
      left: p - o.left + o.marginLeft,
      width: i,
      height: n
    }
    return c(s)
  }
  function w(e) {
    const i = e.nodeName
    return i === 'BODY' || i === 'HTML'
      ? !1
      : t(e, 'position') === 'fixed' || w(o(e))
  }
  function y(e, t, i, r) {
    let p = { top: 0, left: 0 }
    const s = d(e, t)
    if (r === 'viewport') p = b(s)
    else {
      let a
      r === 'scrollParent'
        ? ((a = n(o(t))),
          a.nodeName === 'BODY' && (a = e.ownerDocument.documentElement))
        : r === 'window'
        ? (a = e.ownerDocument.documentElement)
        : (a = r)
      const l = u(a, s)
      if (a.nodeName === 'HTML' && !w(s)) {
        const f = h()
        const m = f.height
        const c = f.width
        ;(p.top += l.top - l.marginTop),
          (p.bottom = m + l.top),
          (p.left += l.left - l.marginLeft),
          (p.right = c + l.left)
      } else p = l
    }
    return (p.left += i), (p.top += i), (p.right -= i), (p.bottom -= i), p
  }
  function E(e) {
    const t = e.width
    const o = e.height
    return t * o
  }
  function v(e, t, o, i, n) {
    const r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0
    if (!e.includes('auto')) return e
    const p = y(o, i, r, n)
    const s = {
      top: { width: p.width, height: t.top - p.top },
      right: { width: p.right - t.right, height: p.height },
      bottom: { width: p.width, height: p.bottom - t.bottom },
      left: { width: t.left - p.left, height: p.height }
    }
    const d = Object.keys(s)
      .map(function(e) {
        return se({ key: e }, s[e], { area: E(s[e]) })
      })
      .sort(function(e, t) {
        return t.area - e.area
      })
    const a = d.filter(function(e) {
      const t = e.width
      const i = e.height
      return t >= o.clientWidth && i >= o.clientHeight
    })
    const l = a.length > 0 ? a[0].key : d[0].key
    const f = e.split('-')[1]
    return l + (f ? '-' + f : '')
  }
  function O(e, t, o) {
    const i = d(t, o)
    return u(o, i)
  }
  function L(e) {
    const t = getComputedStyle(e)
    const o = parseFloat(t.marginTop) + parseFloat(t.marginBottom)
    const i = parseFloat(t.marginLeft) + parseFloat(t.marginRight)
    const n = { width: e.offsetWidth + i, height: e.offsetHeight + o }
    return n
  }
  function x(e) {
    const t = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
    return e.replace(/left|right|bottom|top/g, function(e) {
      return t[e]
    })
  }
  function S(e, t, o) {
    o = o.split('-')[0]
    const i = L(e)
    const n = { width: i.width, height: i.height }
    const r = ['right', 'left'].includes(o)
    const p = r ? 'top' : 'left'
    const s = r ? 'left' : 'top'
    const d = r ? 'height' : 'width'
    const a = r ? 'width' : 'height'
    return (
      (n[p] = t[p] + t[d] / 2 - i[d] / 2),
      (n[s] = o === s ? t[s] - i[a] : t[x(s)]),
      n
    )
  }
  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0]
  }
  function D(e, t, o) {
    if (Array.prototype.findIndex)
      return e.findIndex(function(e) {
        return e[t] === o
      })
    const i = T(e, function(e) {
      return e[t] === o
    })
    return e.indexOf(i)
  }
  function C(t, o, i) {
    const n = void 0 === i ? t : t.slice(0, D(t, 'name', i))
    return (
      n.forEach(function(t) {
        t.function &&
          console.warn('`modifier.function` is deprecated, use `modifier.fn`!')
        const i = t.function || t.fn
        t.enabled &&
          e(i) &&
          ((o.offsets.popper = c(o.offsets.popper)),
          (o.offsets.reference = c(o.offsets.reference)),
          (o = i(o, t)))
      }),
      o
    )
  }
  function N() {
    if (!this.state.isDestroyed) {
      let e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      }
      ;(e.offsets.reference = O(this.state, this.popper, this.reference)),
        (e.placement = v(
          this.options.placement,
          e.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (e.originalPlacement = e.placement),
        (e.offsets.popper = S(this.popper, e.offsets.reference, e.placement)),
        (e.offsets.popper.position = 'absolute'),
        (e = C(this.modifiers, e)),
        this.state.isCreated
          ? this.options.onUpdate(e)
          : ((this.state.isCreated = !0), this.options.onCreate(e))
    }
  }
  function k(e, t) {
    return e.some(function(e) {
      const o = e.name
      const i = e.enabled
      return i && o === t
    })
  }
  function W(e) {
    for (
      let t = [!1, 'ms', 'Webkit', 'Moz', 'O'],
        o = e.charAt(0).toUpperCase() + e.slice(1),
        n = 0;
      n < t.length - 1;
      n++
    ) {
      const i = t[n]
      const r = i ? '' + i + o : e
      if (typeof document.body.style[r] !== 'undefined') return r
    }
    return null
  }
  function P() {
    return (
      (this.state.isDestroyed = !0),
      k(this.modifiers, 'applyStyle') &&
        (this.popper.removeAttribute('x-placement'),
        (this.popper.style.left = ''),
        (this.popper.style.position = ''),
        (this.popper.style.top = ''),
        (this.popper.style[W('transform')] = '')),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    )
  }
  function B(e) {
    const t = e.ownerDocument
    return t ? t.defaultView : window
  }
  function H(e, t, o, i) {
    const r = e.nodeName === 'BODY'
    const p = r ? e.ownerDocument.defaultView : e
    p.addEventListener(t, o, { passive: !0 }),
      r || H(n(p.parentNode), t, o, i),
      i.push(p)
  }
  function A(e, t, o, i) {
    ;(o.updateBound = i),
      B(e).addEventListener('resize', o.updateBound, { passive: !0 })
    const r = n(e)
    return (
      H(r, 'scroll', o.updateBound, o.scrollParents),
      (o.scrollElement = r),
      (o.eventsEnabled = !0),
      o
    )
  }
  function I() {
    this.state.eventsEnabled ||
      (this.state = A(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ))
  }
  function M(e, t) {
    return (
      B(e).removeEventListener('resize', t.updateBound),
      t.scrollParents.forEach(function(e) {
        e.removeEventListener('scroll', t.updateBound)
      }),
      (t.updateBound = null),
      (t.scrollParents = []),
      (t.scrollElement = null),
      (t.eventsEnabled = !1),
      t
    )
  }
  function R() {
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state = M(this.reference, this.state)))
  }
  function U(e) {
    return e !== '' && !isNaN(parseFloat(e)) && isFinite(e)
  }
  function Y(e, t) {
    Object.keys(t).forEach(function(o) {
      let i = ''
      ;['width', 'height', 'top', 'right', 'bottom', 'left'].includes(o) &&
        U(t[o]) &&
        (i = 'px'),
        (e.style[o] = t[o] + i)
    })
  }
  function j(e, t) {
    Object.keys(t).forEach(function(o) {
      const i = t[o]
      !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o])
    })
  }
  function F(e, t, o) {
    const i = T(e, function(e) {
      const o = e.name
      return o === t
    })
    const n =
      !!i &&
      e.some(function(e) {
        return e.name === o && e.enabled && e.order < i.order
      })
    if (!n) {
      const r = '`' + t + '`'
      console.warn(
        '`' +
          o +
          '`' +
          ' modifier is required by ' +
          r +
          ' modifier in order to work, be sure to include it before ' +
          r +
          '!'
      )
    }
    return n
  }
  function K(e) {
    return e === 'end' ? 'start' : e === 'start' ? 'end' : e
  }
  function q(e) {
    const t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
    const o = ae.indexOf(e)
    const i = ae.slice(o + 1).concat(ae.slice(0, o))
    return t ? i.reverse() : i
  }
  function V(e, t, o, i) {
    const n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/)
    const r = +n[1]
    const p = n[2]
    if (!r) return e
    if (p.indexOf('%') === 0) {
      let s
      switch (p) {
        case '%p':
          s = o
          break
        case '%':
        case '%r':
        default:
          s = i
      }
      const d = c(s)
      return (d[t] / 100) * r
    }
    if (p === 'vh' || p === 'vw') {
      let a
      return (
        (a =
          p === 'vh'
            ? J(document.documentElement.clientHeight, window.innerHeight || 0)
            : J(document.documentElement.clientWidth, window.innerWidth || 0)),
        (a / 100) * r
      )
    }
    return r
  }
  function z(e, t, o, i) {
    const n = [0, 0]
    const r = ['right', 'left'].includes(i)
    const p = e.split(/(\+|\-)/).map(function(e) {
      return e.trim()
    })
    const s = p.indexOf(
      T(p, function(e) {
        return e.search(/,|\s/) !== -1
      })
    )
    p[s] &&
      !p[s].includes(',') &&
      console.warn(
        'Offsets separated by white space(s) are deprecated, use a comma (,) instead.'
      )
    const d = /\s*,\s*|\s+/
    let a =
      s === -1
        ? [p]
        : [
            p.slice(0, s).concat([p[s].split(d)[0]]),
            [p[s].split(d)[1]].concat(p.slice(s + 1))
          ]
    return (
      (a = a.map(function(e, i) {
        const n = (i === 1 ? !r : r) ? 'height' : 'width'
        let p = !1
        return e
          .reduce(function(e, t) {
            return e[e.length - 1] === '' && ['+', '-'].includes(t)
              ? ((e[e.length - 1] = t), (p = !0), e)
              : p
              ? ((e[e.length - 1] += t), (p = !1), e)
              : e.concat(t)
          }, [])
          .map(function(e) {
            return V(e, n, t, o)
          })
      })),
      a.forEach(function(e, t) {
        e.forEach(function(o, i) {
          U(o) && (n[t] += o * (e[i - 1] === '-' ? -1 : 1))
        })
      }),
      n
    )
  }
  function G(e, t) {
    let o
    const i = t.offset
    const n = e.placement
    const r = e.offsets
    const p = r.popper
    const s = r.reference
    const d = n.split('-')[0]
    return (
      (o = U(+i) ? [+i, 0] : z(i, p, s, d)),
      d === 'left'
        ? ((p.top += o[0]), (p.left -= o[1]))
        : d === 'right'
        ? ((p.top += o[0]), (p.left += o[1]))
        : d === 'top'
        ? ((p.left += o[0]), (p.top -= o[1]))
        : d === 'bottom' && ((p.left += o[0]), (p.top += o[1])),
      (e.popper = p),
      e
    )
  }
  for (
    var _ = Math.min,
      X = Math.floor,
      J = Math.max,
      Q = typeof window !== 'undefined' && typeof document !== 'undefined',
      Z = ['Edge', 'Trident', 'Firefox'],
      $ = 0,
      ee = 0;
    ee < Z.length;
    ee += 1
  )
    if (Q && navigator.userAgent.includes(Z[ee])) {
      $ = 1
      break
    }
  let i
  const te = Q && window.Promise
  const oe = te
    ? function(e) {
        let t = !1
        return function() {
          t ||
            ((t = !0),
            window.Promise.resolve().then(function() {
              ;(t = !1), e()
            }))
        }
      }
    : function(e) {
        let t = !1
        return function() {
          t ||
            ((t = !0),
            setTimeout(function() {
              ;(t = !1), e()
            }, $))
        }
      }
  var ie = function() {
    return void 0 == i && (i = navigator.appVersion.includes('MSIE 10')), i
  }
  const ne = function(e, t) {
    if (!(e instanceof t))
      throw new TypeError('Cannot call a class as a function')
  }
  const re = (function() {
    function e(e, t) {
      for (var o, n = 0; n < t.length; n++)
        (o = t[n]),
          (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o)
    }
    return function(t, o, i) {
      return o && e(t.prototype, o), i && e(t, i), t
    }
  })()
  const pe = function(e, t, o) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: o,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (e[t] = o),
      e
    )
  }
  var se =
    Object.assign ||
    function(e) {
      for (var t, o = 1; o < arguments.length; o++)
        for (const i in ((t = arguments[o]), t))
          Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
      return e
    }
  const de = [
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start'
  ]
  var ae = de.slice(3)
  const le = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  }
  const fe = (function() {
    function t(o, i) {
      const n = this
      const r =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
      ne(this, t),
        (this.scheduleUpdate = function() {
          return requestAnimationFrame(n.update)
        }),
        (this.update = oe(this.update.bind(this))),
        (this.options = se({}, t.Defaults, r)),
        (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
        (this.reference = o && o.jquery ? o[0] : o),
        (this.popper = i && i.jquery ? i[0] : i),
        (this.options.modifiers = {}),
        Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(function(
          e
        ) {
          n.options.modifiers[e] = se(
            {},
            t.Defaults.modifiers[e] || {},
            r.modifiers ? r.modifiers[e] : {}
          )
        }),
        (this.modifiers = Object.keys(this.options.modifiers)
          .map(function(e) {
            return se({ name: e }, n.options.modifiers[e])
          })
          .sort(function(e, t) {
            return e.order - t.order
          })),
        this.modifiers.forEach(function(t) {
          t.enabled &&
            e(t.onLoad) &&
            t.onLoad(n.reference, n.popper, n.options, t, n.state)
        }),
        this.update()
      const p = this.options.eventsEnabled
      p && this.enableEventListeners(), (this.state.eventsEnabled = p)
    }
    return (
      re(t, [
        {
          key: 'update',
          value() {
            return N.call(this)
          }
        },
        {
          key: 'destroy',
          value() {
            return P.call(this)
          }
        },
        {
          key: 'enableEventListeners',
          value() {
            return I.call(this)
          }
        },
        {
          key: 'disableEventListeners',
          value() {
            return R.call(this)
          }
        }
      ]),
      t
    )
  })()
  return (
    (fe.Utils = (typeof window === 'undefined' ? global : window).PopperUtils),
    (fe.placements = de),
    (fe.Defaults = {
      placement: 'bottom',
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate() {},
      onUpdate() {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn(e) {
            const t = e.placement
            const o = t.split('-')[0]
            const i = t.split('-')[1]
            if (i) {
              const n = e.offsets
              const r = n.reference
              const p = n.popper
              const s = ['bottom', 'top'].includes(o)
              const d = s ? 'left' : 'top'
              const a = s ? 'width' : 'height'
              const l = {
                start: pe({}, d, r[d]),
                end: pe({}, d, r[d] + r[a] - p[a])
              }
              e.offsets.popper = se({}, p, l[i])
            }
            return e
          }
        },
        offset: { order: 200, enabled: !0, fn: G, offset: 0 },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn(e, t) {
            let o = t.boundariesElement || r(e.instance.popper)
            e.instance.reference === o && (o = r(o))
            const i = y(e.instance.popper, e.instance.reference, t.padding, o)
            t.boundaries = i
            const n = t.priority
            let p = e.offsets.popper
            const s = {
              primary(e) {
                let o = p[e]
                return (
                  p[e] < i[e] && !t.escapeWithReference && (o = J(p[e], i[e])),
                  pe({}, e, o)
                )
              },
              secondary(e) {
                const o = e === 'right' ? 'left' : 'top'
                let n = p[o]
                return (
                  p[e] > i[e] &&
                    !t.escapeWithReference &&
                    (n = _(p[o], i[e] - (e === 'right' ? p.width : p.height))),
                  pe({}, o, n)
                )
              }
            }
            return (
              n.forEach(function(e) {
                const t = !['left', 'top'].includes(e) ? 'secondary' : 'primary'
                p = se({}, p, s[t](e))
              }),
              (e.offsets.popper = p),
              e
            )
          },
          priority: ['left', 'right', 'top', 'bottom'],
          padding: 5,
          boundariesElement: 'scrollParent'
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn(e) {
            const t = e.offsets
            const o = t.popper
            const i = t.reference
            const n = e.placement.split('-')[0]
            const r = X
            const p = ['top', 'bottom'].includes(n)
            const s = p ? 'right' : 'bottom'
            const d = p ? 'left' : 'top'
            const a = p ? 'width' : 'height'
            return (
              o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]),
              o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])),
              e
            )
          }
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn(e, o) {
            let i
            if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e
            let n = o.element
            if (typeof n === 'string') {
              if (((n = e.instance.popper.querySelector(n)), !n)) return e
            } else if (!e.instance.popper.contains(n))
              return (
                console.warn(
                  'WARNING: `arrow.element` must be child of its popper element!'
                ),
                e
              )
            const r = e.placement.split('-')[0]
            const p = e.offsets
            const s = p.popper
            const d = p.reference
            const a = ['left', 'right'].includes(r)
            const l = a ? 'height' : 'width'
            const f = a ? 'Top' : 'Left'
            const m = f.toLowerCase()
            const h = a ? 'left' : 'top'
            const g = a ? 'bottom' : 'right'
            const u = L(n)[l]
            d[g] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[g] - u)),
              d[m] + u > s[g] && (e.offsets.popper[m] += d[m] + u - s[g]),
              (e.offsets.popper = c(e.offsets.popper))
            const b = d[m] + d[l] / 2 - u / 2
            const w = t(e.instance.popper)
            const y = parseFloat(w['margin' + f], 10)
            const E = parseFloat(w['border' + f + 'Width'], 10)
            let v = b - e.offsets.popper[m] - y - E
            return (
              (v = J(_(s[l] - u, v), 0)),
              (e.arrowElement = n),
              (e.offsets.arrow =
                ((i = {}), pe(i, m, Math.round(v)), pe(i, h, ''), i)),
              e
            )
          },
          element: '[x-arrow]'
        },
        flip: {
          order: 600,
          enabled: !0,
          fn(e, t) {
            if (k(e.instance.modifiers, 'inner')) return e
            if (e.flipped && e.placement === e.originalPlacement) return e
            const o = y(
              e.instance.popper,
              e.instance.reference,
              t.padding,
              t.boundariesElement
            )
            let i = e.placement.split('-')[0]
            let n = x(i)
            let r = e.placement.split('-')[1] || ''
            let p = []
            switch (t.behavior) {
              case le.FLIP:
                p = [i, n]
                break
              case le.CLOCKWISE:
                p = q(i)
                break
              case le.COUNTERCLOCKWISE:
                p = q(i, !0)
                break
              default:
                p = t.behavior
            }
            return (
              p.forEach(function(s, d) {
                if (i !== s || p.length === d + 1) return e
                ;(i = e.placement.split('-')[0]), (n = x(i))
                const a = e.offsets.popper
                const l = e.offsets.reference
                const f = X
                const m =
                  (i === 'left' && f(a.right) > f(l.left)) ||
                  (i === 'right' && f(a.left) < f(l.right)) ||
                  (i === 'top' && f(a.bottom) > f(l.top)) ||
                  (i === 'bottom' && f(a.top) < f(l.bottom))
                const h = f(a.left) < f(o.left)
                const c = f(a.right) > f(o.right)
                const g = f(a.top) < f(o.top)
                const u = f(a.bottom) > f(o.bottom)
                const b =
                  (i === 'left' && h) ||
                  (i === 'right' && c) ||
                  (i === 'top' && g) ||
                  (i === 'bottom' && u)
                const w = ['top', 'bottom'].includes(i)
                const y =
                  !!t.flipVariations &&
                  ((w && r === 'start' && h) ||
                    (w && r === 'end' && c) ||
                    (!w && r === 'start' && g) ||
                    (!w && r === 'end' && u))
                ;(m || b || y) &&
                  ((e.flipped = !0),
                  (m || b) && (i = p[d + 1]),
                  y && (r = K(r)),
                  (e.placement = i + (r ? '-' + r : '')),
                  (e.offsets.popper = se(
                    {},
                    e.offsets.popper,
                    S(e.instance.popper, e.offsets.reference, e.placement)
                  )),
                  (e = C(e.instance.modifiers, e, 'flip')))
              }),
              e
            )
          },
          behavior: 'flip',
          padding: 5,
          boundariesElement: 'viewport'
        },
        inner: {
          order: 700,
          enabled: !1,
          fn(e) {
            const t = e.placement
            const o = t.split('-')[0]
            const i = e.offsets
            const n = i.popper
            const r = i.reference
            const p = ['left', 'right'].includes(o)
            const s = !['top', 'left'].includes(o)
            return (
              (n[p ? 'left' : 'top'] =
                r[o] - (s ? n[p ? 'width' : 'height'] : 0)),
              (e.placement = x(t)),
              (e.offsets.popper = c(n)),
              e
            )
          }
        },
        hide: {
          order: 800,
          enabled: !0,
          fn(e) {
            if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e
            const t = e.offsets.reference
            const o = T(e.instance.modifiers, function(e) {
              return e.name === 'preventOverflow'
            }).boundaries
            if (
              t.bottom < o.top ||
              t.left > o.right ||
              t.top > o.bottom ||
              t.right < o.left
            ) {
              if (!0 === e.hide) return e
              ;(e.hide = !0), (e.attributes['x-out-of-boundaries'] = '')
            } else {
              if (!1 === e.hide) return e
              ;(e.hide = !1), (e.attributes['x-out-of-boundaries'] = !1)
            }
            return e
          }
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn(e, t) {
            const o = t.x
            const i = t.y
            const n = e.offsets.popper
            const p = T(e.instance.modifiers, function(e) {
              return e.name === 'applyStyle'
            }).gpuAcceleration
            void 0 !== p &&
              console.warn(
                'WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!'
              )
            let s
            let d
            const a = void 0 === p ? t.gpuAcceleration : p
            const l = r(e.instance.popper)
            const f = g(l)
            const m = { position: n.position }
            const h = {
              left: X(n.left),
              top: X(n.top),
              bottom: X(n.bottom),
              right: X(n.right)
            }
            const c = o === 'bottom' ? 'top' : 'bottom'
            const u = i === 'right' ? 'left' : 'right'
            const b = W('transform')
            if (
              ((d = c == 'bottom' ? -f.height + h.bottom : h.top),
              (s = u == 'right' ? -f.width + h.right : h.left),
              a && b)
            )
              (m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)'),
                (m[c] = 0),
                (m[u] = 0),
                (m.willChange = 'transform')
            else {
              const w = c == 'bottom' ? -1 : 1
              const y = u == 'right' ? -1 : 1
              ;(m[c] = d * w), (m[u] = s * y), (m.willChange = c + ', ' + u)
            }
            const E = { 'x-placement': e.placement }
            return (
              (e.attributes = se({}, E, e.attributes)),
              (e.styles = se({}, m, e.styles)),
              (e.arrowStyles = se({}, e.offsets.arrow, e.arrowStyles)),
              e
            )
          },
          gpuAcceleration: !0,
          x: 'bottom',
          y: 'right'
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn(e) {
            return (
              Y(e.instance.popper, e.styles),
              j(e.instance.popper, e.attributes),
              e.arrowElement &&
                Object.keys(e.arrowStyles).length &&
                Y(e.arrowElement, e.arrowStyles),
              e
            )
          },
          onLoad(e, t, o, i, n) {
            const r = O(n, t, e)
            const p = v(
              o.placement,
              r,
              t,
              e,
              o.modifiers.flip.boundariesElement,
              o.modifiers.flip.padding
            )
            return (
              t.setAttribute('x-placement', p),
              Y(t, { position: 'absolute' }),
              o
            )
          },
          gpuAcceleration: void 0
        }
      }
    }),
    fe
  )
})
// # sourceMappingURL=popper.min.js.map
