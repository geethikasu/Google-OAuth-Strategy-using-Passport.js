const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session')
const ejs = require('ejs');
require('./passport');
const GoogleStrategy = require( 'passport-google-oauth2').Strategy;

app.use(cors());
app.set('view engine','ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
    name: 'session',
    keys: ['123']
  }))


// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', (req, res) => res.render('index'));
app.get('/failure', (req, res) => res.send('You Failed to log in!'));

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/success', (req, res) => res.send("Protected page"));

// Auth Routes
app.get('/google', passport.authenticate('google', { scope:  ['profile', 'email' ] }));

app.get('/auth/google/redirect',passport.authenticate('google'),(req,res)=>{
  res.send('Products Screen');
});


app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

app.listen(3000, () => console.log('Running on Port 3000'));



module.exports = {
    app
};