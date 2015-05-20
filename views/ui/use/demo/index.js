// 使用velocity变量
var isTrue = $!ui.isTrue;
if (isTrue) console.log('test..demo');

    var old = jQuery.fn.drag;

    function Drag(element, options) {
        this.ver = '1.0';
        this.element = jQuery(element);
        this.options = jQuery.extend({}, jQuery.fn.drag.defaults, options);
        this.init();
    }

    Drag.prototype = {
        constructor: Drag,
        init: function() {
            var options = this.options;
            this.element.on('touchstart.drag.founder mousedown.drag.founder', function(e) {
                var ev = e.type == 'touchstart' ? e.originalEvent.touches[0] : e,
                    self = jQuery(this),
                    startPos = self.position(),
                    disX = ev.pageX - startPos.left,
                    disY = ev.pageY - startPos.top;

                // 记录初始位置以便复位使用
                self.data('startPos', startPos);

                if (jQuery.isFunction(options.before)) {
                    options.before.call(self, ev);
                }

                jQuery(document).on('touchmove.drag.founder mousemove.drag.founder', function(e) {
                    var ev = e.type == 'touchmove' ? e.originalEvent.touches[0] : e,
                        parent = self.offsetParent(),
                        parent = parent.is(':root') ? jQuery(window) : parent,
                        pPos = parent.offset(),
                        pPos = pPos ? pPos : {left: 0 ,top:0},
                        left = ev.pageX - disX - pPos.left,
                        top = ev.pageY - disY - pPos.top,
                        r = parent.width() - self.outerWidth(true),
                        d = parent.height() - self.outerHeight(true);
                        left = left < 0 ? 0 : left > r ? r : left;
                        top = top < 0 ? 0 : top > d ? d : top;

                    self.css({
                        left: left + 'px',
                        top: top + 'px'
                    });

                    if (jQuery.isFunction(options.process)) {
                        options.process.call(self, ev);
                    }

                    e.preventDefault();
                });

                jQuery(document).on('touchend.drag.founder mouseup.drag.founder', function(e) {
                    var ev = e.type == 'touchend' ? e.originalEvent.changedTouches[0] : e;
                    if (jQuery.isFunction(options.end)) {
                        options.end.call(self, ev);
                    }
                    jQuery(document).off('.drag.founder');
                });

                e.preventDefault();
            });
        }
    };

    // jQ插件模式
    jQuery.fn.drag = function(options) {
        return this.each(function() {
            var self = jQuery(this),
                instance = self.data('drag');

            if (!instance) {
                instance = new Drag(this, options);
                self.data('drag', instance);
            } else {
                instance.init();
            }

            if (typeof options === 'string') {
                //instance.options[options].call(this);
            }

        });
    };

    jQuery.fn.drag.defaults = {
        before: jQuery.noop,
        process: jQuery.noop,
        end: jQuery.noop
    };

    jQuery.fn.drag.noConflict = function() {
        jQuery.fn.drag = old;
        return this;
    };

jQuery('#div1').drag({
    before: function(e) {
        //this.text('拖动前' + e.pageX);
        console.log('拖动前', e.pageX);
        jQuery(e.target).off('click');
    },
    process: function(e) {
        //document.title = '拖动中' + e.pageY;
    },
    end: function(e) {
        //this.text('拖动完' + e.pageX);
        console.log('拖动完', e.pageX);
        jQuery(e.target).click(function() {
            jQuery('#toolbar').show();
            //console.log('click');
        });
    }
});
