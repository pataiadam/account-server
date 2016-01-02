module.exports = {
    index: function(req, res){
        Provider.find().sort('active DESC').exec(function(err, providers){
            res.render('provider/index', {providers})
        });
    },

    update: function(req, res){
        var params = {
            active: false,
            options: {}
        };

        Provider.findOne({name: req.body.name}, function (err, provider) {
            if(!!err){
                console.log(err)
                return res.redirect('provider');
            }
            for (var key in provider.options) {
                if(req.body.hasOwnProperty(key)){
                    params.options[key] = req.body[key];
                    if(req.body[key] !== provider.options[key]){
                        params.needToReload = true;
                    }
                }
            }
            if(req.body.hasOwnProperty('active')){
                params['active']=true;
            }

            Provider.update({name: req.body.name}, params).exec(function afterwards(err, updated){
                if(!!err){
                    console.log(err)
                }
                res.redirect('provider');
            });
        });
    },
};