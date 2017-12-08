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


//====PROFILE PAGE====\\
router.get('/:id', async (req, res) => {
  const foundId = await User.find({username: req.session.username});
  const photos = await Photo.find({user: foundId[0]._id}).sort({created_at: -1 } );
  const editBio = await User.find(req.params.id);
  if(req.session.logged) {
  res.render('profile.ejs', {
    editBio,
    foundId: foundId,
    photos: photos,
    currentPage: req.params.index,
    username: req.session.username,
    userBio: req.session.bio,
    });
  } else {
    res.redirect('/user/login');
  }
});

router.put('/:id', async (req, res) => {
  const updateBio = await
  User.findByIdAndUpdate(req.params.id);
  // res.redirect('back');
});

module.exports = router;
