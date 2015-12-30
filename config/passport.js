module.exports = [
  {
    name: 'facebook',
    protocol: 'oauth2',
    strategyName: 'facebook-token',
    strategyModuleName: 'passport-facebook-token',
    options: {
      clientID: 'your_clientID',
      clientSecret: 'your_clientSecret'
    }
  },
  {
    name: 'google-plus',
    protocol: 'oauth2',
    strategyName: 'google-plus-token',
    strategyModuleName: 'passport-google-plus-token',
    options: {
      clientID: 'your_clientID',
      clientSecret: 'your_clientSecret'
    }
  },
  {
    name: 'twitter',
    protocol: 'oauth2',
    strategyName: 'twitter-token',
    strategyModuleName: 'passport-twitter-token',
    options: {
      consumerKey: 'your_consumerKey',
      consumerSecret: 'your_consumerSecret'
    }
  }
];
