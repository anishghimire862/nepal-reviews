const superset = require('supertest');
const app = require('../../server');

const db = require("../models");
const User = db.users;

describe("Tests for /user endpoint", () => {

  it("tests our testing framework if it works", () => {
    expect(2).toBe(2);
  });

  it("tests the post request for user registration for valid email address", async () => {
    const response = await superset(app).post('/user').send({
      email: 'admin@nepalreviews.com',
      password: 'nepalreviews'
    });
  
    expect(response.status).toBe(200);
    expect(response.body.email).toBe('admin@nepalreviews.com');
  });

  it("tests the post request for user registration for already used email address", async () => {
    const response = await superset(app).post('/user').send({
      email: 'admin@nepalreviews.com',
      password: 'nepalreviews'
    });
  
    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Email already exists');
  });

  it("tests the post request for user login with valid login details", async () => {
    const response = await superset(app).post('/login').send({
      email: 'admin@nepalreviews.com',
      password: 'nepalreviews'
    });
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged in successfully.');
  });

  it("tests the post request for user login with invalid login details", async () => {
    const response = await superset(app).post('/login').send({
      email: 'admin@nepalreview.com',
      password: 'nepalreviews'
    });
  
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Incorrect email or password.');
  });

  afterAll(async () => {
    await User.destroy({
      where: { email: 'admin@nepalreviews.com' }
    });
    await app.close()
  });
});