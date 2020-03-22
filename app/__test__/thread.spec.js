const superset = require('supertest');
const app = require('../../server');

const db = require("../models");

describe("Tests for /threads endpoint", () => {
  let token = null;
  let invalidToken = null;
  let threadId = null;
  beforeAll(async () => {
    // token for all valid thread creator
    const response = await superset(app).post('/login').send({
      email: 'anishghimire862@gmail.com',
      password: 'anish'
    });
    // token for all invalid thread creator
    const invalidResponse = await superset(app).post('/login').send({
      email: 'anishghimire@gmail.com',
      password: 'anish'
    });
    token = response.body.token;
    invalidToken = invalidResponse.body.token;
  });

  it("tests the post request for thread creation", async () => {
    const response = await superset(app)
      .post('/threads')
      .set('Authorization', 'Bearer '+ token)
      .send({
        title: 'test title',
        description: 'test description',
        category: 'test category'
      });
    
    threadId = response.body.id;
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('test title');
    expect(response.body.description).toBe('test description');
    expect(response.body.category).toBe('test category');
  });

  it("tests the post request for thread creation by unauthorized user i.e invalid token", async () => {
    const response = await superset(app)
      .post('/threads')
      .set('Authorization', 'Bearer invalidtoken')
      .send({
        title: 'test title',
        description: 'test description',
        category: 'test category'
      });
    expect(response.status).toBe(401);
  });

  it("tests the get request for thread to find all threads", async () => {
    const response = await superset(app)
      .get('/threads')

      expect(response.status).toBe(200);
  });

  it("tests the get request for thread to find a thread given thread id", async () => {
    const response = await superset(app)
      .get('/threads/'+ threadId)

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('test title');
    expect(response.body.description).toBe('test description');
    expect(response.body.category).toBe('test category');
  });

  it("tests the patch request to update a thread by valid thread creator", async () => {
    const response = await superset(app)
      .patch('/threads/'+ threadId)
      .set('Authorization', 'Bearer '+ token)
      .send({
        title: 'updated title',
        description: 'updated description',
        category: 'updated category'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Thread was updated successfully.');
  });

  it("tests the patch request to update a thread by invalid thread creator", async () => {

    const response = await superset(app)
      .patch('/threads/'+ threadId)
      .set('Authorization', 'Bearer '+ invalidToken)
      .send({
        title: 'updated title',
        description: 'updated description',
        category: 'updated category'
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden!!');
  });

  it("tests the patch request to update a thread with invalid token", async () => {

    const response = await superset(app)
      .patch('/threads/'+ threadId)
      .set('Authorization', 'Bearer invalidToken')
      .send({
        title: 'updated title',
        description: 'updated description',
        category: 'updated category'
      });

    expect(response.status).toBe(401);
  });

  it("tests the delete request by a invalid user", async () => {
    const response = await superset(app)
      .delete('/threads/'+ threadId)
      .set('Authorization', 'Bearer invalidbearertoken')

    expect(response.status).toBe(401);
  });

  it("tests the delete request by a invalid thread creator", async () => {
    const response = await superset(app)
      .delete('/threads/'+ threadId)
      .set('Authorization', 'Bearer '+ invalidToken)

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden!!');
  });

  it("tests the delete request by a valid thread creator", async () => {
    const response = await superset(app)
      .delete('/threads/'+ threadId)
      .set('Authorization', 'Bearer '+ token)

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Thread was deleted successfully!');
  });
});