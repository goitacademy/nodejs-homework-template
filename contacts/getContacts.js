const fs = require('fs/promises');
const filePath = require('./filePath');

const getContacts = async () => {
  const contacts = await fs.readFile(filePath);
  return JSON.parse(contacts);
};

module.exports = getContacts;
