'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.DB_URL);

const tripSchema = new Schema({
  name: {type: String, required: true},
  trip: {type: String, required: true },
  startingLat: {type: Number, required: true},
  startingLon: {type: Number, required: true },
  startTimeTrip: {type: Number, required: true},
  estEndTimeTrip: {type: Number, required: true},
});


const Trip = mongoose.model('Trip', tripSchema);


module.exports = Trip;
