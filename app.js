const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const loginPage = require('./routes/login-page');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
var bodyParser = require('body-parser');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, function (err) {
  if (err) {
    return console.log(err);
  }
  return console.log("Successfully Connected to MongoDB");
})

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/loginpage', loginPage);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('app now listening for requests on port 3000');
});
