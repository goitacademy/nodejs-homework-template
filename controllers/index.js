module.exports = ["./contactControllers.js", "./userControllers.js"].reduce(
  (obj, file) => {
    const exp = require(file);
    Object.assign(obj, exp);
    return obj;
  },
  {}
);
