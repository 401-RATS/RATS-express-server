'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.DB_URL);

const userSchema = new Schema({
  name: {type: String, required: true},
  cellNumber: {type: Number, required: true },
  emergencyContactName: {type: String, required: false},
  emergencyContactNumber: {type: Number, required: true },
  bloodType: {type: String, required: false},
  allergies: {type: String, required: true},
  preExistingConditions:{type: String, required: false},
  insuranceInformation:  {type: String, required: false},
});
// Schema defines the shape of the data

const User = mongoose.model('User', userSchema);
// model is a function that creates a new 'model' with a title that has certain methods available to it

module.exports = User;




