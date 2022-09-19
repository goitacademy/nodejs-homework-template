module.exports = ["./validationMiddleware.js", "./authMiddleware.js"].reduce(
  (obj, file) => {
    const exp = require(file);
    Object.assign(obj, exp);
    return obj;
  },
  {}
);
