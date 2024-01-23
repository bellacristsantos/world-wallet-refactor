import { MongoMemoryServer } from 'mongodb-memory-server-global';
import mongoose from 'mongoose';
import request from 'supertest';
import nock from 'nock';
import  { app }  from '../appModules';
import  { server }  from '../index';
import { create } from '../controllers/user';
import { RequestWithSession } from '../types/types';
import  UserModel, { UserDocument } from '../models/user';
import { jest } from '@jest/globals'
import session from 'express-session';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  if (!mongoose.connection.readyState){
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
  }
});

beforeEach(async () => {
  await mongoose.disconnect();
  jest.setTimeout(30000);
});

afterEach(() => {
  jest.useRealTimers();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('UsersController - create', () => {


  it('should respond with status 201 for a valid user creation', async () => {
    nock('http://localhost:8080')
    .post('/register')
    .reply(201, { message: 'User created successfully '});

    const response = await request(app)
    .post('/register')
    .send({
       email: 'test@example.com',
       password: 'password',
       firstName: 'Ana',
       lastName: 'Santos'
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'User created successfully'
    });

  });

  it('should respond with status 409 for an existing user', async () => {
    nock('http://localhost:8080')
    .post('/register')
    .reply(409, { message: 'User already exists' });

    const response = await request(app)
    .post('/register')
    .send( { email: 'existing@example.com', password: 'password' });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: 'User already exists'
    });
  });
});

describe('UsersController - login', () => {
  it('should respond with status 200 for a valid login', async () => {
    nock('http://localhost:8080')
    .post('/login')
    .reply(200, { message: 'Login successful'});

    const response = await request(app)
    .post('/login')
    .send({ email: 'test@example.com', password: 'password' })

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Login successful'
    });
  });

  it('should responde with status 401 for an invalid login', async () => {
    nock('http://localhost:8080')
    .post('/login')
    .reply(401, { message: 'Invalid login credentials' });

    const response = await request(app)
    .post('/login')
    .send({ email: 'nonexistent@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'Invalid login credentials'
    });
  })
});

describe('UsersController - profile', () => {
  it('should respond with status 200 and user data for a valid profile request', async () => {
    nock('http://localhost:8080')
    .post('/register')
    .reply(201, { message: 'User created successfully '});

    nock('http://localhost:8080')
    .post('/login')
    .reply(200, { message: 'Login successful'});

    nock('http://localhost:8080')
    .get('/profile')
    .reply(200, {
      _id: 'userId',
       firstName: 'Ana',
       lastName: 'Santos',
      });

    const registerResponse = await request(app)
    .post('/register')
    .send({
      email: 'test@example.com',
      password: 'password',
      firstName: 'Ana',
      lastName: 'Santos'
     });

    const loginResponse = await request(app)
    .post('/login')
    .send({ email: 'test@example.com', password: 'password' });

    const sessionCookie = loginResponse.header['set-cookie'];

    const response = await request(app)
    .get('/profile')
    .set('Cookie', sessionCookie);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      _id: 'userId',
      firstName: 'Ana',
      lastName: 'Santos',
    });
  });

  it('should responde with status 404 for an invalid profile request', async () => {
    nock('http://localhost:8080')
    .post('/profile')
    .reply(404, { message: 'Profile not found'});

    const response = await request(app).get('/profile');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Profile not found'
    });
  });
});

describe('UsersController - logout', () => {
  it('should respond with status 200 and "Logout successful" for a valid logout request', async () => {
    nock('http://localhost:8080')
    .post('/register')
    .reply(201, { message: 'User created successfully '});

    nock('http://localhost:8080')
    .post('/login')
    .reply(200, { message: 'Login successful'});

    nock('http://localhost:8080')
    .post('/logout')
    .reply(200, { message: 'Logout successful'});

    const registerResponse = await request(app)
    .post('/register')
    .send({
      email: 'test@example.com',
      password: 'password',
      firstName: 'Ana',
      lastName: 'Santos'
     });

    const loginResponse = await request(app)
    .post('/login')
    .send({ email: 'test@example.com', password: 'password' });

    const sessionCookie = loginResponse.header['set-cookie'];

    const logoutResponse = await request(app)
    .post('/logout')
    .set('Cookie', sessionCookie);

    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body).toEqual({
      message: 'Logout successful'
    });
  });

  it('should respond with status 500 for an invalid logout request', async () => {
    nock('http://localhost:8080')
    .post('/logout')
    .reply(500, { message: 'Could not log out, please try again'});

    const response = await request(app).post('/logout');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: expect.any(Object),
      message: 'Could not log out, please try again'
    });
  });
  afterAll(async () => {
    nock.cleanAll();
    await server.close();
  });
});