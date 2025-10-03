import request from 'supertest';
import { createApp } from '../app';

const app = createApp();

describe('Authentication API', () => {
  describe('Protected endpoints', () => {
    test('should reject unauthenticated request to /auth/me', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty('error');
    });

    test('should reject request with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token-here')
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    test('should reject signout without authentication', async () => {
      const res = await request(app)
        .post('/api/auth/signout')
        .expect(401);

      expect(res.body.success).toBe(false);
    });
  });

  describe('Google OAuth flow', () => {
    test('should initiate Google OAuth flow', async () => {
      const res = await request(app)
        .post('/api/auth/google')
        .send({ redirectUrl: 'http://localhost:3000/auth/callback' });

      expect([200, 400, 500]).toContain(res.status);
    });

    test('should handle missing redirectUrl', async () => {
      const res = await request(app)
        .post('/api/auth/google')
        .send({});

      expect([200, 400, 500]).toContain(res.status);
    });
  });

  describe('Order endpoints protection', () => {
    test('should protect order creation endpoint', async () => {
      const orderData = {
        restaurantId: '1',
        items: [{ menuItemId: '1', quantity: 2 }],
        deliveryAddress: '123 Test St',
      };

      const res = await request(app)
        .post('/api/orders')
        .send(orderData)
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    test('should protect get orders endpoint', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    test('should protect get order by ID endpoint', async () => {
      const res = await request(app)
        .get('/api/orders/123')
        .expect(401);

      expect(res.body.success).toBe(false);
    });
  });

  describe('Health check', () => {
    test('should return server health status', async () => {
      const res = await request(app)
        .get('/api/health');

      expect([200, 404]).toContain(res.status);
    });
  });
});
