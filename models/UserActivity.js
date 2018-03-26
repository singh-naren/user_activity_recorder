var mongoose = require('mongoose');

// UserActivity Schema
var ActivitySchema = mongoose.Schema({
	email: {
		type: String,
        required: true
	},
	activity: {
		type: String,
        required: true
	},
	intensity: {
		type: String,
        required: true,
        enum: {
            values: [ "EASY", "MEDIUM", "HARD"],
            message: "Please provide valid intensity level EASY/MEDIUM/HARD."
        }
	}
});

var Activity = module.exports = mongoose.model('userActivities', ActivitySchema);