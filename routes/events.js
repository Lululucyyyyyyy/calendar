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

//ALLLLLLL of my get methods
 
router.get('/home', function(req, res, next) {
  console.log('line 37 sent to home');
  res.render('home');
});

router.get('/weekly', function(req, res, next){
  console.log('line 56 sent to week');
  res.render('week')
});

router.get('/calendar', function(req, res, next) {
  console.log('line 62 sent to calendar');
  User.findOne(req.session.user)
  .then((user) => {
    return Events.get_events(user.id);
  })
  .then((events) => {
    res.render('calendar');
    res.status(200).send(events);
  })
  .catch((err) => {
    res.status(500).send({err});
  });
});

router.get('/birthdays', function(req, res, next){
  console.log('line 91 sent to bdays');
  User.findOne(req.session.user)
  .then((user) => {
    return user.id;
  })
  .then((userid)=>{
    console.log("line 98 sent to add");
    console.log("line 99 req.body:", req.body);
    return Events.get_events(req.body.type, req.body.description, req.body.date, req.body.time, userid);
  })
  .then((events) =>{
    birthdays = events['birthdays'];
    console.log('created and before redirect');
    res.render('birthdays');
    res.send(200, events);
  })
  .catch((err) => {
    res.send(500, {err})
  });
});

router.get('/add', function(req, res, next){
  console.log("line 71 sent to add");
  res.render('create_event');
});

router.get('/logout', function(req, res, next){

})

//ALLLLLL of my post methods

router.post(`/add`, function(req, res, next){
  User.findOne(req.session.user)
  .then((user) => {
    return user.id;
  })
  .then((userid)=>{
    console.log("line 98 sent to add");
    console.log("line 99 req.body:", req.body);
    Events.create(req.body.type, req.body.description, req.body.date, req.body.time, userid);
  })
  .then((eventCreated) =>{
    console.log('created and before redirect');
    res.redirect('/u/calendar');
  })
  .catch((err) => {
    res.send(500, {err})
  });
});

//Wildcard
router.get('/*', function(req, res) {
  console.log('line 124 wildcard activated')
  res.render('home');
});

module.exports = router;