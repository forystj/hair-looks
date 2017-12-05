const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const session  = require('express-session');
const bcrypt   = require('bcrypt');
const app      = express();
const PORT     = 3000;

const hashedString = bcrypt.hashSync('foryst', bcrypt.genSaltSync(10));
console.log(hashedString);

let test = bcrypt.compareSync('foryst', hashedString);
console.log(test);

// connect to database
const mongoURI = 'mongodb://localhost:27017/hair-looks';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

// test db connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// We're not using this yet, but we will
// const usersModel = require('./models/users.js');

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(session({
  secret: "awevionadlfkjfew",
  resave: false,
  saveUninitialized: false
}));

// controllers
const photosController = require('./controllers/photos.js');
// const commentsController = require('./controllers/comments.js');
const sessionsController = require('./controllers/sessions.js');


app.use('/photos', photosController);
// app.use('/comments', commentsController);
app.use('/user', sessionsController);

// root route
app.get('/', (req, res) => res.redirect('/photos'));

// :ear
app.listen(PORT, () => {
  console.log('===========================');
  console.log('Photo app on port: ', PORT);
  console.log('===========================');
});
