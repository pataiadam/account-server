var Waterline = require('waterline');

module.exports = function(orm){
    //TODO khmm..
    var Passport = Waterline.Collection.extend(require('./Passport'));
    orm.loadCollection(Passport);
    console.log('Passport loaded')
    var User = Waterline.Collection.extend(require('./User'));
    orm.loadCollection(User);
    console.log('User loaded')
    var Provider = Waterline.Collection.extend(require('./Provider'));
    orm.loadCollection(Provider);
    console.log('Provider loaded')
    var AuthLog = Waterline.Collection.extend(require('./AuthLog'));
    orm.loadCollection(AuthLog);
    console.log('AuthLog loaded')
    var App = Waterline.Collection.extend(require('./App'));
    orm.loadCollection(App);
    console.log('App loaded')
};