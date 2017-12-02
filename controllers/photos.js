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


//====SEED====



module.exports = router;
