import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up to 20 users
    { duration: '2m', target: 20 },   // Stay at 20 users for 2 minutes
    { duration: '30s', target: 50 },  // Spike to 50 users
    { duration: '1m', target: 50 },   // Stay at 50 users
    { duration: '30s', target: 0 },   // Ramp down
  ],

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
    http_req_duration: ['p(99)<2000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

export default function () {
  // Test 1: Get all restaurants
  const restaurantsResponse = http.get(`${BASE_URL}/api/restaurants`);

  check(restaurantsResponse, {
    'get restaurants - status is 200': (r) => r.status === 200,
    'get restaurants - has data': (r) => {
      try {
        return r.json('data') !== undefined;
      } catch (e) {
        return false;
      }
    },
  });

  sleep(1);

  // Test 2: Get restaurant by ID (assuming ID 1 exists)
  const restaurantId = 1;
  const singleRestaurantResponse = http.get(`${BASE_URL}/api/restaurants/${restaurantId}`);

  check(singleRestaurantResponse, {
    'get single restaurant - status is 200 or 404': (r) =>
      r.status === 200 || r.status === 404,
  });

  sleep(1);
}
