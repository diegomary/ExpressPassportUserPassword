var Q = require('q');
var mongodb = require('mongodb');
var uri = 'mongodb://diegomary:diegomary@ds063180.mongolab.com:63180/diegomary88';
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var expressSession = require('express-session');
var app = express();
// If we ask to be served a file statically we map the public folder to root consequentely the following request:
// https://passportauth-diegomary.c9.io/test.html
// Will serve the test.html file in the public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({ secret: 'dmm888com', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy({
// set the field name here
usernameField: 'username',
passwordField: 'password'
},
  function(username, password, done) {
      
      mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      var users = db.collection('userInfo');
      users.findOne({username: username}, function(err, userfound) {
          if(err){return done(err);}
          if (!userfound) {
          return done(null, false, { message: 'Incorrect username.' });
      }
      if(userfound.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      db.close(function (err) {if(err) throw err;}); 
      return done(null, userfound);
        });
    });
}));
      


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});



var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him/her to the login page
	res.redirect('/login');
};



app.get('/',isAuthenticated, function (req, res) { 
res.sendFile(__dirname +  '/index.html');
});


app.get('/login', function (req, res) { 
res.sendFile(__dirname +  '/login.html');
});


  
app.post('/login',passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}));
  

app.get('/logout', function(req, res){req.logout(); res.redirect('/');});

 
var server = app.listen(process.env.PORT, process.env.IP, function () {
    var host = server.address().address;
    var port = server.address().port;    
    console.log('One Thread of PassportAuth application listening on http://%s:%s', host, port);

});






