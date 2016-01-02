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

            AuthLog.create({user: user.id, provider: req.body.provider}).exec(function(){});
            response.user=user;
            return res.json(response);
        });
    },
};