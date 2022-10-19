const inquirer = require('inquirer');
const superagent = require('superagent');
require('dotenv').config();



console.log('Create User');

const API = process.env.API_URL_TRIP || 'http://localhost:3001/trips';

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Please enter your name',
  },
  {
    type: 'input',
    name: 'trip',
    message: 'Please enter the name of the trail you are taking today',
  },
  {
    type: 'number',
    name: 'startingLat',
    message: 'Please enter the latitude of where your hike will begin',
  },
  {
    type: 'number',
    name: 'startingLon',
    message: 'Please enter the longitude of where your hike will begin',
  },
  {
    type: 'number',
    name: 'startTimeTrip',
    message: 'Please enter the estimated start time of your hike',
  },
  {
    type: 'number',
    name: 'estEndTimeTrip',
    message: 'Please enter the estimated ending time of your hike',
  },
];

inquirer.prompt(questions).then((answer) => {
  (async () => {
    let postRoute = API;
    try {
      const res = await superagent.post(postRoute)
        .send({
          name: answer.name,
          trip: answer.trip,
          startingLat: answer.startingLat,
          startingLon: answer.startingLon,
          startTimeTrip: answer.startTimeTrip,
          estEndTimeTrip: answer.estEndTimeTrip,
        });
      if (res.status === 201) {
        return console.log(` ${res.status} -- successfully created a trip called ${answer.trip} for ${answer.name}`);
      } else {
        console.log(res.status);
      }
    } catch (err) {
      console.error(err);
    }
  })();
});



