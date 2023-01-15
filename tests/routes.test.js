const request = require('supertest');
const server = require('../index');

describe('Post Endpoints', () => {
  it('should get all users', async () => {
    const res = await request(server.default).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it('should create a new user', async () => {
    const res = await request(server.default)
      .post('/api/user')
      .send({
        username: 'test',
        age: 12,
        hobbies: ['none'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username', 'test');
  });

  it('should fetch a single user', async () => {
    const userId = '91ba49b1-a59c-43a7-ba4a-2666dc333757';
    const res = await request(server.default).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'user test');
  });

  it('should update a user', async () => {
    const userId = '91ba49b1-a59c-43a7-ba4a-2666dc333757';
    const res = await request(server.default).put(`/api/posts/${userId}`).send({
      age: 44,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('age', 44);
  });

  it('should delete a user', async () => {
    const userId = '91ba49b1-a59c-43a7-ba4a-2666dc333757';
    const res = await request(server.default).delete(`/api/posts/${userId}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should respond with status code 404 if user is not found', async () => {
    const userId = '91ba49b1-a59c-43a7-ba4a-2666dc333757';
    const res = await request(server.default).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(404);
  });
});

/* {
    "id": "91ba49b1-a59c-43a7-ba4a-2666dc333757",
    "username": "user test",
    "age": 44,
    "hobbies": ["work"]
  },*/
