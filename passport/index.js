const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../db/models/user');
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try{
        const user = await User.findOne({ email, password });
        if (!user) done(null, false);
        else done(null, user);
    }catch(err){
        done(err);
    }
}))