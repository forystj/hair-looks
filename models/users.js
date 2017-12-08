const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {type: String, require: true, index: {unique: true}},
    password: String,
    bio: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
