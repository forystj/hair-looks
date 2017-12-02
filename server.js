//====DEPENDENCIES
const express = require('express');
const app = express();
const PORT = 3000;

//====MIDDLEWARE
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//====LISTEN
app.listen(PORT, () => {
  console.log('===========================');
  console.log('Listening on port: ', PORT);
  console.log('===========================');
});
