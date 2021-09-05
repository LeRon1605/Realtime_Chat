const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTSrategy = require('passport-jwt').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');

const User = require('../db/models/user');

// Passport local
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try{
        const user = await User.findOne({ email, password });
        if (!user) done(null, false, req.flash('messageLogin', 'Email or password is incorrect'));
        else done(null, user);
    }catch(err){
        done(err);
    }
}))

// Passport jwt 
passport.use(new JWTSrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.session.token]),
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

// Passport facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'https://localhost:3000/login/auth/facebook/getInf',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try{
        const user = await User.findOne({
            fbID: profile.id,
            email: profile.emails[0].value,
            authType: 'facebook'
        })
        if (!user){ 
            const newUser = new User({
                name: profile.displayName,
                fbID: profile.id,
                email: profile.emails[0].value,
                authType: 'facebook'
            })
            await newUser.save();
            done(null, newUser);
        }else done(null, user);
    }catch(err){
        done(err);
    }
  }
));

// Passport google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://localhost:3000/login/auth/google/getInf"
  },
  async (accessToken, refreshToken, profile, done) => {
    try{
        const user = await User.findOne({
            ggID: profile.id,
            authType: 'google',
            email: profile.emails[0].value
        })
        if (!user){
            const newUser = new User({
                name: profile.displayName,
                ggID: profile.id,
                authType: 'google',
                email: profile.emails[0].value
            })
            newUser.save();
            done(null, newUser);
        }else done(null, user);
    }catch(err){
        done(err);
    }
  }
));