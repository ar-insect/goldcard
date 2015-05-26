/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('home/index', {
        hello: '这是mockdata数据。。。'
    });
};

exports.newindex = function(req, res) {
    res.render('newhome/index', {
        hello: '这是mockdata数据。。。'
    });
};
