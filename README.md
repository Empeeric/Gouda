Gouda
=====

>Say cheese! Your mongoose scaffolding problems are over.

### Install

```
npm install gouda
```

### Use

```js
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
app.use('/admin', gouda([options]));

// start http server with express app
http.createServer(app).listen(8080);
```

Go to `http://localhost:8080/admin` and login with `username: admin`, `password: admin`.
Say cheese :)

### Advanced Gouda Options

```js
var options = {
    // super admin user
    admin: {
        user: admin,
        password: 1234
    },

    // sections. the order will affect sections and models listed in each
    sections: [
        { label: 'Main', models: '*' },
        { label: 'CMS', models: ['page', 'post', 'gallery'] },
        { label: 'Configuration', models: ['config', 'user', 'template'] }
    ]
}

// initialize Gouda
app.use('/cms', gouda(options));
```

### Model Options

```js
var schema = new mongoose.Schema({
    title: { type: String, gouda: { label: 'Post Title' } },
    description: {
        type: String,
        gouda: {
            type: 'ckeditor',
            options: {
                language: 'he',
                forcePasteAsPlainText: true,
                toolbar: ['Bold','Italic','Underline']
            }
        }
    },
    picture: { type: Object, gouda: { type: 'cloudinary' },
    show: { type: Boolean, default: true, gouda: { label: 'Active Post' } },
    date: { type: Date, default: Date.now, gouda: { edit: 'disabled' } }
})

// mongoose model
var model = mongoose.model('post', schema);

model.gouda = {
    label: 'Blog Posts',
    list: ['title', 'picture', 'date', 'show'],
    add: ['date', 'title', 'picture', 'description', 'show'],
    edit: ['title', 'picture', 'description', 'date', 'show'],
    sort: { date: 'desc' },
    filter: ['title', 'date']
}
```
