const assert = require("assert");

function sum(a, b) {
  return a + b;
}

assert.strictEqual(sum(1, 1), 2, "1 + 1 debería ser 2");

console.log("✅ Smoke test passed");