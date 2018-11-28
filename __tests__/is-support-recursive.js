/* global expect:false, test:false */
const isSupportRecursive = require("../src/is-support-recursive");

test("it returns true for version >= 10.12.0", () => {
  expect(isSupportRecursive("v10.12.0")).toBe(true);
  expect(isSupportRecursive("v10.12.1")).toBe(true);
  expect(isSupportRecursive("v10.12.10")).toBe(true);
  expect(isSupportRecursive("v10.13.0")).toBe(true);
  expect(isSupportRecursive("v11.0.0")).toBe(true);
  expect(isSupportRecursive("v11.0.1")).toBe(true);
  expect(isSupportRecursive("v11.1.0")).toBe(true);
});

test("it returns false for version < 10.12.0", () => {
  expect(isSupportRecursive("v10.11.0")).toBe(false);
  expect(isSupportRecursive("v10.0.0")).toBe(false);
  expect(isSupportRecursive("v10.0.1")).toBe(false);
  expect(isSupportRecursive("v9.0.0")).toBe(false);
  expect(isSupportRecursive("v8.0.0")).toBe(false);
  expect(isSupportRecursive("v8.0.1")).toBe(false);
  expect(isSupportRecursive("v8.0.12")).toBe(false);
  expect(isSupportRecursive("v8.12.0")).toBe(false);
});
