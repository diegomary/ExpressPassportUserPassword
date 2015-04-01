{"changed":true,"filter":false,"title":"server.js","tooltip":"/server.js","value":"var Q = require('q');\nvar mongodb = require('mongodb');\nvar uri = 'mongodb://diegomary:diegomary@ds063180.mongolab.com:63180/diegomary88';\nvar passport = require('passport');\nvar cookieParser = require('cookie-parser');\nvar bodyParser = require('body-parser');\nvar LocalStrategy = require('passport-local').Strategy;\nvar express = require('express');\nvar expressSession = require('express-session');\nvar app = express();\n// If we ask to be served a file statically we map the public folder to root consequentely the following request:\n// https://passportauth-diegomary.c9.io/test.html\n// Will serve the test.html file in the public folder\napp.use(express.static(__dirname + '/public'));\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({ extended: true }));\napp.use(cookieParser());\napp.use(expressSession({ secret: 'dmm888com', saveUninitialized: true, resave: true }));\napp.use(passport.initialize());\napp.use(passport.session());\n\n\npassport.use(new LocalStrategy({\n// set the field name here\nusernameField: 'username',\npasswordField: 'password'\n},\n  function(username, password, done) {\n      \n      mongodb.MongoClient.connect(uri, function(err, db) {\n      if(err) throw err;\n      var users = db.collection('userInfo');\n      users.findOne({username: username}, function(err, userfound) {\n          if(err){return done(err);}\n          if (!userfound) {\n          return done(null, false, { message: 'Incorrect username.' });\n      }\n      if(userfound.password !== password) {\n        return done(null, false, { message: 'Incorrect password.' });\n      }\n      db.close(function (err) {if(err) throw err;}); \n      return done(null, userfound);\n        });\n    });\n}));\n      \n\n\npassport.serializeUser(function(user, done) {\n  done(null, user);\n});\n\npassport.deserializeUser(function(user, done) {\n        done(null, user);\n});\n\nvar isAuthenticated = function (req, res, next) {\n\t// if user is authenticated in the session, call the next() to call the next request handler \n\t// Passport adds this method to request object. A middleware is allowed to add properties to\n\t// request and response objects\n\tif (req.isAuthenticated())\n\t\treturn next();\n\t// if the user is not authenticated then redirect him/her to the login page\n\tres.redirect('/login');\n};\n\napp.get('/',isAuthenticated, function (req, res) { \nres.sendFile(__dirname +  '/index.html');\n});\n\n\napp.get('/login', function (req, res) { \nres.sendFile(__dirname +  '/login.html');\n});\n\n\n  \napp.post('/login',passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}));\n  \n\napp.get('/logout', function(req, res){req.logout(); res.redirect('/');});\n\n \nvar server = app.listen(process.env.PORT, process.env.IP, function () {\n    var host = server.address().address;\n    var port = server.address().port;    \n    console.log('One Thread of PassportAuth application listening on http://%s:%s', host, port);\n\n});\n\n\n\n\n\n\n","undoManager":{"mark":96,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":37,"column":39},"end":{"row":37,"column":40},"action":"remove","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":27},"end":{"row":37,"column":28},"action":"remove","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":27},"end":{"row":37,"column":28},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":28},"end":{"row":37,"column":29},"action":"insert","lines":["!"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":31},"end":{"row":37,"column":32},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":6},"end":{"row":41,"column":42},"action":"remove","lines":["   if(userfound.password===password)"]},{"start":{"row":41,"column":6},"end":{"row":41,"column":31},"action":"insert","lines":[" return done(null, user);"]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":25},"end":{"row":41,"column":29},"action":"remove","lines":["user"]},{"start":{"row":41,"column":25},"end":{"row":41,"column":34},"action":"insert","lines":["userfound"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":58},"end":{"row":31,"column":0},"action":"insert","lines":["",""]},{"start":{"row":31,"column":0},"end":{"row":31,"column":10},"action":"insert","lines":["          "]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":10},"end":{"row":31,"column":11},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":11},"end":{"row":31,"column":12},"action":"insert","lines":["f"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":12},"end":{"row":31,"column":14},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":13},"end":{"row":31,"column":14},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":14},"end":{"row":31,"column":15},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":15},"end":{"row":31,"column":16},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":17},"end":{"row":31,"column":18},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":18},"end":{"row":31,"column":19},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":19},"end":{"row":31,"column":20},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":20},"end":{"row":31,"column":21},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":21},"end":{"row":31,"column":22},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":22},"end":{"row":31,"column":23},"action":"insert","lines":["w"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":23},"end":{"row":31,"column":24},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":24},"end":{"row":31,"column":25},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":25},"end":{"row":31,"column":26},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":26},"end":{"row":31,"column":27},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":27},"end":{"row":31,"column":28},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":7},"end":{"row":31,"column":8},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":7},"end":{"row":31,"column":8},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":6},"end":{"row":31,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":31,"column":6},"end":{"row":31,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":6},"end":{"row":32,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":32,"column":6},"end":{"row":32,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":33,"column":6},"end":{"row":33,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":33,"column":6},"end":{"row":33,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":6},"end":{"row":34,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":6},"end":{"row":34,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":6},"end":{"row":34,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":6},"end":{"row":34,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":6},"end":{"row":34,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":6},"end":{"row":34,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":6},"end":{"row":35,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":6},"end":{"row":35,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":6},"end":{"row":35,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":6},"end":{"row":35,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":6},"end":{"row":35,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":6},"end":{"row":35,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":6},"end":{"row":36,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":6},"end":{"row":36,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":34,"column":0},"end":{"row":34,"column":4},"action":"insert","lines":["    "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":4},"action":"insert","lines":["    "]},{"start":{"row":36,"column":0},"end":{"row":36,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":10},"end":{"row":45,"column":56},"action":"remove","lines":["db.close(function (err) {if(err) throw err;});"]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":8},"end":{"row":41,"column":54},"action":"insert","lines":["db.close(function (err) {if(err) throw err;});"]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":6},"end":{"row":41,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":6},"end":{"row":41,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":6},"end":{"row":42,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":6},"end":{"row":43,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":6},"end":{"row":43,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":6},"end":{"row":43,"column":7},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":6},"end":{"row":44,"column":9},"action":"remove","lines":["","         "]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":6},"end":{"row":44,"column":10},"action":"remove","lines":["","          "]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":6},"end":{"row":45,"column":7},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":4},"end":{"row":50,"column":7},"action":"insert","lines":["// "]},{"start":{"row":51,"column":4},"end":{"row":51,"column":7},"action":"insert","lines":["// "]},{"start":{"row":52,"column":4},"end":{"row":52,"column":7},"action":"insert","lines":["// "]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":7},"end":{"row":45,"column":8},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":7},"end":{"row":46,"column":6},"action":"remove","lines":["","      "]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":7},"end":{"row":46,"column":6},"action":"remove","lines":["","      "]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":7},"end":{"row":46,"column":6},"action":"remove","lines":["","      "]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":5},"end":{"row":51,"column":5},"action":"remove","lines":["","     "]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":5},"end":{"row":51,"column":5},"action":"remove","lines":["","     "]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":5},"end":{"row":51,"column":5},"action":"remove","lines":["","     "]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":38},"end":{"row":28,"column":6},"action":"remove","lines":["","      "]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":35},"end":{"row":42,"column":6},"action":"remove","lines":["","      "]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":7},"end":{"row":44,"column":6},"action":"remove","lines":["","      "]}]}],[{"group":"doc","deltas":[{"start":{"row":44,"column":3},"end":{"row":46,"column":67},"action":"remove","lines":[" //  var user ={username:'diegomary',password:'password'};","    //  if(username===user.username && password==user.password) return done(null, user);","    //  else return done(null, false, {message: \"Wrong password\"});"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":7},"end":{"row":44,"column":3},"action":"remove","lines":["","   "]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":7},"end":{"row":44,"column":5},"action":"remove","lines":["","     "]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":7},"end":{"row":44,"column":8},"action":"remove","lines":["","        "]}]}],[{"group":"doc","deltas":[{"start":{"row":83,"column":0},"end":{"row":84,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":0},"end":{"row":85,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":0},"end":{"row":87,"column":3},"action":"insert","lines":["app.get('/logout', function(req, res){","  req.logout();","  res.redirect('/');","});"]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":38},"end":{"row":85,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":38},"end":{"row":84,"column":39},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":38},"end":{"row":84,"column":39},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":51},"end":{"row":85,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":51},"end":{"row":84,"column":52},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":70},"end":{"row":85,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":64,"column":54},"end":{"row":64,"column":55},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":64,"column":55},"end":{"row":64,"column":56},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":64,"column":56},"end":{"row":64,"column":57},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":64,"column":57},"end":{"row":64,"column":58},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":83,"column":0},"end":{"row":84,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":0},"end":{"row":84,"column":73},"action":"insert","lines":["app.get('/logout', function(req, res){req.logout(); res.redirect('/');});"]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":10},"end":{"row":84,"column":16},"action":"remove","lines":["logout"]},{"start":{"row":84,"column":10},"end":{"row":84,"column":11},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":11},"end":{"row":84,"column":12},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":12},"end":{"row":84,"column":13},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":13},"end":{"row":84,"column":14},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":14},"end":{"row":84,"column":15},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":84,"column":0},"end":{"row":84,"column":72},"action":"remove","lines":["app.get('/login', function(req, res){req.logout(); res.redirect('/');});"]}]}],[{"group":"doc","deltas":[{"start":{"row":81,"column":102},"end":{"row":82,"column":2},"action":"remove","lines":["","  "]}]}],[{"group":"doc","deltas":[{"start":{"row":82,"column":0},"end":{"row":82,"column":2},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":3},"end":{"row":55,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":3},"end":{"row":55,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":64,"column":2},"end":{"row":65,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":64,"column":2},"end":{"row":65,"column":0},"action":"remove","lines":["",""]}]}]]},"ace":{"folds":[],"customSyntax":"javascript","scrolltop":840,"scrollleft":0,"selection":{"start":{"row":64,"column":2},"end":{"row":64,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":48,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1427915455000}