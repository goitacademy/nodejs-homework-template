const fs = require('fs/promises');
const contactsPath = require('../../contactsPath');

const getAll = async () => {
  const dataString = await fs.readFile(contactsPath, 'utf-8');

  const data = JSON.parse(dataString);
  return data;
};

module.exports = getAll;
