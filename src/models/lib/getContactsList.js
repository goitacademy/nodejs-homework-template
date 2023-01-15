const fs = require('fs/promises');
const contactsPath = require('./contactsPath');


//   Functions  readFile 
const getContactsList = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf8"));
};

module.exports = getContactsList();