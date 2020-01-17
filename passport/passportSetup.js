const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const config = require('../config');




passport.use(
    new GoogleStrategy({

    callbackURL: '/auth/google/redirect',
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
},(accessToken,refreshToken,profile, done) => {

    User.findOne({googleId: profile.id}).then((currentUser) => {
       if(currentUser){
           console.log('User is:', currentUser);
       } else {
          new User({
            userName: profile.displayName,
            googleID: profile.id
          }).save().then((newUser) =>{
              console.log('new user created'+ newUser);
          });
       }
    });




    
})
);

