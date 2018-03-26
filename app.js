const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport	= require('passport');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');

const app = express();

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret:"sd7g97g9dgsd9fg79sfgsfdgs", 
    resave:false, 
    saveUninitialized:true}));

//Main endpoints
app.use('/api/v1', routes);
app.use('/api/v1/users', users);
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});
 
// Use the passport package in our application
app.use(passport.initialize());


mongoose.connect('mongodb://localhost/consumex', function(err) {
    if (err) {
        return console.log(err);
    }
    
    return console.log("Successfully connected to mongoDB!");
});

var db = mongoose.connection;

app.listen(3000);
console.log('Running on port 3000...');
