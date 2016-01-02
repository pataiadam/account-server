'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var Waterline = require('waterline');
var orm = new Waterline();
var model = require('./api/models')(orm);
var app = express();
global['_'] = require('lodash');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var passport = require('./api/services/passport');
global['passport'] = passport;

app.use(require('serve-static')('./public'));
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./api/routes.js'));

orm.initialize(require('./config/orm.js'), function(err, models) {
    if(err) throw err;

    app.models = models.collections;
    app.connections = models.connections;

    _.each(app.models, function(model, key) {
        global[capitaliseFirstLetter(key)] = model;
    });

    function capitaliseFirstLetter(string) {
        //Todo: blee
        const sfLog = 'log';
        var indexOfLog = string.indexOf(sfLog, string.length - sfLog.length);
        if(indexOfLog !== -1){
            string = string.slice(0, indexOfLog)+'Log';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //Populate missing providers from config to db
    var providers = require('./config/passport');
    var providerNamesFromConfig = _.pluck(providers, 'name');
    Provider.find({
        name: providerNamesFromConfig
    }, function(err, result){
        var providerNamesFromDatabase = _.pluck(result, 'name');
        var missingProviders = _.difference(providerNamesFromConfig, providerNamesFromDatabase);
        missingProviders = providers.filter(p => {return _.includes(missingProviders, p.name)});
        Provider.create(missingProviders, function(){
            passport.loadStrategies();
            app.listen(3000);
            console.log('server started at 3000')
        })
    });
});


