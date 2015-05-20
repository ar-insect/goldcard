/*
 * GET bui page.
 */

exports.index = function(req, res) {
    res.render('bui/index', {
        hello: '欢迎来到BUI的世界~'
    });
};