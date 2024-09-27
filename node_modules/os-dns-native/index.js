'use strict';
const { lookup, constants } = require('bindings')('os_dns_native');
const { promisify } = require('util');
const ipv6normalize = require('ipv6-normalize');
const nodeDns = require('dns');
const debug = require('debug')('os-dns-native');

const rrtypes = ['A', 'AAAA', 'CNAME', 'TXT', 'SRV'];
const rrtypeEnumToString = Object.fromEntries(rrtypes.map(t => [constants[t], t]));

function resolve(hostname, rrtype, callback) {
  if (!rrtypes.includes(rrtype)) {
    throw new Error(`Unknown rrtype: ${rrtype}`);
  }

  lookup(hostname, constants.INTERNET, constants[rrtype], function(err, rawResults) {
    if (err) {
      debug(`failed ${rrtype} DNS resolution`, { hostname, err });
      return callback(err);
    }
    debug(`received ${rrtype} DNS resolution`, { hostname, rawResults });

    const results = [];
    for (const { type, value } of rawResults) {
      if (type !== constants[rrtype]) {
        debug(`skipping mismatched DNS answer: wanted ${rrtype} but got ${rrtypeEnumToString[type]}`, { hostname });
      } else {
        results.push(value);
      }
    }

    if (results.length === 0 && rawResults.length !== 0) {
      // We encounter this situation when we only saw mismatching results.
      callback(new Error(`DNS server did not provide matching result for ${rrtype}: ${hostname}`));
      return;
    }

    switch (rrtype) {
      case 'A':
      case 'CNAME':
        return callback(null, results);
      case 'AAAA':
        return callback(null, results.map(addr => ipv6normalize(addr)));
      case 'TXT':
        return callback(null, results.map(val => val.split('\0')));
      case 'SRV':
        return callback(null, results.map(res => {
          const { name, port, priority, weight } = res.match(
            /^(?<name>.+):(?<port>\d+),prio=(?<priority>\d+),weight=(?<weight>\d+)$/).groups;
          return { name, port: +port, priority: +priority, weight: +weight };
        }));
    }
  });
}

function resolve4(hostname, cb) { return resolve(hostname, 'A', cb); }
function resolve6(hostname, cb) { return resolve(hostname, 'AAAA', cb); }
function resolveCname(hostname, cb) { return resolve(hostname, 'CNAME', cb); }
function resolveSrv(hostname, cb) { return resolve(hostname, 'SRV', cb); }
function resolveTxt(hostname, cb) { return resolve(hostname, 'TXT', cb); }

const promises = {
  resolve: promisify(resolve),
  resolve4: promisify(resolve4),
  resolve6: promisify(resolve6),
  resolveCname: promisify(resolveCname),
  resolveSrv: promisify(resolveSrv),
  resolveTxt: promisify(resolveTxt),
};

const kWasNativelyLookedUp = Symbol('os-dns-native.kWasNativelyLookedUp');

function withFallback(fn, nodeFn) {
  return function(...args) {
    const cb = args.pop();
    fn(...args, (err, result) => {
      if (err) {
        nodeFn(...args, cb);
      } else {
        result[kWasNativelyLookedUp] = true;
        cb(null, result);
      }
    });
  }
};

function wasNativelyLookedUp(result) {
  return !!(result && typeof result === 'object' && result[kWasNativelyLookedUp]);
}

const withNodeFallback = {
  resolve: withFallback(resolve, nodeDns.resolve),
  resolve4: withFallback(resolve4, nodeDns.resolve4),
  resolve6: withFallback(resolve6, nodeDns.resolve6),
  resolveCname: withFallback(resolveCname, nodeDns.resolveCname),
  resolveSrv: withFallback(resolveSrv, nodeDns.resolveSrv),
  resolveTxt: withFallback(resolveTxt, nodeDns.resolveTxt),
  promises: {
    resolve: promisify(withFallback(resolve, nodeDns.resolve)),
    resolve4: promisify(withFallback(resolve4, nodeDns.resolve4)),
    resolve6: promisify(withFallback(resolve6, nodeDns.resolve6)),
    resolveCname: promisify(withFallback(resolveCname, nodeDns.resolveCname)),
    resolveSrv: promisify(withFallback(resolveSrv, nodeDns.resolveSrv)),
    resolveTxt: promisify(withFallback(resolveTxt, nodeDns.resolveTxt)),
  }
};

module.exports = {
  resolve,
  resolve4,
  resolve6,
  resolveCname,
  resolveSrv,
  resolveTxt,
  promises,
  withNodeFallback,
  wasNativelyLookedUp
};
