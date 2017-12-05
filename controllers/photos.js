const express = require('express');
const router  = express.Router();
// models
const Photo = require('../models/photos.js');
const User = require('../models/users.js');

const sessionController = require('./session.js');
router.use('/user', sessionController);


// const Comment = require('../models/comments.js');


//====ADD PHOTO====
router.get('/users/newphoto', (req, res)=>{
  res.render('new.ejs', {
    username: req.session.username
  });
});


//====INDEX====
router.get('/', async (req, res) => {
  const allPhotos = await Photo.find();
  if(req.session.logged) {
  res.render('index.ejs', {
    photos: allPhotos,
    username: req.session.username
    });
  } else {
    res.redirect('/user/login');
  }
});


//====CREATE ADDED PHOTO====
// router.post('/users/:index', async (req, res) => {
//   try {
//     // const allPhotos = await Photo.find();
//     const allPhotos = await Photo.create(req.body);
//     allPhotos,
//     res.redirect('/users/:index');
//   } catch (err) {
//     res.send(err.message);
//   }
// });


router.post('/feed', async (req, res) => {
  try {
    const createdPhoto = await Photo.create(req.body);
    res.redirect('back');
  } catch (err) {
    res.send(err.message);
  }
});

//====FEED====
router.get('/feed', async (req, res) => {
  const allPhotos = await Photo.find();
  const allUsers = await User.find();
  res.render('feed.ejs', {allPhotos});
});


// //====DELETE=====
// router.delete('/:id', async (req, res) => {
//   const photo = await Photo.findByIdAndRemove(req.params.id);
//   res.redirect('/photo');
// });


// //=====EDIT=====
// router.get('/:id/edit', async (req, res) => {
//   const onePhoto = await Photo.findById(req.params.id);
//   res.render('edit.ejs', {
//     photo: onePhoto
//   });
// });
//
// router.put('/:id', async (req, res) => {
//   const photo = await Photo.findByIdAndUpdate(req.params.id, req.body);
//   res.redirect('/photo')
// });

// show route
// router.get('/:id', async (req, res) => {
//   const onePhoto = await Photo.findById(req.params.id);
//   // const comments = await Comment.find({ photo: onePhoto._id });
//   res.render('show.ejs', {
//     onePhoto: onePhoto,
//     // comments: comments
//  });
// });


module.exports = router;
