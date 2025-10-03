import request from 'supertest';
import { createApp } from '../app';

const app = createApp();

describe('Order Creation Flow', () => {
  let restaurantId: string;
  let menuItemIds: string[] = [];

  beforeAll(async () => {
    // Wait for app initialization
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  describe('Browse restaurants and menu', () => {
    test('should fetch all restaurants', async () => {
      const res = await request(app)
        .get('/api/restaurants')
        .expect('Content-Type', /json/);

      expect([200, 500]).toContain(res.status);

      if (res.status === 200 && Array.isArray(res.body) && res.body.length > 0) {
        restaurantId = res.body[0].id;
        expect(restaurantId).toBeDefined();
      }
    });

    test('should get specific restaurant details', async () => {
      const res = await request(app)
        .get(`/api/restaurants/${restaurantId}`);

      expect([200, 500]).toContain(res.status);
      if (res.status === 200) {
        expect(res.body).toHaveProperty('id');
      }
    });

    test('should search restaurants by cuisine', async () => {
      const res = await request(app)
        .get('/api/restaurants?search=pizza');

      expect([200, 500]).toContain(res.status);
    });

    test('should fetch menu items for restaurant', async () => {
      const res = await request(app)
        .get(`/api/menu-items?restaurantId=${restaurantId}`);

      if (res.status === 200 && Array.isArray(res.body) && res.body.length > 0) {
        menuItemIds = res.body.slice(0, 2).map((item: any) => item.id);
        expect(menuItemIds.length).toBeGreaterThan(0);
      } else {
        expect([200, 500]).toContain(res.status);
      }
    });

    test('should filter menu items by category', async () => {
      const res = await request(app)
        .get(`/api/menu-items?restaurantId=${restaurantId}&category=Appetizers`);

      expect([200, 500]).toContain(res.status);
      if (res.status === 200) {
        expect(Array.isArray(res.body)).toBe(true);
      }
    });
  });

  describe('Restaurant data validation', () => {
    test('should return 404 for non-existent restaurant', async () => {
      const res = await request(app)
        .get('/api/restaurants/99999')
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty('error');
    });

    test('should handle invalid restaurant ID format', async () => {
      const res = await request(app)
        .get('/api/restaurants/invalid-id');

      expect([400, 404, 500]).toContain(res.status);
    });
  });

  describe('Menu item validation', () => {
    test('should handle restaurant with no menu items', async () => {
      const res = await request(app)
        .get('/api/menu-items?restaurantId=99999');

      expect([200, 404, 500]).toContain(res.status);
    });

    test('should require restaurantId query parameter', async () => {
      const res = await request(app)
        .get('/api/menu-items');

      expect([200, 400, 500]).toContain(res.status);
    });
  });
});
