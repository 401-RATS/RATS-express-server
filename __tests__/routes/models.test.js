'use strict';

const {MongoClient} = require('mongodb');

const UserModel = require('../../src/models/user');
const TripModel = require('../../src/models/trip');

const mockUser = {
  name: 'Gizmo Macka',
  cellNumber: 4122263616,
  emergencyContactName: 'Momma',
  emergencyContactNumber: 7242241775,
  bloodType: 'O-',
  allergies: 'none',
  preExistingConditions: 'none',
  insuranceInformation: 'Acme Insurance',
};
const mockTrip = {
  name: 'Gizmo Macka',
  trip: 'Swiftcurrent Trail',
  startingLat: 48.7989725,
  startingLon: -113.6804002,
  startTimeTrip: 600,
  estEndTimeTrip: 1900,
};

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert new user into collection', async () => {
    const users = db.collection('users');
    const validUser = new UserModel(mockUser);

    await users.insertOne(mockUser);

    expect(validUser._id).toBeDefined();
    expect(validUser.name).toBe(mockUser.name);
    expect(validUser.cellNumber).toBe(mockUser.cellNumber);
    expect(validUser.emergencyContactName).toBe(mockUser.emergencyContactName);
    expect(validUser.emergencyContactNumber).toBe(mockUser.emergencyContactNumber);
    expect(validUser.bloodType).toBe(mockUser.bloodType);
    expect(validUser.allergies).toBe(mockUser.allergies);
    expect(validUser.preExistingConditions).toBe(mockUser.preExistingConditions);
    expect(validUser.insuranceInformation).toBe(mockUser.insuranceInformation);
  });

  it('should insert new trip into collection', async () => {
    const trips = db.collection('trips');
    const validTrip = new TripModel(mockTrip);

    await trips.insertOne(mockTrip);

    expect(validTrip._id).toBeDefined();
    expect(validTrip.name).toBe(mockTrip.name);
    expect(validTrip.trip).toBe(mockTrip.trip);
    expect(validTrip.startingLat).toBe(mockTrip.startingLat);
    expect(validTrip.startingLon).toBe(mockTrip.startingLon);
    expect(validTrip.startTimeTrip).toBe(mockTrip.startTimeTrip);
  });
});
