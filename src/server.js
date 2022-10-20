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
// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
// const client = require('twilio')(accountSid, authToken);
// const http = require('http');
const PORT = process.env.PORT || 3002;

// function sendTextMessage() {
//   client.messages
//     .create({body: 'Hi there', from: '+12059906539', to: '+420607045690'})
//     .then(message => console.log(message.sid))
//     .catch(error => console.log(error));
// }

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.use(logger);


//uber routes
app.get('/', (req, res, next) => {
  res.status(200).send('RATS make the world a better place.  And so it is written.');
});

app.get('/health', (req, res, next) => {
  res.status(200).send('RATS make the world a better place.  And so it is written.');
});

// twilio route
// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   twiml.message('Gizmo is the King of the Kitties');
//   res.writeHead(200, {'Content-type': 'test/xml'});
//   res.end(twiml.toString());
// });

// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });


//trip routes
app.use(usersRouter);
app.use(tripsRouter);


app.use('*', notFound);
app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log('Listening on port', PORT));
  // sendTextMessage();
}

module.exports = { app, start };
