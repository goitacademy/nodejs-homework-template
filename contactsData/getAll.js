const fs = require('fs').promises

const contactsPath = require('./filePath')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data)
    // console.log(contacts)
    return contacts;
  }
  catch (error) {
    throw error;
  }
}

module.exports = listContacts
