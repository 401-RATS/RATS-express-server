'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const User = require('./models/user.js');

async function seed() {
  await User.create({
    name: 'Gizmo Macka',
    cellNumber: 4122263616,
    emergencyContactName: 'Momma',
    emergencyContactNumber: 7242241775,
    bloodType: 'O-',
    allergies: 'none',
    preExistingConditions: 'none',
    insuranceInformation: 'Acme Insurance',
  });
  console.log('Gizmo Macka was added');

  await User.create({
    name: 'Markus Carcass',
    cellNumber: 4048867329,
    emergencyContactName: 'Pappy',
    emergencyContactNumber: 5307658898,
    bloodType: 'B+',
    allergies: 'peanuts',
    preExistingConditions: 'asthma',
    insuranceInformation: 'Pioneer Insurance',
  });
  console.log('Markus Carcass was added');

  await User.create({
    name: 'Ibby Bibby',
    cellNumber: 7048983369,
    emergencyContactName: 'Pappy',
    emergencyContactNumber: 2123937003,
    bloodType: 'A-',
    allergies: 'milk',
    preExistingConditions: 'diabetes',
    insuranceInformation: 'N/A',
  });
  console.log('Ibby Bibby was added');

  //connect and disconnect straight away
  mongoose.disconnect();

}

seed();
