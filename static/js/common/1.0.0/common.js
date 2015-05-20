if (window.jQuery) {
    $(document).ready(function () {
        var winHeight = window.innerHeight ? window.innerHeight : window.document.documentElement.clientHeight;
        $(".main").css("height", (winHeight - 112));
        var sbH = $(".side_box").height();
        var mH = $(".main_box").height();
        var tlH = $(".take_left").height();
        if (mH > sbH) {
            $(".take_left").css("height", mH + 'px');
            $(".side_box").css("height", mH + 'px');
        } else {
            $(".main_box").css("height", sbH + 'px');
            $(".side_box").css("height", sbH + 'px');
        }
        $(".take_left").click(function () {
            if ($(".side_box").css('display') == 'block') {
                $(".side_box").hide();
                $(".main_box").css("margin-left", "0px");
            } else {
                $(".side_box").show();
                $(".main_box").css("margin-left", "220px");
            }
        });

        $(".side_wdo h2").click(function () {
            if ($(this).next("ul.side_wdo_list").css('display') == 'block') {
                $(this).next("ul.side_wdo_list").slideUp();
            } else {
                $(this).next("ul.side_wdo_list").slideDown();
            }
        });

        $("a.first_li").click(function () {
            if ($(this).next("ul.sec_list").css('display') == 'block') {
                $(this).next("ul.sec_list").slideUp();
            } else {
                $(this).next("ul.sec_list").slideDown();
            }
        });

        $(".table_box table tr:even").addClass("sec");
        $(".table_box table tr:odd").addClass("fir");
        $(".box_list li:even").addClass("sec");
        $(".box_list li:odd").addClass("fir");

        var winHeight = window.innerHeight ? window.innerHeight : window.document.documentElement.clientHeight;
        var topHeight = $("#header").height();
        var footerHeight = $("#copyright").height();
        $(".take_left").css("height", (winHeight - topHeight - footerHeight - 2));
        $(".side_box").css("height", (winHeight - topHeight - footerHeight - 2));
        $(".main_box").css("height", (winHeight - topHeight - footerHeight - 2));
        $("tr:nth-child(odd)").css("background", "#fafafa");
        //NAVIGATION MENU
        $('div.sidenav:eq(0)> div.subnav').hide();
        $('div.sidenav:eq(0)> div.navhead').click(function () {
            $(this).parent().find("div.subnav").slideUp('normal');
            $(this).parent().find("div.navhead").removeClass("selected");
            $(this).next().slideToggle('slow');
            $(this).toggleClass("selected");
        });
    });
}