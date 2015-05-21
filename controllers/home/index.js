/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('home/index', {
        hello: '这是mockdata数据。。。'
    });
};

exports.tab = function(req, res) {
    res.render('home/tab', {
        hello: '这是mockdata数据。。。'
    });
};
