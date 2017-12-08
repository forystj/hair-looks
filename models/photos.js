const mongoose    = require('mongoose');


//====SCHEMA====
const photoSchema = mongoose.Schema({
  url: { type: String, require: true },
  submitted_by: { type: String, require: true },
  caption: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: { createdAt: 'created_at' } }
);
// });


//====EXPORT====
module.exports = mongoose.model('Photo', photoSchema);
