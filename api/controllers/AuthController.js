module.exports = {
    auth: function(req, res){
        var response = {
            error: null,
            user: null
        };
        passport.auth(req, res, function (err, user, challenges, statuses) {
            if(!!err){
               response.error=err.message;
            }
            response.user=user;
            return res.json(response);
        });
    },
};