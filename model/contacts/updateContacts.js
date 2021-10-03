const fs = require('fs/promises');
const PATH_DB = require('./contactsPath');

const updateContacts = async newContacts => {
  await fs.writeFile(PATH_DB, JSON.stringify(newContacts));
};

module.exports = updateContacts;
