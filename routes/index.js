var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req, res) {
    res.send('Hello there! Naren has gone for a evening walk...')
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({email:email}, function(err, user) {
        if (err) {
            console.log(err)
            return res.status(500).send('Something went wrong.');
        }
        
        if (!user) {
            return res.status(404).send('Invalid credentials.');
        }
        
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch) {
                req.session.user = user;
                return res.status(200).send('Log in...successful!');
            }
            else {
                return res.status(401).send('Invalid credentials!');
            }
        });

    });
});

router.get('/logout', function(req, res) {
    if (req.session.user) {
        req.session.destroy();
        return res.status(200).send('Successfully logged out!');
    }

    return res.status(401).send('Please login first.');
    
});

router.get('/dashboard', function(req, res) {
    if (!req.session.user) {
        return res.status(401).send('Please login to view dashboard.');
    }
    
    return res.status(200).send('Dear ' + req.session.user.email + ', Welcome to consumex dashboard.');
})

router.post('/register', function(req, res) {
    var fullname = req.body.fullname;
    var email = req.body.email;
    var password = req.body.password;
    
    var newuser = new User();
    newuser.fullname = fullname;
    newuser.email = email;
    newuser.password = password;
    newuser.save(function(err, savedUser) {
        if (err) {
            console.log(err);
            return res.status(500).send('Something went wrong.');
        }
        
        return res.status(201).send('Registerd successfully.');
    });
    
    
});

module.exports = router;