const User = require('../db/models/user');
class RegisterController{
    async register(req, res, next){
        try{
            if (req.error){
                res.json({
                    success: false,
                    message: req.error.details[0].message
                })
            }else{
                const newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email
                })
                await newUser.save();
                res.json({
                    success: true,
                    message: 'Successfully created new account'
                })
            }
            
        }catch(err){
            next(err);
        }
        
    }
}

module.exports = new RegisterController();