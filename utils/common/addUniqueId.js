const { randomUUID } = require('crypto');

const id = randomUUID();

function addUniqueId(object) {
  return { id, ...object };
}

module.exports = { addUniqueId };
