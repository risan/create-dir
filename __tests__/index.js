/* global afterAll:false, afterEach:false, beforeAll:false, expect:false, test:false */
const fs = require("fs");
const createDir = require("../src");

const VERSION = process.version;
const BASE_DIR = `${__dirname}/fixtures`;

const rmdir = path => {
  try {
    fs.rmdirSync(path);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

const getPermission = path => {
  const stats = fs.statSync(path);

  return (stats.mode & 0o777).toString(8); // eslint-disable-line
};

beforeAll(() => fs.mkdirSync(BASE_DIR));

afterAll(() => fs.rmdirSync(BASE_DIR));

afterEach(() => {
  process.env.CREATE_DIR_NODE_VERSION_TEST = VERSION;
  rmdir(`${BASE_DIR}/foo/bar/qux`);
  rmdir(`${BASE_DIR}/foo/bar`);
  rmdir(`${BASE_DIR}/foo`);
});

test("it can create directory", async () => {
  const path = `${BASE_DIR}/foo`;

  const result = await createDir(path);
  expect(result).toBe(true);
  expect(fs.existsSync(path)).toBe(true);
});

test("it can create directory recursively", async () => {
  const path = `${BASE_DIR}/foo/bar/qux`;

  const result = await createDir(path);
  expect(result).toBe(true);
  expect(fs.existsSync(path)).toBe(true);
});

test("it can create directory recursively in older node version", async () => {
  process.env.CREATE_DIR_NODE_VERSION_TEST = "v8.0.0";
  const path = `${BASE_DIR}/foo/bar/qux`;

  const result = await createDir(path);
  expect(result).toBe(true);
  expect(fs.existsSync(path)).toBe(true);
});

test("it can set permission", async () => {
  const path1 = `${BASE_DIR}/foo`;
  await createDir(path1, 0o740);
  expect(getPermission(path1)).toBe("740");

  const path2 = `${BASE_DIR}/foo/bar`;
  await createDir(path2, 0o754);
  expect(getPermission(path2)).toBe("754");
});
