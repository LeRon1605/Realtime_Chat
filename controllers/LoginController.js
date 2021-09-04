const User = require('../db/models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const signToken = (userID) => {
    return jwt.sign({ 
        iss: 'Ron',
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, fs.readFileSync('./key/keypair.pem'), { algorithm: 'RS256'})
}
class LoginController{
    login(req, res, next){
        try{
            const { user } = req;
            const token = signToken(user._id);
            res.cookie('token', token);
            res.redirect('/home');
        }catch(err){
            next(err);
        }
    }
}

module.exports = new LoginController();