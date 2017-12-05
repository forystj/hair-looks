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
  res.render('new.ejs');
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


//====FEED====
// router.get('/feed', async (req, res) => {
//   const allPhotos = await Photo.find();
//   const allUsers = await User.find();
//   res.render('feed.ejs', {allPhotos});
// });


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

// create route
// router.post('/', async (req, res) => {
//   try {
//     const createdPhoto = await Photo.create(req.body);
//     res.redirect('/');
//   } catch (err) {
//     res.send(err.message);
//   }
// });

module.exports = router;
