'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const User = require('./models/user.js');
const Trip = require('./models/trip.js');
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


app.get('/trips', handleGetTrips);
app.get('/trips/:id', handleGetTrip);
// app.get('/trips/name', handleGetTripByName);
app.post('/trips', handlePostTrip);
app.delete('/trips/:id', deleteTrip);
app.put('/trips/:id', putTrip);


async function handleGetTrips(request, response, next) {
  try {
    let results = await Trip.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function handleGetTrip(request, response, next) {
  const id = request.params.id;
  try {
    const userFromDb = await Trip.findById(id);
    response.status(200).send(userFromDb);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
}

// await Adventure.findOne({ country: 'Croatia' }).exec();
// const favsFromDb = await Fav.find({ email: req.query.email });

// async function handleGetTripByName(request, response, next) {
//   const { name } = request.query.name;
//   try {
//     const userFromDb = await Trip.find(name);
//     response.status(200).send(userFromDb);
//   } catch (error) {
//     console.error(error);
//     response.status(500).send('server error', error);
//   }
// }

async function handlePostTrip(req, res) {
  try {
    // console.log('req', req);
    // console.log('req.body', req.body);
    const newUser = await Trip.create(req.body);
    res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send('server error', e);
  }
}

async function deleteTrip(request, response, next) {
  const id = request.params.id;
  // console.log(id);
  try {
    await Trip.findByIdAndDelete(id);
    response.status(204).send('User Deleted');
  }catch (error) {
    next(error);
  }
}

async function putTrip(request, response, next) {
  let id = request.params.id;
  try {
    let data = request.body;
    const updateUsers = await Trip.findByIdAndUpdate(id, data, {
      new: true, overwrite: true,
    });
    response.status(201).send(updateUsers);
  } catch (error) {
    next(error);
  }
}


//user routes


app.get('/users', handleGetUsers);
app.get('/users/:id', handleGetUser);
app.post('/users', handlePostUser);
app.delete('/users/:id', deleteUser);
app.put('/users/:id', putUser);

async function handleGetUsers(request, response, next) {
  try {
    let results = await User.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function handleGetUser(request, response, next) {
  const id = request.params.id;
  try {
    const userFromDb = await User.findById(id);
    response.status(200).send(userFromDb);
  } catch (error) {
    console.error(error);
    response.status(500).send('server error', error);
  }
}

async function handlePostUser(req, res) {
  try {
    // console.log('req', req);
    // console.log('req.body', req.body);
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send('server error', e);
  }
}

async function deleteUser(request, response, next) {
  const id = request.params.id;
  // console.log(id);
  try {
    await User.findByIdAndDelete(id);
    response.status(204).send('User Deleted');
  }catch (error) {
    next(error);
  }
}

async function putUser(request, response, next) {
  let id = request.params.id;
  try {
    let data = request.body;
    const updateUsers = await User.findByIdAndUpdate(id, data, {
      new: true, overwrite: true,
    });
    response.status(201).send(updateUsers);
  } catch (error) {
    next(error);
  }
}

// app.use('*', notFound);
// app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log('Listening on port', PORT));
  // sendTextMessage();
}

module.exports = { app, start };
