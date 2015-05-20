/*
var instance = new gmu.Toolbar('#J_toolbar1');
instance.position({ top: window.innerHeight + window.scrollY - Zepto("#J_toolbar1").height() });
Zepto("#J_toolbar1").hide();
Zepto(document).on('touchstart', function(e) {
    Zepto("#J_toolbar1").hide();
    Zepto('.ui-popover').removeClass('ui-in');
});

Zepto(document).on('touchmove', function() {
    Zepto("#J_toolbar1").hide();
});

Zepto(window).on('scrollStop', function(e) {
    Zepto("#J_toolbar1").show().css({
        position: 'absolute',
        top: window.innerHeight + window.scrollY
    }).animate({
        top: window.innerHeight + window.scrollY - Zepto("#J_toolbar1").height()
    });
});

Zepto("#J_btn1").on('touchstart', function(e) {
    e.stopPropagation();
    if (Zepto(this).hasClass('ui-toolbar-button')) {
        //alert('hello world');
        Zepto(this).trigger('popup');
    }
});

Zepto("#J_btn2").on('touchstart', function(e) {
    e.stopPropagation();
    e.preventDefault();
    if (Zepto(this).hasClass('ui-toolbar-button')) {
       // alert('hello world');
        Zepto(this).trigger('popup');
    }
});

Zepto('#J_btn1').popover({
    content: 'Hello world!',
    within: '.container',
    placement: 'top',
    event: 'popup'
});

Zepto('#J_btn2').popover({
    content: 'Hello world!',
    within: '.container',
    placement: 'top',
    event: 'popup'
});

Zepto('.ui-popover').on('touchstart', function(e) {
    e.stopPropagation();
});


// make btn dragable
Zepto('#removable-icon').on('touchstart mousedown', function(e){
    e.stopPropagation();
    Zepto("#J_toolbar1").show();
    // 不处理多指
    if( e.touches && e.touches.length > 1 ) {
        return;
    }

    var pointer = e.touches ? e.touches[0] : e,
        start = {
            x: pointer.pageX,
            y: pointer.pageY
        },
        me = Zepto(this),
        pos = me.position(),
        doc = Zepto( document ),
        moved = false,

        moveHandler = function( e ) {
            // 不处理多指
            if( e.touches && e.touches.length > 1 ) {
                return;
            }

            var pointer = e.touches ? e.touches[0] : e,
                delta = {
                    x: pointer.pageX - start.x,
                    y: pointer.pageY - start.y
                };

            moved = true;
            me.css({
                top: pos.top + delta.y,
                left: pos.left + delta.x
            });
        };

    doc.on( 'touchmove mousemove', moveHandler ).on( 'touchend touchcancel mouseup', function( e ) {
        e.stopPropagation();
        doc.off( 'touchmove mousemove', moveHandler );
        doc.off( 'touchend touchcancel mouseup', arguments.callee );

        // prevent click
        moved && e.preventDefault();
    });
});
    */


var iconOffset = Zepto('#removable-icon').offset();
Zepto('#toolbar').css({
    right: -(iconOffset.left),
    bottom: '0px'
});

Zepto('#removable-icon').on('singleTap', function(e) {
    Zepto('#toolbar').attr('data-show', Zepto('#toolbar').attr('data-show') === 'on' ? 'off': 'on');
    if (Zepto('#toolbar').attr('data-show') === 'on') {
        Zepto('#toolbar').stop && Zepto('#toolbar').stop(true);
        clearInterval();
        Zepto('#toolbar').animate({
            right: '0px'
        }, 120, 'ease-out');
    } else if (Zepto('#toolbar').attr('data-show') === 'off') {
        Zepto('#toolbar').stop && Zepto('#toolbar').stop(true);
        clearInterval();
        Zepto('#toolbar').animate({
            right:  -(iconOffset.left)
        }, 120, 'ease-out');
    }


});

