const fs = require("fs");
const p = require("path");
const util = require("util");
const isSupportRecursive = require("./is-support-recursive");

const mkdir = util.promisify(fs.mkdir);

const isDirAlreadyExists = error => error.code === "EEXIST";

const isDirNotExists = error => error.code === "ENOENT";

/**
 * Create directory recursively.
 *
 * @param {String} path
 * @param {Number} mode
 * @return {Promise}
 */
const createDir = async (path, mode = 0o777) => {
  if (isSupportRecursive()) {
    return mkdir(path, { mode, recursive: true });
  }

  let result = true;

  try {
    await mkdir(path, mode);
  } catch (error) {
    if (isDirNotExists(error)) {
      const dir = p.dirname(path);

      await createDir(dir, mode);

      await createDir(path, mode);
    } else if (isDirAlreadyExists(error)) {
      result = false;
    } else {
      throw error;
    }
  }

  return result;
};

module.exports = createDir;
