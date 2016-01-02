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
                }).exec(function(error, weekAuthLogs) {
                    var dayAuthLogs = _.filter(weekAuthLogs, function(n) {
                        return moment(n.createdAt).isAfter(lastDay);
                    });

                    var hourAuthLogs = _.filter(dayAuthLogs, function(n) {
                        return moment(n.createdAt).isAfter(lastHour);
                    });

                    var week =_.reduce(_.groupBy(weekAuthLogs, (log)=>{return log.provider}), function(result, n, key) {
                        result[key] = result[key] || {};
                        result[key]['week'] = n.length;
                        return result;
                    }, {});

                    var day =_.reduce(_.groupBy(dayAuthLogs, (log)=>{return log.provider}), function(result, n, key) {
                        result[key]['day'] = n.length;
                        return result;
                    }, week);

                    var hour =_.reduce(_.groupBy(hourAuthLogs, (log)=>{return log.provider}), function(result, n, key) {
                        result[key]['hour'] = n.length;
                        return result;
                    }, day);
                    res.render('dashboard/index', {passportsCount, usersCount, providerStats: hour});
                });
            });
        });
    },
};