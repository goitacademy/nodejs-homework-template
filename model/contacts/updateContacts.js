const fs = require('fs/promises');
const contactsPath = require('./contactsPath');

const updateContacts = async newListContacts => {
  fs.writeFile(contactsPath, JSON.stringify(newListContacts));
};

module.exports = updateContacts;
