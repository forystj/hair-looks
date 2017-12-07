const express = require('express');
const router  = express.Router();

// models
const Photo = require('../models/photos.js');
const User = require('../models/users.js');


router.get('/', async (req, res) => {
  const allUsers = await User.find();
  const foundId = await User.find({username: req.session.username});
  const onePhoto = await Photo.findById(req.params.username);
  if(req.session.logged) {
  res.render('users.ejs', {
    onePhoto,
    allUsers,
    foundId: foundId,
    username: req.session.username
    });
  } else {
    res.redirect('/user/login');
  }
});


//====PROFILE PAGE====
router.get('/:id', async (req, res) => {
  const foundId = await User.find({username: req.session.username});
  const photos = await Photo.find({user: foundId[0]._id});
  if(req.session.logged) {
  res.render('profile.ejs', {
    foundId: foundId,
    photos: photos,
    currentPage: req.params.index,
    username: req.session.username
    });
  } else {
    res.redirect('/user/login');
  }
});

module.exports = router;
