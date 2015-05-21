if (window.jQuery) {
    $(document).ready(function () {

        // NAVIGATION MENU
		$('ul.drawers').accordion({
			header: 'H2.drawer-handle',
			selectedClass: 'open',
			event: 'click'
		});

    });
}