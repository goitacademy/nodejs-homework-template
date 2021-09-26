const fs = require('fs/promises');
const contacts = require('../../model/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contacts);

    return JSON.parse(data);

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts
}