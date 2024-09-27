'use strict';
// Helper function that converts functions into memoized versions
// of themselves with a fixed-size LRU cache.
module.exports = function memoizeStringTransformerMethod(cacheSize, fn) {
  const cache = new Map();
  return function(str) {
    if (cache.has(str)) {
      return cache.get(str);
    }
    const result = fn.call(this, str);
    cache.set(str, result);
    if (cache.size > cacheSize) {
      const [[oldestKey]] = cache;
      cache.delete(oldestKey);
    }
    return result;
  };
};
