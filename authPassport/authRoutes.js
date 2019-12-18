const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');





// auth login , ?
router.get('/login', (req, res) =>{
    res.render('login', {user: req.user});

});

// auth logout

router.get('/logout', (req, res) =>{
 req.logout();
 res.redirect('/');
});

// auth with google

router.get('/google',passport.authenticate('google',{
    scope: ['profile'],
}));


// callback route for google

router.get('/google/redirect', passport.authenticate('google'), (req, res) =>{
    res.send('you reached a callback');
   
});

// Home router

router.get('/', (req, res) =>{
    res.render("loginPage", {user:req.user});

});



module.exports = router;
