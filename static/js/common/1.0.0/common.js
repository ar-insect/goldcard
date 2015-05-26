if (window.jQuery) {
    $(document).ready(function () {

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
            items : []
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

        $('#J_sidebox li a').on('click', function(e) {
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