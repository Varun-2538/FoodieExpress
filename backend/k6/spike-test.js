import http from 'k6/http';
import { check, sleep } from 'k6';

// Spike test - sudden surge of traffic
export const options = {
  stages: [
    { duration: '10s', target: 10 },   // Start with 10 users
    { duration: '30s', target: 10 },   // Stay at 10 users
    { duration: '10s', target: 200 },  // SPIKE to 200 users
    { duration: '1m', target: 200 },   // Stay at 200 users
    { duration: '10s', target: 10 },   // Drop back to 10 users
    { duration: '30s', target: 10 },   // Recover
    { duration: '10s', target: 0 },    // Ramp down
  ],

  thresholds: {
    http_req_failed: ['rate<0.1'],      // Allow 10% errors during spike
    http_req_duration: ['p(95)<3000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

export default function () {
  const response = http.get(`${BASE_URL}/api/health`);

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(0.5);
}
