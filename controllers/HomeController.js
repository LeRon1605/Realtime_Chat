class HomeController{
    index(req, res, next){
        res.send(`Welcome to home ${req.user.email}`);
    }
}

module.exports = new HomeController();