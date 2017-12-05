const express = require('express');
const router  = express.Router();

// models
const Photo = require('../models/photos.js');
const User = require('../models/users.js');


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
