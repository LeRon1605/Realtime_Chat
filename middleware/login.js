const jwt = require('jsonwebtoken');
const fs = require('fs');
class Login{
    preventToLoginForm(req, res, next){
        try{
            const token = req.session.token;
            const data = jwt.verify(token, fs.readFileSync('./key/publickey.crt'), { algorithm: 'RS256'});
            res.redirect('/home');
        }catch(err){
            next();
        }
    }
}

module.exports = new Login();