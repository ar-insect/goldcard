/**
 * Module dependencies.
 */
var site = require('./controllers/home'); // default index.js

var testdata = require('./controllers/home/data'); //test data
// more controllers define here.
// ...

module.exports = function(app) {
    // home
    app.get('/', site.index);
    app.get('/home/combotree.json', testdata.combotree);
    app.post('/home/datagrid', testdata.datagrid);
    // 404 page warn: must in the last
    app.get('*', function(req, res) {
        res.render('home/404', {
        });
    });

};