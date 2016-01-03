module.exports =  {
  tableName: 'admin',
  connection: 'mongodb',
  attributes: {
    email     : { type: 'email',  unique: true },
    password  : { type: 'string' }, // TODO
    fullName: { type: 'string' },
  }
};
