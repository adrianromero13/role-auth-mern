const cors = require('cors');
const express = require('express');
const bp = require('body-parser');
const { connect } = require('mongoose');
const { success, error } = require('consola');


// bring in app constants
const { DB, PORT } = require('./config');

// initialize app
const app = express();

const startApp = () => {
  // create connection with db
  connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  }).then(() => success({
    message: `Successfully connected with the Database \n${DB}`,
    badge: true,
  })
  ).catch((err) => error({
    message: `Unable to connect with the Database \n${err}`,
    badge: true
  })
  );
  
  app.listen(PORT, () =>
    success({ message: `Server started on PORT ${PORT}`, badge: true })
  );
}
startApp();



