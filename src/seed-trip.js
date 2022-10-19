'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Trip = require('./models/trip.js');

async function seed() {
  await Trip.create({
    name: 'Gizmo Macka',
    trip: 'Sentinel Dome Trail',
    startingLat: 37.8651,
    startingLon: 119.5383,
    startTimeTrip: 12,
    estEndTimeTrip: 22,
  });
  console.log('Sentinel Dome Trail for Gizmo Macka was added');

  await Trip.create({
    name: 'Markus Carcass',
    trip: 'Panorama Trail',
    startingLat: 37.8651,
    startingLon: 119.5383,
    startTimeTrip: 10,
    estEndTimeTrip: 18,
  });
  console.log('Panorama Trail for Markus Carcass was added');

  await Trip.create({
    name: 'Ibby Bibby',
    trip: 'Glacier Point Trail',
    startingLat: 37.8651,
    startingLon: 119.5383,
    startTimeTrip: 8,
    estEndTimeTrip: 14,
  });
  console.log('Glacier Point Trail for Ibby Bibby was added');

  //connect and disconnect straight away
  mongoose.disconnect();

}

seed();
