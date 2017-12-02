const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
    res.render('users/register.ejs');
});

router.post('/', async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  console.log(req.body.username);

  const users = await User.find({username: req.body.username});

  if (users.length == 0) {
    await User.create(req.body);
    res.redirect('/');
  } else {
    res.send('Username taken');
  }

});

module.exports = router;
