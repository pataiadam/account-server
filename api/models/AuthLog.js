module.exports =  {
  tableName: 'authLog',
  connection: 'mongodb',
  attributes: {
    user: { model: 'User', required: true },
    provider: { type: 'string'},
  }
};
