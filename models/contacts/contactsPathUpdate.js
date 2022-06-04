const fs = require('fs').promises;

const contactsPath = require('./contactsPath');

async function contactPathUpdate(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = contactPathUpdate;
