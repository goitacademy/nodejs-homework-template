const fs = require('fs/promises');

const rewriteJsonContacts = async (path, contacts) => {
  await fs.writeFile(path, JSON.stringify(contacts, null, 2));
};

module.exports = rewriteJsonContacts;
