const path = require('path');

function createPath(relativePath) {
  return path.join(__dirname, relativePath);
}

module.exports = {
  createPath,
};
