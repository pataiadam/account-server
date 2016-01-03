module.exports = {
    auth: function(req, res){
        var response = {
            error: null,
            user: null
        };
        passport.auth(req, res, function (err, user) {
            if(!!err){
                response.error=err.message;
                return res.json(response);
            }

            var log = {
                user: user.id,
                provider: req.body.provider,
                app: req.app.id
            };
            AuthLog.create(log).exec(function(){});
            response.user=user;
            return res.json(response);
        });
    }
};