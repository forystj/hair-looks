const express = require('express');
const router  = express.Router();

// models
const Photo = require('../models/photos.js');
const User = require('../models/users.js');


const sessionController = require('./session.js');
const photosController = require('./photos.js');
router.use('/feed', photosController);
// app.use('/comments', commentsController);
router.use('/user', sessionController);
// router.use('/users', usersController);


//====ALL USERS INDEX====
router.get('/', async (req, res) => {
  const allPhotos = await Photo.find();
  const allUsers = await User.find();
  const thisUser = await User.find(req.session);
  if(req.session.logged) {
  res.render('users.ejs', {
    thisUser: req.session.index,
    allUsers,
    photos: allPhotos,
    username: req.session.username
    });
  } else {
    res.redirect('/user/login');
  }
});


//====PROFILE PAGE====
router.get('/:index', async (req, res) => {
  const allPhotos = await Photo.find();
  const oneUser = await User.findById(req.params.id);
  if(req.session.logged) {
  res.render('profile.ejs', {
    oneUser: User[req.params.index],
    photos: allPhotos,
    currentPage: req.params.index,
    username: req.session.username
    });
  } else {
    res.redirect('/user/login');
  }
});

// // SHOW
// router.get('/:id', async (req, res) => {
//   const allPhotos = await Photo.find();
//   const oneUser = await User.findById(req.params.id);
//
//   if(req.session.logged) {
//   res.render('profile.ejs', {
//     oneUser: oneUser,
//     photos: allPhotos,
//     username: req.session.username
//     });
//   } else {
//     res.redirect('/user/login');
//   }
// });

module.exports = router;
