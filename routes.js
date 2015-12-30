'use strict';
var express = require('express');
var router = express.Router();

router.all('*', function (req, res, next) {
    console.log(`${req.method} request :: ${req.originalUrl}`);
    if (req.method === 'POST') {
        console.log('Request body: ', req.body);
    }
    return next();
});

router.use(function (req, res, next) {
    const nonSecurePaths = ['/', '/login', '/logout'];

    if (req.method === 'GET' || _.contains(nonSecurePaths, req.path)) {
        return next();
    }

    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).render('401', {layout: false});
});

router.get('/', function (req, res) {
    res.render('home', {foo: 'bar'});
});



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