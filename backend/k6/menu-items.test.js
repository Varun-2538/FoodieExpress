import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 15 },
    { duration: '2m', target: 15 },
    { duration: '30s', target: 40 },
    { duration: '1m', target: 40 },
    { duration: '30s', target: 0 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

export default function () {
  // Test: Get menu items
  const menuItemsResponse = http.get(`${BASE_URL}/api/menu-items`);

  check(menuItemsResponse, {
    'get menu items - status is 200': (r) => r.status === 200,
    'get menu items - response is valid': (r) => {
      try {
        const body = r.json();
        return body !== undefined;
      } catch (e) {
        return false;
      }
    },
  });

  sleep(1);

  // Test: Get menu items by restaurant (if supported)
  const restaurantId = 1;
  const restaurantMenuResponse = http.get(
    `${BASE_URL}/api/menu-items?restaurantId=${restaurantId}`
  );

  check(restaurantMenuResponse, {
    'get restaurant menu - status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
