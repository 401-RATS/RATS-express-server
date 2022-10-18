'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const User = require('./models/user.js');
const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


//routes
app.get('/', (req, res, next) => {
  res.status(200).send('RATS make the world a better place.  And so it is written.');
});

app.get('/users', handleGetUsers);
app.get('/users/:id', handleGetUser);
app.post('/users', handlePostUsers);
app.delete('/users/:id', deleteUsers);
app.put('/users/:id', putUsers);

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

async function handlePostUsers(req, res) {
  try {
    console.log('req', req);
    console.log('req.body', req.body);
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send('server error', e);
  }
}

async function deleteUsers(request, response, next) {
  const id = request.params.id;
  console.log(id);
  try {
    await User.findByIdAndDelete(id);
    response.status(204).send('User Deleted');
  }catch (error) {
    next(error);
  }
}

async function putUsers(request, response, next) {
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
}

module.exports = { app, start };
