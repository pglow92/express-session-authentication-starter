const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const { validPassword } = require('../lib/passwordUtils');
const User = connection.models.User;

const customFields = {
    usernameField: "uname",
    passwordField: "pw"
};

const verifyCallback = (username, password, done) =>{
    User.findOne({username: username})
        .then((user) =>{
            if (!user){return done(null, false)}

            const isValid = validPassword(password, user.hash, user.salt);

            if (isValid){
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch((err)=>{
            done(err)
        });
};

const Strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(Strategy);

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((userId, done)=>{
    User.findById(userId)
        .then((user)=>{
            done(null, user);
        })
        .catch(err => done(err))
})