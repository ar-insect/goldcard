/**
 * Module dependencies.
 */
var site = require('./controllers/home'); // default index.js

// more controllers define here.
// ...

module.exports = function(app) {
    // home
    app.get('/', site.index);

    // 404 page warn: must in the last
    app.get('*', function(req, res) {
        res.render('home/404', {
        });
    });

};