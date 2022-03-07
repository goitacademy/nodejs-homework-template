const fs = require('fs/promises');

const contactsPath = require('../../bd/contactsPath');

const updateContacts = async (newContacts) => {
  const contactsString = JSON.stringify(newContacts);
  fs.writeFile(contactsPath, contactsString);
}

module.exports = updateContacts;