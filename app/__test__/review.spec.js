const superset = require('supertest');
const app = require('../../server');

const db = require("../models");

describe("Tests for /reviews endpoint", () => {
  let token = null;
  let invalidToken = null;
  let threadId = null;
  let reviewId = null;
  beforeAll(async () => {

    // token for all valid thread creator

    const response = await superset(app).post('/api/auth/login').send({
      email: 'anishghimire862@gmail.com',
      password: 'anish'
    });

    // token for all invalid thread creator

    const invalidResponse = await superset(app).post('/api/auth/login').send({
      email: 'anishghimire@gmail.com',
      password: 'anish'
    });

    token = response.body.token;
    invalidToken = invalidResponse.body.token;

    // create thread to make further review requests

    const thread = await superset(app)
    .post('/threads')
    .set('Authorization', 'Bearer '+ token)
    .send({
      title: 'test title',
      description: 'test description',
      category: 'test category'
    });
  
    threadId = thread.body.id;
  });

  it("tests the post request for review creation", async () => {
    const response = await superset(app)
      .post('/reviews')
      .set('Authorization', 'Bearer '+ token)
      .send({
        description: 'test description',
        threadId: threadId
      });
    
    reviewId = response.body.id;

    expect(response.status).toBe(200);
    expect(response.body.description).toBe('test description');
    expect(response.body.threadId).toBe(threadId);
  });

  it("tests the post request for review creation by unauthorized user i.e invalid token ", async () => {
    const response = await superset(app)
      .post('/reviews')
      .set('Authorization', 'Bearer token')
      .send({
        description: 'test description',
        threadId: threadId
      });
    
    expect(response.status).toBe(401);
  });

  it("tests the get request to find all reviews of a thread", async () => {
    const response = await superset(app)
      .get('/reviews/'+ threadId)

      expect(response.status).toBe(200);
  });

  it("tests the patch request to update a review by valid review creator", async () => {
    const response = await superset(app)
      .patch('/reviews/'+ reviewId)
      .set('Authorization', 'Bearer '+ token)
      .send({
        description: 'updated description',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review was updated successfully.');
  });

  it("tests the patch request to update a review by invalid review creator", async () => {

    const response = await superset(app)
      .patch('/reviews/'+ reviewId)
      .set('Authorization', 'Bearer '+ invalidToken)
      .send({
        description: 'updated description',
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden!!');
  });

  it("tests the patch request to update a review with invalid token", async () => {

    const response = await superset(app)
      .patch('/reviews/'+ reviewId)
      .set('Authorization', 'Bearer invalidToken')
      .send({
        description: 'updated description',
      });

    expect(response.status).toBe(401);
  });

  it("tests the delete request by a invalid user", async () => {
    const response = await superset(app)
      .delete('/reviews/'+ reviewId)
      .set('Authorization', 'Bearer invalidbearertoken')

    expect(response.status).toBe(401);
  });

  it("tests the delete request by a invalid thread creator", async () => {
    const response = await superset(app)
      .delete('/reviews/'+ reviewId)
      .set('Authorization', 'Bearer '+ invalidToken)

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden!!');
  });

  it("tests the delete request by a valid review creator", async () => {
    const response = await superset(app)
      .delete('/reviews/'+ reviewId)
      .set('Authorization', 'Bearer '+ token)

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review was deleted successfully!');
  });

})