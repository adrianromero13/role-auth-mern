const cors = require('cors');
const express = require('express');
const bp = require('body-parser');
const { connect } = require('mongoose');
const { success, error } = require('consola');


// bring in app constants
const { DB, PORT } = require('./config');

// initialize app
const app = express();

app.listen(PORT, () => success({ message: `Server started on PORT ${PORT}`, badge: true })
);

