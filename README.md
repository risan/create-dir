# Create Directory Recursively

[![Build Status](https://flat.badgen.net/travis/risan/create-dir)](https://travis-ci.org/risan/create-dir)
[![Test Coverage](https://flat.badgen.net/codeclimate/coverage/risan/create-dir)](https://codeclimate.com/github/risan/create-dir)
[![Maintainability](https://flat.badgen.net/codeclimate/maintainability/risan/create-dir)](https://codeclimate.com/github/risan/create-dir)
[![Latest Stable Version](https://flat.badgen.net/npm/v/create-dir)](https://www.npmjs.com/package/create-dir)
[![Node Version](https://flat.badgen.net/npm/node/create-dir)](https://www.npmjs.com/package/create-dir)
[![Code Style: Prettier](https://flat.badgen.net/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)
[![License](https://flat.badgen.net/npm/license/create-dir)](https://github.com/risan/send-request/blob/master/LICENSE)

Create directory recursively.

It works similar to the `mkdir -p`. For Node `>= 10.12.0`, it will use the built-in `mkdir` `recursive` option.

## Install

```bash
$ npm install create-dir

# Or if you use Yarn
$ yarn add create-dir
```

## Quick Start

```js
const createDir = require("create-dir");

(async () => {
  try {
    const created = await createDir("foo/bar/baz");

    if (created) {
      console.log("The directory is created!");
    } else {
      console.log("The directory already exists.");
    }
  } catch(error) {
    console.error(error.message);
  }
})();
```

## API

```js
createDir(path, [mode])
```

### Parameters

* `path` (`String`): The path directory to create.
* `mode` (optional `Number`): Directory permission, default to `0o777`.

### Returns

It returns a `Promise` which when resolved contains a `Boolean` value. `true` means that the directory is created successfully. `false` means that the directory already exists.

## License

MIT © [Risan Bagja Pradana](https://bagja.net)
