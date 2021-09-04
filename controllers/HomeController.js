class HomeController{
    index(req, res, next){
        res.render('home', { layout: 'homeLayout' })
    }
}

module.exports = new HomeController();