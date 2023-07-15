/*!
 * write-yaml <https://github.com/jonschlinkert/write-yaml>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var yaml = require('js-yaml');
var extend = require('extend-shallow');
var write = require('write');

module.exports = function(dest, data, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = undefined;
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected callback to be a function');
  }
  if (typeof dest !== 'string') {
    cb(new TypeError('expected dest to be a string'));
    return;
  }
  if (typeof data !== 'object') {
    cb(new TypeError('expected data to be an object'));
    return;
  }

  write(dest, toYaml(data, options), cb);
};

/**
 * Sync method
 */

module.exports.sync = function(dest, data, options) {
  if (typeof dest !== 'string') {
    throw new TypeError('expected dest to be a string');
  }
  if (typeof data !== 'object') {
    throw new TypeError('expected data to be an object');
  }

  try {
    return write.sync(dest, toYaml(data, options));
  } catch (err) {
    err.reason = 'write-yaml: failed to write "' + dest + '": ';
    throw err;
  }
};

/**
 * Convert data to yaml with the specified
 * defaults and user-defined options
 */

function toYaml(data, options) {
  var defaults = {indent: 2, skipInvalid: false, flowLevel: -1};
  var opts = extend(defaults, options);
  var fn = opts.safe ? yaml.safeDump : yaml.dump;
  return fn(data, opts);
}
