'use strict';

const express = require('express');
const Trip = require('../models/trip.js');
const router = express.Router();

router.get('/trips', async (req, res, next) => {
  const trips = await Trip.find();
  res.status(200).send(trips);
});

router.get('/trips/:id', async (req, res, next) => {
  let { id } = req.params;
  const userFromDb = await Trip.findById(id);
  res.status(200).send(userFromDb);
});

router.post('/trips', async (req, res, send) => {
  console.log('req body', req.body);
  const newTrip = await Trip.create(req.body);
  res.status(200).send(newTrip);
});

router.put('/trips/:id', async (req, res, next) => {
  let { id } = req.params;

  await Trip.findByIdAndUpdate(id, req.body, {
    new: true, overwrite: true,
  });

  let user = await Trip.findById(id);
  res.status(200).send(user);
});

router.delete('/trips/:id', async (req, res, next) => {
  let { id } = req.params;
  await Trip.findByIdAndDelete(id);
  res.status(200).send('Trip has been removed');
});



module.exports = router;