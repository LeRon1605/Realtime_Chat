const User = require('../db/models/user');
class LoginController{
    login(req, res, next){
        console.log(req.body);
        res.send('Login successful');
    }
}

module.exports = new LoginController();