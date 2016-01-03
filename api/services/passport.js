'use strict';
var path     = require('path')
    , url      = require('url')
    , passport = require('passport')
    , config = {passport: require('../../config/passport')};

passport.protocols = require('./protocols');

passport.connect = function (req, query, profile, next) {
  var user = {}
      , provider;

  query.provider = req.body.provider;
  provider = profile.provider || query.provider;

  if (!provider){
    return next(new Error('No authentication provider was identified.'));
  }

  if (profile.hasOwnProperty('emails')) {
    user.email = profile.emails[0].value;
  }

  if (profile.hasOwnProperty('username')) {
    user.username = profile.username;
  }

  user.email = req.body.email || user.email;

  Passport.findOne({
    provider   : provider
    , identifier : query.identifier.toString()
  }, function (err, passport) {
    if (err) {
      return next(err);
    }

    if (!passport) {
      if (!user.email) {
        return next(new Error('Email was not available. Add email param to req.body!'));
      }
      User.findOrCreate({email: user.email},user, function (err, user) {
        if (err) {
          return next(err);
        }

        query.user = user.id;
        Passport.create(query, function (err, passport) {
          if (err) {
            return next(err);
          }
          next(err, user);
        });
      });
    }
    else {
      if (query.hasOwnProperty('tokens') && query.tokens !== passport.tokens) {
        passport.tokens = query.tokens;
      }
      passport.save(function (err, passport) {
        if (err) {
          return next(err);
        }
        User.findOne(passport.user.id, next);
      });
    }
  });
};

passport.loadStrategies = function () {
  var self       = this;
  Provider.update({}, {needToReload: false}).exec(function(err, providers){
    if(!!err){
      throw err;
    }
    _.forEach(providers, function(p) {
      console.log('Provider \''+p.name+'\' loaded')
      p.options['passReqToCallback'] = true;
      var Strategy = require(p.strategyModuleName);
      if(Strategy.hasOwnProperty('Strategy')){
        Strategy=Strategy.Strategy;
      }
      self.use(new Strategy(p.options, self.protocols[p.protocol]));
    })

    var LocalStrategy = require('passport-local');
    self.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true,
        },
        function(req, email, password, done) {
          Admin.findOne({ email }, function (err, admin) {
            console.log(err, admin)
            if (err) { return done(err); }
            if (!admin) { return done(null, false); }
            if (admin.password !== 'secret') { return done(null, false); }
            req.logIn(admin, function(err) {
              if (err) { return done(err); }
              return done(null, admin);
            });
          });
        }
    ));
  });
};

passport.serializeUser(function (user, next) {
  next(null, user.id);
});

passport.deserializeUser(function (id, next) {
  Admin.findOne(id, next);
});

passport.auth = function (req, res, next){
  var self = this;
  if(!req.body.provider){
    return next(new Error('Hola, provider is missing!'));
  }
  Provider.findOne({name: req.body.provider, active: true}, function (err, provider) {
    if(!!err){
      return next(err);
    }

    if(!provider){
      return next(new Error('Provider does not exists or inactive!'));
    }

    App.findOne({appId: req.body.appId}, function (err, app) {
      if(!!err){
        return next(err);
      }

      if(!app){
        return next(new Error('App does not exists! Add valid appId to request!'));
      }

      req.app = app;

      var strategy = provider.strategyName;
      self.authenticate(strategy, next)(req, res, req.next);
    });
  });
};

module.exports = passport;
