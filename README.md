Gouda
=====

>Say cheese! Your mongoose scaffolding problems are over.

### Installation

```
npm install gouda
```

### Initialisation

```javascript
var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    gouda = require('gouda');

// express app
var app = express();

// mongoose schema
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    active: Boolean
})

// mongoose model
var user = mongoose.model('user', userSchema);

// mongoose schema
var postsSchema = new mongoose.Schema({
    title: String,
    description: String,
    show: Boolean,
    date: Date
})

// mongoose model
var post = mongoose.model('post', postsSchema);

// initialize Gouda
app.use('/admin', gouda(app))

// connect to mongodb
mongoose.connect('mongodb://localhost/gouda');

// start http server with express app
http.createServer(app).listen(8080);
```

Go to `http://localhost:8080/admin` and login with `username: admin`, `password: admin`.
Say cheese :)

###Advanced Gauda Options

```javascript
var options = {
    // root path for Gouda
    path: '/cms',

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
gouda.init(app, options);
```

###Model Options

```javascript
var schema = new mongoose.Schema({
    title: { type: String, gouda: { label: 'Post Title' } },
    description: { type: String },
    picture: { type: Object, gouda: { type: 'cloudinary' },
    show: { type: Boolean, default: true, gouda: { label: 'Active Post' } },
    date: { type: Date, default: Date.now, gouda: { edit: 'disabled' } }
})

// separate Gouda for a cleaner schema
schema.path('description').gouda = {
    type: 'ckeditor',
    options: {
        language: 'he',
        forcePasteAsPlainText: true,
        toolbar: ['Bold','Italic','Underline']
    }
}

// mongoose model
var model = mongoose.model('post', schema);

model.gouda = {
    label: 'Blog Posts', // model label
    list: ['title', 'picture', 'date', 'show'], // fields in list view (table of documents)
    add: ['date', 'title', 'picture', 'description', 'show'], // fields in add view
    edit: ['title', 'picture', 'description', 'date', 'show'], // fields in edit view
    sort: { date: 'desc' }, // sorting data by date field
    filter: ['title', 'date'] // filter documents fields
}
```

###Parent -> Child Schema

>If you want a tree schema with hierarchical parent->child behavior

```javascript
var schema = new mongoose.Schema({
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'page' },
    title: String,
    url: { type: String, gouda: { type: 'seo' } },
    order: { type: Number, gouda: { hide: true } },
    show: Boolean
})

var model = mongoose.model('page', schema);

model.gouda = {
    tree: true, // enable hierarchical tree behavior
    parent: 'parent' // parent ref field,
    sort: { order: 'asc' } // sorting by order field
}
```

Now you can traverse and add child element to parent elements.
