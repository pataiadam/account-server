module.exports = {
    index: function(req, res){
        Passport.count().exec(function (err, passportsCount) {
            User.count().exec(function (err, usersCount) {
                res.render('dashboard/index', {passportsCount, usersCount});
            });
        });
    },
};