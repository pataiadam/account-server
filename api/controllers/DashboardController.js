'use strict';
var moment = require('moment');
module.exports = {
    index: function(req, res){
        Passport.count().exec(function (err, passportsCount) {
            User.count().exec(function (err, usersCount) {
                var lastWeek = moment(moment()).add(-7, 'days').toISOString();
                var lastDay = moment(moment()).add(-1, 'days').toISOString();
                var lastHour = moment(moment()).add(-1, 'hours').toISOString();
                AuthLog.find({
                    where: {createdAt: {'>': lastWeek}}
                }).populate('app').exec(function(error, weekAuthLogs) {
                    var dayAuthLogs = _.filter(weekAuthLogs, function(n) {
                        return moment(n.createdAt).isAfter(lastDay);
                    });

                    var hourAuthLogs = _.filter(dayAuthLogs, function(n) {
                        return moment(n.createdAt).isAfter(lastHour);
                    });


                    //TODO: refact
                    var week =_.reduce(_.groupBy(weekAuthLogs, (log)=>{return log.provider}), function(result, n, key) {
                        result['provider'][key] = result['provider'][key] || {};
                        result['provider'][key]['week'] = n.length;
                        return result;
                    }, {provider: {}, app: {}});

                    week =_.reduce(_.groupBy(weekAuthLogs, (log)=>{log.app = log.app || {}; return log.app.name}), function(result, n, key) {
                        result['app'][key] = result['app'][key] || {};
                        result['app'][key]['week'] = n.length;
                        return result;
                    }, week);

                    var day =_.reduce(_.groupBy(dayAuthLogs, (log)=>{return log.provider}), function(result, n, key) {
                        result['provider'][key]['day'] = n.length;
                        return result;
                    }, week);

                    day =_.reduce(_.groupBy(dayAuthLogs, (log)=>{log.app = log.app || {}; return log.app.name}), function(result, n, key) {
                        result['app'][key]['day'] = n.length;
                        return result;
                    }, day);

                    var hour =_.reduce(_.groupBy(hourAuthLogs, (log)=>{return log.provider}), function(result, n, key) {
                        result['provider'][key]['hour'] = n.length;
                        return result;
                    }, day);

                    hour =_.reduce(_.groupBy(hourAuthLogs, (log)=>{log.app = log.app || {}; return log.app.name}), function(result, n, key) {
                        result['app'][key]['hour'] = n.length;
                        return result;
                    }, hour);

                    res.render('dashboard/index', {passportsCount, usersCount, stats: hour});
                });
            });
        });
    },
};