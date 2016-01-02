module.exports =  {
  tableName: 'app',
  connection: 'mongodb',
  attributes: {
    name: { type: 'string'},
    appId: { type: 'string', unique: true},
  }
};
