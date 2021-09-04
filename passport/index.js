const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTSrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');

const User = require('../db/models/user');

// Passport local
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

// Passport jwt 
passport.use(new JWTSrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.token]),
    secretOrKey: fs.readFileSync('./key/publickey.crt'),
    algorithms: 'RS256'
}, async (payload, done) => {
    try{
        const userID = payload.sub;
        const user = await User.findById(userID);
        if (!user) done(null, false);
        else done(null, user);
    }catch(err){
        done(err);
    }
}))