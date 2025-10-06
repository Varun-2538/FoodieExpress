import http from 'k6/http';
import { check, sleep } from 'k6';

// Stress test - pushes the system to its limits
export const options = {
  stages: [
    { duration: '1m', target: 50 },   // Ramp up to 50 users
    { duration: '2m', target: 50 },   // Stay at 50 users
    { duration: '1m', target: 100 },  // Ramp up to 100 users
    { duration: '2m', target: 100 },  // Stay at 100 users
    { duration: '1m', target: 200 },  // Spike to 200 users
    { duration: '2m', target: 200 },  // Stay at 200 users
    { duration: '1m', target: 0 },    // Ramp down
  ],

  thresholds: {
    http_req_failed: ['rate<0.05'],     // Allow up to 5% errors under stress
    http_req_duration: ['p(95)<2000'],  // 95% under 2s
    http_req_duration: ['p(99)<5000'],  // 99% under 5s
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

export default function () {
  // Mix of different endpoints
  const endpoints = [
    `${BASE_URL}/api/health`,
    `${BASE_URL}/api/restaurants`,
    `${BASE_URL}/api/menu-items`,
  ];

  // Random endpoint selection
  const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  const response = http.get(randomEndpoint);

  check(response, {
    'status is 2xx': (r) => r.status >= 200 && r.status < 300,
  });

  sleep(Math.random() * 2); // Random sleep between 0-2 seconds
}
