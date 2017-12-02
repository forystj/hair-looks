const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

router.get('/login', (req, res) => {
    res.render('sessions/login.ejs');
});

router.post('/', async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username });
  if ( bcrypt.compareSync(req.body.password, foundUser.password)) {
    req.session.currentuser = foundUser;
    res.redirect('/');
  } else {
    res.send('wrong username or password');
  }
});

router.delete('/', (req, res) => {
  req.session.destroy()
  res.redirect('/');
});

module.exports = router;
