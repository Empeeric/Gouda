var _ = require('lodash'),
    mongoose,
    express;

var Admin = module.exports = function(dep, options) {
    mongoose = dep.mongoose;
    express = dep.express;
    this.options = _.defaults(options, Admin.defaults);

    this.models = _.transform(mongoose.models, function(result, model, name) {
        model.gouda || (model.gouda = {});
        result[name] = model;
    }, {});

    this.route();
};
Admin.defaults = {
    title: 'Admin'
};

_.extend(Admin.prototype, {

    route: function() {
        var admin = this,
            app = this.app = new express();

        app.get('/', function(req, res) {
            admin.listModels(function(err, models) {
                if (err) return next(err, next);

                res.json({
                    models: models
                });
            });
        });
        app.get('/:model', function(req, res, next) {
            admin.listDocuments(req.params.model, {}, function(err, model, docs) {
                if (err) return next(err);

                res.json({
                    model: model.modelName,
                    documents: docs
                });
            });
        });

        app.get('*', function(err, req, res, next) {
            console.error(err);
            res.json(err);
        });
    },

    listModels: function(cb) {
        var admin = this;
        var models = _.transform(this.models, function(result, model, name) {
            result[name] = 'http://localhost' + admin.path + '/' + name
        }, {});
        cb(null, models);
    },

    listDocuments: function(name, options, cb) {
        var model = this.models[name];

        if (!model || model.gouda === false)
            return cb('No such model.');

        var populate = model.gouda.populate || [],
            sort = (model.gouda.sort + ' ' + options.sort).trim(),
            query = model.find(options.filters);

        populate.forEach(function(p) {
            if (!Array.isArray(p))
                p = [p];
            query.populate.apply(query, p);
        });

        query
            .select(model.gouda.list)
            .sort(sort)
            .skip(options.skip)
            .limit(options.limit)
            .lean()
            .exec(function(err, docs) {
                if (err) return cb(err);
                cb(null, model, docs);
            });
    }

});