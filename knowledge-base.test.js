const request = require('supertest');
const fs = require('fs');
const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');

describe('Knowledge Base API', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    // Mock auth middleware to always pass
    app.use((req, res, next) => next());
    app.use('/api', apiRouter);
  });

  test('Knowledge base JSON loads and validates', () => {
    const kbPath = path.join(__dirname, 'data', 'hvac-knowledge-base.json');
    const kbRaw = fs.readFileSync(kbPath, 'utf-8');
    expect(() => JSON.parse(kbRaw)).not.toThrow();
    const kb = JSON.parse(kbRaw);
    expect(kb).toHaveProperty('safety-protocols');
    expect(kb).toHaveProperty('troubleshooting');
  });

  test('GET /api/knowledge returns categories', async () => {
    const res = await request(app).get('/api/knowledge');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('categories');
    expect(Array.isArray(res.body.categories)).toBe(true);
  });

  test('GET /api/troubleshooting-flows returns flows', async () => {
    const res = await request(app).get('/api/troubleshooting-flows');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('flows');
    expect(Array.isArray(res.body.flows)).toBe(true);
  });

  test('GET /api/search?q=heat returns results', async () => {
    const res = await request(app).get('/api/search?q=heat');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('results');
    expect(Array.isArray(res.body.results)).toBe(true);
  });
});
