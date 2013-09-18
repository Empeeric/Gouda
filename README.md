Gouda
=====

>Say cheese! Your mongoose scaffolding problems are over!

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
var user = mongoose.model('user', userSchema);

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
gouda.init(app, mongoose);

//connect to mongodb
mongoose.connect('mongodb://localhost/gouda');

//start http server with express app
http.createServer(app).listen(8080);
```

Go to `http://localhost:8080/admin` and login with `username: admin`, `password: admin`.
Say cheese :)

##Advanced Gauda Options

```javascript
var options = {
    //root path for Gouda
    path = '/cms',

    //super admin user
    admin = {
        user: admin,
        password: 1234
    },

    //sections. the order will affect sections and models listed in each
    //all the rest of redisterd models will go to default section
    sections: [
        { label: 'CMS', models: ['page', 'post', 'gallery'] },
        { label: 'Configuration', models: ['config', 'user', 'template'] }
    ],

    //default section label. default is Main
    default_section: 'Miscellaneous'
}

//initialize Gouda
gouda.init(app, mongoose, [post, user, gallery, template, config], options);
```

