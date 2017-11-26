var express = require('express');
var bodyParser = require('body-parser');
var DbUtils = require('./utils/dbutils');
var path = require('path');
var timeStamp = require('time-stamp');
var cookiern = require('./utils/cookie');
var cookiesParser = require('cookie-parser');
var TaskDB = require('./utils/dbtask');
var TaskRoutes = require('./routes/task')

var app = express();
app.use(express.static(__dirname + '/public', {index : false}));
app.use(bodyParser.json());
app.use(cookiesParser());

var taskRoutes = new TaskRoutes();
var task = new TaskDB('users');
var users = new DbUtils('users');

app.get('/', (req, res) => {
    res.sendFile((path.join(__dirname + '/public/index.html')));
});


// Registration
// Registration, Login Page
app.get('/login', (req, res) => {
    users.verificationUser(req.cookies.token, (err, result) => {
        if(result){
            res.redirect('/');
        }else{
            res.sendFile((path.join(__dirname + '/public/registration.html')));
        }
    }) 
})
// Registration and Save to DataBase
app.post('/user', (req, res) => {
    var user = req.body;
    users.findOne1({ login : user.login }, (err, result) => {
        if(result){
            res.send({success: false, message : 'login already exists'});
        }else{
            users.findOne1({ email : user.email}, (err, result) => {
                if(result){
                    res.send({success: false, message : 'email already exists'});
                }else{
                    user.createDate = timeStamp('YYYY/MM/DD/HH:mm:ss');
                    users.save(user, (err, result) => {
                        if(err)res.send('Database ERROR');
                        else{
                            res.send({success: true, message : 'Registration Succes'});
                        }
                    })
                }
            })
        }
    })
    
});

//LOGIN  user
app.post('/authentication', (req, res) => {
    var user = req.body;
    users.findOne(user.login, (err, result) => {
        if(!result)res.send('user is not registered');
        else{
            if(result.password !== user.password){
                res.send('Wrong Password');
            }else{
                var cookieVal = cookiern.cookieValue();
                users.logInUser(result._id, cookieVal); 
                res.cookie('token', cookieVal, { maxAge : 1000*60*200, httpOnly : true});        
                res.setHeader('Location', '/');
                res.end(); 
            }
        }
    })
});
//  Verification User
app.get('/verification', (req, res) => {
    if(!req.cookies.token){
        res.send('<li><a href="/login">Log In or Registration</a></li>');
    }else{
        users.verificationUser(req.cookies.token, (err, result) => {
            res.send('<span><a href="#">' + result.login.slice(0,1).toUpperCase() + '</a></span><ul class="infoUser"><li>' + result.login + '</li><li  data-email="' + result.email + '">' + result.email + '</li><li></li><li class="logout"><a href="#">Log Out</a></li></ul>')
        })
    }
})

//Log OUT
app.delete('/logout', (req, res) => {
    users.logout( req.body.email, req.cookies.token)
    res.clearCookie('token');
    res.send('/');
    res.end();
})
//SAVE TASK

app.post('/task', taskRoutes.saveTask);

app.get('/task', taskRoutes.getAllTask);
app.listen(4500, () => console.log('Server start'))