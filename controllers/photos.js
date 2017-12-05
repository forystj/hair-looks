const express = require('express');
const router  = express.Router();

// models
const Photo = require('../models/photos.js');
// const Comment = require('../models/comments.js');

// index route
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

// show route
router.get('/:id', async (req, res) => {
  const onePhoto = await Photo.findById(req.params.id);
  // const comments = await Comment.find({ photo: onePhoto._id });

  res.render('photos/show.ejs', {
    onePhoto: onePhoto,
    // comments: comments
 });
});

// create route
router.post('/', async (req, res) => {
  try {
    const createdPhoto = await Photo.create(req.body);
    res.redirect('/');
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
