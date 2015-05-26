/*
 * jQuery showLoading plugin v1.0
 * 
 * Copyright (c) 2009 Jim Keller
 * Context - http://www.contextllc.com
 * 
 * Dual licensed under the MIT and GPL licenses.
 *
 */

	jQuery.fn.showLoading = function(options) {
		
		var indicatorID;
       		var settings = {
       			'addClass': '',
	       		'beforeShow': '', 
       			'afterShow': '',
       			'hPos': 'center', 
	       		'vPos': 'center',
       			'indicatorZIndex' : 5001, 
       			'overlayZIndex': 5000, 
	       		'parent': '',
       			'marginTop': 0,
       			'marginLeft': 0,
	       		'overlayWidth': null,
       			'overlayHeight': null
	       	};

		jQuery.extend(settings, options);
       	
       		var loadingDiv = jQuery('<div></div>');
		var overlayDiv = jQuery('<div></div>');

		//
		// Set up ID and classes
		//
		if ( settings.indicatorID ) {
			indicatorID = settings.indicatorID;
		}
		else {
			indicatorID = jQuery(this).attr('id');
		}
			
		jQuery(loadingDiv).attr('id', 'loading-indicator-' + indicatorID );
		jQuery(loadingDiv).addClass('loading-indicator');
		
		if ( settings.addClass ){
			jQuery(loadingDiv).addClass(settings.addClass);
		}


		
		//
		// Create the overlay
		//
		jQuery(overlayDiv).css('display', 'none');
		
		// Append to body, otherwise position() doesn't work on Webkit-based browsers
		jQuery(document.body).append(overlayDiv);
		
		//
		// Set overlay classes
		//
		jQuery(overlayDiv).attr('id', 'loading-indicator-' + indicatorID + '-overlay');
		
		jQuery(overlayDiv).addClass('loading-indicator-overlay');
		
		if ( settings.addClass ){
			jQuery(overlayDiv).addClass(settings.addClass + '-overlay');
		}
		
		//
		// Set overlay position
		//
		
		var overlay_width;
		var overlay_height;
		
		var border_top_width = jQuery(this).css('border-top-width');
		var border_left_width = jQuery(this).css('border-left-width');
		
		//
		// IE will return values like 'medium' as the default border, 
		// but we need a number
		//
		border_top_width = isNaN(parseInt(border_top_width)) ? 0 : border_top_width;
		border_left_width = isNaN(parseInt(border_left_width)) ? 0 : border_left_width;
		
		var overlay_left_pos = jQuery(this).offset().left + parseInt(border_left_width);
		var overlay_top_pos = jQuery(this).offset().top + parseInt(border_top_width);
		
		if ( settings.overlayWidth !== null ) {
			overlay_width = settings.overlayWidth;
		}
		else {
			overlay_width = parseInt(jQuery(this).width()) + parseInt(jQuery(this).css('padding-right')) + parseInt(jQuery(this).css('padding-left'));
		}

		if ( settings.overlayHeight !== null ) {
			overlay_height = settings.overlayWidth;
		}
		else {
			overlay_height = parseInt(jQuery(this).height()) + parseInt(jQuery(this).css('padding-top')) + parseInt(jQuery(this).css('padding-bottom'));
		}


		jQuery(overlayDiv).css('width', overlay_width.toString() + 'px');
		jQuery(overlayDiv).css('height', overlay_height.toString() + 'px');

		jQuery(overlayDiv).css('left', overlay_left_pos.toString() + 'px');
		jQuery(overlayDiv).css('position', 'absolute');

		jQuery(overlayDiv).css('top', overlay_top_pos.toString() + 'px' );
		jQuery(overlayDiv).css('z-index', settings.overlayZIndex);

		//
		// Set any custom overlay CSS		
		//
       		if ( settings.overlayCSS ) {
       			jQuery(overlayDiv).css ( settings.overlayCSS );
       		}


		//
		// We have to append the element to the body first
		// or .width() won't work in Webkit-based browsers (e.g. Chrome, Safari)
		//
		jQuery(loadingDiv).css('display', 'none');
		jQuery(document.body).append(loadingDiv);
		
		jQuery(loadingDiv).css('position', 'absolute');
		jQuery(loadingDiv).css('z-index', settings.indicatorZIndex);

		//
		// Set top margin
		//

		var indicatorTop = overlay_top_pos;
		
		if ( settings.marginTop ) {
			indicatorTop += parseInt(settings.marginTop);
		}
		
		var indicatorLeft = overlay_left_pos;
		
		if ( settings.marginLeft ) {
			indicatorLeft += parseInt(settings.marginTop);
		}
		
		
		//
		// set horizontal position
		//
		if ( settings.hPos.toString().toLowerCase() == 'center' ) {
			jQuery(loadingDiv).css('left', (indicatorLeft + ((jQuery(overlayDiv).width() - parseInt(jQuery(loadingDiv).width())) / 2)).toString()  + 'px');
		}
		else if ( settings.hPos.toString().toLowerCase() == 'left' ) {
			jQuery(loadingDiv).css('left', (indicatorLeft + parseInt(jQuery(overlayDiv).css('margin-left'))).toString() + 'px');
		}
		else if ( settings.hPos.toString().toLowerCase() == 'right' ) {
			jQuery(loadingDiv).css('left', (indicatorLeft + (jQuery(overlayDiv).width() - parseInt(jQuery(loadingDiv).width()))).toString()  + 'px');
		}
		else {
			jQuery(loadingDiv).css('left', (indicatorLeft + parseInt(settings.hPos)).toString() + 'px');
		}		

		//
		// set vertical position
		//
		if ( settings.vPos.toString().toLowerCase() == 'center' ) {
			jQuery(loadingDiv).css('top', (indicatorTop + ((jQuery(overlayDiv).height() - parseInt(jQuery(loadingDiv).height())) / 2)).toString()  + 'px');
		}
		else if ( settings.vPos.toString().toLowerCase() == 'top' ) {
			jQuery(loadingDiv).css('top', indicatorTop.toString() + 'px');
		}
		else if ( settings.vPos.toString().toLowerCase() == 'bottom' ) {
			jQuery(loadingDiv).css('top', (indicatorTop + (jQuery(overlayDiv).height() - parseInt(jQuery(loadingDiv).height()))).toString()  + 'px');
		}
		else {
			jQuery(loadingDiv).css('top', (indicatorTop + parseInt(settings.vPos)).toString() + 'px' );
		}		


		 
		
		//
		// Set any custom css for loading indicator
		//
       		if ( settings.css ) {
       			jQuery(loadingDiv).css ( settings.css );
       		}

		
		//
		// Set up callback options
		//
		var callback_options = 
			{
				'overlay': overlayDiv,
				'indicator': loadingDiv,
				'element': this
			};
	
		//
		// beforeShow callback
		//
		if ( typeof(settings.beforeShow) == 'function' ) {
			settings.beforeShow( callback_options );
		}
		
		//
		// Show the overlay
		//
		jQuery(overlayDiv).show();
		
		//
		// Show the loading indicator
		//
		jQuery(loadingDiv).show();

		//
		// afterShow callback
		//
		if ( typeof(settings.afterShow) == 'function' ) {
			settings.afterShow( callback_options );
		}

		return this;
    	 };


	jQuery.fn.hideLoading = function(options) {
		
		
       		var settings = {};
	
       		jQuery.extend(settings, options);

		if ( settings.indicatorID ) {
			indicatorID = settings.indicatorID;
		}
		else {
			indicatorID = jQuery(this).attr('id');
		}
       	
   		jQuery(document.body).find('#loading-indicator-' + indicatorID ).remove();
		jQuery(document.body).find('#loading-indicator-' + indicatorID + '-overlay' ).remove();
		
		return this;
     	};
;(function($) {
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
;
(function($) {
    var TABSMONITOR = {
        isloaded: function() {
            $('.ui-main').hideLoading();
        }
    };

    $(window).on('isloaded', TABSMONITOR.isloaded);

    if (window.$) {
        $(document).ready(function () {

            $("#J_sidebar").metisMenu({doubleTapToGo: true});
            $('.ui-main').showLoading();
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
                    html: '<iframe src="/report/start" id="' + (pre + id++) + 'Frame" width="100%" height="100%" frameborder="0" onload="$(top).trigger(\'isloaded\')"></iframe>',
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
                    $('.ui-main').showLoading();
                    // 否则新开面板
                    panelid = pre + id++;
                    config = {
                        key: key,
                        id: panelid,
                        title: title,
                        //height:'1000px',
                        html: '<iframe src="' + url + '" id="' + panelid + 'Frame" width="100%" height="100%" frameborder="0" onload="$(top).trigger(\'isloaded\')"></iframe>',
                        closable: true
                    };
                    tabpanel.addTab(config);
                    setPanel(key, tabpanel.getActiveTab());
                }
                if (tabpanel.tabs.length > 1) enableClose();
            });

        });
    }
})(jQuery);
