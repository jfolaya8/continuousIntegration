const passport = require('passport');
const Strategy = require('passport-local').Strategy;

 passport.use('local.singup', new Strategy({
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true
 }, async (req, email, password, done) =>{

    console.log(req.body);
    

 }));

//  passport.serializeUser((usr, done) =>{

//  });