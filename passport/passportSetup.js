const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const mongoose = require('mongoose');




passport.use(
    new GoogleStrategy({
    // options for google strategy

    callbackURL: '/auth/google/redirect',
    clientID: 'keys.google.clientID',
    clientSecret: 'keys.google.clientSecret'
},(accessToken,refreshToken,profile, done) => {

    // check if user already exists in our db
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

