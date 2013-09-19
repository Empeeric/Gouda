var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    gouda = require('../lib');

// express app
var app = express();

// mongoose schema
var postsSchema = new mongoose.Schema({
    title: String,
    description: String,
    show: Boolean,
    date: Date
});

// mongoose model
var post = mongoose.model('posts', postsSchema);

// connect to mongodb
mongoose.connect('mongodb://localhost/gouda');

// initialize Gouda
app.use('/admin', gouda());

// start http server with express app
http.createServer(app).listen(8080);