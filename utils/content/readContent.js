const fs = require('fs/promises');
const { contactsPath } = require('../path');

async function readContent() {
  const content = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(content);
}

module.exports = { readContent };
