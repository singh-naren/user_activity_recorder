# user_activity_recorder in node.js/express.js and mongoDB with user login and registration

webserver runs on default 127.0.0.1:3000 and mongoDB runs on default 127.0.0.1:27017 too.
Endpoints:
1.  127.0.0.1/api/v1/register - POST
    Requires 'fullname', 'email' and 'password' as json payload
2.  127.0.0.1/api/v1/login - POST
    Requires 'email' and 'password' as payload
3.  127.0.0.1/api/v1/logout - GET
    Logs out if currently logged in
4.  127.0.0.1/api/v1/dashboard - GET
    View dashboard if currently logged in
5.  127.0.0.1/api/v1/users/activities?user=useremail@gmail.com - GET
    Gets all activities for any user provided if exists irrespective of log in session.
6.  127.0.0.1/api/v1/users/activities - POST
    Requires 'activity' and 'intensity' as json payload to record activity for currently logged in users only. Intensity must be any one of     values 'EASY', 'MEDIUM', 'HARD'.
