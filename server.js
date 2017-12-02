//====DEPENDENCIES====
const express         = require('express');
const mongoose        = require('mongoose');
const app             = express();
const morgan          = require('morgan');
const methodOverride  = require('method-override');
const PORT            = 3000;
const photosController = require('./controllers/photos')
require('pretty-error').start();

mongoose.Promise = global.Promise;


//====MIDDLEWARE====
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use('/photos', photosController);
app.use(express.static('public'));


//====DB====
const mongoURI = 'mongodb://localhost:27017/mongoose_store'
mongoose.connect(mongoURI, { useMongoClient: true });


//====TEST CONNECTION====
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


//====LISTEN====
app.listen(PORT, () => {
  console.log('===========================');
  console.log('Listening on port: ', PORT);
  console.log('===========================');
});


//====EXPORT====
module.exports = app;
