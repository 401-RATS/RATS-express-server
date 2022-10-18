const inquirer = require('inquirer');
const superagent = require('superagent');



console.log('Create User');

const API = 'http://localhost:3002/users';
const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Please enter a username',
  },
  {
    type: 'number',
    name: 'cellNumber',
    message: 'Please enter your primary phone number',
  },
  {
    type: 'input',
    name: 'emergencyContactName',
    message: 'Please enter an emergency contact name',
  },
  {
    type: 'number',
    name: 'emergencyContactNumber',
    message: 'Please enter an emergency contact number',
  },
  {
    type: 'input',
    name: 'bloodType',
    message: 'Please enter your blood type',
  },
  {
    type: 'input',
    name: 'allergies',
    message: 'Please enter any allergies',
  },
  {
    type: 'input',
    name: 'preExistingConditions',
    message: 'Please enter any preexisting conditions',
  },
  {
    type: 'input',
    name: 'insuranceInformation',
    message: 'Please list your primary insurance provider',
  },

];

inquirer.prompt(questions).then((answer) => {
  (async () => {
    let postRoute = `${API}`;
    try {
      const res = await superagent.post(postRoute)
        .send({
          name: answer.name,
          cellNumber: answer.cellNumber,
          emergencyContactName: answer.emergencyContactName,
          emergencyContactNumber: answer.emergencyContactNumber,
          bloodType: answer.bloodType,
          allergies: answer.allergies,
          preExistingConditions: answer.preExistingConditions,
          insuranceInformation: answer.insuranceInformation,
        });
      if (res.status === 201) {
        return console.log(` ${res.status} successfully created ${answer.username} with the role of ${answer.role}`);
      } else {
        console.log(res.status);
      }
    } catch (err) {
      console.error(err);
    }
  })();
});
