const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Events = require('../models/Events');
const cookie = require('node-cookie');


router.post('/login', function (req, res, next) {
  //expect username password
  console.log('line 10 in user.js');
  User.findOne(req.body)
  .then((user) => {
    temp_user = req.body.username;
    console.log("temp user: ", temp_user);
    if (temp_user) {
      if (req.body.password === user.password) {
        newUser = {name: req.body.full_name, username: req.body.username, password: req.body.password};
        req.session.user = newUser;
        console.log('line 20');
        res.redirect(`/u/${req.body.username}/home`);
      } else {
        res.send(400, {err: 'Incorrect password'});
        res.render('error');
      }
    } else {
      // if no user exists
      res.send(400, {err: 'No user'});
    }
  })
  .catch((err) => {
    res.send(500, err);
  });
});

router.get('/login', function(req, res, next){
  res.render('login');

});

router.get('/register', function(req, res, next){
  res.render('register');
})

router.post('/register', function(req, res, next){
  User.findOne(req.body)
  .then((userExists) =>{
    console.log('Succsesfully finished find one');
    if(userExists) {
      console.log('before registering');
      res.send(403, {err: 'Username already exists'});
      res.render('error');
    } else{
      console.log('before registering 2');
      console.log(req.body);
      var newUser = {name: req.body.full_name, username: req.body.username, password: req.body.password};
      req.session.user = newUser;
      username=req.session.user.username;
      console.log('registered a new user', req.session);
      return User.create(req.body.full_name, req.body.username, req.body.password);
    }
  })
  .then((userCreated) =>{
    res.redirect(`/user/u/${req.body.username}/home`);
  })
  .catch((err) => {
    res.send(500, {err})
  });
});

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

//doesn't work lol
router.get(`/u/:username/home`, checkSignIn, function(req, res){
  console.log('does this one work user line 89');
  res.render('calendar',{id: req.session.user.id})
});


// Wildcard route
router.get('/*', function(req, res, next) {
  console.log('this wildcard activated');
  res.render('index', { title: 'Calendar' });
});

module.exports = router;