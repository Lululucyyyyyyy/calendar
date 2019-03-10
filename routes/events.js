const express = require('express');
const router = express.Router();
const cookie = require('node-cookie');
const User = require('../models/User');
const Events = require('../models/Events');

function checkSignIn(req, res, next){
  if(req.session.user){
    console.log("checkSignIn Thing: ",req.session.user)
    next();
  } else {
    var err = new Error("Not logged in");
    console.log(req.session.user);
    next(err);
  }
}

my_user = function get_username(req){
  console.log('In my_user function', req);
  User.findOne(req.body)
  .then((user)=>{
    temp_user = req.body.username;
    console.log("temp user: ", temp_user);
    if(temp_user){
      return temp_user;
    };
  });
};

//doesn't work
router.get(`/${my_user}/home`, checkSignIn, function(req, res){
  console.log('here');
  res.render('calendar');
});
 
router.get('/:username/home', function(req, res, next) {
  console.log('sent to home, username: ', req.session.username);
  console.log('body: ', req.body.username);
  console.log('req.body ', req.body);
  //console.log('req:', req);
  User.findOne(req.session.username)
  .then((user) => {
    var userid = user.id;
    console.log('rendered home');
    res.render('home')
  })
  .then((events) => {
    res.send(200, events);
  })
  .catch((err) => {
    res.status(500).send({err});
  });
});

router.get('/:username/week', function(req, res, next){
  console.log('sent to week');
  res.render('week');
});

router.get('/:username/4', function(req, res, next){
  console.log('sent to 4');
  res.render('four');
});

router.get('/:username/calendar', function(req, res, next) {
  User.findOne(req.session.user)
  .then((user) => {
    var userid = user.id;
    console.log(userid);
    return Events.get_events(userid);
  })
  .then((events) => {
    res.send(200, events);
  })
  .catch((err) => {
    res.send(500, {err})
  });
});

router.get('/:username/goals', function(req, res, next){
  console.log('sent to goals');
  res.render('goals');
});

router.get('/:username/achievements', function(req, res, next){
  console.log('sent to achievements');
  res.render('ach');
})

router.get('/:username/birthdays', function(req, res, next){
  console.log('sent to bdays');
  res.render('birthdays');
})

//Wildcard
router.get('/:username/*', function(req, res) {
  console.log('wildcard activated')
  res.render('home');
});

module.exports = router;