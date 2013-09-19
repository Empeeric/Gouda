var Admin = require('./admin');

var gouda = module.exports = function(options) {
    if (gouda.admin)
        return admin.app;

    var express, mongoose;

    try      { express = require.main.require('express'); }
    catch(e) { express = require('express'); }
    try      { mongoose = require.main.require('mongoose'); }
    catch(e) { mongoose = require('mongoose'); }

    var admin = gouda.admin = new Admin({
        express: express,
        mongoose: mongoose
    }, options);

    admin.app.on('mount', function() {
        admin.path = admin.app.route;
    });

    return admin.app;
};

gouda.Admin = Admin;