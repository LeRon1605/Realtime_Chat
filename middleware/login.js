const jwt = require('jsonwebtoken');
const fs = require('fs');
class Login{
    checkLogin(req, res, next){
        if (req?.cookies?.token) next();
        else res.redirect('/'); 
    }
    preventToLoginForm(req, res, next){
        try{
            const token = req.cookies.token;
            const data = jwt.verify(token, fs.readFileSync('./key/publickey.crt'), { algorithm: 'RS256'});
            res.redirect('/home');
        }catch(err){
            res.clearCookie('token');
            next();
        }
    }
}

module.exports = new Login();