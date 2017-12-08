const express = require('express');
const router  = express.Router();


//====MODELS=====\\
const Photo = require('../models/photos.js');
const User = require('../models/users.js');

// const Comment = require('../models/comments.js');


//====INDEX====\\
router.get('/', async (req, res) => {
  const allPhotos = await Photo.find().sort({created_at: -1 } );
  const foundId = await User.find({username: req.session.username});
  if(req.session.logged) {
  res.render('feed.ejs', {
    photos: allPhotos,
    foundId: foundId,
    username: req.session.username
    });
  } else {
    res.redirect('/user/login');
  }
});


//====ADD NEW PHOTO====\\
router.post('/', async (req, res) => {
  try {
    const createdPhoto = await Photo.create(req.body);
    res.redirect('/');
  } catch (err) {
    res.send(err.message);
  }
});


//====NEW ROUTE====\\
router.get('/new', async (req, res) => {
  const oneUser = await User.find({username: req.session.username});
  res.render('new.ejs', {oneUser, username: req.session.username});
});


//====SHOW ROUTES====\\
router.get('/:id', async (req, res) => {
  const onePhoto = await Photo.findById(req.params.id);
  res.render('show.ejs', {onePhoto: onePhoto, username: req.session.username})
});


//====EDIT====\\
router.get('/:id/edit', async (req, res) => {
  const editPhoto = await Photo.findById(req.params.id);
  res.render('edit.ejs', {photo: editPhoto, username: req.session.username});
});

router.put('/:id', async (req, res) => {
  const updatePhoto = await
  Photo.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/feed');
});


//====DELETE=====
router.delete('/:id', async (req, res) => {
  const photo = await Photo.findByIdAndRemove(req.params.id);
  res.redirect('back');
});


module.exports = router;
