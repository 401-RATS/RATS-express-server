const { MongoClient } = require('mongodb');
const request = require('supertest');
const { app } = require('../../src/server');


const newUser = {
  _id: '6350e512336621c5d6879d3e',
  name: 'Server Test',
  cellNumber: 4122263616,
  emergencyContactName: 'Server Test Emergency Contact',
  emergencyContactNumber: 7242241775,
  bloodType: 'A+',
  allergies: 'none',
  preExistingConditions: 'None',
  insuranceInformation: 'None',
};

const newTrip = {
  _id: '6350e512336621c5d6879d3f',
  name: 'Trip Test',
  trip: 'Swift-current Trail',
  startingLat: 48.7989725,
  startingLon: -113.6804002,
  startTimeTrip: 600,
  estEndTimeTrip: 1900,
};


describe('Basic get routes', () => {
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

  it('Global route should return 200 status', async () => {
    const response = await request(app)
      .get('/');
    expect(response.status).toBe(200);
  });
  it('Health route should return 200 status', async () => {
    const response = await request(app)
      .get('/health');
    expect(response.status).toBe(200);
  });
});

describe('Create User', () => {
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

  it('should create new user', async () => {
    const response = await request(app)
      .post('/users')
      .send( newUser );
    expect(response.status).toBe(201);
  });

  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });

  it('should get one user', async () => {
    const response = await request(app).get(`/users/${newUser._id}`);
    expect(response.status).toBe(200);
  });

  it('should update one user', async () => {
    const response = await request(app).put(`/users/${newUser._id}`).send({
      bloodType: 'A-',
    });
    expect(response.status).toBe(201);
  });

  it('should delete one user', async () => {
    const response = await request(app).delete(`/users/${newUser._id}`);
    expect(response.status).toBe(204);
  });
});

describe('Create Trip', () => {
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

  it('should create new trip', async () => {
    const response = await request(app)
      .post('/trips')
      .send( newTrip );
    expect(response.status).toBe(201);
  });

  it('should get all trips', async () => {
    const response = await request(app).get('/trips');
    expect(response.status).toBe(200);
  });

  it('should get one trip', async () => {
    const response = await request(app).get(`/trips/${newTrip._id}`);
    expect(response.status).toBe(200);
  });

  it('should update one trip', async () => {
    const response = await request(app).put(`/trips/${newTrip._id}`).send({
      startTimeTrip: '800',
    });
    expect(response.status).toBe(201);
  });

  it('should delete one trip', async () => {
    const response = await request(app).delete(`/trips/${newTrip._id}`);
    expect(response.status).toBe(204);
  });
});