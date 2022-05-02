const { config } = require("@masterarthur/config");
const assert = require("assert/strict");

console.log("Starting tests in CJS");

// Not found
assert.equal(config("NOT_FOUND"), undefined);
assert.equal(config({ path: "NOT_FOUND" }), undefined);

// Default value
assert.equal(config("NOT_FOUND", "test"), "test");
assert.equal(config({ path: "NOT_FOUND", defaultValue: "test" }), "test");

process.env.A = "1";
process.env.FLOAT = "1.5";

// Autocast to number
assert.equal(config("A"), 1);
assert.equal(config({ path: "A" }), 1);
assert.equal(config("NOT_FOUND", "1"), 1);
assert.equal(config({ path: "NOT_FOUND", defaultValue: "1" }), 1);

assert.equal(config("FLOAT"), 1.5);
assert.equal(config({ path: "FLOAT" }), 1.5);
assert.equal(config("NOT_FOUND", "1.5"), 1.5);
assert.equal(config({ path: "NOT_FOUND", defaultValue: "1.5" }), 1.5);

process.env.B = "true";

// Autocast to true
assert.equal(config("B"), true);
assert.equal(config({ path: "B" }), true);
assert.equal(config("NOT_FOUND", "true"), true);
assert.equal(config({ path: "NOT_FOUND", defaultValue: "true" }), true);

process.env.C = "false";

// Autocast to false
assert.equal(config("C"), false);
assert.equal(config({ path: "C" }), false);
assert.equal(config("NOT_FOUND", "false"), false);
assert.equal(config({ path: "NOT_FOUND", defaultValue: "false" }), false);

process.env.D = "null";

// Autocast to null
assert.equal(config("D"), null);
assert.equal(config({ path: "D" }), null);
assert.equal(config("NOT_FOUND", "null"), null);
assert.equal(config({ path: "NOT_FOUND", defaultValue: "null" }), null);

process.env.E = "undefined";

// Autocast to undefined
assert.equal(config("E"), undefined);
assert.equal(config({ path: "E" }), undefined);
assert.equal(config("NOT_FOUND", "undefined"), undefined);
assert.equal(
  config({ path: "NOT_FOUND", defaultValue: "undefined" }),
  undefined
);

process.env.F = "TEST";

// not autocasting
assert.equal(config("F"), "TEST");
assert.equal(config({ path: "F" }), "TEST");
assert.equal(config("NOT_FOUND", "TEST"), "TEST");
assert.equal(config({ path: "NOT_FOUND", defaultValue: "TEST" }), "TEST");

console.log("All good in CJS");
