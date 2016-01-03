module.exports = [
  {
    name: 'facebook',
    protocol: 'oauth2',
    strategyName: 'facebook-token',
    strategyModuleName: 'passport-facebook-token',
    requestedPostFields: ['access_token'],
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
    requestedPostFields: ['access_token'],
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
    requestedPostFields: ['oauth_token', 'oauth_token_secret', 'user_id'],
    options: {
      consumerKey: 'your_consumerKey',
      consumerSecret: 'your_consumerSecret'
    }
  },
  {
    name: 'github',
    protocol: 'oauth2',
    strategyName: 'github-token',
    strategyModuleName: 'passport-github-token',
    requestedPostFields: ['access_token'],
    options: {
      clientID: 'your_clientID',
      clientSecret: 'your_clientSecret'
    }
  }
];
