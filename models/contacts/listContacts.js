const { readContent } = require('../../utils');
const listContacts = async () => {
  return await readContent();
};

module.exports = { listContacts };
