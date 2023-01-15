const fs = require('fs/promises');
const contactsPath = require('./contactsPath');

//   Functions  writeFile
const writeContacts = async (user) => { 
  return await fs.writeFile(contactsPath, JSON.stringify(user));
};

module.exports = writeContacts();