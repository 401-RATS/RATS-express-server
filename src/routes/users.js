'use strict';

const express = require('express');
const User = require('../models/user.js');
const router = express.Router();

router.get('/users', async (req, res, next) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.get('/users/:id', async (req, res, next) => {
  let { id } = req.params;
  const userFromDb = await User.findById(id);
  res.status(200).send(userFromDb);
});

router.post('/users', async (req, res, send) => {
  console.log('req body', req.body);
  const newUser = await User.create(req.body);
  res.status(200).send(newUser);
});

router.put('/users/:id', async (req, res, next) => {
  let { id } = req.params;

  await User.findByIdAndUpdate(id, req.body, {
    new: true, overwrite: true,
  });

  let user = await User.findById(id);
  res.status(200).send(user);
});

router.delete('/users/:id', async (req, res, next) => {
  let { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).send('User has been removed');
});



module.exports = router;
