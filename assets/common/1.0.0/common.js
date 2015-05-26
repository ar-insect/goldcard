(function($) {
  'use strict';

  function transitionEnd() {
    var el = document.createElement('mm');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }
    return false;
  }

  $.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var $el = this;
    $(this).one('mmTransitionEnd', function() {
      called = true;
    });
    var callback = function() {
      if (!called) {
        $($el).trigger($transition.end);
      }
    };
    setTimeout(callback, duration);
    return this;
  };

  var $transition = transitionEnd();
  if (!!$transition) {
    $.event.special.mmTransitionEnd = {
      bindType: $transition.end,
      delegateType: $transition.end,
      handle: function(e) {
        if ($(e.target).is(this)) {
          return e.
          handleObj.
          handler.
          apply(this, arguments);
        }
      }
    };
  }

  var MetisMenu = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, MetisMenu.DEFAULTS, options);
    this.transitioning = null;

    this.init();
  };

  MetisMenu.TRANSITION_DURATION = 350;

  MetisMenu.DEFAULTS = {
    toggle: true,
    doubleTapToGo: false,
    activeClass: 'active'
  };

  MetisMenu.prototype.init = function() {
    var $this = this;
    var activeClass = this.options.activeClass;

    this
      .$element
      .find('li.' + activeClass)
      .has('ul')
      .children('ul')
      .addClass('collapse in');

    this
      .$element
      .find('li')
      .not('.' + activeClass)
      .has('ul')
      .children('ul')
      .addClass('collapse');

    //add the 'doubleTapToGo' class to active items if needed
    if (this.options.doubleTapToGo) {
      this
        .$element
        .find('li.' + activeClass)
        .has('ul')
        .children('a')
        .addClass('doubleTapToGo');
    }

    this
      .$element
      .find('li')
      .has('ul')
      .children('a')
      .on('click.metisMenu', function(e) {
        var self = $(this);
        var $parent = self.parent('li');
        var $list = $parent.children('ul');
        e.preventDefault();

        if ($parent.hasClass(activeClass)) {
          $this.hide($list);
        } else {
          $this.show($list);
        }

        //Do we need to enable the double tap
        if ($this.options.doubleTapToGo) {
          //if we hit a second time on the link and the href is valid, navigate to that url
          if ($this.doubleTapToGo(self) && self.attr('href') !== '#' && self.attr('href') !== '') {
            e.stopPropagation();
            document.location = self.attr('href');
            return;
          }
        }
      });
  };

  MetisMenu.prototype.doubleTapToGo = function(elem) {
    var $this = this.$element;
    //if the class 'doubleTapToGo' exists, remove it and return
    if (elem.hasClass('doubleTapToGo')) {
      elem.removeClass('doubleTapToGo');
      return true;
    }
    //does not exists, add a new class and return false
    if (elem.parent().children('ul').length) {
      //first remove all other class
      $this
        .find('.doubleTapToGo')
        .removeClass('doubleTapToGo');
      //add the class on the current element
      elem.addClass('doubleTapToGo');
      return false;
    }
  };

  MetisMenu.prototype.show = function(el) {
    var activeClass = this.options.activeClass;
    var $this = $(el);
    var $parent = $this.parent('li');
    if (this.transitioning || $this.hasClass('in')) {
      return;
    }

    $parent.addClass(activeClass);

    if (this.options.toggle) {
      this.hide($parent.siblings().children('ul.in'));
    }

    $this
      .removeClass('collapse')
      .addClass('collapsing')
      .height(0);

    this.transitioning = 1;
    var complete = function() {
      $this
        .removeClass('collapsing')
        .addClass('collapse in')
        .height('');
      this.transitioning = 0;
    };
    if (!$transition) {
      return complete.call(this);
    }
    $this
      .one('mmTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION)
      .height($this[0].scrollHeight);
  };

  MetisMenu.prototype.hide = function(el) {
    var activeClass = this.options.activeClass;
    var $this = $(el);

    if (this.transitioning || !$this.hasClass('in')) {
      return;
    }

    $this.parent('li').removeClass(activeClass);
    $this.height($this.height())[0].offsetHeight;

    $this
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in');

    this.transitioning = 1;

    var complete = function() {
      this.transitioning = 0;
      $this
        .removeClass('collapsing')
        .addClass('collapse');
    };

    if (!$transition) {
      return complete.call(this);
    }
    $this
      .height(0)
      .one('mmTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION);
  };

  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('mm');
      var options = $.extend({},
        MetisMenu.DEFAULTS,
        $this.data(),
        typeof option === 'object' && option
      );

      if (!data) {
        $this.data('mm', (data = new MetisMenu(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  }

  var old = $.fn.metisMenu;

  $.fn.metisMenu = Plugin;
  $.fn.metisMenu.Constructor = MetisMenu;

  $.fn.metisMenu.noConflict = function() {
    $.fn.metisMenu = old;
    return this;
  };

})(jQuery);
;if (window.jQuery) {
    $(document).ready(function () {

        $("#J_sidebar").metisMenu({doubleTapToGo: true});

        var tabpanel, panels = [];
        var config = {};
        var store = {};
        var pre = 'PANEL';
        var id = 1;
        // 初始化加载某个面板
        tabpanel = new TabPanel({
            renderTo:'ui-tabs',
            width:'auto',
            //height:'1000px',
            border:'none',
            active : 0,
            //maxLength : 10,
            items : [{
                key: '',
                id: id++,
                title: '<i class="glyphicon glyphicon-home home"></i>首页',
                //height:'1000px',
                html: '<iframe src="/report/start" id="' + (pre + id++) + 'Frame" width="100%" height="100%" frameborder="0"></iframe>',
                closable: false
            }]
        });

        var getPanel = function(key) {
            for (var i in store) {
                if (key === i) return store[i];
            }
            return null;
        };

        var setPanel = function(key, obj) {
            store[key] = obj;
        };

        var enableClose = function() {
            var tabs = tabpanel.tabs;
            for(var i = 0, len = tabs.length; i < len; i++) {
                tabpanel.setClosable(tabs[i].id, false);
            }
        };

        tabpanel.killCallback = function(obj) {
            var key = obj[0].key;
            store[key] = null;
            if (this.tabs.length == 1) {
                // 最后一个禁用关闭
                tabpanel.setClosable(this.tabs[0].id, true);
            }
        };

        $('#J_sidebar ul.collapse li a').on('click', function(e) {
            e.preventDefault();
            var panelid, panel;
            var title = $(this).text() || '';
            var url = $(this).attr('data-url');
            var key = $(this).attr('data-key');
            if(!url || !key) return;
            if (panel = getPanel(key)) {
                // 如果已经打开过此面板则直接激活
                tabpanel.show(tabpanel.getTabPosision(panel.id), false);
                //tabpanel.refresh(panel.id);
            } else {
                // 否则新开面板
                panelid = pre + id++;
                config = {
                    key: key,
                    id: panelid,
                    title: title,
                    //height:'1000px',
                    html: '<iframe src="' + url + '" id="' + panelid + 'Frame" width="100%" height="100%" frameborder="0"></iframe>',
                    closable: true
                };
                tabpanel.addTab(config);
                setPanel(key, tabpanel.getActiveTab());
            }
            if (tabpanel.tabs.length > 1) enableClose();
        });

    });
}
