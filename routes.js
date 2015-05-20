/**
 * Module dependencies.
 */
var site = require('./controllers/home'); // default index.js
var use = require('./controllers/use/use.js');
var bui = require('./controllers/bui');
// more controllers define here.
// ...

module.exports = function(app) {
    // home
    app.get('/', site.index);
    // use & download
    app.get('/use/', use.index);
    // demo
    app.get('/use/demo', use.demo);

    app.get('/use/demo/column', use.column);
    // bui
    app.get('/bui/', bui.index);
    // 404 page warn: must in the last
    app.get('*', function(req, res) {
        res.render('home/404', {
        });
    });

};