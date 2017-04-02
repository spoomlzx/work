/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

!function(d,c){"object"==typeof exports&&"undefined"!=typeof module?module.exports=c():"function"==typeof define&&define.amd?define(c):d.moment=c()}(this,function(){function e5(){return b7.apply(null,arguments)}function e3(b){b7=b}function e1(b){return b instanceof Array||"[object Array]"===Object.prototype.toString.call(b)}function eZ(b){return null!=b&&"[object Object]"===Object.prototype.toString.call(b)}function eX(d){var c;for(c in d){return !1}return !0}function eV(b){return"number"==typeof b||"[object Number]"===Object.prototype.toString.call(b)}function eU(b){return b instanceof Date||"[object Date]"===Object.prototype.toString.call(b)}function eS(f,e){var h,g=[];for(h=0;h<f.length;++h){g.push(e(f[h],h))}return g}function eR(d,c){return Object.prototype.hasOwnProperty.call(d,c)}function eQ(e,d){for(var f in d){eR(d,f)&&(e[f]=d[f])}return eR(d,"toString")&&(e.toString=d.toString),eR(d,"valueOf")&&(e.valueOf=d.valueOf),e}function eP(f,e,h,g){return bC(f,e,h,g,!0).utc()}function eO(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function eN(b){return null==b._pf&&(b._pf=eO()),b._pf}function eM(f){if(null==f._isValid){var e=eN(f),h=bL.call(e.parsedDateParts,function(b){return null!=b}),g=!isNaN(f._d.getTime())&&e.overflow<0&&!e.empty&&!e.invalidMonth&&!e.invalidWeekday&&!e.nullInput&&!e.invalidFormat&&!e.userInvalidated&&(!e.meridiem||e.meridiem&&h);if(f._strict&&(g=g&&0===e.charsLeftOver&&0===e.unusedTokens.length&&void 0===e.bigHour),null!=Object.isFrozen&&Object.isFrozen(f)){return g}f._isValid=g}return f._isValid}function eL(d){var c=eP(NaN);return null!=d?eQ(eN(c),d):eN(c).userInvalidated=!0,c}function eK(b){return void 0===b}function eJ(g,f){var j,i,h;if(eK(f._isAMomentObject)||(g._isAMomentObject=f._isAMomentObject),eK(f._i)||(g._i=f._i),eK(f._f)||(g._f=f._f),eK(f._l)||(g._l=f._l),eK(f._strict)||(g._strict=f._strict),eK(f._tzm)||(g._tzm=f._tzm),eK(f._isUTC)||(g._isUTC=f._isUTC),eK(f._offset)||(g._offset=f._offset),eK(f._pf)||(g._pf=eN(f)),eK(f._locale)||(g._locale=f._locale),bA.length>0){for(j in bA){i=bA[j],h=f[i],eK(h)||(g[i]=h)}}return g}function eI(a){eJ(this,a),this._d=new Date(null!=a._d?a._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),bk===!1&&(bk=!0,e5.updateOffset(this),bk=!1)}function eH(b){return b instanceof eI||null!=b&&null!=b._isAMomentObject}function eG(b){return b<0?Math.ceil(b)||0:Math.floor(b)}function eF(e){var d=+e,f=0;return 0!==d&&isFinite(d)&&(f=eG(d)),f}function eE(i,h,n){var m,l=Math.min(i.length,h.length),k=Math.abs(i.length-h.length),j=0;for(m=0;m<l;m++){(n&&i[m]!==h[m]||!n&&eF(i[m])!==eF(h[m]))&&j++}return j+k}function eD(a){e5.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function eC(a,f){var e=!0;return eQ(function(){if(null!=e5.deprecationHandler&&e5.deprecationHandler(null,a),e){for(var i,d=[],c=0;c<arguments.length;c++){if(i="","object"==typeof arguments[c]){i+="\n["+c+"] ";for(var b in arguments[0]){i+=b+": "+arguments[0][b]+", "}i=i.slice(0,-2)}else{i=arguments[c]}d.push(i)}eD(a+"\nArguments: "+Array.prototype.slice.call(d).join("")+"\n"+(new Error).stack),e=!1}return f.apply(this,arguments)},f)}function eA(a,d){null!=e5.deprecationHandler&&e5.deprecationHandler(a,d),a4[a]||(eD(d),a4[a]=!0)}function ey(b){return b instanceof Function||"[object Function]"===Object.prototype.toString.call(b)}function fN(e){var d,f;for(f in e){d=e[f],ey(d)?this[f]=d:this["_"+f]=d}this._config=e,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function fM(f,d){var h,g=eQ({},f);for(h in d){eR(d,h)&&(eZ(f[h])&&eZ(d[h])?(g[h]={},eQ(g[h],f[h]),eQ(g[h],d[h])):null!=d[h]?g[h]=d[h]:delete g[h])}for(h in f){eR(f,h)&&!eR(d,h)&&eZ(f[h])&&(g[h]=eQ({},g[h]))}return g}function fK(b){null!=b&&this.set(b)}function fI(f,e,h){var g=this._calendar[f]||this._calendar.sameElse;return ey(g)?g.call(e,h):g}function fG(e){var d=this._longDateFormat[e],f=this._longDateFormat[e.toUpperCase()];return d||!f?d:(this._longDateFormat[e]=f.replace(/MMMM|MM|DD|dddd/g,function(b){return b.slice(1)}),this._longDateFormat[e])}function fE(){return this._invalidDate}function fC(b){return this._ordinal.replace("%d",b)}function fB(g,f,j,i){var h=this._relativeTime[j];return ey(h)?h(g,f,j,i):h.replace(/%d/i,g)}function fz(e,d){var f=this._relativeTime[e>0?"future":"past"];return ey(f)?f(d):f.replace(/%s/i,d)}function fy(e,d){var f=e.toLowerCase();aP[f]=aP[f+"s"]=aP[d]=e}function fx(b){return"string"==typeof b?aP[b]||aP[b.toLowerCase()]:void 0}function fw(f){var e,h,g={};for(h in f){eR(f,h)&&(e=fx(h),e&&(g[e]=f[h]))}return g}function fv(d,c){aF[d]=c}function fu(e){var d=[];for(var f in e){d.push({unit:f,priority:aF[f]})}return d.sort(function(g,c){return g.priority-c.priority}),d}function ft(a,d){return function(b){return null!=b?(fr(this,a,b),e5.updateOffset(this,d),this):fs(this,a)
}}function fs(d,c){return d.isValid()?d._d["get"+(d._isUTC?"UTC":"")+c]():NaN}function fr(e,d,f){e.isValid()&&e._d["set"+(e._isUTC?"UTC":"")+d](f)}function fq(b){return b=fx(b),ey(this[b])?this[b]():this}function fp(f,e){if("object"==typeof f){f=fw(f);for(var h=fu(f),g=0;g<h.length;g++){this[h[g].unit](f[h[g].unit])}}else{if(f=fx(f),ey(this[f])){return this[f](e)}}return this}function fo(h,g,l){var k=""+Math.abs(h),j=g-k.length,i=h>=0;return(i?l?"+":"":"-")+Math.pow(10,Math.max(0,j)).toString().substr(1)+k}function fn(g,f,j,i){var h=i;"string"==typeof i&&(h=function(){return this[i]()}),g&&(fP[g]=h),f&&(fP[f[0]]=function(){return fo(h.apply(this,arguments),f[1],f[2])}),j&&(fP[j]=function(){return this.localeData().ordinal(h.apply(this,arguments),g)})}function fm(b){return b.match(/\[[\s\S]/)?b.replace(/^\[|\]$/g,""):b.replace(/\\/g,"")}function fl(f){var e,h,g=f.match(av);for(e=0,h=g.length;e<h;e++){fP[g[e]]?g[e]=fP[g[e]]:g[e]=fm(g[e])}return function(a){var d,c="";for(d=0;d<h;d++){c+=g[d] instanceof Function?g[d].call(a,f):g[d]}return c}}function fk(d,c){return d.isValid()?(c=fj(c,d.localeData()),f6[c]=f6[c]||fl(c),f6[c](d)):d.localeData().invalidDate()}function fj(f,e){function h(b){return e.longDateFormat(b)||b}var g=5;for(gm.lastIndex=0;g>=0&&gm.test(f);){f=f.replace(gm,h),gm.lastIndex=0,g-=1}return f}function fh(e,d,f){cn[e]=ey(d)?d:function(b,c){return b&&f?f:d}}function f3(d,c){return eR(cn,d)?cn[d](c._strict,c._locale):new RegExp(e6(d))}function e6(b){return f4(b.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(g,f,j,i,h){return f||j||i||h}))}function f4(b){return b.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function fL(f,e){var h,g=e;for("string"==typeof f&&(f=[f]),eV(e)&&(g=function(b,d){d[e]=eF(b)}),h=0;h<f.length;h++){ap[f[h]]=g}}function e4(d,c){fL(d,function(b,h,g,f){g._w=g._w||{},c(b,g._w,g,f)})}function eu(e,d,f){null!=d&&eR(ap,e)&&ap[e](d,f._a,f,e)}function ej(d,c){return new Date(Date.UTC(d,c+1,0)).getUTCDate()}function d2(d,c){return d?e1(this._months)?this._months[d.month()]:this._months[(this._months.isFormat||cZ).test(c)?"format":"standalone"][d.month()]:this._months}function dR(d,c){return d?e1(this._monthsShort)?this._monthsShort[d.month()]:this._monthsShort[cZ.test(c)?"format":"standalone"][d.month()]:this._monthsShort}function dG(i,h,n){var m,l,k,j=i.toLocaleLowerCase();if(!this._monthsParse){for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],m=0;m<12;++m){k=eP([2000,m]),this._shortMonthsParse[m]=this.monthsShort(k,"").toLocaleLowerCase(),this._longMonthsParse[m]=this.months(k,"").toLocaleLowerCase()}}return n?"MMM"===h?(l=dg.call(this._shortMonthsParse,j),l!==-1?l:null):(l=dg.call(this._longMonthsParse,j),l!==-1?l:null):"MMM"===h?(l=dg.call(this._shortMonthsParse,j),l!==-1?l:(l=dg.call(this._longMonthsParse,j),l!==-1?l:null)):(l=dg.call(this._longMonthsParse,j),l!==-1?l:(l=dg.call(this._shortMonthsParse,j),l!==-1?l:null))}function dv(h,g,l){var k,j,i;if(this._monthsParseExact){return dG.call(this,h,g,l)}for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),k=0;k<12;k++){if(j=eP([2000,k]),l&&!this._longMonthsParse[k]&&(this._longMonthsParse[k]=new RegExp("^"+this.months(j,"").replace(".","")+"$","i"),this._shortMonthsParse[k]=new RegExp("^"+this.monthsShort(j,"").replace(".","")+"$","i")),l||this._monthsParse[k]||(i="^"+this.months(j,"")+"|^"+this.monthsShort(j,""),this._monthsParse[k]=new RegExp(i.replace(".",""),"i")),l&&"MMMM"===g&&this._longMonthsParse[k].test(h)){return k}if(l&&"MMM"===g&&this._shortMonthsParse[k].test(h)){return k}if(!l&&this._monthsParse[k].test(h)){return k}}}function dk(e,d){var f;if(!e.isValid()){return e}if("string"==typeof d){if(/^\d+$/.test(d)){d=eF(d)}else{if(d=e.localeData().monthsParse(d),!eV(d)){return e}}}return f=Math.min(e.date(),ej(e.year(),d)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](d,f),e}function c3(a){return null!=a?(dk(this,a),e5.updateOffset(this,!0),this):fs(this,"Month")}function cS(){return ej(this.year(),this.month())}function cH(b){return this._monthsParseExact?(eR(this,"_monthsRegex")||cg.call(this),b?this._monthsShortStrictRegex:this._monthsShortRegex):(eR(this,"_monthsShortRegex")||(this._monthsShortRegex=cs),this._monthsShortStrictRegex&&b?this._monthsShortStrictRegex:this._monthsShortRegex)}function cw(b){return this._monthsParseExact?(eR(this,"_monthsRegex")||cg.call(this),b?this._monthsStrictRegex:this._monthsRegex):(eR(this,"_monthsRegex")||(this._monthsRegex=b6),this._monthsStrictRegex&&b?this._monthsStrictRegex:this._monthsRegex)}function cg(){function h(d,c){return c.length-d.length}var g,l,k=[],j=[],i=[];for(g=0;g<12;g++){l=eP([2000,g]),k.push(this.monthsShort(l,"")),j.push(this.months(l,"")),i.push(this.months(l,"")),i.push(this.monthsShort(l,""))}for(k.sort(h),j.sort(h),i.sort(h),g=0;g<12;g++){k[g]=f4(k[g]),j[g]=f4(j[g])}for(g=0;g<24;g++){i[g]=f4(i[g])}this._monthsRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+j.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+k.join("|")+")","i")
}function bZ(b){return bO(b)?366:365}function bO(b){return b%4===0&&b%100!==0||b%400===0}function bD(){return bO(this.year())}function bn(j,i,p,o,n,m,l){var k=new Date(j,i,p,o,n,m,l);return j<100&&j>=0&&isFinite(k.getFullYear())&&k.setFullYear(j),k}function a7(d){var c=new Date(Date.UTC.apply(null,arguments));return d<100&&d>=0&&isFinite(c.getUTCFullYear())&&c.setUTCFullYear(d),c}function aX(g,f,j){var i=7+f-j,h=(7+a7(g,0,i).getUTCDay()-f)%7;return -h+i-1}function aN(t,s,r,q,p){var o,n,m=(7+r-q)%7,l=aX(t,q,p),k=1+7*(s-1)+m+l;return k<=0?(o=t-1,n=bZ(o)+k):k>bZ(t)?(o=t+1,n=k-bZ(t)):(o=t,n=k),{year:o,dayOfYear:n}}function aD(i,h,n){var m,l,k=aX(i.year(),h,n),j=Math.floor((i.dayOfYear()-k-1)/7)+1;return j<1?(l=i.year()-1,m=j+an(l,h,n)):j>an(i.year(),h,n)?(m=j-an(i.year(),h,n),l=i.year()+1):(l=i.year(),m=j),{week:m,year:l}}function an(g,f,j){var i=aX(g,f,j),h=aX(g+1,f,j);return(bZ(g)-i+h)/7}function gk(b){return aD(b,this._week.dow,this._week.doy).week}function fX(){return this._week.dow}function bx(){return this._week.doy}function bi(d){var c=this.localeData().week(this);return null==d?c:this.add(7*(d-c),"d")}function a2(d){var c=aD(this,1,4).week;return null==d?c:this.add(7*(d-c),"d")}function aS(d,c){return"string"!=typeof d?d:isNaN(d)?(d=c.weekdaysParse(d),"number"==typeof d?d:null):parseInt(d,10)}function aI(d,c){return"string"==typeof d?c.weekdaysParse(d)%7||7:isNaN(d)?null:d}function ay(d,c){return d?e1(this._weekdays)?this._weekdays[d.day()]:this._weekdays[this._weekdays.isFormat.test(c)?"format":"standalone"][d.day()]:this._weekdays}function ai(b){return b?this._weekdaysShort[b.day()]:this._weekdaysShort}function f9(b){return b?this._weekdaysMin[b.day()]:this._weekdaysMin}function fS(i,h,n){var m,l,k,j=i.toLocaleLowerCase();if(!this._weekdaysParse){for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],m=0;m<7;++m){k=eP([2000,1]).day(m),this._minWeekdaysParse[m]=this.weekdaysMin(k,"").toLocaleLowerCase(),this._shortWeekdaysParse[m]=this.weekdaysShort(k,"").toLocaleLowerCase(),this._weekdaysParse[m]=this.weekdays(k,"").toLocaleLowerCase()}}return n?"dddd"===h?(l=dg.call(this._weekdaysParse,j),l!==-1?l:null):"ddd"===h?(l=dg.call(this._shortWeekdaysParse,j),l!==-1?l:null):(l=dg.call(this._minWeekdaysParse,j),l!==-1?l:null):"dddd"===h?(l=dg.call(this._weekdaysParse,j),l!==-1?l:(l=dg.call(this._shortWeekdaysParse,j),l!==-1?l:(l=dg.call(this._minWeekdaysParse,j),l!==-1?l:null))):"ddd"===h?(l=dg.call(this._shortWeekdaysParse,j),l!==-1?l:(l=dg.call(this._weekdaysParse,j),l!==-1?l:(l=dg.call(this._minWeekdaysParse,j),l!==-1?l:null))):(l=dg.call(this._minWeekdaysParse,j),l!==-1?l:(l=dg.call(this._weekdaysParse,j),l!==-1?l:(l=dg.call(this._shortWeekdaysParse,j),l!==-1?l:null)))}function fi(h,g,l){var k,j,i;if(this._weekdaysParseExact){return fS.call(this,h,g,l)}for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),k=0;k<7;k++){if(j=eP([2000,1]).day(k),l&&!this._fullWeekdaysParse[k]&&(this._fullWeekdaysParse[k]=new RegExp("^"+this.weekdays(j,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[k]=new RegExp("^"+this.weekdaysShort(j,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[k]=new RegExp("^"+this.weekdaysMin(j,"").replace(".",".?")+"$","i")),this._weekdaysParse[k]||(i="^"+this.weekdays(j,"")+"|^"+this.weekdaysShort(j,"")+"|^"+this.weekdaysMin(j,""),this._weekdaysParse[k]=new RegExp(i.replace(".",""),"i")),l&&"dddd"===g&&this._fullWeekdaysParse[k].test(h)){return k}if(l&&"ddd"===g&&this._shortWeekdaysParse[k].test(h)){return k}if(l&&"dd"===g&&this._minWeekdaysParse[k].test(h)){return k}if(!l&&this._weekdaysParse[k].test(h)){return k}}}function eB(d){if(!this.isValid()){return null!=d?this:NaN}var c=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=d?(d=aS(d,this.localeData()),this.add(d-c,"d")):c}function eo(d){if(!this.isValid()){return null!=d?this:NaN}var c=(this.day()+7-this.localeData()._week.dow)%7;return null==d?c:this.add(d-c,"d")}function d7(d){if(!this.isValid()){return null!=d?this:NaN}if(null!=d){var c=aI(d,this.localeData());return this.day(this.day()%7?c:c-7)}return this.day()||7}function dW(b){return this._weekdaysParseExact?(eR(this,"_weekdaysRegex")||dq.call(this),b?this._weekdaysStrictRegex:this._weekdaysRegex):(eR(this,"_weekdaysRegex")||(this._weekdaysRegex=aT),this._weekdaysStrictRegex&&b?this._weekdaysStrictRegex:this._weekdaysRegex)}function dL(b){return this._weekdaysParseExact?(eR(this,"_weekdaysRegex")||dq.call(this),b?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(eR(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=aJ),this._weekdaysShortStrictRegex&&b?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function dA(b){return this._weekdaysParseExact?(eR(this,"_weekdaysRegex")||dq.call(this),b?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(eR(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=az),this._weekdaysMinStrictRegex&&b?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)
}function dq(){function t(d,c){return c.length-d.length}var s,r,q,p,o,n=[],m=[],l=[],k=[];for(s=0;s<7;s++){r=eP([2000,1]).day(s),q=this.weekdaysMin(r,""),p=this.weekdaysShort(r,""),o=this.weekdays(r,""),n.push(q),m.push(p),l.push(o),k.push(q),k.push(p),k.push(o)}for(n.sort(t),m.sort(t),l.sort(t),k.sort(t),s=0;s<7;s++){m[s]=f4(m[s]),l[s]=f4(l[s]),k[s]=f4(k[s])}this._weekdaysRegex=new RegExp("^("+k.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+m.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+n.join("|")+")","i")}function c8(){return this.hours()%12||12}function cX(){return this.hours()||24}function cM(d,c){fn(d,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),c)})}function cB(d,c){return c._meridiemParse}function cl(b){return"p"===(b+"").toLowerCase().charAt(0)}function b4(e,d,f){return e>11?f?"pm":"PM":f?"am":"AM"}function bT(b){return b?b.toLowerCase().replace("_","-"):b}function bI(h){for(var g,l,k,j,i=0;i<h.length;){for(j=bT(h[i]).split("-"),g=j.length,l=bT(h[i+1]),l=l?l.split("-"):null;g>0;){if(k=bs(j.slice(0,g).join("-"))){return k}if(l&&l.length>=g&&eE(j,l,!0)>=g-1){break}g--}i++}return null}function bs(d){var c=null;if(!a8[d]&&"undefined"!=typeof module&&module&&module.exports){try{c=aj._abbr,require("./locale/"+d),cq(c)}catch(d){}}return a8[d]}function cq(e,d){var f;return e&&(f=eK(d)?fJ(e):at(e,d),f&&(aj=f)),aj._abbr}function at(e,d){if(null!==d){var f=bt;if(d.abbr=e,null!=a8[e]){eA("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),f=a8[e]._config}else{if(null!=d.parentLocale){if(null==a8[d.parentLocale]){return aY[d.parentLocale]||(aY[d.parentLocale]=[]),aY[d.parentLocale].push({name:e,config:d}),null}f=a8[d.parentLocale]._config}}return a8[e]=new fK(fM(f,d)),aY[e]&&aY[e].forEach(function(b){at(b.name,b.config)}),cq(e),a8[e]}return delete a8[e],null}function f2(f,e){if(null!=e){var h,g=bt;null!=a8[f]&&(g=a8[f]._config),e=fM(g,e),h=new fK(e),h.parentLocale=a8[f],a8[f]=h,cq(f)}else{null!=a8[f]&&(null!=a8[f].parentLocale?a8[f]=a8[f].parentLocale:null!=a8[f]&&delete a8[f])}return a8[f]}function fJ(d){var c;if(d&&d._locale&&d._locale._abbr&&(d=d._locale._abbr),!d){return aj}if(!e1(d)){if(c=bs(d)){return c}d=[d]}return bI(d)}function e2(){return aA(a8)}function et(e){var d,f=e._a;return f&&eN(e).overflow===-2&&(d=f[fD]<0||f[fD]>11?fD:f[eW]<1||f[eW]>ej(f[fZ],f[fD])?eW:f[eq]<0||f[eq]>24||24===f[eq]&&(0!==f[d9]||0!==f[dY]||0!==f[dN])?eq:f[d9]<0||f[d9]>59?d9:f[dY]<0||f[dY]>59?dY:f[dN]<0||f[dN]>999?dN:-1,eN(e)._overflowDayOfYear&&(d<fZ||d>eW)&&(d=eW),eN(e)._overflowWeeks&&d===-1&&(d=dC),eN(e)._overflowWeekday&&d===-1&&(d=dr),eN(e).overflow=d),e}function ei(r){var q,p,o,n,m,l,k=r._i,j=aO.exec(k)||aE.exec(k);if(j){for(eN(r).iso=!0,q=0,p=gl.length;q<p;q++){if(gl[q][1].exec(j[1])){n=gl[q][0],o=gl[q][2]!==!1;break}}if(null==n){return void (r._isValid=!1)}if(j[3]){for(q=0,p=f5.length;q<p;q++){if(f5[q][1].exec(j[3])){m=(j[2]||" ")+f5[q][0];break}}if(null==m){return void (r._isValid=!1)}}if(!o&&null!=m){return void (r._isValid=!1)}if(j[4]){if(!au.exec(j[4])){return void (r._isValid=!1)}l="Z"}r._f=n+(m||"")+(l||""),c2(r)}else{r._isValid=!1}}function d1(a){var d=fO.exec(a._i);return null!==d?void (a._d=new Date(+d[1])):(ei(a),void (a._isValid===!1&&(delete a._isValid,e5.createFromInputFallback(a))))}function dQ(e,d,f){return null!=e?e:null!=d?d:f}function dF(a){var d=new Date(e5.now());return a._useUTC?[d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()]:[d.getFullYear(),d.getMonth(),d.getDate()]}function du(h){var g,l,k,j,i=[];if(!h._d){for(k=dF(h),h._w&&null==h._a[eW]&&null==h._a[fD]&&dj(h),h._dayOfYear&&(j=dQ(h._a[fZ],k[fZ]),h._dayOfYear>bZ(j)&&(eN(h)._overflowDayOfYear=!0),l=a7(j,0,h._dayOfYear),h._a[fD]=l.getUTCMonth(),h._a[eW]=l.getUTCDate()),g=0;g<3&&null==h._a[g];++g){h._a[g]=i[g]=k[g]}for(;g<7;g++){h._a[g]=i[g]=null==h._a[g]?2===g?1:0:h._a[g]}24===h._a[eq]&&0===h._a[d9]&&0===h._a[dY]&&0===h._a[dN]&&(h._nextDay=!0,h._a[eq]=0),h._d=(h._useUTC?a7:bn).apply(null,i),null!=h._tzm&&h._d.setUTCMinutes(h._d.getUTCMinutes()-h._tzm),h._nextDay&&(h._a[eq]=24)}}function dj(t){var s,r,q,p,o,n,m,l;if(s=t._w,null!=s.GG||null!=s.W||null!=s.E){o=1,n=4,r=dQ(s.GG,t._a[fZ],aD(bm(),1,4).year),q=dQ(s.W,1),p=dQ(s.E,1),(p<1||p>7)&&(l=!0)}else{o=t._locale._week.dow,n=t._locale._week.doy;var k=aD(bm(),o,n);r=dQ(s.gg,t._a[fZ],k.year),q=dQ(s.w,k.week),null!=s.d?(p=s.d,(p<0||p>6)&&(l=!0)):null!=s.e?(p=s.e+o,(s.e<0||s.e>6)&&(l=!0)):p=o}q<1||q>an(r,o,n)?eN(t)._overflowWeeks=!0:null!=l?eN(t)._overflowWeekday=!0:(m=aN(r,q,p,o,n),t._a[fZ]=m.year,t._dayOfYear=m.dayOfYear)}function c2(r){if(r._f===e5.ISO_8601){return void ei(r)}r._a=[],eN(r).empty=!0;
    var q,p,o,n,m,l=""+r._i,k=l.length,a=0;for(o=fj(r._f,r._locale).match(av)||[],q=0;q<o.length;q++){n=o[q],p=(l.match(f3(n,r))||[])[0],p&&(m=l.substr(0,l.indexOf(p)),m.length>0&&eN(r).unusedInput.push(m),l=l.slice(l.indexOf(p)+p.length),a+=p.length),fP[n]?(p?eN(r).empty=!1:eN(r).unusedTokens.push(n),eu(n,p,r)):r._strict&&!p&&eN(r).unusedTokens.push(n)}eN(r).charsLeftOver=k-a,l.length>0&&eN(r).unusedInput.push(l),r._a[eq]<=12&&eN(r).bigHour===!0&&r._a[eq]>0&&(eN(r).bigHour=void 0),eN(r).parsedDateParts=r._a.slice(0),eN(r).meridiem=r._meridiem,r._a[eq]=cR(r._locale,r._a[eq],r._meridiem),du(r),et(r)}function cR(f,e,h){var g;return null==h?e:null!=f.meridiemHour?f.meridiemHour(e,h):null!=f.isPM?(g=f.isPM(h),g&&e<12&&(e+=12),g||12!==e||(e=0),e):e}function cG(h){var g,l,k,j,i;if(0===h._f.length){return eN(h).invalidFormat=!0,void (h._d=new Date(NaN))}for(j=0;j<h._f.length;j++){i=0,g=eJ({},h),null!=h._useUTC&&(g._useUTC=h._useUTC),g._f=h._f[j],c2(g),eM(g)&&(i+=eN(g).charsLeftOver,i+=10*eN(g).unusedTokens.length,eN(g).score=i,(null==k||i<k)&&(k=i,l=g))}eQ(h,l||g)}function cv(d){if(!d._d){var c=fw(d._i);d._a=eS([c.year,c.month,c.day||c.date,c.hour,c.minute,c.second,c.millisecond],function(b){return b&&parseInt(b,10)}),du(d)}}function b9(d){var c=new eI(et(bY(d)));return c._nextDay&&(c.add(1,"d"),c._nextDay=void 0),c}function bY(e){var c=e._i,f=e._f;return e._locale=e._locale||fJ(e._l),null===c||void 0===f&&""===c?eL({nullInput:!0}):("string"==typeof c&&(e._i=c=e._locale.preparse(c)),eH(c)?new eI(et(c)):(eU(c)?e._d=c:e1(f)?cG(e):f?c2(e):bN(e),eM(e)||(e._d=null),e))}function bN(a){var c=a._i;void 0===c?a._d=new Date(e5.now()):eU(c)?a._d=new Date(c.valueOf()):"string"==typeof c?d1(a):e1(c)?(a._a=eS(c.slice(0),function(b){return parseInt(b,10)}),du(a)):"object"==typeof c?cv(a):eV(c)?a._d=new Date(c):e5.createFromInputFallback(a)}function bC(d,c,l,k,j){var e={};return l!==!0&&l!==!1||(k=l,l=void 0),(eZ(d)&&eX(d)||e1(d)&&0===d.length)&&(d=void 0),e._isAMomentObject=!0,e._useUTC=e._isUTC=j,e._l=l,e._i=d,e._f=c,e._strict=k,b9(e)}function bm(f,e,h,g){return bC(f,e,h,g,!1)}function a6(f,c){var h,g;if(1===c.length&&e1(c[0])&&(c=c[0]),!c.length){return bm()}for(h=c[0],g=1;g<c.length;++g){c[g].isValid()&&!c[g][f](h)||(h=c[g])}return h}function aW(){var b=[].slice.call(arguments,0);return a6("isBefore",b)}function aM(){var b=[].slice.call(arguments,0);return a6("isAfter",b)}function aC(v){var u=fw(v),t=u.year||0,s=u.quarter||0,r=u.month||0,q=u.week||0,p=u.day||0,o=u.hour||0,n=u.minute||0,m=u.second||0,l=u.millisecond||0;this._milliseconds=+l+1000*m+60000*n+1000*o*60*60,this._days=+p+7*q,this._months=+r+3*s+12*t,this._data={},this._locale=fJ(),this._bubble()}function am(b){return b instanceof aC}function gj(b){return b<0?Math.round(-1*b)*-1:Math.round(b)}function fW(d,c){fn(d,0,0,function(){var b=this.utcOffset(),e="+";return b<0&&(b=-b,e="-"),e+fo(~~(b/60),2)+c+fo(~~b%60,2)})}function bw(h,g){var l=(g||"").match(h);if(null===l){return null}var k=l[l.length-1]||[],j=(k+"").match(d3)||["-",0,0],i=+(60*j[1])+eF(j[2]);return 0===i?0:"+"===j[0]?i:-i}function bh(a,h){var g,f;return h._isUTC?(g=h.clone(),f=(eH(a)||eU(a)?a.valueOf():bm(a).valueOf())-g.valueOf(),g._d.setTime(g._d.valueOf()+f),e5.updateOffset(g,!1),g):bm(a).local()}function a1(b){return 15*-Math.round(b._d.getTimezoneOffset()/15)}function aR(a,h){var g,f=this._offset||0;if(!this.isValid()){return null!=a?this:NaN}if(null!=a){if("string"==typeof a){if(a=bw(bQ,a),null===a){return this}}else{Math.abs(a)<16&&(a=60*a)}return !this._isUTC&&h&&(g=a1(this)),this._offset=a,this._isUTC=!0,null!=g&&this.add(g,"m"),f!==a&&(!h||this._changeInProgress?cL(this,dK(a-f,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,e5.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?f:a1(this)}function aH(d,c){return null!=d?("string"!=typeof d&&(d=-d),this.utcOffset(d,c),this):-this.utcOffset()}function ax(b){return this.utcOffset(0,b)}function ah(b){return this._isUTC&&(this.utcOffset(0,b),this._isUTC=!1,b&&this.subtract(a1(this),"m")),this}function f8(){if(null!=this._tzm){this.utcOffset(this._tzm)}else{if("string"==typeof this._i){var b=bw(b1,this._i);null!=b?this.utcOffset(b):this.utcOffset(0,!0)}}return this}function fR(b){return !!this.isValid()&&(b=b?bm(b).utcOffset():0,(this.utcOffset()-b)%60===0)}function fg(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function ez(){if(!eK(this._isDSTShifted)){return this._isDSTShifted}var d={};if(eJ(d,this),d=bY(d),d._a){var c=d._isUTC?eP(d._a):bm(d._a);this._isDSTShifted=this.isValid()&&eE(d._a,c.toArray())>0}else{this._isDSTShifted=!1}return this._isDSTShifted}function en(){return !!this.isValid()&&!this._isUTC}function d6(){return !!this.isValid()&&this._isUTC}function dV(){return !!this.isValid()&&(this._isUTC&&0===this._offset)}function dK(i,f){var n,m,l,k=i,j=null;return am(i)?k={ms:i._milliseconds,d:i._days,M:i._months}:eV(i)?(k={},f?k[f]=i:k.milliseconds=i):(j=dS.exec(i))?(n="-"===j[1]?-1:1,k={y:0,d:eF(j[eW])*n,h:eF(j[eq])*n,m:eF(j[d9])*n,s:eF(j[dY])*n,ms:eF(gj(1000*j[dN]))*n}):(j=dH.exec(i))?(n="-"===j[1]?-1:1,k={y:dz(j[2],n),M:dz(j[3],n),w:dz(j[4],n),d:dz(j[5],n),h:dz(j[6],n),m:dz(j[7],n),s:dz(j[8],n)}):null==k?k={}:"object"==typeof k&&("from" in k||"to" in k)&&(l=c7(bm(k.from),bm(k.to)),k={},k.ms=l.milliseconds,k.M=l.months),m=new aC(k),am(i)&&eR(i,"_locale")&&(m._locale=i._locale),m
}function dz(e,d){var f=e&&parseFloat(e.replace(",","."));return(isNaN(f)?0:f)*d}function dp(e,d){var f={milliseconds:0,months:0};return f.months=d.month()-e.month()+12*(d.year()-e.year()),e.clone().add(f.months,"M").isAfter(d)&&--f.months,f.milliseconds=+d-+e.clone().add(f.months,"M"),f}function c7(e,d){var f;return e.isValid()&&d.isValid()?(d=bh(d,e),e.isBefore(d)?f=dp(e,d):(f=dp(d,e),f.milliseconds=-f.milliseconds,f.months=-f.months),f):{milliseconds:0,months:0}}function cW(d,c){return function(h,g){var b,a;return null===g||isNaN(+g)||(eA(c,"moment()."+c+"(period, number) is deprecated. Please use moment()."+c+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),a=h,h=g,g=a),h="string"==typeof h?+h:h,b=dK(h,g),cL(this,b,d),this}}function cL(a,n,m,l){var k=n._milliseconds,j=gj(n._days),i=gj(n._months);a.isValid()&&(l=null==l||l,k&&a._d.setTime(a._d.valueOf()+k*m),j&&fr(a,"Date",fs(a,"Date")+j*m),i&&dk(a,fs(a,"Month")+i*m),l&&e5.updateOffset(a,j||i))}function cA(e,d){var f=e.diff(d,"days",!0);return f<-6?"sameElse":f<-1?"lastWeek":f<0?"lastDay":f<1?"sameDay":f<2?"nextDay":f<7?"nextWeek":"sameElse"}function ck(a,l){var k=a||bm(),j=bh(k,this).startOf("day"),i=e5.calendarFormat(this,j)||"sameElse",h=l&&(ey(l[i])?l[i].call(this,k):l[i]);return this.format(h||this.localeData().calendar(i,this,bm(k)))}function b3(){return new eI(this)}function bS(e,d){var f=eH(e)?e:bm(e);return !(!this.isValid()||!f.isValid())&&(d=fx(eK(d)?"millisecond":d),"millisecond"===d?this.valueOf()>f.valueOf():f.valueOf()<this.clone().startOf(d).valueOf())}function bH(e,d){var f=eH(e)?e:bm(e);return !(!this.isValid()||!f.isValid())&&(d=fx(eK(d)?"millisecond":d),"millisecond"===d?this.valueOf()<f.valueOf():this.clone().endOf(d).valueOf()<f.valueOf())}function br(f,e,h,g){return g=g||"()",("("===g[0]?this.isAfter(f,h):!this.isBefore(f,h))&&(")"===g[1]?this.isBefore(e,h):!this.isAfter(e,h))}function cp(f,e){var h,g=eH(f)?f:bm(f);return !(!this.isValid()||!g.isValid())&&(e=fx(e||"millisecond"),"millisecond"===e?this.valueOf()===g.valueOf():(h=g.valueOf(),this.clone().startOf(e).valueOf()<=h&&h<=this.clone().endOf(e).valueOf()))}function ar(d,c){return this.isSame(d,c)||this.isAfter(d,c)}function f1(d,c){return this.isSame(d,c)||this.isBefore(d,c)}function fH(i,h,n){var m,l,k,j;return this.isValid()?(m=bh(i,this),m.isValid()?(l=60000*(m.utcOffset()-this.utcOffset()),h=fx(h),"year"===h||"month"===h||"quarter"===h?(j=e0(this,m),"quarter"===h?j/=3:"year"===h&&(j/=12)):(k=this-m,j="second"===h?k/1000:"minute"===h?k/60000:"hour"===h?k/3600000:"day"===h?(k-l)/86400000:"week"===h?(k-l)/604800000:k),n?j:eG(j)):NaN):NaN}function e0(h,g){var l,k,j=12*(g.year()-h.year())+(g.month()-h.month()),i=h.clone().add(j,"months");return g-i<0?(l=h.clone().add(j-1,"months"),k=(g-i)/(i-l)):(l=h.clone().add(j+1,"months"),k=(g-i)/(l-i)),-(j+k)||0}function es(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function eh(){var b=this.clone().utc();return 0<b.year()&&b.year()<=9999?ey(Date.prototype.toISOString)?this.toDate().toISOString():fk(b,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):fk(b,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function d0(){if(!this.isValid()){return"moment.invalid(/* "+this._i+" */)"}var h="moment",g="";this.isLocal()||(h=0===this.utcOffset()?"moment.utc":"moment.parseZone",g="Z");var l="["+h+'("]',k=0<this.year()&&this.year()<=9999?"YYYY":"YYYYYY",j="-MM-DD[T]HH:mm:ss.SSS",i=g+'[")]';return this.format(l+k+j+i)}function dP(a){a||(a=this.isUtc()?e5.defaultFormatUtc:e5.defaultFormat);var d=fk(this,a);return this.localeData().postformat(d)}function dE(d,c){return this.isValid()&&(eH(d)&&d.isValid()||bm(d).isValid())?dK({to:this,from:d}).locale(this.locale()).humanize(!c):this.localeData().invalidDate()}function dt(b){return this.from(bm(),b)}function di(d,c){return this.isValid()&&(eH(d)&&d.isValid()||bm(d).isValid())?dK({from:this,to:d}).locale(this.locale()).humanize(!c):this.localeData().invalidDate()}function c1(b){return this.to(bm(),b)}function cQ(d){var c;return void 0===d?this._locale._abbr:(c=fJ(d),null!=c&&(this._locale=c),this)}function cF(){return this._locale}function cu(b){switch(b=fx(b)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===b&&this.weekday(0),"isoWeek"===b&&this.isoWeekday(1),"quarter"===b&&this.month(3*Math.floor(this.month()/3)),this}function b8(b){return b=fx(b),void 0===b||"millisecond"===b?this:("date"===b&&(b="day"),this.startOf(b).add(1,"isoWeek"===b?"week":b).subtract(1,"ms"))}function bX(){return this._d.valueOf()-60000*(this._offset||0)}function bM(){return Math.floor(this.valueOf()/1000)}function bB(){return new Date(this.valueOf())}function bl(){var b=this;return[b.year(),b.month(),b.date(),b.hour(),b.minute(),b.second(),b.millisecond()]}function a5(){var b=this;return{years:b.year(),months:b.month(),date:b.date(),hours:b.hours(),minutes:b.minutes(),seconds:b.seconds(),milliseconds:b.milliseconds()}
}function aV(){return this.isValid()?this.toISOString():null}function aL(){return eM(this)}function aB(){return eQ({},eN(this))}function al(){return eN(this).overflow}function gi(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function fV(d,c){fn(0,[d,d.length],0,c)}function bv(b){return aG.call(this,b,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function bg(b){return aG.call(this,b,this.isoWeek(),this.isoWeekday(),1,4)}function a0(){return an(this.year(),1,4)}function aQ(){var b=this.localeData()._week;return an(this.year(),b.dow,b.doy)}function aG(h,g,l,k,j){var i;return null==h?aD(this,k,j).year:(i=an(h,k,j),g>i&&(g=i),aw.call(this,h,g,l,k,j))}function aw(i,h,n,m,l){var k=aN(i,h,n,m,l),j=a7(k.year,0,k.dayOfYear);return this.year(j.getUTCFullYear()),this.month(j.getUTCMonth()),this.date(j.getUTCDate()),this}function ag(b){return null==b?Math.ceil((this.month()+1)/3):this.month(3*(b-1)+this.month()%3)}function f7(d){var c=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/86400000)+1;return null==d?c:this.add(d-c,"d")}function fQ(d,c){c[dN]=eF(1000*("0."+d))}function e9(){return this._isUTC?"UTC":""}function ex(){return this._isUTC?"Coordinated Universal Time":""}function em(b){return bm(1000*b)}function d5(){return bm.apply(null,arguments).parseZone()}function dU(b){return b}function dJ(h,g,l,k){var j=fJ(),i=eP().set(k,g);return j[l](i,h)}function dy(g,f,j){if(eV(g)&&(f=g,g=void 0),g=g||"",null!=f){return dJ(g,f,j,"month")}var i,h=[];for(i=0;i<12;i++){h[i]=dJ(g,i,j,"month")}return h}function dn(j,f,p,o){"boolean"==typeof j?(eV(f)&&(p=f,f=void 0),f=f||""):(f=j,p=f,j=!1,eV(f)&&(p=f,f=void 0),f=f||"");var n=fJ(),m=j?n._week.dow:0;if(null!=p){return dJ(f,(p+m)%7,o,"day")}var l,k=[];for(l=0;l<7;l++){k[l]=dJ(f,(l+m)%7,o,"day")}return k}function c6(d,c){return dy(d,c,"months")}function cV(d,c){return dy(d,c,"monthsShort")}function cK(e,d,f){return dn(e,d,f,"weekdays")}function cz(e,d,f){return dn(e,d,f,"weekdaysShort")}function cj(e,d,f){return dn(e,d,f,"weekdaysMin")}function b2(){var b=this._data;return this._milliseconds=bo(this._milliseconds),this._days=bo(this._days),this._months=bo(this._months),b.milliseconds=bo(b.milliseconds),b.seconds=bo(b.seconds),b.minutes=bo(b.minutes),b.hours=bo(b.hours),b.months=bo(b.months),b.years=bo(b.years),this}function bR(g,f,j,i){var h=dK(f,j);return g._milliseconds+=i*h._milliseconds,g._days+=i*h._days,g._months+=i*h._months,g._bubble()}function bG(d,c){return bR(this,d,c,1)}function bq(d,c){return bR(this,d,c,-1)}function co(b){return b<0?Math.floor(b):Math.ceil(b)}function aq(){var r,q,p,o,n,m=this._milliseconds,l=this._days,k=this._months,j=this._data;return m>=0&&l>=0&&k>=0||m<=0&&l<=0&&k<=0||(m+=86400000*co(fF(k)+l),l=0,k=0),j.milliseconds=m%1000,r=eG(m/1000),j.seconds=r%60,q=eG(r/60),j.minutes=q%60,p=eG(q/60),j.hours=p%24,l+=eG(p/24),n=eG(f0(l)),k+=n,l-=co(fF(n)),o=eG(k/12),k%=12,j.days=l,j.months=k,j.years=o,this}function f0(b){return 4800*b/146097}function fF(b){return 146097*b/4800}function eY(f){var e,h,g=this._milliseconds;if(f=fx(f),"month"===f||"year"===f){return e=this._days+g/86400000,h=this._months+f0(e),"month"===f?h:h/12}switch(e=this._days+Math.round(fF(this._months)),f){case"week":return e/7+g/604800000;case"day":return e+g/86400000;case"hour":return 24*e+g/3600000;case"minute":return 1440*e+g/60000;case"second":return 86400*e+g/1000;case"millisecond":return Math.floor(86400000*e)+g;default:throw new Error("Unknown unit "+f)}}function er(){return this._milliseconds+86400000*this._days+this._months%12*2592000000+31536000000*eF(this._months/12)}function eg(b){return function(){return this.as(b)}}function dZ(b){return b=fx(b),this[b+"s"]()}function dO(b){return function(){return this._data[b]}}function dD(){return eG(this.days()/7)}function ds(g,f,j,i,h){return h.relativeTime(f||1,!!j,g,i)}function dh(v,u,t){var s=dK(v).abs(),r=b5(s.as("s")),q=b5(s.as("m")),p=b5(s.as("h")),o=b5(s.as("d")),n=b5(s.as("M")),m=b5(s.as("y")),l=r<bU.s&&["s",r]||q<=1&&["m"]||q<bU.m&&["mm",q]||p<=1&&["h"]||p<bU.h&&["hh",p]||o<=1&&["d"]||o<bU.d&&["dd",o]||n<=1&&["M"]||n<bU.M&&["MM",n]||m<=1&&["y"]||["yy",m];return l[2]=u,l[3]=+v>0,l[4]=t,ds.apply(null,l)}function c0(b){return void 0===b?b5:"function"==typeof b&&(b5=b,!0)}function cP(d,c){return void 0!==bU[d]&&(void 0===c?bU[d]:(bU[d]=c,!0))}function cE(e){var d=this.localeData(),f=dh(this,!e,d);return e&&(f=d.pastFuture(+this,f)),d.postformat(f)}function ct(){var z,y,x,w=bJ(this._milliseconds)/1000,v=bJ(this._days),u=bJ(this._months);z=eG(w/60),y=eG(z/60),w%=60,z%=60,x=eG(u/12),u%=12;var t=x,s=u,r=v,q=y,p=z,o=w,n=this.asSeconds();return n?(n<0?"-":"")+"P"+(t?t+"Y":"")+(s?s+"M":"")+(r?r+"D":"")+(q||p||o?"T":"")+(q?q+"H":"")+(p?p+"M":"")+(o?o+"S":""):"P0D"}var b7,bW;bW=Array.prototype.some?Array.prototype.some:function(f){for(var e=Object(this),h=e.length>>>0,g=0;g<h;g++){if(g in e&&f.call(this,e[g],g,e)){return !0}}return !1};var bL=bW,bA=e5.momentProperties=[],bk=!1,a4={};
    e5.suppressDeprecationWarnings=!1,e5.deprecationHandler=null;var aU;aU=Object.keys?Object.keys:function(e){var d,f=[];for(d in e){eR(e,d)&&f.push(d)}return f};var aK,aA=aU,ak={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},gh={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},fU="Invalid date",bu="%d",a9=/\d{1,2}/,aZ={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},aP={},aF={},av=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,gm=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,f6={},fP={},e8=/\d/,ew=/\d\d/,el=/\d{3}/,d4=/\d{4}/,dT=/[+-]?\d{6}/,dI=/\d\d?/,dx=/\d\d\d\d?/,dm=/\d\d\d\d\d\d?/,c5=/\d{1,3}/,cU=/\d{1,4}/,cJ=/[+-]?\d{1,6}/,cy=/\d+/,ci=/[+-]?\d+/,b1=/Z|[+-]\d\d:?\d\d/gi,bQ=/Z|[+-]\d\d(?::?\d\d)?/gi,bF=/[+-]?\d+(\.\d{1,3})?/,bp=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,cn={},ap={},fZ=0,fD=1,eW=2,eq=3,d9=4,dY=5,dN=6,dC=7,dr=8;aK=Array.prototype.indexOf?Array.prototype.indexOf:function(d){var c;for(c=0;c<this.length;++c){if(this[c]===d){return c}}return -1};var dg=aK;fn("M",["MM",2],"Mo",function(){return this.month()+1}),fn("MMM",0,0,function(b){return this.localeData().monthsShort(this,b)}),fn("MMMM",0,0,function(b){return this.localeData().months(this,b)}),fy("month","M"),fv("month",8),fh("M",dI),fh("MM",dI,ew),fh("MMM",function(d,c){return c.monthsShortRegex(d)}),fh("MMMM",function(d,c){return c.monthsRegex(d)}),fL(["M","MM"],function(d,c){c[fD]=eF(d)-1}),fL(["MMM","MMMM"],function(g,f,j,i){var h=j._locale.monthsParse(g,i,j._strict);null!=h?f[fD]=h:eN(j).invalidMonth=g});var cZ=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,cO="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),cD="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),cs=bp,b6=bp;fn("Y",0,0,function(){var b=this.year();return b<=9999?""+b:"+"+b}),fn(0,["YY",2],0,function(){return this.year()%100}),fn(0,["YYYY",4],0,"year"),fn(0,["YYYYY",5],0,"year"),fn(0,["YYYYYY",6,!0],0,"year"),fy("year","y"),fv("year",1),fh("Y",ci),fh("YY",dI,ew),fh("YYYY",cU,d4),fh("YYYYY",cJ,dT),fh("YYYYYY",cJ,dT),fL(["YYYYY","YYYYYY"],fZ),fL("YYYY",function(a,d){d[fZ]=2===a.length?e5.parseTwoDigitYear(a):eF(a)}),fL("YY",function(a,d){d[fZ]=e5.parseTwoDigitYear(a)}),fL("Y",function(d,c){c[fZ]=parseInt(d,10)}),e5.parseTwoDigitYear=function(b){return eF(b)+(eF(b)>68?1900:2000)};var bV=ft("FullYear",!0);fn("w",["ww",2],"wo","week"),fn("W",["WW",2],"Wo","isoWeek"),fy("week","w"),fy("isoWeek","W"),fv("week",5),fv("isoWeek",5),fh("w",dI),fh("ww",dI,ew),fh("W",dI),fh("WW",dI,ew),e4(["w","ww","W","WW"],function(f,e,h,g){e[g.substr(0,1)]=eF(f)});var bK={dow:0,doy:6};fn("d",0,"do","day"),fn("dd",0,0,function(b){return this.localeData().weekdaysMin(this,b)}),fn("ddd",0,0,function(b){return this.localeData().weekdaysShort(this,b)}),fn("dddd",0,0,function(b){return this.localeData().weekdays(this,b)}),fn("e",0,0,"weekday"),fn("E",0,0,"isoWeekday"),fy("day","d"),fy("weekday","e"),fy("isoWeekday","E"),fv("day",11),fv("weekday",11),fv("isoWeekday",11),fh("d",dI),fh("e",dI),fh("E",dI),fh("dd",function(d,c){return c.weekdaysMinRegex(d)}),fh("ddd",function(d,c){return c.weekdaysShortRegex(d)}),fh("dddd",function(d,c){return c.weekdaysRegex(d)}),e4(["dd","ddd","dddd"],function(g,f,j,i){var h=j._locale.weekdaysParse(g,i,j._strict);null!=h?f.d=h:eN(j).invalidWeekday=g}),e4(["d","e","E"],function(f,e,h,g){e[g]=eF(f)});var bz="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),bj="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),a3="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),aT=bp,aJ=bp,az=bp;fn("H",["HH",2],0,"hour"),fn("h",["hh",2],0,c8),fn("k",["kk",2],0,cX),fn("hmm",0,0,function(){return""+c8.apply(this)+fo(this.minutes(),2)}),fn("hmmss",0,0,function(){return""+c8.apply(this)+fo(this.minutes(),2)+fo(this.seconds(),2)}),fn("Hmm",0,0,function(){return""+this.hours()+fo(this.minutes(),2)}),fn("Hmmss",0,0,function(){return""+this.hours()+fo(this.minutes(),2)+fo(this.seconds(),2)}),cM("a",!0),cM("A",!1),fy("hour","h"),fv("hour",13),fh("a",cB),fh("A",cB),fh("H",dI),fh("h",dI),fh("HH",dI,ew),fh("hh",dI,ew),fh("hmm",dx),fh("hmmss",dm),fh("Hmm",dx),fh("Hmmss",dm),fL(["H","HH"],eq),fL(["a","A"],function(e,d,f){f._isPm=f._locale.isPM(e),f._meridiem=e}),fL(["h","hh"],function(e,d,f){d[eq]=eF(e),eN(f).bigHour=!0}),fL("hmm",function(f,e,h){var g=f.length-2;e[eq]=eF(f.substr(0,g)),e[d9]=eF(f.substr(g)),eN(h).bigHour=!0}),fL("hmmss",function(g,f,j){var i=g.length-4,h=g.length-2;f[eq]=eF(g.substr(0,i)),f[d9]=eF(g.substr(i,2)),f[dY]=eF(g.substr(h)),eN(j).bigHour=!0}),fL("Hmm",function(f,e,h){var g=f.length-2;
        e[eq]=eF(f.substr(0,g)),e[d9]=eF(f.substr(g))}),fL("Hmmss",function(g,f,j){var i=g.length-4,h=g.length-2;f[eq]=eF(g.substr(0,i)),f[d9]=eF(g.substr(i,2)),f[dY]=eF(g.substr(h))});var aj,gg=/[ap]\.?m?\.?/i,fT=ft("Hours",!0),bt={calendar:ak,longDateFormat:gh,invalidDate:fU,ordinal:bu,ordinalParse:a9,relativeTime:aZ,months:cO,monthsShort:cD,week:bK,weekdays:bz,weekdaysMin:a3,weekdaysShort:bj,meridiemParse:gg},a8={},aY={},aO=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,aE=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,au=/Z|[+-]\d\d(?::?\d\d)?/,gl=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],f5=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],fO=/^\/?Date\((\-?\d+)/i;e5.createFromInputFallback=eC("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(b){b._d=new Date(b._i+(b._useUTC?" UTC":""))}),e5.ISO_8601=function(){};var e7=eC("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var b=bm.apply(null,arguments);return this.isValid()&&b.isValid()?b<this?this:b:eL()}),ev=eC("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var b=bm.apply(null,arguments);return this.isValid()&&b.isValid()?b>this?this:b:eL()}),ek=function(){return Date.now?Date.now():+new Date};fW("Z",":"),fW("ZZ",""),fh("Z",bQ),fh("ZZ",bQ),fL(["Z","ZZ"],function(e,d,f){f._useUTC=!0,f._tzm=bw(bQ,e)});var d3=/([\+\-]|\d\d)/gi;e5.updateOffset=function(){};var dS=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,dH=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;dK.fn=aC.prototype;var dw=cW(1,"add"),dl=cW(-1,"subtract");e5.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",e5.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var c4=eC("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(b){return void 0===b?this.localeData():this.locale(b)});fn(0,["gg",2],0,function(){return this.weekYear()%100}),fn(0,["GG",2],0,function(){return this.isoWeekYear()%100}),fV("gggg","weekYear"),fV("ggggg","weekYear"),fV("GGGG","isoWeekYear"),fV("GGGGG","isoWeekYear"),fy("weekYear","gg"),fy("isoWeekYear","GG"),fv("weekYear",1),fv("isoWeekYear",1),fh("G",ci),fh("g",ci),fh("GG",dI,ew),fh("gg",dI,ew),fh("GGGG",cU,d4),fh("gggg",cU,d4),fh("GGGGG",cJ,dT),fh("ggggg",cJ,dT),e4(["gggg","ggggg","GGGG","GGGGG"],function(f,e,h,g){e[g.substr(0,2)]=eF(f)}),e4(["gg","GG"],function(a,h,g,f){h[f]=e5.parseTwoDigitYear(a)}),fn("Q",0,"Qo","quarter"),fy("quarter","Q"),fv("quarter",7),fh("Q",e8),fL("Q",function(d,c){c[fD]=3*(eF(d)-1)}),fn("D",["DD",2],"Do","date"),fy("date","D"),fv("date",9),fh("D",dI),fh("DD",dI,ew),fh("Do",function(d,c){return d?c._ordinalParse:c._ordinalParseLenient}),fL(["D","DD"],eW),fL("Do",function(d,c){c[eW]=eF(d.match(dI)[0],10)});var cT=ft("Date",!0);fn("DDD",["DDDD",3],"DDDo","dayOfYear"),fy("dayOfYear","DDD"),fv("dayOfYear",4),fh("DDD",c5),fh("DDDD",el),fL(["DDD","DDDD"],function(e,d,f){f._dayOfYear=eF(e)}),fn("m",["mm",2],0,"minute"),fy("minute","m"),fv("minute",14),fh("m",dI),fh("mm",dI,ew),fL(["m","mm"],d9);var cI=ft("Minutes",!1);fn("s",["ss",2],0,"second"),fy("second","s"),fv("second",15),fh("s",dI),fh("ss",dI,ew),fL(["s","ss"],dY);var cx=ft("Seconds",!1);fn("S",0,0,function(){return ~~(this.millisecond()/100)}),fn(0,["SS",2],0,function(){return ~~(this.millisecond()/10)}),fn(0,["SSS",3],0,"millisecond"),fn(0,["SSSS",4],0,function(){return 10*this.millisecond()}),fn(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),fn(0,["SSSSSS",6],0,function(){return 1000*this.millisecond()}),fn(0,["SSSSSSS",7],0,function(){return 10000*this.millisecond()}),fn(0,["SSSSSSSS",8],0,function(){return 100000*this.millisecond()}),fn(0,["SSSSSSSSS",9],0,function(){return 1000000*this.millisecond()}),fy("millisecond","ms"),fv("millisecond",16),fh("S",c5,e8),fh("SS",c5,ew),fh("SSS",c5,el);var ch;for(ch="SSSS";ch.length<=9;ch+="S"){fh(ch,cy)
    }for(ch="S";ch.length<=9;ch+="S"){fL(ch,fQ)}var b0=ft("Milliseconds",!1);fn("z",0,0,"zoneAbbr"),fn("zz",0,0,"zoneName");var bP=eI.prototype;bP.add=dw,bP.calendar=ck,bP.clone=b3,bP.diff=fH,bP.endOf=b8,bP.format=dP,bP.from=dE,bP.fromNow=dt,bP.to=di,bP.toNow=c1,bP.get=fq,bP.invalidAt=al,bP.isAfter=bS,bP.isBefore=bH,bP.isBetween=br,bP.isSame=cp,bP.isSameOrAfter=ar,bP.isSameOrBefore=f1,bP.isValid=aL,bP.lang=c4,bP.locale=cQ,bP.localeData=cF,bP.max=ev,bP.min=e7,bP.parsingFlags=aB,bP.set=fp,bP.startOf=cu,bP.subtract=dl,bP.toArray=bl,bP.toObject=a5,bP.toDate=bB,bP.toISOString=eh,bP.inspect=d0,bP.toJSON=aV,bP.toString=es,bP.unix=bM,bP.valueOf=bX,bP.creationData=gi,bP.year=bV,bP.isLeapYear=bD,bP.weekYear=bv,bP.isoWeekYear=bg,bP.quarter=bP.quarters=ag,bP.month=c3,bP.daysInMonth=cS,bP.week=bP.weeks=bi,bP.isoWeek=bP.isoWeeks=a2,bP.weeksInYear=aQ,bP.isoWeeksInYear=a0,bP.date=cT,bP.day=bP.days=eB,bP.weekday=eo,bP.isoWeekday=d7,bP.dayOfYear=f7,bP.hour=bP.hours=fT,bP.minute=bP.minutes=cI,bP.second=bP.seconds=cx,bP.millisecond=bP.milliseconds=b0,bP.utcOffset=aR,bP.utc=ax,bP.local=ah,bP.parseZone=f8,bP.hasAlignedHourOffset=fR,bP.isDST=fg,bP.isLocal=en,bP.isUtcOffset=d6,bP.isUtc=dV,bP.isUTC=dV,bP.zoneAbbr=e9,bP.zoneName=ex,bP.dates=eC("dates accessor is deprecated. Use date instead.",cT),bP.months=eC("months accessor is deprecated. Use month instead",c3),bP.years=eC("years accessor is deprecated. Use year instead",bV),bP.zone=eC("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",aH),bP.isDSTShifted=eC("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",ez);var bE=fK.prototype;bE.calendar=fI,bE.longDateFormat=fG,bE.invalidDate=fE,bE.ordinal=fC,bE.preparse=dU,bE.postformat=dU,bE.relativeTime=fB,bE.pastFuture=fz,bE.set=fN,bE.months=d2,bE.monthsShort=dR,bE.monthsParse=dv,bE.monthsRegex=cw,bE.monthsShortRegex=cH,bE.week=gk,bE.firstDayOfYear=bx,bE.firstDayOfWeek=fX,bE.weekdays=ay,bE.weekdaysMin=f9,bE.weekdaysShort=ai,bE.weekdaysParse=fi,bE.weekdaysRegex=dW,bE.weekdaysShortRegex=dL,bE.weekdaysMinRegex=dA,bE.isPM=cl,bE.meridiem=b4,cq("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var d=e%10,f=1===eF(e%100/10)?"th":1===d?"st":2===d?"nd":3===d?"rd":"th";return e+f}}),e5.lang=eC("moment.lang is deprecated. Use moment.locale instead.",cq),e5.langData=eC("moment.langData is deprecated. Use moment.localeData instead.",fJ);var bo=Math.abs,cm=eg("ms"),ao=eg("s"),fY=eg("m"),fA=eg("h"),eT=eg("d"),ep=eg("w"),d8=eg("M"),dX=eg("y"),dM=dO("milliseconds"),dB=dO("seconds"),c9=dO("minutes"),cY=dO("hours"),cN=dO("days"),cC=dO("months"),cr=dO("years"),b5=Math.round,bU={s:45,m:45,h:22,d:26,M:11},bJ=Math.abs,by=aC.prototype;return by.abs=b2,by.add=bG,by.subtract=bq,by.as=eY,by.asMilliseconds=cm,by.asSeconds=ao,by.asMinutes=fY,by.asHours=fA,by.asDays=eT,by.asWeeks=ep,by.asMonths=d8,by.asYears=dX,by.valueOf=er,by._bubble=aq,by.get=dZ,by.milliseconds=dM,by.seconds=dB,by.minutes=c9,by.hours=cY,by.days=cN,by.weeks=dD,by.months=cC,by.years=cr,by.humanize=cE,by.toISOString=ct,by.toString=ct,by.toJSON=ct,by.locale=cQ,by.localeData=cF,by.toIsoString=eC("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",ct),by.lang=c4,fn("X",0,0,"unix"),fn("x",0,0,"valueOf"),fh("x",ci),fh("X",bF),fL("X",function(e,d,f){f._d=new Date(1000*parseFloat(e,10))}),fL("x",function(e,d,f){f._d=new Date(eF(e))}),e5.version="2.17.1",e3(bm),e5.fn=bP,e5.min=aW,e5.max=aM,e5.now=ek,e5.utc=eP,e5.unix=em,e5.months=c6,e5.isDate=eU,e5.locale=cq,e5.invalid=eL,e5.duration=dK,e5.isMoment=eH,e5.weekdays=cK,e5.parseZone=d5,e5.localeData=fJ,e5.isDuration=am,e5.monthsShort=cV,e5.weekdaysMin=cj,e5.defineLocale=at,e5.updateLocale=f2,e5.locales=e2,e5.weekdaysShort=cz,e5.normalizeUnits=fx,e5.relativeTimeRounding=c0,e5.relativeTimeThreshold=cP,e5.calendarFormat=cA,e5.prototype=bP,e5});
