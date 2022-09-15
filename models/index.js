module.exports = [
  "./connections.js",
  "./contactModel.js",
  "./userModel.js",
].reduce((obj, file) => {
  const exp = require(file);
  Object.assign(obj, exp);
  return obj;
}, {});
