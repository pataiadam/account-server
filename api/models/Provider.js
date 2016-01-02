module.exports =  {
  tableName: 'provider',
  connection: 'mongodb',
  attributes: {
    name: { type: 'string', unique: true}, // facebook
    active: { type: 'boolean', 'default': false},
    protocol: { type: 'string'}, // oauth2
    strategyName: { type: 'string'}, //facebook-token
    strategyModuleName: { type: 'string'}, // passport-facebook-token
    options: { type: 'json' },
    needToReload: { type: 'boolean', 'default': false},
    requestedPostFields: {type: 'array'}
  }
};
