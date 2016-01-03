module.exports = {
    index: function(req, res){
        App.find().sort('name ASC').exec(function(err, apps){
            res.render('app/index', {apps})
        });
    },
};