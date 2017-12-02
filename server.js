//====DEPENDENCIES====
const express         = require('express');
const mongoose        = require('mongoose');
const app             = express();
const morgan          = require('morgan');
const methodOverride  = require('method-override');
const session = require('express-session');
const PORT            = 3000;
const photosController = require('./controllers/photos');
require('pretty-error').start();


//====MIDDLEWARE====
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/photos', photosController);
app.use(express.static('public'));


//====DB====
const mongoURI = 'mongodb://localhost:27017/mongoose_store'
mongoose.connect(mongoURI, { useMongoClient: true });
mongoose.Promise = global.Promise;


//====TEST CONNECTION====
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


app.use(session({
    secret: "dgfdhbanfwgnw",
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride('_method'));


const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');

app.use('/users', usersController);
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
    res.render('index.ejs', {
        currentUser: req.session.currentuser
    });
});

app.get('/app', (req, res) => {
  if (req.session.currentuser){
      res.send('the party');
  } else {
      res.redirect('/sessions/login');
  }
});


//====LISTEN====
app.listen(PORT, () => {
  console.log('===========================');
  console.log('Listening on port: ', PORT);
  console.log('===========================');
});


//====EXPORT====
module.exports = app;
