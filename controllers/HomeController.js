class HomeController{
    // [GET] /
    index(req, res, next){
        res.render('login', { layout: 'loginLayout'});
    }
}

module.exports = new HomeController();