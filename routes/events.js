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

my_user = function get_username(req){
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

//ALLLLLLL of my get methods

//doesn't work
router.get(`/${my_user}/home`, checkSignIn, function(req, res){
  console.log('line 32 here');
  res.render('calendar');
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
    var userid = user.id;
    console.log(userid);
    return Events.get_events(userid);
  })
  .then((events) => {
    res.render('calendar');
    res.send(200, events);
  })
  .catch((err) => {
    res.send(500, {err})
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

router.post('/:username/add', checkSignIn, function(req, res, next){
  console.log("line 98 sent to add");
  res.render('create_event');
  // User.findOne(req.body)
  //   console.log('Succsesfully finished find one');
  //   if(userExists) {
  //     console.log('before registering');
  //     res.send(403, {err: 'Username already exists'});
  //     res.render('error');
  //   } else{
  //     console.log('before registering 2');
  //     console.log(req.body);
  //     var newUser = {name: req.body.full_name, username: req.body.username, password: req.body.password};
  //     req.session.user = newUser;
  //     console.log('registered a new user', req.session);
  //     return User.create(req.body.full_name, req.body.username, req.body.password);
  //   }
  // })
  // .then((userCreated) =>{
  //   res.redirect(`/user/u/:username${req.body.username}/home`);
  // })
  // .catch((err) => {
  //   res.send(500, {err})

  
});

//Wildcard
router.get('/:username/*', checkSignIn, function(req, res) {
  console.log('line 124 wildcard activated')
  res.render('home');
});

module.exports = router;