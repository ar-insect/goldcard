!function(a){function b(b,c){return parseInt(a.css(b.jquery?b[0]:b,c))||0}a.dimensions={version:"@VERSION"},a.each(["Height","Width"],function(c,d){a.fn["inner"+d]=function(){if(this[0]){var a="Height"==d?"Top":"Left",c="Height"==d?"Bottom":"Right";return b(this,d.toLowerCase())+b(this,"padding"+a)+b(this,"padding"+c)}},a.fn["outer"+d]=function(c){if(this[0]){var e="Height"==d?"Top":"Left",f="Height"==d?"Bottom":"Right";return c=a.extend({margin:!1},c||{}),b(this,d.toLowerCase())+b(this,"border"+e+"Width")+b(this,"border"+f+"Width")+b(this,"padding"+e)+b(this,"padding"+f)+(c.margin?b(this,"margin"+e)+b(this,"margin"+f):0)}}}),a.each(["Left","Top"],function(b,c){a.fn["scroll"+c]=function(b){return this[0]?void 0!=b?this.each(function(){this==window||this==document?window.scrollTo("Left"==c?b:a(window).scrollLeft(),"Top"==c?b:a(window).scrollTop()):this["scroll"+c]=b}):this[0]==window||this[0]==document?self["Left"==c?"pageXOffset":"pageYOffset"]||a.boxModel&&document.documentElement["scroll"+c]||document.body["scroll"+c]:this[0]["scroll"+c]:void 0}}),a.fn.extend({position:function(){var a,c,d,e,f=this[0];return f&&(d=this.offsetParent(),a=this.offset(),c=d.offset(),a.top-=b(f,"marginTop"),a.left-=b(f,"marginLeft"),c.top+=b(d,"borderTopWidth"),c.left+=b(d,"borderLeftWidth"),e={top:a.top-c.top,left:a.left-c.left}),e},offsetParent:function(){for(var b=this[0].offsetParent;b&&!/^body|html$/i.test(b.tagName)&&"static"==a.css(b,"position");)b=b.offsetParent;return a(b)}})}(jQuery),function(a){a.ui=a.ui||{},a.ui.accordion={},a.extend(a.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:!0,animated:"slide",event:"click",header:"a",autoheight:!0},animations:{slide:function(b,c){if(b=a.extend({easing:"swing",duration:300},b,c),!b.toHide.size())return void b.toShow.animate({height:"show"},b);var d=b.toHide.height(),e=b.toShow.height(),f=e/d;b.toShow.css({height:0,overflow:"hidden"}).show(),b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate({height:"hide"},{step:function(a){b.toShow.height((d-a)*f)},duration:b.duration,easing:b.easing,complete:b.complete})},bounceslide:function(a){this.slide(a,{easing:a.down?"bounceout":"swing",duration:a.down?1e3:200})},easeslide:function(a){this.slide(a,{easing:"easeinout",duration:700})}}}),a.fn.extend({accordion:function(b){function c(b){return void 0!=b?"number"==typeof b?i.filter(":eq("+b+")"):i.not(i.not(b)):b===!1?a("<div>"):i.filter(":eq(0)")}function d(c,d,e,f,g){var i=function(a){k=a?0:--k,k||(b.clearStyle&&c.add(d).css({height:"",overflow:""}),h.trigger("change",e))};k=0==d.size()?c.size():d.size(),b.animated?!b.alwaysOpen&&f?(c.slideToggle(b.animated),i(!0)):a.ui.accordion.animations[b.animated]({toShow:c,toHide:d,complete:i,down:g}):(!b.alwaysOpen&&f?c.toggle():(d.hide(),c.show()),i(!0))}function e(c){if(!c.target&&!b.alwaysOpen){j.parent().andSelf().toggleClass(b.selectedClass);var e=j.next(),f=j=a([]);return d(f,e),!1}var g=a(c.target);if(g.parents(b.header).length)for(;!g.is(b.header);)g=g.parent();var h=g[0]==j[0];if(k||b.alwaysOpen&&h||!g.is(b.header))return!1;j.parent().andSelf().toggleClass(b.selectedClass),h||g.parent().andSelf().addClass(b.selectedClass);var f=g.next(),e=j.next(),l=[g,j,f,e],m=i.index(j[0])>i.index(g[0]);return j=h?a([]):g,d(f,e,l,h,m),!1}function f(a,b){1!=arguments.length&&e({target:c(b)[0]})}if(!this.length)return this;if(b=a.extend({},a.ui.accordion.defaults,b),b.navigation){var g=this.find("a").filter(function(){return this.href==location.href});g.length&&(g.filter(b.header).length?b.active=g:(b.active=g.parent().parent().prev(),g.addClass("current")))}var h=this,i=h.find(b.header),j=c(b.active),k=0;if(b.fillSpace){var l=this.parent().height();i.each(function(){l-=a(this).outerHeight()});var m=0;i.next().each(function(){m=Math.max(m,a(this).innerHeight()-a(this).height())}).height(l-m)}else if(b.autoheight){var l=0;i.next().each(function(){l=Math.max(l,a(this).outerHeight())}).height(l)}return i.not(j||"").next().hide(),j.parent().andSelf().addClass(b.selectedClass),h.bind(b.event||"",e).bind("activate",f)},activate:function(a){return this.trigger("activate",[a])},unaccordion:function(){return this.find("*").andSelf().unbind().end().end()}})}(jQuery),window.jQuery&&$(document).ready(function(){$("ul.drawers").accordion({header:"H2.drawer-handle",selectedClass:"open",event:"click"})});