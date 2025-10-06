import http from 'k6/http';
import { check, sleep } from 'k6';

// Test configuration
export const options = {
  // Stages define the load pattern
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users over 30s
    { duration: '1m', target: 10 },   // Stay at 10 users for 1 minute
    { duration: '30s', target: 50 },  // Ramp up to 50 users over 30s
    { duration: '1m', target: 50 },   // Stay at 50 users for 1 minute
    { duration: '30s', target: 0 },   // Ramp down to 0 users
  ],

  // Thresholds define success criteria
  thresholds: {
    http_req_failed: ['rate<0.01'],     // http errors should be less than 1%
    http_req_duration: ['p(95)<500'],   // 95% of requests should be below 500ms
    http_req_duration: ['p(99)<1000'],  // 99% of requests should be below 1000ms
  },
};

// The base URL - change this to your EC2 IP when testing production
const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

export default function () {
  // Test health check endpoint
  const response = http.get(`${BASE_URL}/api/health`);

  // Verify response
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response has success': (r) => r.json('success') === true,
    'response has message': (r) => r.json('message') !== undefined,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Simulate user think time
  sleep(1);
}
