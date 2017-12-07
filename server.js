const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const methodOverride   = require('method-override');
const session  = require('express-session');
const bcrypt   = require('bcrypt');
const app      = express();
const PORT     = process.env.PORT || 3000;
require('pretty-error').start();


const hashedString = bcrypt.hashSync('foryst', bcrypt.genSaltSync(10));
console.log(hashedString);

let test = bcrypt.compareSync('foryst', hashedString);
console.log(test);

//====DB====
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hair-looks';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

//====TEST CONNECTION====
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));


//====MIDDLEWARE====
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(session({
  secret: "awevionadlfkjfew",
  resave: false,
  saveUninitialized: false
}));
app.use(methodOverride('_method'));


//====controllers====
const sessionController = require('./controllers/session.js');
const usersController = require('./controllers/users.js');
const photosController = require('./controllers/photos.js');
// const commentsController = require('./controllers/comments.js');


app.use('/feed', photosController);
// app.use('/feed', photosController);
// app.use('/comments', commentsController);
app.use('/user', sessionController);
app.use('/users', usersController);


app.get('/', (req, res) => {
  // res.redirect('/feed')
  res.render('index.ejs', {
    username: req.session.username
  });
  // res.redirect('/');
})

//====LISTEN====
app.listen(PORT, () => {
  console.log('===========================');
  console.log('Photo app on port: ', PORT);
  console.log('===========================');
});


//====EXPORT====
module.exports = app;
