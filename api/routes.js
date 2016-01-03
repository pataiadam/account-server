'use strict';

var express = require('express');
var AuthController = require('./controllers/AuthController.js');
var AppController = require('./controllers/AppController.js');
var ProviderController = require('./controllers/ProviderController.js');
var DashboardController = require('./controllers/DashboardController.js');
var router = express.Router();

router.all('*', function (req, res, next) {
    console.log(`${req.method} request :: ${req.originalUrl}`);
    if (req.method === 'POST') {
        console.log('Request body: ', req.body);
    }
    return next();
});

router.get('/', function (req, res) {
    res.render('login', {layout: false});
});

router.post('/auth', AuthController.auth);

router.get('/app', AppController.index);

router.get('/dashboard', DashboardController.index);

router.get('/provider', ProviderController.index);
router.post('/provider', ProviderController.update);

router.use(function (err, req, res, next) {
    console.log(err);
    res.json({
        errorCode: 500,
        error: err.message,
    });
});

router.use(function (req, res) {
    console.log(`Request not found :: ${req.originalUrl}`);
    res.status(404).json({
        errorCode: 404,
        message: `${req.originalUrl} not found!`
    });
});

module.exports = router;