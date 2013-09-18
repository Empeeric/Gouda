Gouda
=====

Say cheese! Your mongoose scaffolding problems are over!

##Installation

```
npm install gouda
```

##Inisialization

```javascript

var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    gouda = require('gouda');

//express 3 app
var app = express();

//mongoose schema
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    active: Boolean
})

//mongoose model
var user = mongoose.model('user', postsSchema);

//mongoose schema
var postsSchema = new mongoose.Schema({
    title: String,
    description: String,
    show: Boolean,
    date: Date
})

//mongoose model
var post = mongoose.model('post', postsSchema);

//initialize Gouda
gouda.init([user, posts], app, mongoose);

http.createServer(app).listen(8080);
```

go to `http://localhost:8080/admin` and login with username: admin, password: admin.
that's it :)

