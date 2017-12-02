//====DEPENDENCIES====
const express   = require('express');
const router    = express.Router();
const Photos    = require('../models/photos.js');


//====ROUTE====
router.post('/', async (req, res) => {
  try {
    const newPhoto = await Photos.create(req.body);
    res.redirect('/photos');
    } catch (err) {
    res.send(err.message);
    }
});


//====INDEX====
router.get('/', async (req, res) => {
  const allPhotos = await Photos.find();
  res.render('index.ejs', {allPhotos});
});

//====FEED====
router.get('/feed', async (req, res) => {
  const allPhotos = await Photos.find();
  res.render('feed.ejs', {allPhotos});
});

//====USERS====
router.get('/users', async (req, res) => {
  const allPhotos = await Photos.find();
  res.render('users.ejs', {allPhotos});
});

//====SHOW====
router.get('/:id', async (req, res) => {
  const onePhoto = await Photos.findById(req.params.id);
  res.render('show.ejs', {onePhoto});
});


//====DELETE=====
router.delete('/:id', async (req, res) => {
  const photos = await Photos.findByIdAndRemove(req.params.id);
  res.redirect('/photos');
});


//=====EDIT=====
router.get('/:id/edit', async (req, res) => {
  const onePhoto = await Photos.findById(req.params.id);
  res.render('edit.ejs', {
    photos: onePhoto
  });
});

router.put('/:id', async (req, res) => {
  const photos = await Photos.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/photos')
});

//====EXPORT====
module.exports = router;
