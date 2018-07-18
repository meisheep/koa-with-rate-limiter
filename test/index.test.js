const server = require('../index');
const request = require('supertest');

const RPM = 60;

const now = Date.now();
Date.now = () => now;

afterEach(() => {
  server.close();
});

describe('routes: index', () => {
  test('should respond request times under 60 requests', async () => {
    for (let i = 0; i < RPM; i++) {
      const response = await request(server).get('/');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(i + 1);
    }
  });

  test('should respond Error over 60 requests', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Error');
  });

  test('should respond normally when we reach the next minute', async () => {
    Date.now = () => Math.floor(now / 60000 + 1) * 60000;
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
  });
});
