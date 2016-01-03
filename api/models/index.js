'use strict';
var Waterline = require('waterline');

module.exports = function(orm){
    //TODO hmmm..
    var models = [
        'Passport',
        'User',
        'Provider',
        'AuthLog',
        'App',
        'Admin'
    ];

    models.map(m => {
        orm.loadCollection(Waterline.Collection.extend(require(`./${m}`)));
        console.log(`Model ${m} loaded`)
    });
};