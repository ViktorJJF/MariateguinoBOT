const config = require('../config');
const express = require('express');
const userService = require('../user');
const router = express.Router();
const fbService = require('./fb-service/fb-service');


router.get('/', function (req, res) {
//     //res.send('Hello world, I am a chat bot')
res.render('login');
//     res.sendFile(__dirname   +'/index.html');
});


router.get('/no-access', function (req, res) {
    res.render('no-access');
});

router.get('/broadcast', ensureAuthenticated, function (req, res) {
    res.render('broadcast', {user: req.user });
});

router.post('/broadcast', ensureAuthenticated, function (req, res) {
    // let message = req.body.message;
    // let newstype = parseInt(req.body.newstype, 10);
    // req.session.newstype = newstype;
    // req.session.message = message;
    // userService.readAllUsers(function(users) {
    //     req.session.users = users;
    //     res.render('broadcast-confirm', {user: req.user, message: message, users: users, numUsers: users.length, newstype: newstype})
    // }, newstype);
    res.render('broadcast-confirm');

});

router.get('/broadcast-send', ensureAuthenticated, function (req, res) {
    // let message = req.session.message;
    // let allUsers = req.session.users;

    // let sender;
    // for (let i=0; i < allUsers.length; i++ ) {
    //     sender = allUsers[i].fb_id;
    //     fbService.sendTextMessage(sender, message);
    // }

     res.redirect('/broadcast-sent');
});

router.get('/broadcast-sent', ensureAuthenticated, function (req, res) {
    // let newstype = req.session.newstype;
    // let message = req.session.message;
    // let users = req.session.users;

    // req.session.newstype = null;
    // req.session.message = null;
    // req.session.users = null;
    res.render('/broadcast-sent');
    // res.render('broadcast-sent', {message: message, users: users, numUsers:users.length, newstype: newstype});
});

router.get('/logout', ensureAuthenticated, function (req, res) {
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        //if (req.user.id === config.ADMIN_ID ) {
            return next();
       // }
       // res.redirect('/broadcast/no-access');
    } else {
        res.redirect('/');
    }
}


module.exports = router;