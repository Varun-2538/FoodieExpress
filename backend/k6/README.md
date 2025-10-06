# K6 Load Testing for FoodieExpress Backend

This directory contains K6 load testing scripts for the FoodieExpress backend API.

## What is K6?

K6 is a modern load testing tool that helps you test the performance and reliability of your backend by simulating multiple virtual users making requests to your API.

## Installation

### macOS (using Homebrew)
```bash
brew install k6
```

### Linux
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Windows (using Chocolatey)
```bash
choco install k6
```

Or download from: https://k6.io/docs/get-started/installation/

## Test Files

### 1. `health-check.test.js`
Basic smoke test for the health check endpoint.
- **Purpose:** Verify the API is responding
- **Duration:** ~3.5 minutes
- **Max Users:** 50

### 2. `restaurants.test.js`
Load test for restaurant endpoints.
- **Purpose:** Test restaurant listing and detail endpoints
- **Duration:** ~4.5 minutes
- **Max Users:** 50

### 3. `menu-items.test.js`
Load test for menu item endpoints.
- **Purpose:** Test menu item retrieval
- **Duration:** ~4.5 minutes
- **Max Users:** 40

### 4. `stress-test.js`
Stress test to find system limits.
- **Purpose:** Push the system to its limits
- **Duration:** ~9 minutes
- **Max Users:** 200

### 5. `spike-test.js`
Spike test for sudden traffic surges.
- **Purpose:** Test how system handles sudden traffic spikes
- **Duration:** ~3 minutes
- **Max Users:** 200 (sudden spike)

## Running Tests

### Test Against Local Backend
```bash
# Make sure your backend is running locally first
npm run dev

# In another terminal, run K6 tests
k6 run k6/health-check.test.js
```

### Test Against EC2 Production
```bash
k6 run k6/health-check.test.js -e BASE_URL=http://15.206.204.34
```

### Run All Tests
```bash
# Health check
k6 run k6/health-check.test.js -e BASE_URL=http://15.206.204.34

# Restaurants
k6 run k6/restaurants.test.js -e BASE_URL=http://15.206.204.34

# Menu items
k6 run k6/menu-items.test.js -e BASE_URL=http://15.206.204.34

# Stress test
k6 run k6/stress-test.test.js -e BASE_URL=http://15.206.204.34

# Spike test
k6 run k6/spike-test.js -e BASE_URL=http://15.206.204.34
```

### Generate HTML Report
```bash
k6 run k6/health-check.test.js --out json=results.json
```

Then use a tool like [k6-reporter](https://github.com/benc-uk/k6-reporter) to generate HTML reports.

## Understanding Results

### Key Metrics

- **http_req_duration**: Time from request sent to response received
  - `p(95)`: 95% of requests completed within this time
  - `p(99)`: 99% of requests completed within this time

- **http_req_failed**: Percentage of failed requests
  - Should be < 1% for production

- **http_reqs**: Total number of HTTP requests
  - Shows throughput (requests per second)

- **vus (Virtual Users)**: Number of concurrent users
  - Shows current load on the system

### Example Output
```
     ✓ status is 200
     ✓ response has success
     ✓ response time < 500ms

     checks.........................: 100.00% ✓ 4500      ✗ 0
     data_received..................: 1.2 MB  40 kB/s
     data_sent......................: 360 kB  12 kB/s
     http_req_blocked...............: avg=1.2ms    min=1µs      med=3µs
     http_req_duration..............: avg=45ms     min=20ms     med=40ms     p(95)=85ms   p(99)=120ms
     http_reqs......................: 1500    50/s
     vus............................: 50      min=0       max=50
```

## Thresholds

Each test has defined thresholds for success:

- **http_req_failed < 1%**: Less than 1% of requests should fail
- **http_req_duration p(95) < 500ms**: 95% of requests under 500ms
- **http_req_duration p(99) < 1000ms**: 99% of requests under 1s

If these thresholds are not met, K6 will exit with a non-zero code.

## Best Practices

1. **Start Small**: Begin with health check tests before running stress tests
2. **Monitor Your Server**: Watch CPU, memory, and network while tests run
3. **Test Production-like Environment**: Use EC2 instance for realistic results
4. **Don't Test in Production**: Use staging or dedicated test environment
5. **Gradual Ramp-up**: Tests gradually increase load to identify breaking points
6. **Analyze Results**: Look for patterns in failures and slow responses

## Troubleshooting

### Connection Refused
- Ensure backend is running
- Check BASE_URL is correct
- Verify firewall/security groups allow traffic

### High Error Rate
- Check backend logs for errors
- Verify database can handle the load
- Check if rate limiting is blocking requests

### Slow Response Times
- Monitor server resources (CPU, memory)
- Check database query performance
- Review network latency

## Next Steps

1. Run basic health check test
2. Analyze results and identify bottlenecks
3. Optimize backend based on findings
4. Run more intensive tests (stress, spike)
5. Set up CI/CD integration for automated testing

## Resources

- [K6 Documentation](https://k6.io/docs/)
- [K6 Test Types](https://k6.io/docs/test-types/introduction/)
- [K6 Metrics](https://k6.io/docs/using-k6/metrics/)
- [K6 Thresholds](https://k6.io/docs/using-k6/thresholds/)
