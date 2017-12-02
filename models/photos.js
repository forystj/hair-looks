const mongoose    = require('mongoose');


//====SCHEMA====
const photoSchema = mongoose.Schema({
  url: { type: String, require: true },
  submitted_by: String,
  caption: String
});


//====EXPORT====
module.exports = mongoose.model('Photo', photoSchema);
