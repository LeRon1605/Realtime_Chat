class HomeController{
    index(req, res, next){
        const user = req.user.toObject();
        res.render('home', { layout: 'homeLayout', user })
    }
}

module.exports = new HomeController();