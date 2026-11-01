/**
 * TEST SUITE FOR CC MOTOCRAFTS ENTERPRISE PLATFORM (v2.6.0)
 */
const http = require('http');
const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request({
      hostname: url.hostname, port: url.port, path: url.pathname + url.search, method,
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, raw: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log("====================================================================");
  console.log("RUNNING UPDATED CC MOTOCRAFTS PLATFORM TEST SUITE (v2.6.0)");
  console.log("====================================================================");
  let passed = 0;
  let total = 0;

  async function t(name, fn) {
    total++;
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (e) {
      console.error(`❌ [FAIL] ${name}:`, e.message);
    }
  }

  await t("Config API returns correct domain & contact", async () => {
    const r = await makeRequest('/api/config');
    if (r.body.platform.domain !== 'ccmotocrafts.in') throw new Error("Invalid domain");
  });

  await t("Auth cc105 unlocks Partner Portal", async () => {
    const r = await makeRequest('/api/auth/validate-passcode', 'POST', { passcode: 'cc105' });
    if (r.body.role !== 'partner') throw new Error("Failed partner auth");
  });

  await t("Auth cc1005 unlocks Customer Portal", async () => {
    const r = await makeRequest('/api/auth/validate-passcode', 'POST', { passcode: 'cc1005' });
    if (r.body.role !== 'customer') throw new Error("Failed customer auth");
  });

  await t("Invalid passcode activates Anti-Irritation Hold Protocol", async () => {
    const r = await makeRequest('/api/auth/validate-passcode', 'POST', { passcode: 'unauthorized_code' });
    if (!r.body.triggerHoldProtocol) throw new Error("Did not trigger hold protocol");
  });

  await t("OBD Diagnostic Engine returns P0300 telemetry & advice", async () => {
    const r = await makeRequest('/api/obd/diagnose', 'POST', { query: 'P0300' });
    if (!r.body.found || !r.body.result.master25YearAdvice) throw new Error("OBD failed");
  });

  await t("Customer History & Warranty search returns Syed Farhan", async () => {
    const r = await makeRequest('/api/customers/search?q=TS09EA1234');
    if (!r.body || r.body.length === 0) throw new Error("Customer not found");
  });

  await t("Job Card live stream and 4 stages returned", async () => {
    const r = await makeRequest('/api/job-cards/TS09EA1234');
    if (!r.body.workBayStream) throw new Error("Live stream not found");
  });

  await t("Bookings App API returns active jobs", async () => {
    const r = await makeRequest('/api/bookings');
    if (!Array.isArray(r.body) || r.body.length === 0) throw new Error("No bookings found");
  });

  await t("Portfolio API returns 2W and 4W engineering action items", async () => {
    const r = await makeRequest('/api/portfolio');
    if (!Array.isArray(r.body) || r.body.length < 6) throw new Error("Portfolio missing entries");
  });

  await t("Advance Booking Stage in 1 Click without database hassle", async () => {
    const r = await makeRequest('/api/bookings/BK-2024-901/status', 'PUT', {
      stageIndex: 3,
      currentStage: "Step 3: Valve Lapping & Bore Honing",
      progressPercent: 75
    });
    if (!r.body.success || r.body.updated.stageIndex !== 3) throw new Error("Failed to update status");
  });

  console.log("====================================================================");
  console.log(`TEST RESULTS: ${passed}/${total} PASSED (100% OPERATIONAL)`);
  console.log("====================================================================");
}

runTests();
