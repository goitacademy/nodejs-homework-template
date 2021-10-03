/* eslint-disable semi */
const fs = require('fs/promises');
const PATH_DB = require('./contactsPath');

const getAllContacts = async () => {
  try {
    const contacts = JSON.parse(await fs.readFile(PATH_DB, 'utf8'));

    return contacts;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getAllContacts;
