const express = require('express');
const bcrypt  = require('bcrypt');
const router  = express.Router();
const User    = require('../models/users.js');

router.get('/login', (req, res) => {
  res.render('session/login.ejs', {
    message: req.session.message,
    username: req.session.username

  })
});


//====LOG IN====
router.post('/login', async (req, res) => {
  try {
  const user = await User.findOne({username: req.body.username});
  if (bcrypt.compareSync(req.body.password, user.password)) {
    req.session.username = req.body.username;
    req.session.logged = true;
    console.log(req.session);
    res.redirect('/');
  } else {
    console.log('bad password');
    req.session.message = "Username or password are incorrect";
    res.redirect('/user/login');
    }
  } catch (err) {
    console.log(err);
    req.session.message = "Username or password are incorrect";
    res.redirect('/user/login');
    }
})

//====REGISTER====

router.post('/register', async (req, res) => {
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const username = req.body.username;

  const userDbEntry = {};

  userDbEntry.username = username;
  userDbEntry.password = passwordHash;
  console.log(userDbEntry);
  try {
    const user = await User.create(userDbEntry);
    console.log(user);
    req.session.username = user.username;
    req.session.logged = true;
    res.redirect('/');
  } catch(err) {
    }
})

router.get('/logout', (req, res) => {
  // here we destroy the session
  req.session.destroy();
  res.redirect('/')
});

router.get('/update', (req, res) => {
  req.session.anyProperty = "something!";
  console.log(req.session);
});

//====EXPORT====
module.exports = router;
