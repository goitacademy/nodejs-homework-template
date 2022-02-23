const fs = require('fs/promises');

const { jsonStringify } = require('../common');

async function writeContent(content, contactsPath) {
  await fs.writeFile(contactsPath, jsonStringify(content));
}

module.exports = {
  writeContent,
};
