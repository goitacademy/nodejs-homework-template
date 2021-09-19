/* eslint-disable no-useless-catch */
const fs = require('fs/promises');

const filePath = require('./filePath');

const listContacts = async () => {
  try {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    // console.table(contacts);
    return contacts;
  } catch (error) {
    throw error;
  }
};

module.exports = listContacts;
