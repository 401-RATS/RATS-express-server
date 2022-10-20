'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const http = require('http');
const PORT = process.env.PORT || 3002;
const PORT_TWILIO = process.env.PORT_TWILIO;


mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.use(logger);


//happy path routes
app.get('/', (req, res, next) => {
  res.status(200).send('RATS make the world a better place.  And so it is written.');
});

app.get('/health', (req, res, next) => {
  res.status(200).send('RATS make the world a better place.  And so it is written.');
});

// twilio route
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Gizmo is the King of the Kitties');
  res.writeHead(200, {'Content-type': 'test/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(PORT_TWILIO, () => {
  console.log(`Express server listening on port ${1337}`);
});


//user and trip routes
app.use(usersRouter);
app.use(tripsRouter);

//error handlers
app.use('*', notFound);
app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log('Listening on port', PORT));
}

module.exports = { app, start };
