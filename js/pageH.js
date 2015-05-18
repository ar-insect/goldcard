$(document).ready(function(){
	var winHeight = window.innerHeight?window.innerHeight:window.document.documentElement.clientHeight;
	var topHeight =  $("#header").height();
	var footerHeight = $("#copyright").height();
	$(".take_left").css("height",(winHeight -  topHeight - footerHeight  - 2));
	$(".side_box").css("height",(winHeight -  topHeight -  footerHeight  - 2));
	$(".main_box").css("height",(winHeight -  topHeight - footerHeight  - 2));
	$("tr:nth-child(odd)").css("background","#fafafa");  
 //NAVIGATION MENU
  $('div.sidenav:eq(0)> div.subnav').hide();
  $('div.sidenav:eq(0)> div.navhead').click(function() {
	$(this).parent().find("div.subnav").slideUp('normal');
	$(this).parent().find("div.navhead").removeClass("selected");
	$(this).next().slideToggle('slow');
	$(this).toggleClass("selected");
  });

});
