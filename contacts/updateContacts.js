const fs = require('fs/promises');
const filePath = require('./filePath');

const updateContacts = async data => {
  await fs.writeFile(filePath, JSON.stringify(data));
};

module.exports = updateContacts;
