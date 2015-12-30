var mongoAdapter = require('sails-mongo');

module.exports = {
    adapters: {
        'default': mongoAdapter,
        'sails-mongo': mongoAdapter,
    },

    connections: {
        mongodb: {
            adapter: 'sails-mongo',
            host: 'localhost',
            port: 27017,
            database: 'account-server'
        },
    }
};