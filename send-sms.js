'use strict';

require('dotenv').config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendTextMessage() {
  client.messages
    .create({body: 'Hi there', from: '+12059906539', to: '+420607045690'})
    .then(message => console.log(message.sid))
    .catch(error => console.log(error));
}




sendTextMessage();