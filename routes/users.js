var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Activity = require('../models/UserActivity');

router.get('/activities', function(req, res) {
    if (Object.keys(req.query).length === 0) {
        return res.status(404).send('Please try with valid \'?user=\' in URI');
    }
    
    Activity.find({email:req.query.user}, function(err, activitieyList) {
        if (err) {
            console.log(err)
            return res.status(500).send();
        }
        
        if (!activitieyList.length) {
            return res.status(404).send('No activities found.');
        }
        
        return res.status(200).send(activitieyList  );
    });
});

router.post('/activities', function(req, res) {
    if (!req.session.user) {
        return res.status(401).send('Please login to save activities.');
    }
    var activity = Activity();
    //Allow saving activities only to currently logged in users
    activity.email = req.session.user.email;
    activity.activity = req.body.activity;
    activity.intensity = req.body.intensity;
    
    activity.save(function(err, savedActivity) {
        if (err) {
            console.log(err);
            return res.status(500).send('Something went wrong.');
        }
        
        return res.status(201).send('Activity saved successfully');
    });
});

module.exports = router;