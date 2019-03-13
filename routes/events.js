const express = require('express');
const router = express.Router();
const cookie = require('node-cookie');
const User = require('../models/User');
const Events = require('../models/Events');

function checkSignIn(req, res, next){
  if(req.session.user){
    console.log(" line 9 checkSignIn Thing: ",req.session.user)
    next();
  } else {
    var err = new Error("Not logged in");
    console.log(req.session.user);
    next(err);
  }
}

username = function get_username(req){
  console.log('line 19 In my_user function', req);
  User.findOne(req.body)
  .then((user)=>{
    temp_user = req.body.username;
    console.log("line 23 temp user: ", temp_user);
    if(temp_user){
      return temp_user;
    };
  });
};

my_id = function get_id(req){
  console.log('line 31 get id func', req);
  User.findOne(req.body)
  .then((user)=>{
    console.log('line 34 in get_id');
    temp_id = req.body.id;
    console.log('line 35 id: ', temp_id);
    if(temp_id){
      return temp_id;
    };
  });
};

//ALLLLLLL of my get methods

//doesn't work
router.get(`/:username/home`, checkSignIn, function(req, res){
  console.log('line 32 here');
  res.render('home');
});
 
router.get('/:username/home', checkSignIn, function(req, res, next) {
  console.log('line 37 sent to home, username: ', req.session.username);
  console.log('req.session.user.username', req.session.user.username);
  //console.log('req:', req);
  User.findOne(req.session.user)
  .then((user) => {
    var userid = user.id;
    console.log('line 44 rendered home');
    res.render('home')
  })
  .catch((err) => {
    res.status(500).send({err});
  });
});

router.get('/:username/week', checkSignIn, function(req, res, next){
  console.log('line 56 sent to week');
  res.render('week');
});

router.get('/:username/4', checkSignIn, function(req, res, next){
  console.log('line 61 sent to 4');
  res.render('four');
});

router.get('/:username/calendar', checkSignIn, function(req, res, next) {
  console.log('line 62 sent to calendar');
  User.findOne(req.session.user)
  .then((user) => {
    console.log('line 67');
    return Events.get_events(user.id);
  })
  .then((events) => {
    console.log(events);
    res.render('calendar');
    res.send(200, events);
  })
  .catch((err) => {
    res.status(500).send({err});
  });
});

router.get('/:username/goals', checkSignIn, function(req, res, next){
  console.log('line 81 sent to goals');
  res.render('goals');
});

router.get('/:username/birthdays', checkSignIn, function(req, res, next){
  console.log('line 91 sent to bdays');
  res.render('birthdays');
});

router.get('/:username/add', checkSignIn, function(req, res, next){
  console.log("line 96 sent to add");
  res.render('create_event');
});

//ALLLLLL of my post methods

router.post(`/:username/add`, checkSignIn, function(req, res, next){
  console.log(req.session.user);
  console.log("line 98 sent to add");
  console.log("line 99 req.body:", req.body);
  console.log("var my_id: ",my_id);
  Events.create(req.body.type, req.body.description, req.body.date, req.body.time, my_id)
  .then((eventCreated) =>{
    console.log('created and before redirect');
    res.redirect('/:username/calendar');
  })
  .catch((err) => {
    res.send(500, {err})
  });
});

//Wildcard
router.get('/:username/*', checkSignIn, function(req, res) {
  console.log('line 124 wildcard activated')
  res.render('home');
});

module.exports = router;